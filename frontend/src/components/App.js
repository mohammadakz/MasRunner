import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
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
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
