import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "players/";


class PlayerService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };
  
  // Temporary until we get the user id from the login
  // const userId = 1
  getAllRecordsByUser = (userId = 1) => {
    return axios.get(API_URL + `user/${userId}`, { headers: authHeader() });
  };

  // TODO: Not implemented in Backend yet
  getAllRecordsByActiveSts = (status) => {
    return axios.get(API_URL + `archive/${status}`, { headers: authHeader() });
  };

  getRecordById = (id) => {
    return axios.get(API_URL + `${id}/`, { headers: authHeader() });
  };

  getRecordByName = (dmName) => {
    return axios.get(API_URL + `name/${dmName}/`, { headers: authHeader() });
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

  patchRecordSts = (id, sts) => {
    axios
      .patch(API_URL + `${id}/${sts}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteRecord = (id) => {
    axios
    .delete(API_URL + `${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
  }
}

export default new PlayerService();