import axios from 'axios';
import { API_BASE_URL } from '../config';

const carService = {
  addCar: async (carData) => {
    try {
      console.log('adding car');
      const response = await axios.post(`${API_BASE_URL}/cars/add`, carData);
      return response.data;
    } catch (error) {
      console.log('error adding car', error);
      throw error.response?.data || { message: 'Error adding car' };
    }
  },

  getAllCars: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars`);
      return response.data;
    } catch (error) {
      console.log('error getting cars', error);
      throw error.response?.data || { message: 'Error getting cars' };
    }
  },

  deleteCar: async (carId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cars/${carId}`);
      return response.data;
    } catch (error) {
      console.log('error deleting car', error);
      throw error.response?.data || { message: 'Error deleting car' };
    }
  }
};

export default carService; 