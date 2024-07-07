import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
    EffectCreative,
    Keyboard, Navigation,
    Pagination,
    Virtual
} from "swiper/modules";


import './vocabularies-swiper.css';
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {IVocabularyItem} from "../../../shared/types.ts";
import AutoSizer from "react-virtualized-auto-sizer";
import {ListOfVocabulary} from "../list-of-vocabulary";
import {useUser} from "../../../shared/store/zustand";
import {useState} from "react";

const VocabulariesSwiper = (props: {
    listOfVocabularies: IVocabularyItem[][],
    isOpen: boolean,
    onOpen: () => void
}) => {
    const listOfVocabularies: IVocabularyItem[][] = props.listOfVocabularies
    const isOpen = props.isOpen
    const onOpen = props.onOpen
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';

    const setCurrentVocabulary = useUser(store => store.setCurrentVocabulary)
    const [indexSlide, setIndexSlide] = useState(0)


    const creativeEffect = {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    };

    const onSlideChange = (swiper: any) => {
        setIndexSlide(swiper.activeIndex)
        setCurrentVocabulary(listOfVocabularies[indexSlide])
    }
    return (
        <Box as={Flex} w={'100%'}
             h={'100%'}
             maxW={"720px"}
             overflow={'hidden'}
             justifyContent={'center'}
             alignItems={'center'}
        >
            <Swiper
                className="Swiper"
                onSlideChange={onSlideChange}
                slidesPerView={1}
                spaceBetween={30}
                effect={'creative'}
                navigation={true}
                pagination={{
                    type: "fraction",
                }}
                keyboard={{
                    enabled: true,
                }}
                creativeEffect={creativeEffect}
                modules={[Pagination, EffectCreative, Keyboard, Virtual,Navigation]}

            >
                {listOfVocabularies.map((_vocabulary: IVocabularyItem[], index: number) => {
                    return (
                        <SwiperSlide key={index + "swipwer"}                       >
                                <Box
                                      backgroundColor={isDark ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)'}
                                      rounded={{base: 10, sm: 15, md: 25, lg: 25, xl: 30, '2xl': 35}}
                                      paddingX={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                      paddingY={{base: 3, sm: 4, md: 5, lg: 5, xl: 6, '2xl': 7}}
                                      h={"100%"}
                                      w={"100%"}
                                      >
                                    <Flex direction={"column"}
                                          h={"100%"}
                                          w={"100%"}>
                                        {_vocabulary.length > 0 &&
                                          <AutoSizer className={"list-of-vocabulary AutoSizer"}>
                                              {({height, width}) => (

                                                  <ListOfVocabulary height={height} width={width}
                                                                    isOpen={isOpen} onOpen={onOpen}/>
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



