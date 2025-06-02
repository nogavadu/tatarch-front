import { authHttpClient } from "./httpClient";

export const masterAPI = {
  async create(master) {
    return authHttpClient.post("/v1/master/addNew", master);
  },

  async getAll(placeId = null, serviceId = null) {
    if (placeId && serviceId) {
      return authHttpClient.get(
        `/v1/master/getMastersByPlaceIdAndServiceLevel/${placeId}/${serviceId}`
      );
    }
    if (placeId) {
      return authHttpClient.get(`/v1/master/getMastersByPlaceId/${placeId}`);
    }

    return authHttpClient.get("/v1/master/getAll");
  },

  async getById(masterId) {
    return authHttpClient.get(`/v1/master/getById/${masterId}`);
  },

  async deleteById(masterId) {
    return authHttpClient.delete(`/v1/master/deleteById/${masterId}`);
  },
};
