import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "playerCampaigns/";

// Temporary until we get the user id from the login
const userId = 1

class PlayerCampaignService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllRecordsByPlayer = (id) => {
    return axios.get(API_URL + `player/${id}`, { headers: authHeader() });
  };

  getRecord = (id) => {
    return axios.get(API_URL + `${id}/`, { headers: authHeader() });
  };

  addRecord = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateRecord = (data) => {
    axios
      .put(API_URL + `${data.id}/`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  deleteRecord = (id) => {
    axios
    .delete(API_URL + `${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
  }
}

export default new PlayerCampaignService();