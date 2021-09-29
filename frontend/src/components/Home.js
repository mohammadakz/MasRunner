import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { LoggedinContext } from "./Context/UserContext";
import LeaderBoard from "./LeaderBoard";
import Example from "./Calender";
const Home = () => {
  const history = useHistory();
  const {
    actions: { loginUser },
  } = React.useContext(LoggedinContext);
  React.useEffect(() => {
    if (window.location.hash) {
      const accToken = window.location.hash.split("&")[0].slice(14);
      window.localStorage.setItem("acc", accToken);

      fetch("https://api.fitbit.com/1/user/-/profile.json", {
        headers: { Authorization: `Bearer ${accToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          window.localStorage.setItem("userId", data.user.encodedId);
          fetch("/user", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
        });
    }
    history.push("/");
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("acc") !== "") {
      loginUser(true);
    }
  }, []);

  return (
    <Wrapper>
      <MainDiv>
        <StyledLeaderBoard>
          <LeaderBoard />
        </StyledLeaderBoard>
        <StyledTopPaths>
          <h2>Top Paths</h2>
        </StyledTopPaths>
      </MainDiv>
      <StyledMap>
        <h2>This will be the map</h2>
      </StyledMap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: baseline;
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
`;

const StyledLeaderBoard = styled.div`
  border-radius: 5rem;
  flex: 1;
  font-size: 2.8rem;
  height: 40vh;
  background: #e0e0e0;
  margin: 2rem 2rem;
  overflow: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTopPaths = styled(StyledLeaderBoard)`
  grid-column: 1/2;
  grid-row: 2/3;
`;

const StyledMap = styled.div`
  flex: 1;
  font-size: 2.8rem;
  height: 80vh;
  background: #e0e0e0;
  margin: 2rem 2rem;
`;
export default Home;
