/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
// 
const Circle=motion(styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:${props=>props.size};
    padding:${props=>props.padding?props.padding:'0'};
    margin:${props=>props.margin?props.margin:'0'};
    color:${props=>props.color};
    width: ${props=>props.radius};
    height: ${props=>props.radius};
    background:${props=>props.background};
    border-radius: 50%;
    z-index:${props=>props.index};
    border:${props=>props.border};
    cursor: ${props=>props.cursor};
    position:${props=>props.position};
    right:${props=>props.right};
    bottom:${props=>props.bottom};
    left: ${props=>props.left};
    top: ${props=>props.top};
 `);
// 

export default React.memo(Circle);