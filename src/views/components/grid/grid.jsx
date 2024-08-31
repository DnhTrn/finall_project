/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";
// 
const Grid= motion(styled.div`
    display: grid;
    grid-template-columns: ${props=>props.columns};
    grid-template-rows: ${props=>props.rows};
    position: ${props=>props.position};
    align-items: ${props=>props.align};
    justify-content: ${props=>props.justify};
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding: ${props=>props.padding};
    margin: ${props=>props.margin};
    background: ${props=>props.background};
    box-shadow: ${props=>props.shadow};
    font-size: ${props=>props.fontSize};
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
    z-index: ${props=>props.index};
    cursor: ${props=>props.cursor};
    box-shadow: ${props=>props.shadow};
    overflow:${props=>props.overflow} /*hidden; Đảm bảo text không tràn ra ngoài */
    &:hover {
        ${props=>props.hover}
    }
`);
// 
export default React.memo(Grid);