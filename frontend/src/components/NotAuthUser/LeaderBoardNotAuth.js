import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
const LeaderBoardNotAuth = () => {
  const [userList, setUserList] = React.useState([]);
  const [userSteps, setUserSteps] = React.useState([]);
  const allUsersData = [];

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accToken = localStorage.getItem("acc");
    const getAllUserSteps = async () => {
      fetch("/usersteps")
        .then((res) => res.json())
        .then((data) => {
          const sortedSteps = data.data.sort((a, b) =>
            a.steps["step-rank"] > b.steps["step-rank"] ? 1 : -1
          );
          setUserSteps(sortedSteps);
        });
    };
    const getAllUser = async () => {
      fetch("/user")
        .then((res) => res.json())
        .then((data) => {
          setUserList(data.data);
        });
    };
    if (!userId && !accToken) {
      getAllUser();
      getAllUserSteps();
    }
  }, []);
  userSteps.forEach((user, index) => {
    allUsersData.push({
      rank: index + 1,
      steps: user,
      attributes: userList[index],
    });
  });

  return (
    <FriendsLeaderBoard>
      <HeaderDiv>
        <h1>Top Users</h1>
      </HeaderDiv>

      <UsersData>
        {userList.map((user, index) => {
          return (
            <MainDiv key={uuidv4()}>
              <img src={user.user.avatar} alt="" />
              <p>
                {`${index + 1}) `}
                {user.user.firstName}
              </p>

              <AverageSteps>
                {userSteps.map((steps) => {
                  if (
                    steps.steps["step-average"] === 0 &&
                    user.userId === steps.userId
                  ) {
                    return (
                      <span key={uuidv4()} className="lazy">
                        Very lazy 0!
                      </span>
                    );
                  } else {
                    if (steps.userId === user.userId) {
                      return Math.floor(steps.steps["step-average"]);
                    }
                  }
                })}{" "}
                average steps
              </AverageSteps>
              <UserID>
                UserID
                {userSteps.map((steps, index) => {
                  if (steps.userId === user.userId) {
                    return <span key={uuidv4()}>{steps.userId}</span>;
                  }
                })}
              </UserID>
            </MainDiv>
          );
        })}
      </UsersData>
    </FriendsLeaderBoard>
  );
};

const UsersData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MainDiv = styled.span`
  display: flex;
  margin: 1rem 0rem;
  text-align: center;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  img {
    width: 5%;
    border-radius: 50%;
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

const AverageSteps = styled.p`
  .lazy {
    color: red;
    font-size: 1.8rem;
  }
`;

const UserID = styled(AverageSteps)`
  span {
    font-size: 2rem;
  }
`;
const HeaderDiv = styled.div``;

export default LeaderBoardNotAuth;
