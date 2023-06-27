import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const initialState = {
  disabled: false,
  email: "",
  friends: [],
  friendsRequestsReceived: [],
  friendsRequestsSent: [],
  id: null,
  ignoreList: [],
  name: "",
  photo: "",
  ratedComments: [],
  ratedStories: [],
  rating: 0,
  role: "user",
  stories: [],
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/loginSuccess": {
      state = { ...state, ...action.payload, isAuthenticated: true };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/isLoggedIn": {
      const oldState = JSON.parse(localStorage.getItem("user"));
      return { ...oldState, isAuthenticated: true };
    }
    case "user/friendRequestSent": {
      state = {
        ...state,
        friendsRequestsSent: [...state.friendsRequestsSent, action.payload],
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/cancelFriendRequest": {
      state = {
        ...state,
        friendsRequestsSent: [
          ...state.friendsRequestsSent.filter(
            (request) => request !== action.payload
          ),
        ],
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/acceptFriendRequest": {
      state = {
        ...state,
        friends: [...state.friends, action.payload],
        friendsRequestsSent: [
          ...state.friendsRequestsSent.filter(
            (request) => request !== action.payload
          ),
        ],
        friendsRequestsReceived: [
          ...state.friendsRequestsReceived.filter(
            (request) => request !== action.payload
          ),
        ],
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/removeFriend": {
      state = {
        ...state,
        friends: [
          ...state.friends.filter((friend) => friend !== action.payload),
        ],
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/refreshFriends": {
      return { ...state, friends: [...action.payload] };
    }
    case "user/logout": {
      return { ...initialState };
    }
    case "user/loginFailure": {
      return { ...state };
    }
    default:
      return state;
  }
}

const UserProvider = function ({ children }) {
  const [
    {
      disabled,
      email,
      friends,
      friendsRequestsReceived,
      friendsRequestsSent,
      id,
      ignoreList,
      name,
      photo,
      ratedComments,
      ratedStories,
      rating,
      role,
      stories,
      isAuthenticated,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        disabled,
        email,
        friends,
        friendsRequestsReceived,
        friendsRequestsSent,
        id,
        ignoreList,
        name,
        photo,
        ratedComments,
        ratedStories,
        rating,
        role,
        stories,
        dispatch,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = function () {
  const context = useContext(UserContext);
  return context;
};

export { UserProvider, useUser };
