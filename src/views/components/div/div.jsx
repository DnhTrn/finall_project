/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";
// 
const Div=motion(styled.div`
    display: flex;
    position: ${props=>props.position};
    flex-direction: ${props=>props.column?'column':'row'};
    top: ${props=>props.top};
    left: ${props=>props.left};
    right: ${props=>props.right};
    bottom: ${props=>props.bottom};
    align-items: ${props=>props.align};
    justify-content: ${props=>props.justify};
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding: ${props=>props.padding};
    margin: ${props=>props.margin};
    background: ${props=>props.background};
    font-size: ${props=>props.size};
    font-weight: ${props=>props.fontWeight};
    color: ${props=>props.color};
    width: ${props=>props.width};
    height: ${props=>props.height};
    max-width: ${props=>props.maxWidth};
    max-height: ${props=>props.maxHeight};
    min-width: ${props=>props.minWidth};
    min-height: ${props=>props.minHeight};
    gap: ${props=>props.gap};
    overflow: ${props=>props.overflow};
    cursor: ${props=>props.cursor};
    transition: ${props=>props.transition};
    z-index: ${props=>props.index};
    box-shadow: ${props=>props.shadow};
    ref: ${props=>props.ref};
`);
// 
export default React.memo(Div);