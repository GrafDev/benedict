import { useDictModal } from "../../shared/store/zustand";
import { Input, InputGroup, InputLeftAddon, VStack } from "@chakra-ui/react";
import { IDictionaryItem } from "../../shared/types.ts";

export const FormDict = () => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord);
    return (
        <VStack>
            {Object.entries(editWord).map(([key, value]: [string, any]) => {
                if (
                    key !== "id" &&
                    key !== "word" &&
                    key !== "popular" &&
                    key !== "learning"
                ) {
                    return (
                        <InputGroup
                            key={key}

                            size={{
                                base: "sm",
                                sm: "md",
                                md: "lg",
                                lg: "xl",
                                xl: "2xl",
                                "2xl": "3xl",
                            }}
                        >
                            <InputLeftAddon>{key}</InputLeftAddon>
                            <Input
                                type="text"
                                placeholder={key}
                                value={value}
                                onChange={(e) => {
                                    // Handle changes here
                                    editWord[key] = e.target.value;
                                }}
                            />
                        </InputGroup>
                    );
                } else return null;
            })}
        </VStack>
    );
};
