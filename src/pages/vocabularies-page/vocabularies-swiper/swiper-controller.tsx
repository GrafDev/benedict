import type {Swiper as SwiperType} from "swiper";
import React, {useCallback, useEffect} from "react";
import {useSwiper} from "swiper/react";
import { useUserStore} from "../../../shared/store/zustand";
import {IVocabulary} from "../../../shared/types/vocabulary-types.ts";

interface SwiperControllerProps {
    listVocabularies: IVocabulary[];
    onSwiperInit: (swiper: SwiperType) => void;
}

const SwiperController: React.FC<SwiperControllerProps> = ({ listVocabularies, onSwiperInit }) => {
    const swiper = useSwiper();
    const setCurrentVocabulary = useUserStore(store => store.setCurrentVocabulary);
    const setCurrentVocabularyIndex = useUserStore(store => store.setCurrentVocabularyIndex);

    useEffect(() => {
        if (swiper) {
            onSwiperInit(swiper);
        }
    }, [swiper,onSwiperInit]);


    const onSlideChange = useCallback(() => {
        const currentIndex = swiper.activeIndex;
        setCurrentVocabulary(listVocabularies[currentIndex]);
        setCurrentVocabularyIndex(currentIndex);
        console.log("ActiveIndex",swiper.activeIndex)
    }, [swiper, listVocabularies, setCurrentVocabulary]);

    useEffect(() => {
        swiper.on('slideChange', onSlideChange);
        return () => {
            swiper.off('slideChange', onSlideChange);
        };
    }, [swiper, onSlideChange]);

    return null;
};
export default SwiperController;