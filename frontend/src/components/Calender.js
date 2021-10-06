import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { LoggedinContext } from "./Context/UserContext";
const Calender = () => {
  const [date, setDate] = React.useState("");
  const {
    state: { selectedDate },
    actions: { getDate },
  } = React.useContext(LoggedinContext);

  return (
    <MainDiv>
      <StyledCalender>
        <h3>Select a date</h3>
        <TextField
          onChange={(e) => {
            setDate(e.target.value);
          }}
          defaultValue={selectedDate}
          id="date"
          type="date"
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </StyledCalender>
      <StyledButton
        onClick={() => {
          getDate(date);
        }}
      >
        Search
      </StyledButton>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  padding: 2rem 1rem;
`;
const StyledCalender = styled.div`
  font-size: 2rem;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  color: lightblue;
  background: #585858;
  cursor: pointer;
`;
export default Calender;
