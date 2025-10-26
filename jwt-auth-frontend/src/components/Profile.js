import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/auth";

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await authService.getProfile();
        setProfile(profileData);
        setEditForm({
          username: profileData.username,
          email: profileData.email,
        });
      } catch (error) {
        setError("Failed to load profile");
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form when canceling edit
      setEditForm({
        username: profile?.username || "",
        email: profile?.email || "",
      });
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just simulate the update
      console.log("Updating profile:", editForm);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setProfile((prev) => (prev ? { ...prev, ...editForm } : null));
      setIsEditing(false);

      // Show success message (you can replace this with a toast notification)
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  const handleChangePassword = () => {
    alert("Change password functionality would go here");
  };

  const handleEnable2FA = () => {
    alert("2FA setup would go here");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion would be processed here");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="avatar-actions">
              <button
                className="btn-secondary"
                onClick={() =>
                  alert("Avatar change functionality would go here")
                }
                type="button"
              >
                Change Avatar
              </button>
            </div>
          </div>

          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSave} className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editForm.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="info-group">
                  <label>Username</label>
                  <div className="info-value">{profile?.username}</div>
                </div>

                <div className="info-group">
                  <label>Email Address</label>
                  <div className="info-value">{profile?.email}</div>
                </div>

                <div className="info-group">
                  <label>Member Since</label>
                  <div className="info-value">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <div className="profile-actions">
                  <button
                    className="btn-primary"
                    onClick={handleEditToggle}
                    type="button"
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleLogout}
                    type="button"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Profile Sections */}
        <div className="profile-sections">
          {/* Security Section */}
          <div className="profile-section">
            <h3>Security</h3>
            <div className="section-content">
              <div className="security-item">
                <span>Password</span>
                <button
                  className="btn-outline"
                  onClick={handleChangePassword}
                  type="button"
                >
                  Change Password
                </button>
              </div>
              <div className="security-item">
                <span>Two-Factor Authentication</span>
                <button
                  className="btn-outline"
                  onClick={handleEnable2FA}
                  type="button"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="profile-section">
            <h3>Account Settings</h3>
            <div className="section-content">
              <div className="setting-item">
                <span>Email Notifications</span>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <span>Newsletter</span>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="profile-section danger-zone">
            <h3>Danger Zone</h3>
            <div className="section-content">
              <p>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                className="btn-danger"
                onClick={handleDeleteAccount}
                type="button"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
