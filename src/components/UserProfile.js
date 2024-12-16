import React, { useState } from 'react';

// Define the fields for the profile form
const fields = [
  { name: 'name', placeholder: 'Name', type: 'text' },
  { name: 'preferences', placeholder: 'Preferences', type: 'text' },
  { name: 'interests', placeholder: 'Interests', type: 'text' },
  { name: 'budget', placeholder: 'Budget', type: 'number' },
];

const UserProfile = () => {
  const [profile, setProfile] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), { profilePicture: '' })
  );
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit mode

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isEmpty = Object.values(profile).some((value) => value === '' && value !== 'profilePicture');
    if (isEmpty) {
      alert('All fields are required! Please fill out all fields.');
      return; // Prevent form submission if there are empty fields
    }

    const newProfile = {
      ...profile,
      id: Date.now(), // Create a unique ID
    };

    try {
      const response = await fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to save the profile.');
      }

      alert('Profile saved successfully!');
      setIsEditing(false); // Switch to view mode
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save the profile. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Allow editing after saving
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Revert to view mode without saving changes
  };

  return (
    <div className="user-profile">
      <h1>Profile</h1>

      {!isEditing ? (
        <div className="profile-summary">
          <div className="profile-picture">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" width="100" height="100" />
            ) : (
              <p>No Profile Picture</p>
            )}
          </div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Preferences:</strong> {profile.preferences}</p>
          <p><strong>Interests:</strong> {profile.interests}</p>
          <p><strong>Budget:</strong> {profile.budget}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <input
                name={field.name}
                placeholder={field.placeholder}
                value={profile[field.name]}
                onChange={handleChange}
                type={field.type}
              />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              id="profilePicture"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {profile.profilePicture && (
              <div className="preview-image">
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  width="100"
                  height="100"
                  style={{ marginTop: '10px' }}
                />
              </div>
            )}
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
