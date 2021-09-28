import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { LoggedinContext } from "./Context/UserContext";
import LeaderBoard from "./LeaderBoard";

const Home = () => {
  const history = useHistory();
  const {
    state: { userInfo },
    actions: { loginUser, getUserInfo },
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
  flex: 1;
  font-size: 2.8rem;
  height: 40vh;
  background: white;
  border: 10px solid blue;
  margin: 2rem 2rem;
`;

const StyledTopPaths = styled(StyledLeaderBoard)`
  grid-column: 1/2;
  grid-row: 2/3;
`;

const StyledMap = styled.div`
  flex: 1;
  font-size: 2.8rem;
  height: 80vh;
  background: white;
  border: 10px solid blue;
  margin: 2rem 2rem;
`;
export default Home;

// "#access_token=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0JDVFQiLCJzdWIiOiI5TEdESjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjMyODU2OTEwLCJpYXQiOjE2MzI3NzQ4OTR9.5-sRdPrxcpnLBCivska6Yt4KvhjM1wjY6ESyrRmz_m4&user_id=9LGDJ3&scope=settings+activity+profile+heartrate+location+sleep+nutrition+social+weight&token_type=Bearer&expires_in=82016"
