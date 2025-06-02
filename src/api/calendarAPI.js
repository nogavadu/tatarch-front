import { authHttpClient } from "./httpClient";

export const calendarAPI = {
  async createById(calendarId) {
    return authHttpClient.post(`/v1/calendar/addMasters/${calendarId}`);
  },

  async createByDay(plusDay) {
    return authHttpClient.post(`/v1/calendar/addMasters/${plusDay}`);
  },

  async getAll() {
    return authHttpClient.get("/vq/calendar/getAll");
  },

  async getById(calendarId) {
    return authHttpClient.get(`/v1/calendar/getById/${calendarId}`);
  },

  async getByMaster(masterId) {
    return authHttpClient.get(
      `/v1/calendar/getByMasterInAndDateGreaterThanEqual/${masterId}`
    );
  },

  async getByDate(date) {
    return authHttpClient.get(`/v1/calendar/getByDate/${date}`);
  },

  async deleteById(calendarId) {
    return authHttpClient.delete(`/v1/calendar/deleteById/${calendarId}`);
  },
};
