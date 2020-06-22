import axios, { AxiosInstance } from "axios";
import * as constants from "./constants";
import * as url from "url";

interface Data {
  [key: string]: string;
}

export default class HueClient {
  private readonly deviceType: string;
  private readonly api: AxiosInstance;

  private username?: string;

  public constructor(token: string, deviceType: string) {
    this.deviceType = deviceType;
    this.api = axios.create({
      baseURL: url.resolve(constants.HUE_API, "/bridge"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  }

  private async getUsername(): Promise<string> {
    if (!this.username) {
      await this.api.put("/0/config", { linkbutton: true });
      const response = await this.api.post("/", {
        devicetype: this.deviceType
      });
      const username = response.data[0].success.username;
      this.username = username;
      return username;
    } else {
      return this.username;
    }
  }

  public async get(route: string, data: Data = {}) {
    const username = await this.getUsername();
    return this.api.get(url.resolve(username, route), data);
  }

  public async post(route: string, data: Data = {}) {
    const username = await this.getUsername();
    return this.api.post(url.resolve(username, route), data);
  }
}
