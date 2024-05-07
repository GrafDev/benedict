import {Input, InputGroup, InputLeftAddon, Tooltip} from "@chakra-ui/react";


export const InputDictItem = (props: any) => {


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
                       aria-autocomplete={"none"}
                       type={"text"}
                       name={props.item}
                       required={false}
                       // defaultValue={props.value}
                       value={props.value}
                       onChange={(e)=>props.handleChange(e)}

                />
            </InputGroup>
        </Tooltip>

    );
}