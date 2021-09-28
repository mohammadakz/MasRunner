import React from "react";

export const LoggedinContext = React.createContext();

const initialState = {
  login: false,
  userInfo: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedin": {
      return {
        ...state,
        login: true,
      };
    }
    case "userdata": {
      return {
        ...state,
        userInfo: action.userData,
      };
    }
  }
}

export const LoggedInProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //Functions
  const loginUser = (login) => {
    dispatch({ type: "loggedin", login });
  };
  const getUserInfo = (userData) => {
    dispatch({ type: "userdata", userData });
  };

  return (
    <LoggedinContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          getUserInfo,
        },
      }}
    >
      {children}
    </LoggedinContext.Provider>
  );
};
