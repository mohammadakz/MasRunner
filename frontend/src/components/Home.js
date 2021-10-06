import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import Map from "./UserLocation/Map";
import UserActivities from "./UserLocation/UserActivities";
import UserLocation from "./UserLocation/UserLocation";
import AddFriends from "./AddFriends/AddFriends";
import AcceptFriends from "./AddFriends/AcceptFriends";
import LeaderBoardNotAuth from "./NotAuthUser/LeaderBoardNotAuth";
import { LoggedinContext } from "./Context/UserContext";

const Home = () => {
  const {
    state: { login },
    actions: { loginUser },
  } = React.useContext(LoggedinContext);
  const history = useHistory();
  let accToken;
  let userId;
  React.useEffect(() => {
    if (window.location.href.includes("#")) {
      const href = window.location.href.split("?")[1];
      const accCode = href.slice(5).split("#")[0];

      const getUserProfile = async () => {
        await fetch("https://api.fitbit.com/1/user/-/profile.json", {
          headers: { Authorization: `Bearer ${accToken}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (accToken) {
              userId = data.user.encodedId;
              window.localStorage.setItem("userId", data.user.encodedId);
            }
            fetch("/user", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }).then(() => loginUser(true));
          });
      };

      fetch(
        `https://api.fitbit.com/oauth2/token?code=${accCode}&grant_type=authorization_code&redirect_uri=http://localhost:3000`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic MjNCQ1RUOjU1MzRjNzczMTU3MzM5ZjQ5MzY1YWYzNDlmNzFlM2Rm",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          accToken = data.access_token;
          localStorage.setItem("acc", accToken);
        })
        .then(() => getUserProfile());
    }
    history.push("/");
    console.log("login", login);
  }, []);
  return (
    <Wrapper>
      <UserActivities />
      <UserLocation />
      <MainDiv>
        <StyledLeaderBoard>
          {login ? <LeaderBoard /> : <LeaderBoardNotAuth />}
        </StyledLeaderBoard>
        <SendFriendReq>
          <AddFriends />
          <AcceptFriends />
        </SendFriendReq>
      </MainDiv>
      <StyledMap>
        <Map />
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

const SendFriendReq = styled.div`
  /* h1 {
    font-size: 3rem;
  } */
  display: flex;
  justify-content: space-around;
  padding: 2rem 0rem;
  border-radius: 5rem;
  font-size: 2.8rem;
  text-align: center;
  height: 40vh;
  background: #e0e0e0;
  margin: 2rem 2rem;
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledMap = styled.div`
  border-radius: 5rem;
  height: 80vh;
  flex: 1;
  font-size: 2.8rem;
  background: #e0e0e0;
  margin: 2rem 2rem;
`;
export default Home;
