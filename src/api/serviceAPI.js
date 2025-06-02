import { authHttpClient } from "./httpClient";

export const serviceAPI = {
  async create(service) {
    return authHttpClient.post("/v1/service/addNew", service);
  },

  async getAll(masterId = null) {
    if (masterId) {
      return authHttpClient.get(`/v1/service/getByMasterLevel/${masterId}`);
    }

    return authHttpClient.get("/v1/service/getAll");
  },

  async getById(masterId) {
    return authHttpClient.get(`/v1/service/getById/${masterId}`);
  },

  async deleteById(masterId) {
    return authHttpClient.delete(`/v1/service/deleteById/${masterId}`);
  },
};
