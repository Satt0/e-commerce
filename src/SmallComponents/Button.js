import React from "react";
import styled from "styled-components";
const Title = styled.p`
  text-align: center;
  color:${props=>props.theme.color};
`;

const Wrapper = styled.button`
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width:${props=>props.theme.width};
  height:${props=>props.theme.height};
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export default function Button({ onClick, title ,theme }) {
  
  return (
    <Wrapper onClick={onClick} theme={theme}>
      <Title theme={theme}>{title}</Title>
    </Wrapper>
  );
}
