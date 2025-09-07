"use client";
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { predefinedSkills } from '@/utils/skills';
import { useFileUpload } from '@/hooks/useFileUpload';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  FileText, 
  Plus, 
  X, 
  Building, 
  Award, 
  Briefcase,
  AtSign,
  Camera,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Github,
  Upload,
  Download
} from 'lucide-react';

export default function ProfileSetup() {
  // Refs for error fields
  const displayNameRef = useRef(null);
  const usernameRef = useRef(null);
  const locationRef = useRef(null);
  const collegeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const phoneRef = useRef(null);
  const { user, updateUserProfile, checkUsernameAvailability, getUserProfile } = useAuth();
  const { uploadImage, uploadResume, isUploading, uploadProgress } = useFileUpload();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // Always start with loading true
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('/common-profile.png');
  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    type: '', // College or School
    college: '',
    course: '',
    customCourse: '',
    branch: '',
    customBranch: '',
    stream: '',
    customStream: '',
    location: '',
    about: '',
    skills: [''],
    experience: [{ title: '', organization: '', startDate: '', endDate: '', timePeriod: '', location: '', description: '', link: '' }],
    achievements: [{ title: '', organization: '', date: '', description: '', link: '' }],
    works: [{ title: '', description: '', link: '' }],
    profileImage: null,
    phone: '',
    email: '',
    instagram: '',
    linkedin: '',
    github: '',
    resume: null,
    resumeName: ''
  });

    // State for manual skill input
    const [manualSkill, setManualSkill] = useState('');

  // Load existing user data - always check for existing data
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setDataLoading(true);
        try {
          const userData = await getUserProfile(user.uid);
          if (userData) {
            // Pre-fill form with existing data
            setFormData({
              displayName: userData.displayName || user.displayName || '',
              username: userData.username || '',
              type: userData.type || '',
              college: userData.college || '',
              course: userData.course || '',
              customCourse: userData.customCourse || '',
              branch: userData.branch || '',
              customBranch: userData.customBranch || '',
              stream: userData.stream || '',
              customStream: userData.customStream || '',
              location: userData.location || '',
              about: userData.about || '',
              skills: userData.skills && userData.skills.length > 0 ? userData.skills : [''],
              experience: userData.experience && userData.experience.length > 0 ? 
                userData.experience.map(exp => ({
                  title: exp.title || '',
                  organization: exp.organization || '',
                  startDate: exp.startDate || '',
                  endDate: exp.endDate || '',
                  timePeriod: exp.timePeriod || '',
                  location: exp.location || '',
                  description: exp.description || exp.content || '',
                  link: exp.link || ''
                })) : 
                [{ title: '', organization: '', startDate: '', endDate: '', timePeriod: '', location: '', description: '', link: '' }],
              achievements: userData.achievements && userData.achievements.length > 0 ? 
                userData.achievements.map(ach => ({
                  title: ach.title || '',
                  organization: ach.organization || '',
                  date: ach.date || '',
                  description: ach.description || ach.content || '',
                  link: ach.link || ''
                })) : 
                [{ title: '', organization: '', date: '', description: '', link: '' }],
              works: userData.works && userData.works.length > 0 ? 
                userData.works.map(work => ({
                  title: work.title || '',
                  description: work.description || work.content || '',
                  link: work.link || ''
                })) : 
                [{ title: '', description: '', link: '' }],
              profileImage: null,
              phone: userData.phone || '',
              email: userData.email || userData.email || '',
              instagram: userData.instagram || '',
              linkedin: userData.linkedin || '',
              github: userData.github || '',
              resume: null,
              resumeName: userData.resumeName || ''
            });
            
            // Set image preview if user has a profile image
            if (userData.profileImage && userData.profileImage !== '/common-profile.png') {
              setImagePreview(userData.profileImage);
            }
            
            // If user has Google photo and no custom profile image, use Google photo as preview
            if (!userData.profileImage && user.photoURL) {
              setImagePreview(user.photoURL);
            }
          } else {
            // If no user data exists, pre-fill with auth data where available
            setFormData(prev => ({
              ...prev,
              email: user.email || '',
            }));
            
            // Use Google photo as initial preview if available
            if (user.photoURL) {
              setImagePreview(user.photoURL);
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          // Still try to pre-fill with auth data on error
          setFormData(prev => ({
            ...prev,
            email: user.email || '',
          }));
          
          if (user.photoURL) {
            setImagePreview(user.photoURL);
          }
        } finally {
          setDataLoading(false);
        }
      } else {
        setDataLoading(false);
      }
    };

    loadUserData();
  }, [user, getUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSkillChange = (index, value) => {
    if (value && !formData.skills.includes(value)) {
      const newSkills = [...formData.skills];
      newSkills[index] = value;
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  const addSkill = (selectedSkill) => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(skill => skill !== ''), selectedSkill, '']
      }));
    }
  };

    // Add manual skill
    const addManualSkill = () => {
      const skill = manualSkill.trim();
      if (skill && !formData.skills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills.filter(s => s !== ''), skill, '']
        }));
        setManualSkill('');
      }
    };

  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  const handleArrayItemChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      [arrayName]: newArray
    }));
  };

  const addArrayItem = (arrayName) => {
    if (arrayName === 'experience') {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], { title: '', organization: '', startDate: '', endDate: '', timePeriod: '', location: '', description: '', link: '' }]
      }));
    } else if (arrayName === 'achievements') {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], { title: '', organization: '', date: '', description: '', link: '' }]
      }));
    } else if (arrayName === 'works') {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], { title: '', description: '', link: '' }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], { content: '', link: '' }]
      }));
    }
  };

  const removeArrayItem = (arrayName, index) => {
    if (formData[arrayName].length > 1) {
      const newArray = formData[arrayName].filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        [arrayName]: newArray
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('/common-profile.png'); // Reset to default
    setFormData(prev => ({
      ...prev,
      profileImage: null
    }));
    // Reset file input
    const fileInput = document.getElementById('profile-image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          resume: 'Please select a PDF file'
        }));
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 10MB'
        }));
        return;
      }

      setResumeFile(file);
      setFormData(prev => ({
        ...prev,
        resume: file,
        resumeName: file.name
      }));
      
      // Clear any existing errors
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setFormData(prev => ({
      ...prev,
      resume: null,
      resumeName: ''
    }));
    // Reset file input
    const fileInput = document.getElementById('resume-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = async () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscore';
    } else if (isEditMode) {
      // In edit mode, only check availability if username has changed
      try {
        const currentUserData = await getUserProfile(user.uid);
        if (currentUserData && currentUserData.username !== formData.username) {
          const isAvailable = await checkUsernameAvailability(formData.username, user.uid);
          if (!isAvailable) {
            newErrors.username = 'Username is already taken';
          }
        }
      } catch (error) {
        newErrors.username = 'Error checking username availability';
      }
    } else {
      // In setup mode, always check username availability
      try {
        const isAvailable = await checkUsernameAvailability(formData.username, user.uid);
        if (!isAvailable) {
          newErrors.username = 'Username is already taken';
        }
      } catch (error) {
        newErrors.username = 'Error checking username availability';
      }
    }

    if (!formData.type) {
      newErrors.type = 'Please select College or School';
    }
    if (!formData.college.trim()) {
      newErrors.college = 'College/School Name is required';
    }
    if (!formData.course && !formData.customCourse) {
      newErrors.course = 'Please select or enter your course';
    }
    if (formData.type === 'College' && !formData.branch && !formData.customBranch) {
      newErrors.branch = 'Please select or enter your branch';
    }
    if (formData.type === 'School' && !formData.stream && !formData.customStream) {
      newErrors.stream = 'Please select or enter your stream';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.about.trim()) {
      newErrors.about = 'About section is required';
    } else if (formData.about.length < 50) {
      newErrors.about = 'About section must be at least 50 characters';
    }

    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone if provided
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate skills
    const validSkills = formData.skills.filter(skill => skill.trim() !== '');
    if (validSkills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) {
      // Scroll to first error field
      const errorOrder = [
        { key: 'displayName', ref: displayNameRef },
        { key: 'username', ref: usernameRef },
        { key: 'location', ref: locationRef },
        { key: 'college', ref: collegeRef },
        { key: 'about', ref: aboutRef },
        { key: 'skills', ref: skillsRef },
        { key: 'phone', ref: phoneRef }
      ];
      for (const { key, ref } of errorOrder) {
        if (errors[key] && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          ref.current.focus && ref.current.focus();
          break;
        }
      }
      return;
    }

    setLoading(true);
    try {
      // Filter out empty values
      const validSkills = formData.skills.filter(skill => skill.trim() !== '');
      const validExperience = formData.experience.filter(item => 
        item.title.trim() !== '' && 
        item.organization.trim() !== '' && 
        item.startDate.trim() !== '' && 
        item.endDate.trim() !== '' && 
        item.description.trim() !== ''
      ).map(item => ({
        ...item,
        timePeriod: item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : item.timePeriod
      }));
      const validAchievements = formData.achievements.filter(item => 
        item.title.trim() !== '' && 
        item.date.trim() !== '' && 
        item.description.trim() !== ''
      );
      const validWorks = formData.works.filter(item => 
        item.title.trim() !== '' && 
        item.description.trim() !== ''
      );

      // Get current user data to preserve existing profile image if no new one is uploaded
      const currentUserData = await getUserProfile(user.uid);
      let profileImageToSave;
      let resumeToSave = null;
      let resumeNameToSave = '';
      
      if (imageFile) {
        // Upload new image to ImageKit
        try {
          const uploadResult = await uploadImage(imageFile, 'profiles');
          profileImageToSave = uploadResult.url; // Use the uploaded image URL
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          throw new Error('Failed to upload profile image. Please try again.');
        }
      } else if (currentUserData && currentUserData.profileImage && currentUserData.profileImage !== '/common-profile.png') {
        // Keep existing custom image
        profileImageToSave = currentUserData.profileImage;
      } else {
        // Use default image
        profileImageToSave = '/common-profile.png';
      }

      // Handle resume upload
      if (resumeFile) {
        setResumeUploading(true);
        try {
          const uploadResult = await uploadResume(resumeFile, 'resumes');
          resumeToSave = uploadResult.url;
          resumeNameToSave = resumeFile.name;
        } catch (uploadError) {
          console.error('Resume upload failed:', uploadError);
          throw new Error('Failed to upload resume. Please try again.');
        } finally {
          setResumeUploading(false);
        }
      } else if (currentUserData && currentUserData.resume) {
        // Keep existing resume
        resumeToSave = currentUserData.resume;
        resumeNameToSave = currentUserData.resumeName || '';
      }

      const profileData = {
        displayName: formData.displayName.trim(),
        username: formData.username.trim(),
        type: formData.type,
        college: formData.college.trim(),
        course: formData.course || formData.customCourse,
        customCourse: formData.customCourse,
        branch: formData.branch || formData.customBranch,
        customBranch: formData.customBranch,
        stream: formData.stream || formData.customStream,
        customStream: formData.customStream,
        location: formData.location.trim(),
        about: formData.about.trim(),
        skills: validSkills,
        experience: validExperience,
        achievements: validAchievements,
        works: validWorks,
        profileImage: profileImageToSave,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        instagram: formData.instagram.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        resume: resumeToSave,
        resumeName: resumeNameToSave,
        profileCompleted: true,
        updatedAt: new Date()
      };

      await updateUserProfile(user.uid, profileData);
      router.push('/home');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const renderArraySection = (arrayName, title, icon) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {formData[arrayName].map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600">
              {title.slice(0, -1)} {index + 1}
            </span>
            {formData[arrayName].length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(arrayName, index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <textarea
            value={item.content}
            onChange={(e) => handleArrayItemChange(arrayName, index, 'content', e.target.value)}
            placeholder={`Describe your ${title.slice(0, -1).toLowerCase()}...`}
            className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="3"
          />
          <input
            type="url"
            value={item.link}
            onChange={(e) => handleArrayItemChange(arrayName, index, 'link', e.target.value)}
            placeholder="Link (optional)"
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(arrayName)}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add {title.slice(0, -1)}
      </button>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
      </div>
      {formData.experience.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600">
              Experience {index + 1}
            </span>
            {formData.experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('experience', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Title and Organization Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleArrayItemChange('experience', index, 'title', e.target.value)}
                placeholder="e.g., Software Engineer, Marketing Intern"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization *
              </label>
              <input
                type="text"
                value={item.organization}
                onChange={(e) => handleArrayItemChange('experience', index, 'organization', e.target.value)}
                placeholder="Company or Organization name"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          {/* Month/Year Picker Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input
                type="month"
                value={item.startDate}
                onChange={e => handleArrayItemChange('experience', index, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
              <div className="flex gap-2 items-center">
                <input
                  type="month"
                  value={item.endDate !== 'Present' ? item.endDate : ''}
                  onChange={e => handleArrayItemChange('experience', index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  min={item.startDate || undefined}
                  disabled={!item.startDate || item.endDate === 'Present'}
                />
                <label className="flex items-center gap-1 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={item.endDate === 'Present'}
                    onChange={e => handleArrayItemChange('experience', index, 'endDate', e.target.checked ? 'Present' : '')}
                    disabled={!item.startDate}
                    
                  />
                  Present
                </label>
              </div>
            </div>
          </div>
          {/* Time Period and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period (auto-filled)</label>
              <input
                type="text"
                value={item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : item.timePeriod}
                readOnly
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md bg-gray-100"
                placeholder="e.g., Jan 2023 - Present"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={item.location}
                onChange={(e) => handleArrayItemChange('experience', index, 'location', e.target.value)}
                placeholder="City, Country or Remote"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={item.description}
              onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)}
              placeholder="Describe your role, responsibilities, and key achievements..."
              className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            />
          </div>
          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleArrayItemChange('experience', index, 'link', e.target.value)}
              placeholder="Company website, project link, or certificate"
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem('experience')}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
      </div>
      {formData.achievements.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600">
              Achievement {index + 1}
            </span>
            {formData.achievements.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('achievements', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Title and Organization Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Title *
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleArrayItemChange('achievements', index, 'title', e.target.value)}
                placeholder="e.g., Winner of Hackathon, Dean's List"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization/Event
              </label>
              <input
                type="text"
                value={item.organization}
                onChange={(e) => handleArrayItemChange('achievements', index, 'organization', e.target.value)}
                placeholder="Organization or event name"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="month"
              value={item.date}
              onChange={(e) => handleArrayItemChange('achievements', index, 'date', e.target.value)}
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Select month and year"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={item.description}
              onChange={(e) => handleArrayItemChange('achievements', index, 'description', e.target.value)}
              placeholder="Describe your achievement, what you accomplished, and its significance..."
              className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link (Optional)
            </label>
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleArrayItemChange('achievements', index, 'link', e.target.value)}
              placeholder="Certificate, article, or project link"
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem('achievements')}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Achievement
      </button>
    </div>
  );

  const renderWorksSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Building className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">My Works</h3>
      </div>
      {formData.works.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600">
              Work {index + 1}
            </span>
            {formData.works.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('works', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project/Work Title *
            </label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleArrayItemChange('works', index, 'title', e.target.value)}
              placeholder="e.g., E-commerce Website, Mobile App, Portfolio"
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={item.description}
              onChange={(e) => handleArrayItemChange('works', index, 'description', e.target.value)}
              placeholder="Describe your project, technologies used, key features, and your role..."
              className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link (Optional)
            </label>
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleArrayItemChange('works', index, 'link', e.target.value)}
              placeholder="Live demo, GitHub repo, or portfolio link"
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem('works')}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Work
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Loading state for data fetching in edit mode */}
          {dataLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your profile data...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
                </h1>
                <p className="text-gray-600">
                  {isEditMode 
                    ? 'Update your profile information and showcase your latest achievements'
                    : 'Let\'s set up your profile to showcase your skills and achievements'
                  }
                </p>
              </div>

          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/common-profile.png'; // Fallback if image fails to load
                  }}
                />
              </div>
              <div className="absolute bottom-0 right-0">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors shadow-lg">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {imageFile && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    ref={displayNameRef}
                    className={`w-full pl-10 pr-4 text-gray-700 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.displayName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    ref={usernameRef}
                    className={`w-full pl-10 pr-4 text-gray-700 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Choose a unique username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    ref={locationRef}
                    className={`w-full pl-10 text-gray-700 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your city, country"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Type: College or School */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select College or School</option>
                <option value="College">College</option>
                <option value="School">School</option>
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>

            {/* College/School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{formData.type === 'School' ? 'School Name *' : 'College Name *'}</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  ref={collegeRef}
                  className={`w-full text-gray-700 pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.college ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={formData.type === 'School' ? 'Your school name' : 'Your college name'}
                />
              </div>
              {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
            </div>

            {/* Course Selection */}
            {formData.type && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className={`w-full text-gray-700 px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select your course</option>
                  {formData.type === 'College' ? (
                    <>
                      <option value="BTech">BTech</option>
                      <option value="BSc">BSc</option>
                      <option value="MTech">MTech</option>
                      <option value="MBA">MBA</option>
                      <option value="Other">Other (Enter manually)</option>
                    </>
                  ) : (
                    <>
                      <option value="PlusOne">+1</option>
                      <option value="PlusTwo">+2</option>
                      <option value="Other">Other (Enter manually)</option>
                    </>
                  )}
                </select>
                {formData.course === 'Other' && (
                  <input
                    type="text"
                    name="customCourse"
                    value={formData.customCourse}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-3 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                    placeholder="Enter your course manually"
                  />
                )}
                {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
              </div>
            )}

            {/* Stream Selection (only for School) */}
            {formData.type === 'School' && (formData.course || formData.customCourse) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stream *</label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.stream ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select your stream</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Other">Other (Enter manually)</option>
                </select>
                {formData.stream === 'Other' && (
                  <input
                    type="text"
                    name="customStream"
                    value={formData.customStream}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-3 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                    placeholder="Enter your stream manually"
                  />
                )}
                {errors.stream && <p className="mt-1 text-sm text-red-600">{errors.stream}</p>}
              </div>
            )}

            {/* Branch Selection (only for College) */}
            {formData.type === 'College' && (formData.course || formData.customCourse) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.branch ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select your branch</option>
                  <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electronics and Communication">Electronics and Communication</option>
                  <option value="Other">Other (Enter manually)</option>
                </select>
                {formData.branch === 'Other' && (
                  <input
                    type="text"
                    name="customBranch"
                    value={formData.customBranch}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-3 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                    placeholder="Enter your branch manually"
                  />
                )}
                {errors.branch && <p className="mt-1 text-sm text-red-600">{errors.branch}</p>}
              </div>
            )}

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About You *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows="4"
                  ref={aboutRef}
                  className={`w-full text-gray-700 pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.about ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                />
              </div>
              {errors.about && (
                <p className="mt-1 text-sm text-red-600">{errors.about}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills *
              </label>
              <div className="space-y-3" ref={skillsRef}>
                {/* Display selected skills as tags */}
                {formData.skills.filter(skill => skill.trim() !== '').length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1 bg-teal-100 border border-teal-300 text-teal-700 rounded-full text-sm">
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(formData.skills.indexOf(skill))}
                          className="text-teal-500 hover:text-teal-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skill selection dropdown */}
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addSkill(e.target.value);
                        e.target.value = ''; // Reset dropdown
                      }
                    }}
                    className="w-full px-3 text-gray-700 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="">Select a skill to add...</option>
                    {predefinedSkills
                      .filter(skill => !formData.skills.includes(skill))
                      .map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))
                    }
                  </select>
                </div>

                  {/* Manual skill input */}
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={manualSkill}
                      onChange={e => setManualSkill(e.target.value)}
                      className="flex-1 px-3 py-2 border text-gray-700 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Add a skill manually..."
                    />
                    <button
                      type="button"
                      onClick={addManualSkill}
                      className="px-4 py-2 bg-teal-600  text-white rounded-xl hover:bg-teal-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                {formData.skills.filter(skill => skill.trim() !== '').length === 0 && (
                  <p className="text-sm text-gray-500">Please select at least one skill from the dropdown above.</p>
                )}

                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-700" />
                Contact Information
              </h3>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full pl-10 pr-4 text-gray-700 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        ref={phoneRef}
                        className={`w-full pl-10 pr-4 text-gray-700 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 12345 67890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-gray-700" />
                Social Links
              </h3>
              
              <div className="space-y-4">
                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 text-gray-700 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="https://instagram.com/yourusername"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 text-gray-700 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 text-gray-700 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-700" />
                Resume (PDF)
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors">
                {formData.resumeName ? (
                  <div className="space-y-3">
                    <FileText className="w-12 h-12 text-teal-600 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formData.resumeName}</p>
                      <p className="text-xs text-gray-500">PDF Resume uploaded</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('resume-upload');
                          input.click();
                        }}
                        className="px-4 py-2 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
                      >
                        Replace Resume
                      </button>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Remove Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Upload your resume</p>
                      <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('resume-upload');
                        input.click();
                      }}
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                )}
                
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </div>
              
              {errors.resume && (
                <p className="text-sm text-red-600">{errors.resume}</p>
              )}
            </div>

            {/* Works */}
            {renderWorksSection()}
            
            {/* Experience */}
            {renderExperienceSection()}

            {/* Achievements */}
            {renderAchievementsSection()}

            

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-center">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push('/home')}
                className="px-6 py-3 border cursor-pointer border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {isEditMode ? 'Cancel' : 'Skip for Now'}
              </button>
              <button
                type="submit"
                disabled={loading || isUploading || resumeUploading}
                className="px-8 py-3 cursor-pointer bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold rounded-xl transition-colors duration-200"
              >
                {resumeUploading 
                  ? `Uploading Resume...` 
                  : isUploading 
                    ? `Uploading Image... ${uploadProgress}%` 
                    : loading 
                      ? 'Saving...' 
                      : (isEditMode ? 'Update Profile' : 'Complete Profile')
                }
              </button>
            </div>
          </form>
        </>
      )}
        </div>
      </div>
    </div>
  );
}
