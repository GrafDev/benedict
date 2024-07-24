import React, {useEffect, useMemo, useRef, useState} from "react";

interface AdaptiveTextProps {
    text: string;
    maxHeight?: number ;
    minFontSize?: number;
    initialFontSize?: number;
    weightFont?: "normal" | "bold"
    wrapText?: "wrap" | "nowrap" | "balance" | "stable" | "pretty"
}

const AdaptiveText: React.FC<AdaptiveTextProps> =React.memo( ({
                                                       text,
                                                       maxHeight = 33,
                                                       minFontSize = 10,
                                                       initialFontSize = 16,
                                                       weightFont = 'normal',
                                                       wrapText = 'balance'
                                                   }) => {
    const pRef = useRef<HTMLParagraphElement | null>(null);
    const [fontSize, setFontSize] = useState<number>(initialFontSize);

    const memoizedFontSize = useMemo(() => fontSize, [fontSize]);

    useEffect(() => {
        const adjustFontSize = () => {
            if (pRef.current) {
                const element = pRef.current;
                let currentFontSize = initialFontSize;

                // Устанавливаем начальный размер шрифта
                element.style.fontSize = `${currentFontSize}px`;

                // Если текст не помещается, начинаем уменьшать
                if (element.offsetHeight > maxHeight) {
                    const ratio = maxHeight / element.offsetHeight;
                    currentFontSize = Math.max(currentFontSize * ratio, minFontSize);
                    setFontSize(currentFontSize);
                }
            }
        };

        adjustFontSize();
        window.addEventListener('resize', adjustFontSize);

        return () => window.removeEventListener('resize', adjustFontSize);
    }, [text, maxHeight, minFontSize, initialFontSize]);

    return (
        <p
            ref={pRef}
            style={{
                width: '100%',
                wordBreak: 'break-word',
                textAlign: 'center',
                textWrap: wrapText,
                fontSize: `${memoizedFontSize}px`,
                lineHeight: '1.2',
                margin: 0,
                fontWeight: weightFont,
            }}
        >
            {text}
        </p>
    );
});

export default AdaptiveText;