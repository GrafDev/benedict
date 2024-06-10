import styles from './styles.module.css'
import {a, useTrail} from "@react-spring/web";
import React from "react";

const Trail= ({ open, children }: any) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 200 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })
    return (
        <div>
            {trail.map(({ height, ...style }, index) => (
                    <a.div key={index} className={
                        styles.trailsText
                    } style={style}>
                <a.div style={{ height }}>{items[index]}</a.div>
    </a.div>
))}
    </div>
)
}

export default Trail;
