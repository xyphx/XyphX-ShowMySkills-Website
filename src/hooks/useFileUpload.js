"use client";
import { useState } from 'react';
import { imageKitConfig } from '@/config/imagekit';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const uploadFile = async (file, folder = 'files', fileType = 'general') => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Get authentication parameters
      const authParams = await authenticator();
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', `${fileType}_${Date.now()}_${file.name}`);
      formData.append('folder', `/${folder}`);
      formData.append('signature', authParams.signature);
      formData.append('expire', authParams.expire);
      formData.append('token', authParams.token);
      formData.append('publicKey', imageKitConfig.publicKey);

      // Upload to ImageKit using correct endpoint
      const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed with status ${uploadResponse.status}: ${errorText}`);
      }

      const result = await uploadResponse.json();
      setUploadProgress(100);
      setIsUploading(false);
      
      return result;
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  // Specific method for image uploads
  const uploadImage = async (file, folder = 'profiles') => {
    return uploadFile(file, folder, 'image');
  };

  // Specific method for resume uploads
  const uploadResume = async (file, folder = 'resumes') => {
    return uploadFile(file, folder, 'resume');
  };

  return {
    uploadFile,
    uploadImage,
    uploadResume,
    isUploading,
    uploadProgress,
  };
};
