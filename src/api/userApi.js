import { authHttpClient, httpClient } from "./httpClient";

export const userAPI = {
  async registration(userData) {
    console.log(JSON.stringify(userData));

    return httpClient.post("/v1/client/regisration", JSON.stringify(userData));
  },

  async login(userData) {
    return httpClient.get("/v1/client/login", userData);
  },

  async getAll() {
    return httpClient.get("/v1/client/getAll");
  },

  async getByName(userName) {
    return httpClient.get(`/v1/client/getByName/${userName}`);
  },

  async getById(userId) {
    return httpClient.get(`/v1/client/getById/${userId}`);
  },
};
