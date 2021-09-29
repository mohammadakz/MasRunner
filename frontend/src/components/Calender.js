import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Calender = () => {
  return (
    <StyledCalender>
      <h3>Select a date</h3>
      <TextField
        id="date"
        type="date"
        // defaultValue="2017-05-24"
        inputProps={{ style: { fontSize: 12} }} // font size of input text
        InputLabelProps={{
          shrink: true,
        }}
      />
    </StyledCalender>
  );
};

const StyledCalender = styled.div`
  font-size: 2rem;
`;

export default Calender;
