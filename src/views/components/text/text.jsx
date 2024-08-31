import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Text=motion(styled.p`
    color:${props=>props.color};
    width:${props=>props.width};
    padding:${props=>props.padding};
    opacity: ${props=>props.opacity};
    visibility:${props=>props.visibility};
    margin:${props=>props.margin};
    height:${props=>props.height};
    font-weight: ${props=>props.weight};
    cursor:${props=>props.cursor};
    font-size: ${props=>props.size};
    white-space:${props=>props.whiteSpace}
`);

export default React.memo(Text);