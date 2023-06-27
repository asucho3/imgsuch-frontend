const URL = `http://127.0.0.1:3000/api/v1`;
const SERVER_URL = `http://127.0.0.1:3000`;

// const testCookie = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTIwZjBmMDZhNDM2MDZjMGNhNWRhYyIsImlhdCI6MTY4NzU0NTY0MiwiZXhwIjoxNjk1MzIxNjQyfQ.55w-gJMBrM1QPsJwnBQdsApZCvacd6D6pCHXNfxHZ2c`;

// const testUsr = `test@example.com`;
// const testPass = `test1234`;

// auth

export const signup = async function (email, name, password, passwordConfirm) {
  const auth = JSON.stringify({
    email,
    name,
    password,
    passwordConfirm,
  });
  const res = await fetch(`${URL}/users/signup`, {
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
  const res = await fetch(`${URL}/users/isLoggedIn`, {
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
  const res = await fetch(`${URL}/users/login`, {
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
  const res = await fetch(`${URL}/users/logout`, {
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
  const res = await fetch(`${URL}/users/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: auth,
  });
  const data = await res.json();
  return data;
};

export const resetPassword = async function (password, passwordConfirm) {
  const auth = JSON.stringify({
    password,
    passwordConfirm,
  });
  const res = await fetch(`${URL}/users/resetPassword`, {
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
  const res = await fetch(`${URL}/users/updatePassword`, {
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
  const res = await fetch(`${URL}/users/${id}/disableUser`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// user
export const sendFriendRequest = async function (target) {
  const res = await fetch(`${URL}/users/${target}/sendFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const updateProfile = async function (id, updatedProfile) {
  const res = await fetch(`${URL}/users/${id}/updateProfile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProfile),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const cancelFriendRequest = async function (target) {
  const res = await fetch(`${URL}/users/${target}/cancelFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const acceptFriendRequest = async function (target) {
  const res = await fetch(`${URL}/users/${target}/acceptFriendRequest`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const createStory = async function (newStory) {
  const res = await fetch(`${URL}/users/createStory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStory),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getMyStories = async function () {
  const res = await fetch(`${URL}/users/getMyStories`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const removeFriend = async function (target) {
  const res = await fetch(`${URL}/users/${target}/removeFriend`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getFriends = async function () {
  const res = await fetch(`${URL}/users/getFriends`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getFriendsStories = async function () {
  const res = await fetch(`${URL}/users/getFriendsStories`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getAllUsers = async function () {
  const res = await fetch(`${URL}/users`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// stories
export const addComment = async function (target, newComment) {
  const res = await fetch(`${URL}/stories/${target}/addComment`, {
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
  const res = await fetch(`${URL}/stories/${target}/getComments`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const updateStory = async function (target, updatedStory) {
  const res = await fetch(`${URL}/stories/${target}/updateStory`, {
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
  const res = await fetch(`${URL}/stories/${target}/disableStory`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getStory = async function (target) {
  const res = await fetch(`${URL}/stories/${target}/getStory`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getUserStories = async function (target) {
  const res = await fetch(`${URL}/users/${target}/getUserStories`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const toggleRateStory = async function (target) {
  const res = await fetch(`${URL}/stories/${target}/toggleRateStory`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// comments
export const updateComment = async function (target, updatedComment) {
  const res = await fetch(`${URL}/comments/${target}/updateComment`, {
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
  const res = await fetch(`${URL}/comments/${target}/toggleRateComment`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const disableComment = async function (target) {
  const res = await fetch(`${URL}/comments/${target}/disableComment`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export { URL, SERVER_URL };
