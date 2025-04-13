import axios from 'axios';
import { API_BASE_URL } from '../config';

const carService = {
  addCar: async (carData) => {
    try {
      console.log('adding car');
      const response = await axios.post(`http://192.168.18.19:5000/api/cars/add`, carData);
      return response.data;
    } catch (error) {
      console.log('error adding car', error);
      throw error.response?.data || { message: 'Error adding car' };
    }
  }
};

export default carService; 