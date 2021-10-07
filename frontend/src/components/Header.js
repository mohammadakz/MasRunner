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
    loginUser(!login);
    if (login === false) {
      window.location.replace(
        "https://www.fitbit.com/oauth2/authorize?client_id=23BCTT&redirect_uri=http://localhost:3000&response_type=code&scope=activity+nutrition+heartrate+location+nutrition+profile+settings+sleep+social+weight&state&prompt=none"
      );
    } else {
      window.localStorage.removeItem("acc");
      window.localStorage.removeItem("userId");
      window.location.reload();
    }
  };

  React.useEffect(() => {
    const acc = localStorage.getItem("acc");
    if (acc) {
      loginUser(true);
    }
  }, []);

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
  background: #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5vh;
  width: 100vw;
  p {
    font-size: 2.5rem;
  }
`;

const StyledTitle = styled.h1`
  font-size: 2.4rem;
  color: #950740;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

const StyledButton = styled.button`
  color: #950740;
  font-family: var(--font-heading);
  font-size: 1.8rem;
  text-align: center;
  border: 0.2rem solid #950740;
  border-radius: 0.5rem;
  background: none;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background: #950740;
    color: white;
    transition: 0.2s ease-in-out all;
  }
`;

const StyledIcon = styled(FiLogIn)`
  vertical-align: middle;
  padding: 0rem 0.5rem;
`;
export default Header;
