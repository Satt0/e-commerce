import React from "react";
import styled from "styled-components";


const Wrapper = styled.button`
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color:${props=>props.theme.color};
  width: ${(props) => props.theme.width};
  background-color: ${(props) => props.theme.bgColor};
  transition: 0.4s all;
  height: ${(props) => props.theme.height};
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export default function Button({ onClick, title, theme}) {
  
  return (
    <Wrapper onClick={onClick} theme={theme}>
      {title}
    </Wrapper>
  );
}
