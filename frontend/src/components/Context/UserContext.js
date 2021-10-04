import React from "react";
import moment from "moment";
const todayDate = moment(new Date()).format("YYYY-MM-DD");

export const LoggedinContext = React.createContext();
const initialState = {
  login: false,
  friendsList: [],
  pastLocation: [],
  walkPerDay: [],
  selectedDate: todayDate,
  selectedActivityLogs: [],
  selectedActivityLogsDate: [],
  loading: null,
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
    case "selected-date": {
      return {
        ...state,
        selectedDate: action.date,
      };
    }
    case "activity-log": {
      return {
        ...state,
        selectedActivityLogs: action.logArray,
      };
    }
    case "log-date": {
      return {
        ...state,
        selectedActivityLogsDate: action.dateArray,
      };
    }

    case "loading": {
      return {
        ...state,
        loading: action.load,
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

  const getDate = (date) => {
    dispatch({ type: "selected-date", date });
  };

  const getActivityLog = (logArray) => {
    dispatch({ type: "activity-log", logArray });
  };

  const getLogDate = (dateArray) => {
    dispatch({ type: "log-date", dateArray });
  };

  const setLoading = (load) => {
    dispatch({ type: "loading", load });
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
          getDate,
          getActivityLog,
          getLogDate,
          setLoading,
        },
      }}
    >
      {children}
    </LoggedinContext.Provider>
  );
};
