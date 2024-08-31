import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Label = motion(styled.label`
    display: ${props=>props.position};
    position: ${props=>props.position};
    top: ${props=>props.top};
    left: ${props=>props.left};
    right: ${props=>props.right};
    bottom: ${props=>props.bottom};
    align-items: ${props=>props.align};
    justify-items: ${props=>props.justify};
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding: ${props=>props.padding};
    margin: ${props=>props.margin};
    background: ${props=>props.background};
    box-shadow: ${props=>props.shadow};
    font-size: ${props=>props.size};
    font-weight: ${props=>props.fontWeight};
    color: ${props=>props.color};
    width: ${props=>props.width};
    height: ${props=>props.height};
    gap: ${props=>props.gap};
    overflow: ${props=>props.overflow};
    cursor: ${props=>props.cursor};
`);
// 
export default React.memo(Label);