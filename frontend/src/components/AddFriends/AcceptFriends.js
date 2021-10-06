import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { LoggedinContext } from "../Context/UserContext";
const AcceptFriends = () => {
  const {
    state: { login },
  } = React.useContext(LoggedinContext);
  const [friendReqList, setFriendReqList] = React.useState([]);
  const accToken = localStorage.getItem("acc");
  const acceptHandler = (e, id) => {
    fetch(
      `https://api.fitbit.com/1.1/user/-/friends/invitations/${id}?accept=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    );
    window.location.reload();
  };

  const rejectHandler = (e, id) => {
    fetch(
      `https://api.fitbit.com/1.1/user/-/friends/invitations/${id}?accept=false`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    );
    window.location.reload();
  };

  //Get all friend Req
  React.useEffect(() => {
    fetch("https://api.fitbit.com/1.1/user/-/friends/invitations.json", {
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFriendReqList(data.included));
  }, []);

  return login ? (
    <>
      <Wrapper>
        <h1>List of Friend Requests</h1>
        {friendReqList !== undefined ? (
          <StyledAccRejButton>
            {friendReqList.map((requests, index) => {
              return (
                <MainDiv key={uuidv4()}>
                  <NameDiv>
                    <img src={requests.attributes.avatar} alt="" />
                    <p>{requests.attributes.name}</p>
                  </NameDiv>

                  <button
                    className="acc"
                    onClick={(e) => {
                      acceptHandler(e, requests.id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      rejectHandler(e, requests.id);
                    }}
                  >
                    Reject
                  </button>
                </MainDiv>
              );
            })}
          </StyledAccRejButton>
        ) : (
          <Notification>
            You dont have any pending friend requests!
          </Notification>
        )}
      </Wrapper>
    </>
  ) : (
    <LoginState>MasRunner is more fun with friends (╯°□°）╯︵ ┻━┻</LoginState>
  );
};

const LoginState = styled.div`
  text-align: center;
  padding-top: 4rem;
  font-size: 3rem;
`;
const MainDiv = styled.div`
  display: flex;
`;

const NameDiv = styled.div`
  img {
    width: 30%;
    border-radius: 50%;
  }
`;
const Wrapper = styled.div`
  font-size: 3rem;
  display: flex;
  flex-direction: column;
`;
const StyledAccRejButton = styled.div`
  padding: 2rem 1rem;
  button {
    transition: 0.2s ease-in all;
    margin-left: 2rem;
    border: none;
    padding: 1.4rem 1.5rem;
    cursor: pointer;
    color: red;
    background: white;
    border: 0.2rem solid #a13030;
    border-radius: 0.5rem;
    &:hover {
      background: #a13030;
      color: white;
    }
  }
  .acc {
    color: green;
    background: white;
    border: 0.2rem solid lightgreen;
    border-radius: 0.5rem;
    &:hover {
      background: #2cbd2c;
      color: white;
    }
  }
  span {
    font-size: 2rem;
  }
`;

const Notification = styled.p`
  padding-top: 4rem;
`;
export default AcceptFriends;
