![imgsuch logo](https://imgsuch.netlify.app/img/apple-touch-icon.png)

# Front-end for the imgsuch social network

imgSuch is a social network app where you can add friends, share stories, images & memories; rate your favorite content and keep in touch with people that you find interesting.

This is an important component of my portfolio, showcasing the usage of React Functional Components, hooks, the Context API coupled with the useReducer hook to manage UI state.
It makes use of several API requests to the backend; all these requests are grouped on the apiCalls.js file.

# Technologies used

- React (with hooks)
- Context API+useReducer to manage global state
- CSS Modules

# How to Install and Run the Project

- install dependencies

```
npm i
```

you'll need to run the [backend](https://github.com/asucho3/imgsuch) locally

- in the file apiCalls.js, comment out:

```
const SERVER_URL = `https://imgsuch.onrender.com`; // PRODUCTION
```

- and remove the comments (ie. enable):

```
const SERVER_URL = `http://127.0.0.1:3000`; // DEVELOPMENT
```

- finally:

```
npm run dev
```
