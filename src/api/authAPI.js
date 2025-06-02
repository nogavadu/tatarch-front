import { httpClient } from "./httpClient";

export const authAPI = {
  async signIn(authData) {
    return httpClient.post("/auth/singIn", authData);
  },
};
