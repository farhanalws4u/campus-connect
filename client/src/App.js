import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import { useEffect } from "react";
import "./index.css";
import LoadingOverlayComp from "./components/LoadingOverlayComp";
import Profile from "./pages/Profile/Proflle";

import QueryForm from "./pages/queryForm/Container";
import DetailedQuestion from "./pages/detailedQuestion/Container";

function App() {
  const reduxState = useSelector((state) => state);
  const user = reduxState.auth.isAuthenticated;
  const dispatch = useDispatch();

  console.log(reduxState);

  const isLoading = reduxState.auth.loading;

  useEffect(() => {
    if (localStorage.jwtToken && !reduxState.auth.isAuthenticated) {
      const token = localStorage.getItem("jwtToken");

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(logoutUser());
      }
    }
  }, [reduxState, dispatch]);

  return (
    <LoadingOverlayComp active={isLoading}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginContainer />} />
            <Route exact path="/register" element={<RegisterContainer />} />
            <Route
              exact
              path="/"
              element={user ? <HomeContainer /> : <Navigate to="/login" />}
            />
            <Route exact path="/profile" element={user && <Profile />} />

            <Route exact path="/queryForm" element={user && <QueryForm />} />
            <Route
              exact
              path="/detailedQuestion/:id"
              element={user && <DetailedQuestion />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </LoadingOverlayComp>
  );
}

export default App;
