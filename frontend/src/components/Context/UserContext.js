import React from "react";

export const LoggedinContext = React.createContext();

const initialState = {
  login: false,
  friendsList: [],
  pastLocation: [],
  walkPerDay: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedin": {
      return {
        ...state,
        login: true,
      };
    }
    case "friends-list": {
      return {
        ...state,
        friendsList: action.friends,
      };
    }
    case "get-path": {
      return {
        ...state,
        pastLocation: action.path,
      };
    }
    case "day-walk": {
      return {
        ...state,
        walkPerDay: action.walk,
      };
    }
    default: {
      return;
    }
  }
}

export const LoggedInProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //Functions
  const loginUser = (login) => {
    dispatch({ type: "loggedin", login });
  };
  const getFriends = (friends) => {
    dispatch({ type: "friends-list", friends });
  };
  const getPath = (path) => {
    dispatch({ type: "get-path", path });
  };
  const getWalkPerDay = (walk) => {
    dispatch({ type: "day-walk", walk });
  };

  return (
    <LoggedinContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          getFriends,
          getPath,
          getWalkPerDay,
        },
      }}
    >
      {children}
    </LoggedinContext.Provider>
  );
};
