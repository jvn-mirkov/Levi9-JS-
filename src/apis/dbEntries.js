
import axios from "axios";

class EntriesApi {
  config = {
    baseURL: "http://localhost",
    port: 2020
  };
  constructor() {
    this.httpClient = axios.create({
      baseURL: `${this.config.baseURL}:${this.config.port}`
    });
  }

  getEntries() {
    return this.httpClient
      .get("/")
      .then(response =>
        response.data
      );
  }
}

export default new EntriesApi();





