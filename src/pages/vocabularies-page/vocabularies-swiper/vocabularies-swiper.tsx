import React, {useCallback, useEffect, useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Keyboard, Pagination, Virtual } from "swiper/modules";
import './vocabularies-swiper.css';
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { IVocabulary, IVocabularyItem } from "../../../shared/types.ts";
import AutoSizer from "react-virtualized-auto-sizer";
import { ListOfVocabulary } from "../list-of-vocabulary";
import SwiperController from "./swiper-controller.tsx";
import {useUser} from "../../../shared/store/zustand";



interface VocabulariesSwiperProps {
    listVocabularies: IVocabulary[];
    isOpen: boolean;
    onOpen: () => void;
}

const VocabulariesSwiper: React.FC<VocabulariesSwiperProps> = ({ listVocabularies, isOpen, onOpen }) => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const swiperRef = useRef<SwiperType | null>(null);
    const setCurrentVocabulary = useUser(store => store.setCurrentVocabulary)

    const handleSwiperInit = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
    }, []);

    const goToSlide = useCallback((index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    }, []);

    useEffect(() => {
        goToSlide(2)
        setCurrentVocabulary(listVocabularies[2])

    }, []);

    return (
        <Box className={"Box__Swiper"}
             as={Flex}
             w={'100%'}
             h={'100%'}
             overflow={'hidden'}
             justifyContent={'center'}
             alignItems={'center'}
        >
            <Swiper
                className="Swiper"
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    type: "fraction",
                }}
                keyboard={{
                    enabled: true,
                }}
                modules={[Pagination, Keyboard, Virtual]}
            >
                <SwiperController
                    listVocabularies={listVocabularies}
                    onSwiperInit={handleSwiperInit}
                />
                {listVocabularies.map((_vocabularyObject: IVocabulary, index: number) => {
                    const _vocabulary: IVocabularyItem[] = _vocabularyObject.vocabulary;
                    return (
                        <SwiperSlide key={_vocabularyObject.id + index}>
                            <Box
                                className={"Box__Swiper__Slide"}
                                backgroundColor={isDark ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)'}
                                rounded={{ base: 10, sm: 15, md: 25, lg: 25, xl: 30, '2xl': 35 }}
                                paddingX={{ base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7 }}
                                paddingY={{ base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7 }}
                                boxShadow={isDark ? 'dark-lg' : 'lg'}
                                marginX={{ base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7 }}
                                h={"100%"}
                                w={"100%"}
                                maxWidth={"720px"}
                            >
                                <Flex direction={"column"}
                                      h={"100%"}
                                      w={"100%"}>
                                    {_vocabulary.length > 0 &&
                                      <AutoSizer className={"list-of-vocabulary AutoSizer"}>
                                          {({ height, width }) => (
                                              <ListOfVocabulary
                                                  vocabulary={_vocabulary}
                                                  height={height}
                                                  width={width}
                                                  isOpen={isOpen}
                                                  onOpen={onOpen}
                                              />
                                          )}
                                      </AutoSizer>
                                    }
                                </Flex>
                            </Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    );
}

export default VocabulariesSwiper;