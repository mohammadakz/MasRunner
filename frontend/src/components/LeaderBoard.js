import React from "react";
import { LoggedinContext } from "./Context/UserContext";

const LeaderBoard = () => {
  const {
    state: { login },
  } = React.useContext(LoggedinContext);
  React.useEffect(() => {
    // fetch()
  }, []);
  return (
    <>
      {login ? (
        <div>
          <h1>text</h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default LeaderBoard;
