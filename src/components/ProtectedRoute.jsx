import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { checkLoggedIn } from "../utils/apiCalls";

function ProtectedRoute({ children }) {
  const { isAuthenticated, dispatch } = useUser();
  const [checkAuth, setCheckAuth] = useState(false);
  const navigate = useNavigate();

  //   useEffect(
  //     function () {
  //       async function isLoggedIn() {
  //         try {
  //           setCheckAuth(true);
  //           const data = await checkLoggedIn();
  //           if (data.status === "success") {
  //             dispatch({ type: "user/isLoggedIn" });
  //           } else {
  //             // dispatch({ type: "user/logout" });
  //             navigate("/");
  //           }
  //           setCheckAuth(false);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       isLoggedIn();
  //     },
  //     [dispatch, navigate, setCheckAuth]
  //   );

  //   return isAuthenticated ? children : null;
  // }
  return null;
}

export default ProtectedRoute;
