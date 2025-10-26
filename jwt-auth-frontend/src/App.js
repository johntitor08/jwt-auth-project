import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import "./App.css";

const AppContent = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = React.useState("login");

  // Handle navigation from navbar and other components
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // If user is logged in, default to profile view
  React.useEffect(() => {
    if (user) {
      setCurrentView("profile");
    } else {
      setCurrentView("login");
    }
  }, [user]);

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} />
      <div className="container">
        {!user ? (
          <>
            <div className="view-switcher">
              <button
                onClick={() => setCurrentView("login")}
                className={currentView === "login" ? "active" : ""}
                type="button"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentView("register")}
                className={currentView === "register" ? "active" : ""}
                type="button"
              >
                Register
              </button>
            </div>
            {currentView === "login" ? <Login /> : <Register />}
          </>
        ) : currentView === "profile" ? (
          <Profile />
        ) : (
          <div>Settings view would go here</div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
