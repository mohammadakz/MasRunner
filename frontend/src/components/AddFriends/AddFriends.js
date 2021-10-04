import { TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
const accToken = localStorage.getItem("acc");
const AddFriends = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [successReq, setSuccessReq] = React.useState(false);

  //Event handlers
  const firiendReqSubmitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.fitbit.com/1.1/user/-/friends/invitations?invitedUserId=${inputValue}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    ).then(setSuccessReq(true));
  };
  return accToken ? (
    <Wrapper>
      <h1>Working out its more fun with friends!</h1>

      <form onSubmit={firiendReqSubmitHandler}>
        <FriendReqDiv>
          <TextField
            InputProps={{ style: { fontSize: "1.4rem" } }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="userId"
          />

          <button>Send Request</button>
        </FriendReqDiv>
      </form>

      {successReq ? <div>Friend request send!</div> : ""}
    </Wrapper>
  ) : (
    ""
  );
};
const Wrapper = styled.div`
  font-size: 3rem;
`;
const FriendReqDiv = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  display: flex;
  button {
    background: white;
    border: none;
    color: #2cbd2c;
    border-radius: 0.5rem;
    margin-left: 1rem;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.2s ease-in all;
    &:hover {
      background: #2cbd2c;
      color: white;
    }
  }
`;

export default AddFriends;
