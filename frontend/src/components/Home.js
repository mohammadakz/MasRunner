import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { LoggedinContext } from "./Context/UserContext";
import LeaderBoard from "./LeaderBoard";
import Map from "./UserLocation/Map";
import UserActivities from "./UserLocation/UserActivities";
import UserLocation from "./UserLocation/UserLocation";
import AddFriends from "./AddFriends/AddFriends";
import AcceptFriends from "./AddFriends/AcceptFriends";
const Home = () => {
  const history = useHistory();
  const {
    actions: { loginUser },
  } = React.useContext(LoggedinContext);
  React.useEffect(() => {
    if (window.location.hash) {
      const accToken = window.location.hash.split("&")[0].slice(14);
      window.localStorage.setItem("acc", accToken);

      const getUserProfile = async () => {
        await fetch("https://api.fitbit.com/1/user/-/profile.json", {
          headers: { Authorization: `Bearer ${accToken}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (accToken) {
              window.localStorage.setItem("userId", data.user.encodedId);
            }
            fetch("/user", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
          });
      };
      loginUser(true);
      getUserProfile();
    }
    history.push("/");
  }, []);

  return (
    <Wrapper>
      <UserActivities />
      <UserLocation />
      <MainDiv>
        <StyledLeaderBoard>
          <LeaderBoard />
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
