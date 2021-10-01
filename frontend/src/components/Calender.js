import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Calender = ({ date, setDate }) => {
  const handleChangeDate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDate(e.target.value);
  };
  return (
    <StyledCalender>
      <h3>Select a date</h3>
      <TextField
        onChange={handleChangeDate}
        defaultValue={date}
        id="date"
        type="date"
        inputProps={{ style: { fontSize: 12 } }}
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
