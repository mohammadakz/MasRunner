import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Header from "./Header";
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-blue);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

export default App;
