import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Input = motion(styled.input`
  background: ${props => props.background};
  width: ${props => props.width};
  font-size: ${props => props.size};
  color: ${props => props.color};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  border: ${props => props.border};
  border-radius: ${props => props.radius};
  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 10px ${props => props.background} inset;
    box-shadow: 0 0 0 1000px ${props => props.background} inset;
    -webkit-text-fill-color: ${props => props.color}; /* Màu chữ sau khi autofill */
  }
`);

export default React.memo(Input);