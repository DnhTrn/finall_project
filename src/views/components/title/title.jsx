import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Title=motion(styled.h2`
    color:${props=>props.color};
    width:${props=>props.width};
    padding:${props=>props.padding};
    opacity: ${props=>props.opacity};
    margin:${props=>props.margin};
    height:${props=>props.height};
    font-weight: ${props=>props.weight};
    cursor:${props=>props.cursor};
    font-size: ${props=>props.size};
`);

export default React.memo(Title);