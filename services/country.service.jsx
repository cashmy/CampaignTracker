import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "countries/";

class CountryService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };
}

export default new CountryService();