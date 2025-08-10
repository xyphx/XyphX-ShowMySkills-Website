"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Save, X, Plus } from 'lucide-react';

export default function ProfileEdit({ isOpen, onClose }) {
  const { user, updateUserProfile, getUserProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    displayName: '',
    college: '',
    location: '',
    skills: [],
    photoURL: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      loadUserProfile();
    }
  }, [user, isOpen]);

  const loadUserProfile = async () => {
    try {
      const profile = await getUserProfile(user.uid);
      if (profile) {
        setProfileData({
          displayName: profile.displayName || user.displayName || '',
          college: profile.college || '',
          location: profile.location || '',
          skills: profile.skills || [],
          photoURL: profile.photoURL || user.photoURL || ''
        });
      } else {
        // Set default values from Firebase Auth
        setProfileData({
          displayName: user.displayName || '',
          college: '',
          location: '',
          skills: [],
          photoURL: user.photoURL || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For now, we'll use a simple placeholder - you can integrate ImageKit later
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileData(prev => ({
        ...prev,
        photoURL: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUserProfile(user.uid, profileData);
      alert('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="text-center">
            <div className="relative inline-block">
              {profileData.photoURL ? (
                <img
                  src={profileData.photoURL}
                  className="w-30 h-30 rounded-full object-cover border-4 border-teal-500"
                  alt="Profile"
                />
              ) : (
                <div className="w-30 h-30 rounded-full bg-gray-300 border-4 border-teal-500 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image</span>
                </div>
              )}
              
              <label className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                displayName: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* College */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              College/Institution
            </label>
            <input
              type="text"
              value={profileData.college}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                college: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., College of Engineering"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                location: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Trivandrum, Kerala"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            
            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add New Skill */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 disabled:bg-teal-400 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
