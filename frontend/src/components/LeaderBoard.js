import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Calender from "./Calender";
import UserChart from "./UserChart";

const LeaderBoard = () => {
  const [friendsList, setFriendsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const userId = localStorage.getItem("userId");
  const accToken = localStorage.getItem("acc");
  const FriendsSteps = [];
  React.useEffect(() => {
    if (userId && accToken) {
      fetch(
        `https://api.fitbit.com/1.1/user/${userId}/leaderboard/friends.json`,
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFriendsList(data);
          setLoading(false);
        });
    }
  }, []);

  if (!loading) {
    friendsList.data.map((item) => {
      FriendsSteps.push({
        user: item.relationships.user.data.id,
        steps: item.attributes,
      });
    });
  }
  return loading ? (
    <div>Loading</div>
  ) : (
    <FriendsLeaderBoard>
      <h1>Leader Board</h1>
      <Calender />

      <div>
        {friendsList.included.map((friend, index) => {
          if (friend.id !== userId) {
            return (
              <MainDiv key={uuidv4()}>
                <img src={friend.attributes.avatar} alt="" />
                <p>
                  {`${index + 1}) `}
                  {friend.attributes.name}
                </p>
                <AverageSteps>
                  {FriendsSteps.map((steps) => {
                    if (steps.user === friend.id) {
                      return Math.floor(steps.steps["step-average"]);
                    }
                  })}{" "}
                  average steps
                </AverageSteps>
              </MainDiv>
            );
          } else {
            return (
              <MainDiv key={uuidv4()}>
                <img src={friend.attributes.avatar} alt="" />

                <UserSteps>
                  {`${index + 1}) `}
                  YOU
                </UserSteps>
                <AverageSteps>
                  {FriendsSteps.map((steps) => {
                    if (steps.user === friend.id) {
                      return Math.floor(steps.steps["step-average"]);
                    }
                  })}{" "}
                  average steps
                </AverageSteps>
              </MainDiv>
            );
          }
        })}
      </div>
      <ChartDiv>
        <UserChart />
      </ChartDiv>
    </FriendsLeaderBoard>
  );
};

const MainDiv = styled.span`
  display: flex;
  margin: 1rem 0rem;
  img {
    width: 5%;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;
const FriendsLeaderBoard = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h1 {
    font-size: 3rem;
    font-style: oblique;
    padding-bottom: 2rem;
  }
  p {
    padding-top: 2rem;
  }
`;

const UserSteps = styled.p`
  color: #1db124;
  font-weight: bold;
`;

const ChartDiv = styled.div`
  position: absolute;
  right: 5%;
  top: 30%;
  transform: translateY(50%);
`;

const AverageSteps = styled.p`
  margin-left: 10%;
`;
export default LeaderBoard;
