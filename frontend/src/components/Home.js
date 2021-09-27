import React from "react";
import styled from "styled-components";
const Home = () => {
  return (
    <Wrapper>
      <MainDiv>
        <StyledLeaderBoard>
          <h2>Leader board</h2>
        </StyledLeaderBoard>
        <StyledTopPaths>
          <h2>Top Paths</h2>
        </StyledTopPaths>
      </MainDiv>
      <StyledMap>
        <h2>This will be the map</h2>
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
  flex: 1;
  font-size: 2.8rem;
  height: 40vh;
  background: white;
  border: 10px solid blue;
  margin: 2rem 2rem;
`;

const StyledTopPaths = styled(StyledLeaderBoard)`
  grid-column: 1/2;
  grid-row: 2/3;
`;

const StyledMap = styled.div`
  flex: 1;
  font-size: 2.8rem;
  height: 80vh;
  background: white;
  border: 10px solid blue;
  margin: 2rem 2rem;
`;
export default Home;
