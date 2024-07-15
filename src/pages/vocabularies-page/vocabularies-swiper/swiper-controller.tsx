import { IVocabulary } from "../../../shared/types.ts";
import type { Swiper as SwiperType } from "swiper";
import React, { useCallback, useEffect, useRef } from "react";
import { useSwiper } from "swiper/react";
import { useUser } from "../../../shared/store/zustand";

interface SwiperControllerProps {
    listVocabularies: IVocabulary[];
    onSwiperInit: (swiper: SwiperType) => void;
}

const SwiperController: React.FC<SwiperControllerProps> = ({ listVocabularies, onSwiperInit }) => {
    const swiper = useSwiper();
    const setCurrentVocabulary = useUser(store => store.setCurrentVocabulary);
    const prevListLengthRef = useRef(listVocabularies.length);

    useEffect(() => {
        if (swiper) {
            onSwiperInit(swiper);
        }
    }, [swiper, onSwiperInit]);

    const onSlideChange = useCallback(() => {
        const currentIndex = swiper.activeIndex;
        setCurrentVocabulary(listVocabularies[currentIndex]);
    }, [swiper, listVocabularies, setCurrentVocabulary]);

    useEffect(() => {
        swiper.on('slideChange', onSlideChange);
        return () => {
            swiper.off('slideChange', onSlideChange);
        };
    }, [swiper, onSlideChange]);

    useEffect(() => {
        const currentListLength = listVocabularies.length;
        if (currentListLength > prevListLengthRef.current) {
            // Новый элемент был добавлен
            swiper.update(); // Обновляем Swiper
            swiper.slideTo(currentListLength - 1, 0); // Переходим к новому слайду
            setCurrentVocabulary(listVocabularies[currentListLength - 1]); // Устанавливаем новый словарь как текущий
        }
        prevListLengthRef.current = currentListLength;
    }, [listVocabularies, swiper, setCurrentVocabulary]);

    return null;
};

export default SwiperController;