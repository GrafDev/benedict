import { useDictModal } from "../../shared/store/zustand";
import { Input, InputGroup, InputLeftAddon, VStack } from "@chakra-ui/react";
import { IDictionaryItem } from "../../shared/types.ts";

export const FormDict = ({register}: any ) => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord);
    return (
        <VStack>
            {Object.entries(editWord).map(([key, value]: [string, any]) => {
                if (
                    key !== "id" &&
                    key !== "popular" &&
                    key !== "learning"
                ) {
                    return (
                        <InputGroup
                            key={key}
                            size={{
                                base: "sm",
                                sm: "sm",
                                md: "md",
                                lg: "md",
                                xl: "lg",
                                "2xl": "lg",
                            }}
                        >
                            <InputLeftAddon>{key}</InputLeftAddon>
                            <Input
                                {...register(value)}
                                require={key === "word"}
                            />
                        </InputGroup>
                    );
                } else return null;
            })}
        </VStack>
    );
};
