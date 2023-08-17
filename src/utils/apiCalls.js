const SERVER_URL = `https://imgsuch.onrender.com`; // PRODUCTION
// const SERVER_URL = `http://127.0.0.1:3000`; // DEVELOPMENT
const API_URL = `${SERVER_URL}/api/v1`;
const testEmail = `testuser@example.com`;
const testPassword = `test1234`;

// auth

export const signup = async function (email, name, password, passwordConfirm) {
  const auth = JSON.stringify({
    email,
    name,
    password,
    passwordConfirm,
  });
  const res = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const checkLoggedIn = async function () {
  const res = await fetch(`${API_URL}/users/isLoggedIn`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  return data;
};

export const login = async function (email, password) {
  const auth = JSON.stringify({
    email,
    password,
  });
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const quickLogin = async function () {
  const auth = JSON.stringify({
    email: testEmail,
    password: testPassword,
  });
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const logout = async function () {
  const res = await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const forgotPassword = async function (email) {
  const auth = JSON.stringify({
    email,
  });
  const res = await fetch(`${API_URL}/users/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
  });
  const data = await res.json();
  return data;
};

export const resetPassword = async function (password, passwordConfirm, token) {
  const auth = JSON.stringify({
    password,
    passwordConfirm,
  });
  const res = await fetch(`${API_URL}/users/resetPassword/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
  });
  const data = await res.json();
  return data;
};

export const changePassword = async function (
  passwordCurrent,
  password,
  passwordConfirm
) {
  const auth = JSON.stringify({
    passwordCurrent,
    password,
    passwordConfirm,
  });
  const res = await fetch(`${API_URL}/users/updatePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const disableUser = async function (id) {
  const res = await fetch(`${API_URL}/users/${id}/disableUser`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// user
export const sendFriendRequest = async function (target) {
  const res = await fetch(`${API_URL}/users/${target}/sendFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const updateProfile = async function (id, updatedProfile) {
  const res = await fetch(`${API_URL}/users/${id}/updateProfile`, {
    method: "PATCH",
    body: updatedProfile,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const cancelFriendRequest = async function (target) {
  const res = await fetch(`${API_URL}/users/${target}/cancelFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const acceptFriendRequest = async function (target) {
  const res = await fetch(`${API_URL}/users/${target}/acceptFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const createStory = async function (newStory) {
  const res = await fetch(`${API_URL}/users/createStory`, {
    method: "POST",
    //headers option should not be used here because using FormData interface
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: newStory,
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getMyStories = async function () {
  const res = await fetch(`${API_URL}/users/getMyStories`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const removeFriend = async function (target) {
  const res = await fetch(`${API_URL}/users/${target}/removeFriend`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getFriends = async function () {
  const res = await fetch(`${API_URL}/users/getFriends`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getFriendsStories = async function () {
  const res = await fetch(`${API_URL}/users/getFriendsStories`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getAllUsers = async function () {
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// stories
export const addComment = async function (target, newComment) {
  const res = await fetch(`${API_URL}/stories/${target}/addComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getComments = async function (target) {
  const res = await fetch(`${API_URL}/stories/${target}/getComments`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const updateStory = async function (target, updatedStory) {
  const res = await fetch(`${API_URL}/stories/${target}/updateStory`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStory),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const disableStory = async function (target) {
  const res = await fetch(`${API_URL}/stories/${target}/disableStory`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getStory = async function (target) {
  const res = await fetch(`${API_URL}/stories/${target}/getStory`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getUserStories = async function (target) {
  const res = await fetch(`${API_URL}/users/${target}/getUserStories`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const toggleRateStory = async function (target) {
  const res = await fetch(`${API_URL}/stories/${target}/toggleRateStory`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// comments
export const updateComment = async function (target, updatedComment) {
  const res = await fetch(`${API_URL}/comments/${target}/updateComment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedComment),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const toggleRateComment = async function (target) {
  const res = await fetch(`${API_URL}/comments/${target}/toggleRateComment`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const disableComment = async function (target) {
  const res = await fetch(`${API_URL}/comments/${target}/disableComment`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export { API_URL, SERVER_URL };
