import {Flex, Text} from "@chakra-ui/react";
import AutoSizer from "react-virtualized-auto-sizer";
import useOptions from "../../../shared/hooks/use-options.tsx";


const EmptyList=()=> {
    const {gTrans} = useOptions()
    return (
        <AutoSizer className={"Box__Swiper__Slide__Empty"}>
            {({height, width}) => (
                <Flex className="Box__Swiper__Slide__Empty__Box"
                      height={height}
                      width={width}
                      justifyContent={"center"}
                      alignItems={"center"}
                >
                    <Text className="Box__Swiper__Slide__Empty__Text"
                          fontSize={{
                              base: "1xl",
                              sm: "1xl",
                              md: "2xl",
                              lg: "3xl",
                              xl: "3xl",
                              "2xl": "4xl"
                          }}
                    >
                        {gTrans("Until now, you have not added any words to this vocabulary. You can do it by clicking the button 'Add Word' above the list of vocabularies")}
                    </Text>
                </Flex>
            )}
        </AutoSizer>
    )
}
export default EmptyList;