import React from "react";
import styled from "styled-components";
import { LoggedinContext } from "./Context/UserContext";
import { FiLogIn } from "react-icons/fi";
const Header = () => {
  const {
    state: { login },
    actions: { loginUser },
  } = React.useContext(LoggedinContext);
  const clickHandler = () => {
    if (login === false) {
      window.location.replace(
        "https://www.fitbit.com/oauth2/authorize?client_id=23BCTT&redirect_uri=http://localhost:3000&response_type=token&scope=activity+nutrition+heartrate+location+nutrition+profile+settings+sleep+social+weight&state"
      );
    }

    loginUser(true);
    console.log("test");
  };

  return (
    <Wrapper>
      <StyledTitle>MasRunner</StyledTitle>
      <p>Exercise because you love your body</p>

      <StyledButton onClick={clickHandler}>
        <StyledIcon />
        {login ? "LogOut" : "Log in"}
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5vh;
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
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background: #308af1;
    color: white;
    transition: 0.2s ease-in-out all;
  }
`;

const StyledIcon = styled(FiLogIn)`
  vertical-align: middle;
  padding: 0rem 0.5rem;
`;
export default Header;
