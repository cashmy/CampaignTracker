import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "timezoneData/";

class TimeZoneService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllRecordsByCountry = (code) => {
    return axios.get(API_URL + `country/${code}`, { headers: authHeader() });
  };
}

export default new TimeZoneService();