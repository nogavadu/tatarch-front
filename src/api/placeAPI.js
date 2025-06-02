import { authHttpClient } from "./httpClient";

export const placeApi = {
  async create(place) {
    return authHttpClient.post("/v1/place/addNew", place);
  },

  async getAll() {
    return authHttpClient.get("/v1/place/getAll");
  },

  async getById(placeId) {
    return authHttpClient.get(`/v1/place/getById/${placeId}`);
  },

  async deleteById(placeId) {
    return authHttpClient.delete(`/v1/place/deleteById/${placeId}`);
  },
};
