import React, {useEffect, useRef, useState} from "react";

interface AdaptiveTextProps {
    text: string;
    maxHeight?: number;
    minFontSize?: number;
    initialFontSize?: number;
}

const AdaptiveText: React.FC<AdaptiveTextProps> = ({
                                                       text,
                                                       maxHeight = 33,
                                                       minFontSize = 10,
                                                       initialFontSize=16 ,
                                                   }) => {
    const pRef = useRef<HTMLParagraphElement | null>(null);
    const [fontSize, setFontSize] = useState<number>(initialFontSize);

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
                fontSize: `${fontSize}px`,
                lineHeight: '1.2',
                margin: 0,
                fontWeight: 'normal',
            }}
        >
            {text}
        </p>
    );
};

export default AdaptiveText;