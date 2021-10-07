import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Calender from "./Calender";
import UserChart from "./UserChart";

const LeaderBoard = () => {
  const [friendsList, setFriendsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState("");

  const friendsSteps = [];

  React.useEffect(async () => {
    const userId = await localStorage.getItem("userId");
    const accToken = await localStorage.getItem("acc");
    const getFriends = async () => {
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
          setUser(userId);
        });
    };
    if (userId && accToken) {
      getFriends();
    }
  }, []);
  if (!loading) {
    friendsList.data.forEach((item) => {
      if (item.relationships.user.data.id === user) {
        fetch("/usersteps", {
          method: "POST",
          body: JSON.stringify({
            userId: user,
            steps: item.attributes,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      }
      friendsSteps.push({
        user: item.relationships.user.data.id,
        steps: item.attributes,
      });
    });
  }
  return loading ? (
    <></>
  ) : (
    <FriendsLeaderBoard>
      <HeaderDiv>
        <h1>LeaderBoard</h1>
        <Calender />
      </HeaderDiv>

      <div>
        {friendsList.included.map((friend, index) => {
          if (friend.id !== user) {
            return (
              <MainDiv key={uuidv4()}>
                <img src={friend.attributes.avatar} alt="" />
                <p>
                  {`${index + 1}) `}
                  {friend.attributes.name}
                </p>
                <AverageSteps key={uuidv4()}>
                  {friendsSteps.map((steps) => {
                    if (steps.user === friend.id && steps.steps === undefined) {
                      return (
                        <span key={uuidv4()} className="lazy">
                          Very lazy 0!
                        </span>
                      );
                    } else {
                      if (steps.user === friend.id) {
                        return Math.floor(steps.steps["step-average"]);
                      }
                    }
                  })}{" "}
                  average steps
                </AverageSteps>
                <StepRank key={uuidv4()}>
                  Ranking
                  {friendsSteps.map((steps) => {
                    console.log(steps);
                    if (steps.user === friend.id && steps.steps !== undefined) {
                      return (
                        <span key={uuidv4()}>
                          {Math.floor(steps.steps["step-rank"])}
                        </span>
                      );
                    } else if (
                      steps.user === friend.id &&
                      steps.steps === undefined
                    ) {
                      return (
                        <span key={uuidv4()} className="lazy">
                          -100
                        </span>
                      );
                    }
                  })}
                </StepRank>
              </MainDiv>
            );
          } else {
            return (
              <MainDiv key={uuidv4()}>
                <img src={friend.attributes.avatar} alt="" />

                <UserSteps className="user">
                  {`${index + 1}) `}
                  YOU
                </UserSteps>
                <AverageSteps key={uuidv4()}>
                  {friendsSteps.map((steps) => {
                    if (steps.user === friend.id) {
                      return Math.floor(steps.steps["step-average"]);
                    }
                  })}{" "}
                  average steps
                </AverageSteps>
                <StepRank>
                  Ranking
                  {friendsSteps.map((steps) => {
                    if (steps.user === friend.id) {
                      return (
                        <span key={uuidv4()}>
                          {Math.floor(steps.steps["step-rank"])}
                        </span>
                      );
                    }
                  })}
                </StepRank>
              </MainDiv>
            );
          }
        })}
      </div>
    </FriendsLeaderBoard>
  );
};

const MainDiv = styled.span`
  display: flex;
  margin: 1rem 0rem;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  img {
    width: 5%;
    border-radius: 50%;
    margin-right: 1rem;
  }
  p {
    color: white;
  }
  span {
    color: white;
  }
  .user {
    color: #4e4e50;
  }
`;
const FriendsLeaderBoard = styled.div`
  position: relative;
  text-align: center;
  justify-content: center;
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
  position: fixed;
  right: 60vw;
  top: 10%;
  transform: translateY(50%);
`;

const AverageSteps = styled.p`
  margin-left: 10%;
  .lazy {
    color: red;
    font-size: 1.8rem;
  }
`;

const StepRank = styled(AverageSteps)`
  span {
    margin-left: 1rem;
    font-size: 2rem;
  }
`;

const HeaderDiv = styled.div``;
export default LeaderBoard;
