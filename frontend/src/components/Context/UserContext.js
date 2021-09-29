import React from "react";

export const LoggedinContext = React.createContext();

const initialState = {
  login: false,
  friendsList: [],
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

  return (
    <LoggedinContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          getFriends,
        },
      }}
    >
      {children}
    </LoggedinContext.Provider>
  );
};
