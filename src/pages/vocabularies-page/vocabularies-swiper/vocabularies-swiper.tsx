import {useCallback, useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Keyboard, Navigation, Pagination, Virtual} from "swiper/modules";
import './vocabularies-swiper.css';
import {Box, Button, Flex,  useColorModeValue, useToken} from "@chakra-ui/react";
import {IVocabulary, IVocabularyItem, TModalOptions} from "../../../shared/types.ts";
import AutoSizer from "react-virtualized-auto-sizer";
import SwiperController from "./swiper-controller.tsx";
import { useUser} from "../../../shared/store/zustand";
import {PiArrowFatLeftDuotone, PiArrowFatRightDuotone} from "react-icons/pi";
import {buttonStyles} from "../../../shared/ui/button-style.ts";
import ListOfVocabulary from "../list-of-vocabulary/list-of-vocabulary.ui.tsx";
import EmptyList from "./empty-list.tsx";


interface IVocabulariesSwiperProps {
    optionsModal: TModalOptions;
    setOptionsModal: (_optionsModal: TModalOptions) => void;
    onClose: () => void;
    onOpen: () => void;
}


const VocabulariesSwiper = ({
                                onOpen,
                                setOptionsModal,
                            }: IVocabulariesSwiperProps) => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const listVocabularies = useUser(store => store.listVocabularies)
    const currentVocabularyIndex = useUser(store => store.currentVocabularyIndex)
    const [allowSlideNext, setAllowSlideNext] = useState(true);
    const [allowSlidePrev, setAllowSlidePrev] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const colorUI = useUser(store => store.currentUser.colorUI)
    const currentVocabulary = useUser(store => store.currentVocabulary)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
    const [color600, color800] = useToken('colors', [`${colorUI}.600`, `${colorUI}.800`]);
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
        }
    }, [currentVocabularyIndex]);

    const handleClickAddWord = () => {
        setOptionsModal("addWord")
        onOpen()
    }

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
                className="Swiper__Swiper"
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
                        <SwiperSlide key={_vocabularyObject.id + index} className={"Swiper__Slide"}>
                            <Box
                                className={"Box__Swiper__Slide"}
                                border={isDark ? {
                                    base: `${color800} 1px solid`,
                                    sm: `${color800} 1px solid`,
                                    md: `${color800} 2px solid`,
                                } : {
                                    base: `${color600} 1px solid`,
                                    sm: `${color600} 1px solid`,
                                    md: `${color600} 2px solid`,
                                }}
                                boxSizing="border-box"
                                backgroundColor={isDark ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)'}
                                rounded={{base: 10, sm: 15, md: 25, lg: 25, xl: 30, '2xl': 35}}
                                paddingX={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                paddingTop={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                paddingBottom={currentVocabulary.id === "default"? {
                                    base: 3,
                                    sm: 4,
                                    md: 5,
                                    lg: 5,
                                    xl: 6,
                                    '2xl': 7
                                } : "60px"}
                                boxShadow={isDark ? 'md' : 'md'}
                                marginX={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                h={"100%"}
                                w={"100%"}
                                maxWidth={"720px"}
                            >
                                <Flex direction={"column"}
                                      h={"100%"}
                                      w={"100%"}
                                >
                                    {_vocabulary.length > 0
                                        ? <AutoSizer className={"list-of-vocabulary AutoSizer"}>
                                            {({height, width}) => (
                                                <ListOfVocabulary
                                                    vocabulary={_vocabulary}
                                                    height={height}
                                                    width={width}
                                                />
                                            )}
                                        </AutoSizer>
                                        :
                                        <EmptyList/>
                                    }

                                </Flex>
                                <Flex direction={"row"}
                                      justifyContent={"space-around"}>
                                {currentVocabulary.id !== "default" &&
                                  <Button
                                      {...buttonStyles(colorUI)}
                                      marginY={2}
                                      maxW={"200px"}
                                      onClick={() => handleClickAddWord()}>
                                      {translations[language].addWord}
                                  </Button>}
                                </Flex>
                            </Box>

                        </SwiperSlide>
                    )
                })}


            </Swiper>
            <Box className={"block__swiper__control"}
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
                    minW={"60px"}
                    maxW={"50px"}
                    opacity={allowSlidePrev ? 1 : 0.2}
                    cursor={allowSlidePrev ? 'pointer' : 'default'}
                >
                    <PiArrowFatLeftDuotone/>
                </Button>
                <div className="swiper-custom-pagination"></div>

                <Button
                    className="custom-swiper-button-next"
                    {...buttonStyles(colorUI)}
                    minW={"60px"}
                    maxW={"50px"}
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