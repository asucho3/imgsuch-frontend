import styles from "./Login.module.css";
import { login as apiLogin, checkLoggedIn } from "../utils/apiCalls";
import { signup as apiSignup } from "../utils/apiCalls";
import { forgotPassword as apiForgotPassword } from "../utils/apiCalls";
import { resetPassword as apiResetPassword } from "../utils/apiCalls";
import { quickLogin as apiQuickLogin } from "../utils/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Logo from "../components/Nav/Logo";
import Input from "../components/General/Input";
import Button from "../components/General/Button";
import ActionText from "../components/General/ActionText";
import Alert from "../components/General/Alert";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState("");
  const [signup, setSignup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState("");
  const { isAuthenticated, dispatch } = useUser();
  const navigate = useNavigate();
  const [checkAuth, setCheckAuth] = useState(false);

  // check if the user is already logged in
  // useEffect(
  //   function () {
  //     async function isLoggedIn() {
  //       try {
  //         setCheckAuth(true);
  //         const data = await checkLoggedIn();
  //         if (data.status === "success") {
  //           dispatch({ type: "user/isLoggedIn" });
  //           navigate("/app");
  //         } else {
  //           // dispatch({ type: "user/logout" });
  //           navigate("/");
  //         }
  //         setCheckAuth(false);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     isLoggedIn();
  //   },
  //   [dispatch, navigate, setCheckAuth]
  // );

  // handle login, signup and forgotten pasword
  async function handleLogin(e) {
    try {
      e.preventDefault();
      setProcessing(true);
      const res = await apiLogin(email, password);
      if (res.status === "success") {
        dispatch({ type: "user/loginSuccess", payload: res.data.user });
        navigate("/app");
      } else {
        dispatch({ type: "user/loginFailure" });
        setAlert(res.message);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlert("Please try again later");
    }
  }
  async function handleSignup(e) {
    try {
      e.preventDefault();
      setProcessing(true);
      const res = await apiSignup(email, username, password, passwordConfirm);
      if (res.status === "success") {
        dispatch({ type: "user/loginSuccess", payload: res.data.user });
        navigate("/app");
      } else {
        dispatch({ type: "user/loginFailure" });
        setAlert(res.message);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlert("Please try again later");
    }
  }
  async function handleForgot(e) {
    try {
      e.preventDefault();
      setProcessing(true);
      const res = await apiForgotPassword(email);
      if (res.status === "success") {
        setAlert("Check your email for instructions");
        handleChangeOption("reset");
      } else {
        setAlert(res.message);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlert("Please try again later");
    }
  }

  async function handleResetPassword(e) {
    try {
      e.preventDefault();
      setProcessing(true);
      const res = await apiResetPassword(password, passwordConfirm, token);
      if (res.status === "success") {
        dispatch({ type: "user/loginSuccess", payload: res.data.user });
        console.log(res);
        navigate("/app");
      } else {
        setAlert(res.message);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlert("Please try again later");
    }
  }

  // reset all input fields
  function resetInput() {
    setEmail("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setAlert("");
  }

  // handle whenever the user changes the menu option
  function handleChangeOption(newOption) {
    if (processing) return;
    resetInput();
    switch (newOption) {
      case "login": {
        setSignup(false);
        setForgotPassword(false);
        setResetPassword(false);
        break;
      }
      case "signup": {
        setSignup(true);
        setForgotPassword(false);
        setResetPassword(false);
        break;
      }
      case "forgot": {
        setSignup(false);
        setForgotPassword(true);
        setResetPassword(false);
        break;
      }
      case "reset": {
        setSignup(false);
        setForgotPassword(false);
        setResetPassword(true);
        break;
      }
      default:
        return null;
    }
  }

  async function handleQuickLogin() {
    try {
      setProcessing(true);
      const res = await apiQuickLogin();
      if (res.status === "success") {
        dispatch({ type: "user/loginSuccess", payload: res.data.user });
        navigate("/app");
      } else {
        dispatch({ type: "user/loginFailure" });
        setAlert(res.message);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlert("Please try again later");
    }
  }

  // early return in case the checkAuth process is not done
  if (checkAuth) return;
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.bgVideo}>
        <video
          src="videos/cover2.mp4"
          type="video/mp4"
          className={styles.bgVideoContent}
          autoPlay={true}
          muted={true}
          loop={true}
        ></video>
      </div>
      {alert && <Alert>{alert}</Alert>}
      <form
        className={styles.form}
        onSubmit={
          signup
            ? handleSignup
            : forgotPassword
            ? handleForgot
            : resetPassword
            ? handleResetPassword
            : handleLogin
        }
      >
        <div className={styles.formBackground}></div>
        <div className={styles.loginBox}>
          {!resetPassword && (
            <Input field={email} type="text" setterFunction={setEmail}>
              email
            </Input>
          )}
          {!forgotPassword && (
            <Input
              field={password}
              type="password"
              setterFunction={setPassword}
            >
              password
            </Input>
          )}
          {!forgotPassword && (signup || resetPassword) && (
            <Input
              field={passwordConfirm}
              type="password"
              setterFunction={setPasswordConfirm}
            >
              password confirm
            </Input>
          )}
          {!forgotPassword && signup && (
            <Input field={username} type="text" setterFunction={setUsername}>
              username
            </Input>
          )}
          {resetPassword && (
            <Input field={token} type="text" setterFunction={setToken}>
              token
            </Input>
          )}
        </div>

        <div className={styles.actionsBox}>
          <Button processing={processing}>
            {signup
              ? "Sign up"
              : forgotPassword || resetPassword
              ? "Reset"
              : "Log in"}
          </Button>
          {!forgotPassword && !signup && (
            <>
              <ActionText onClick={() => handleChangeOption("signup")}>
                Create a new account
              </ActionText>
              <ActionText onClick={() => handleChangeOption("forgot")}>
                Forgot your password?
              </ActionText>
            </>
          )}
          {(forgotPassword || signup || resetPassword) && (
            <ActionText onClick={() => handleChangeOption("login")}>
              Go back
            </ActionText>
          )}
          <ActionText onClick={() => handleQuickLogin()}>
            Quick Login with a test user
          </ActionText>
        </div>
      </form>
      <div
        className={styles.warning}
        style={{ marginTop: "20px", fontWeight: "700" }}
      >
        This application is best viewed on a desktop computer
      </div>
    </div>
  );
}
// }

export default Login;
