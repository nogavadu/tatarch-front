import { authHttpClient } from "./httpClient";

export const recordAPI = {
  async create(data) {
    authHttpClient.post("/v1/record/addNew", data);
  },
};
