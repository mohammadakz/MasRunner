import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <StyledTitle>MasRunner</StyledTitle>
      <p>Exercise because you love your body</p>
      <StyledButton>Log in</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 10vh;
  width: 100vw;
`;

const StyledTitle = styled.h1`
  font-size: 2.4rem;
  color: #308af1;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

const StyledButton = styled.button`
  color: #308af1;
  font-family: var(--font-heading);
  font-size: 1.8rem;
  text-align: center;
  border: 0.2rem solid #308af1;
  border-radius: 0.5rem;
  background: none;
  cursor: pointer;
  &:hover {
    background: #308af1;
    color: white;
    transition: 0.2s ease-in-out all;
  }
`;
export default Header;
