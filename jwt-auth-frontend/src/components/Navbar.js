import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    // Navigate to login page after logout
    if (onNavigate) onNavigate("login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (view) => {
    setIsDropdownOpen(false);
    if (onNavigate) onNavigate(view);
  };

  const handleGuestNavigation = (view) => {
    if (onNavigate) onNavigate(view);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <h2>JWT Auth</h2>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          {user ? (
            <div className="navbar-user">
              {/* User Welcome Message */}
              <span className="welcome-message">Welcome, {user.username}!</span>

              {/* User Profile Dropdown */}
              <div className="user-dropdown">
                <button
                  className="user-profile-btn"
                  onClick={toggleDropdown}
                  type="button"
                >
                  <div className="user-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.username}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="dropdown-user-info">
                        <div className="dropdown-username">{user.username}</div>
                        <div className="dropdown-email">{user.email}</div>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-item"
                      onClick={() => handleNavigation("profile")}
                      type="button"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 13c0-1.1.9-2 2-2h8a2 2 0 012 2v1H2v-1z" />
                      </svg>
                      My Profile
                    </button>

                    <button
                      className="dropdown-item"
                      onClick={() => handleNavigation("settings")}
                      type="button"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm0-1A7 7 0 118 1a7 7 0 010 14z" />
                      </svg>
                      Settings
                    </button>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                      type="button"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M6 12.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v1z" />
                        <path d="M4.5 1A1.5 1.5 0 003 2.5v11A1.5 1.5 0 004.5 15h7a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0011.5 1h-7zM4 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-11z" />
                        <path d="M10.5 8.5a.5.5 0 000-1h-5a.5.5 0 000 1h5z" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="navbar-guest">
              <button
                className="nav-btn login-btn"
                onClick={() => handleGuestNavigation("login")}
                type="button"
              >
                Login
              </button>
              <button
                className="nav-btn register-btn"
                onClick={() => handleGuestNavigation("register")}
                type="button"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for closing dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="dropdown-overlay"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
