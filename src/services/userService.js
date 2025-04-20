import axios from 'axios';
import { API_BASE_URL } from '../config';

const userService = {
  // Get current user profile
  getUserProfile: async () => {
    try {
      console.log('getting user profile');
      const response = await axios.get(`${API_BASE_URL}/drivers/profile`);
      return response.data;
    } catch (error) {
      console.log('error getting user profile', error);
      throw error.response?.data || { message: 'Error fetching user profile' };
    }
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/drivers/profile`, userData);
      return response.data;
    } catch (error) {
      console.log('error updating user profile', error);
      throw error.response?.data || { message: 'Error updating user profile' };
    }
  }
};

export default userService; 