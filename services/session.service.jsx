import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "sessions/";

class SessionService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllRecordsByAdventure = (adventureId) => {
    return axios.get(API_URL + `adventure/${adventureId}`, { headers: authHeader() });
  };

  getAllRecordsByAdventureAndSessionDate = (adventureId) => {
    return axios.get(API_URL + `adventureByDate/${adventureId}`, { headers: authHeader() });
  };

  getAdventureTimeline = (adventureId) => {
    return axios.get(API_URL + `timeline/${adventureId}`, { headers: authHeader() });
  };

  getRecord = (id) => {
    return axios.get(API_URL + `${id}/`, { headers: authHeader() });
  };

  addRecord = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateRecord = (data) => {
    console.log("Sessions => updateRecord: ", data.sessionDate)
    axios
      .put(API_URL + `${data.id}/`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  patchRecordSts = (id, sts) => {
    axios
      .patch(API_URL + `${id}/`, data, { headers: authHeader() })
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

export default new SessionService();