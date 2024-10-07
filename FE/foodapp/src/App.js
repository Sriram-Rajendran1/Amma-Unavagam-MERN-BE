import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../src/Pages/Homepage/Homepage";
import Menupage from "../src/Pages/Menupage/Menupage";
import Orderspage from "../src/Pages/Orderspage/Orderspage";
import Contactuspage from "../src/Pages/Contactuspage/Contactuspage";
import Profilepage from "../src/Pages/Profilepage/Profilepage";
import Checkoutpage from "./Pages/Checkoutpage/Checkoutpage";
import Signuppage from "./Pages/AuthPage/Signuppage";
import Loginpage from "./Pages/AuthPage/Loginpage";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./features/AuthSlice";

function App() {
  const { isLoggedIn } = useSelector((state) => state.authslice);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (!isLoggedIn && token) {
      dispatch(restoreSession({ token, user }));
    }
    setIsRestoringSession(false);
  }, [dispatch, isLoggedIn]);

  if (isRestoringSession) {
    return <div>Loading...</div>; // Show a loading state while restoring the session
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/login" element={<Loginpage />} />

          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menupage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orderspage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contactus"
            element={
              <ProtectedRoute>
                <Contactuspage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profilepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkoutpage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
