import axios from 'axios';
import authHeader from "./authHeader";

const baseUrl= process.env.NEXT_PUBLIC_BASE_API_URL;
const API_URL = baseUrl + "adventures/";

class AdventureService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllRecordsByCampaign = (campaignId) => {
    return axios.get(API_URL + `campaign/${campaignId}`, { headers: authHeader() });
  };

  getRecord = (id) => {
    return axios.get(API_URL + `${id}/`, { headers: authHeader() });
  };

  addRecord = (data) => {
    console.log("Posting data: ", data)
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

export default new AdventureService();