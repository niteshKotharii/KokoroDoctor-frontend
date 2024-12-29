import React from "react";
import { HeaderButton } from 'react-navigation-header-buttons';

export default function CustomHeaderButton (props) {
    return (<HeaderButton {...props}
        IconComponent={props.iconSet}
        iconSize={props.iconSize}
        color={props.color}/>);
};