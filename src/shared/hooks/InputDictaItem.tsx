import {Input, InputGroup, InputLeftAddon, Tooltip} from "@chakra-ui/react";
import {nanoid} from "nanoid";


export const InputDictaItem = (props: any) => {
    console.log(props.value)
    return (
        <Tooltip label={props.value}
                 placement='top'
                 closeDelay={300}
                 openDelay={300}
                 rounded={5}
                 fontSize={"large"}
                 hasArrow arrowSize={10}>
            <InputGroup
                size={{
                    base: "sm",
                    sm: "sm",
                    md: "md",
                    lg: "md",
                    xl: "lg",
                    "2xl": "lg",
                }}
                mb={1}
            >

                <InputLeftAddon roundedLeft={5}>{props.item} </InputLeftAddon>
                <Input roundedRight={5}
                       id={nanoid()}
                       type={props.type}
                       defaultValue={props.value}
                       name={props.name}
                       required={props.required}
                       value={props.volume}
                       onChange={props.handleChange}
                />
            </InputGroup>
        </Tooltip>

    );
}