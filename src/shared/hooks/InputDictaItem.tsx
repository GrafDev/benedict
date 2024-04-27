import { Input, InputGroup, InputLeftAddon} from "@chakra-ui/react";


export const InputDictaItem = (props: any) => {

    return (
        <InputGroup
            size={{
                base: "sm",
                sm: "sm",
                md: "md",
                lg: "md",
                xl: "lg",
                "2xl": "lg",
            }}
        >
            <InputLeftAddon roundedLeft={5}>{props.item}</InputLeftAddon>
            <Input roundedRight={5}
                   name={props.item}
                   required={props.required}
                   value={props.volume}
                   onChange={props.handleChangeWord}
            />
        </InputGroup>
    );
}