import styles from "./styles.module.css"
import {a, useTrail} from "@react-spring/web";
import React, {useEffect} from "react";
import {useMediaQuery} from "@chakra-ui/react";

const Trail = ({open, children}: any) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 500px)");
    const [letterStyle, setLetterStyle] = React.useState(styles.trailsText);
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: {mass: 20, tension: 2000, friction: 200},
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 200 : 0,
        from: {opacity: 0, x: 20, height: 0},
    })

    useEffect(() => {
        if (isSmallScreen) {
            setLetterStyle(styles.trailsSmallText)
        } else {
            setLetterStyle(styles.trailsText)
        }
    }, [isSmallScreen]);


    return (
        <div>
            {trail.map(({height, ...style}, index) => (
                <a.div key={index} className={
                    letterStyle
                } style={style}>
                    <a.div style={{height}}>{items[index]}</a.div>
                </a.div>
            ))}
        </div>
    )
}

export default Trail;
