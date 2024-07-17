import React, {useCallback, useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Keyboard, Navigation, Pagination, Virtual} from "swiper/modules";
import './vocabularies-swiper.css';
import {Box, Button, Flex, Text, useColorModeValue, useToken} from "@chakra-ui/react";
import {IVocabulary, IVocabularyItem} from "../../../shared/types.ts";
import AutoSizer from "react-virtualized-auto-sizer";
import {ListOfVocabulary} from "../list-of-vocabulary";
import SwiperController from "./swiper-controller.tsx";
import { useUser} from "../../../shared/store/zustand";
import {PiArrowFatLeftDuotone, PiArrowFatRightDuotone} from "react-icons/pi";
import {buttonStyles} from "../../../shared/ui/button-style.ts";


interface VocabulariesSwiperProps {
    isOpen: boolean;
    onOpen: () => void;
}

const VocabulariesSwiper: React.FC<VocabulariesSwiperProps> = ({isOpen, onOpen}) => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const listVocabularies = useUser(store => store.listVocabularies)
    const currentVocabularyIndex = useUser(store => store.currentVocabularyIndex)
    const [allowSlideNext, setAllowSlideNext] = useState(true);
    const [allowSlidePrev, setAllowSlidePrev] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const colorUI = useUser(store => store.currentUser.colorUI)

    const [color500, color600] = useToken('colors', [colorUI, `${colorUI}.600`]);

    const updateSlideAbility = useCallback((swiper: SwiperType) => {
        setAllowSlideNext(!swiper.isEnd);
        setAllowSlidePrev(!swiper.isBeginning);
    }, []);

    const handleSwiperInit = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
    }, []);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.activeIndex = currentVocabularyIndex;
            swiperRef.current.slideTo(currentVocabularyIndex);
            updateSlideAbility(swiperRef.current);
            console.log("VocabulariesSwiper", currentVocabularyIndex)
        }
    }, [currentVocabularyIndex]);

    return (
        <Box className={"Box__Swiper"}
             as={Flex}
             w={'100%'}
             h={'100%'}
             flexDirection={"column"}
             overflow={'hidden'}
             justifyContent={'center'}
             alignItems={'center'}
        >
            <Swiper
                className="Swiper"
                slidesPerView={1}
                spaceBetween={10}
                onSlideChange={(swiper) => updateSlideAbility(swiper)}
                allowSlideNext={allowSlideNext}
                allowSlidePrev={allowSlidePrev}
                onSwiper={handleSwiperInit}
                navigation={{
                    prevEl: '.custom-swiper-button-prev',
                    nextEl: '.custom-swiper-button-next',
                }}
                pagination={{
                    type: "fraction",
                    el: ".swiper-custom-pagination",
                }}
                keyboard={{
                    enabled: true,
                }}
                modules={[Pagination, Navigation, Keyboard, Virtual]}
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
                                border={`${color600} 2px solid`}
                                backgroundColor={isDark ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)'}
                                rounded={{base: 10, sm: 15, md: 25, lg: 25, xl: 30, '2xl': 35}}
                                paddingX={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                paddingY={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                boxShadow={isDark ? 'dark-lg' : 'lg'}
                                marginX={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                h={"100%"}
                                w={"100%"}
                                maxWidth={"720px"}
                            >
                                <Flex direction={"column"}
                                      h={"100%"}
                                      w={"100%"}>
                                    {_vocabulary.length > 0
                                        ? <AutoSizer className={"list-of-vocabulary AutoSizer"}>
                                            {({height, width}) => (
                                                <ListOfVocabulary
                                                    vocabulary={_vocabulary}
                                                    height={height}
                                                    width={width}
                                                    isOpen={isOpen}
                                                    onOpen={onOpen}
                                                />
                                            )}
                                        </AutoSizer>
                                        : <AutoSizer className={"Box__Swiper__Slide__Empty"}>
                                            {({height, width}) => (
                                                <Flex className="Box__Swiper__Slide__Empty__Box"
                                                    height={height}
                                                    width={width}
                                                      justifyContent={"center"}
                                                      alignItems={"center"}
                                                >
                                                    <Text className="Box__Swiper__Slide__Empty__Text"
                                                          fontSize={{base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl", "2xl": "7xl"}}
                                                    >
                                                        Empty vocabulary
                                                    </Text>
                                                </Flex>
                                            )}
                                        </AutoSizer>
                                    }
                                </Flex>
                            </Box>
                        </SwiperSlide>
                    )
                })}


            </Swiper>
            <Box className={"block__swiper__control"}

                 borderRadius={'20px'}
                 w={'95%'}
                 maxWidth={'720px'}
                 marginY={1}
                 gap={5}
                 paddingX="50px"
                 h={'60px'}
                 display={'flex'}
                 justifyContent={'center'}
                 alignItems={'center'}
            >
                <Button
                    className="custom-swiper-button-prev"
                    {...buttonStyles(colorUI)}
                    w={'40px'}
                    maxW={"50px"}
                    minW={'60px'}  // Добавьте эту строку
                    opacity={allowSlidePrev ? 1 : 0.2}
                    cursor={allowSlidePrev ? 'pointer' : 'defsult'}
                >
                    <PiArrowFatLeftDuotone/>
                </Button>
                <div className="swiper-custom-pagination"></div>

                <Button
                    className="custom-swiper-button-next"
                    {...buttonStyles(colorUI)}
                    w={'40px'}
                    maxW={"50px"}
                    minW={'60px'}  // Добавьте эту строку
                    opacity={allowSlideNext ? 1 : 0.2}
                    cursor={allowSlideNext ? 'pointer' : 'default'}

                >
                    <PiArrowFatRightDuotone/>
                </Button>
            </Box>
        </Box>
    )
        ;
}

export default VocabulariesSwiper;