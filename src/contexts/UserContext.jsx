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
  defaultSearch: "",
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
    case "user/commentToggleRate": {
      if (state.ratedComments.includes(action.payload)) {
        state = {
          ...state,
          ratedComments: state.ratedComments.filter(
            (ratedComment) => ratedComment !== action.payload
          ),
        };
      } else {
        state = {
          ...state,
          ratedComments: [...state.ratedComments, action.payload],
        };
      }
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/storyToggleRate": {
      // if the story already exists in the state, take it off and reduce the rating
      if (state.ratedStories.includes(action.payload)) {
        state = {
          ...state,
          ratedStories: state.ratedStories.filter(
            (ratedStory) => ratedStory !== action.payload
          ),
          stories: [
            ...state.stories.map((story) =>
              story.id === action.payload
                ? { ...story, rating: Number(story.rating) - 1 }
                : story
            ),
          ],
        };
      } else {
        // if the story is NOT in the state, add it and increase the rating
        state = {
          ...state,
          ratedStories: [...state.ratedStories, action.payload],
          stories: [
            ...state.stories.map((story) =>
              story.id === action.payload
                ? { ...story, rating: Number(story.rating) + 1 }
                : story
            ),
          ],
        };
      }
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/storiesReceived": {
      state = {
        ...state,
        stories: [...action.payload],
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/refreshFriends": {
      return { ...state, friends: [...action.payload] };
    }
    case "user/updatedPhoto": {
      state = { ...state, photo: action.payload };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    case "user/logout": {
      return { ...initialState };
    }
    case "search/setDefaultSearch": {
      state = { ...state, defaultSearch: action.payload };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
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
      defaultSearch,
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
        defaultSearch,
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
