import axios, { AxiosInstance } from "axios";
import * as constants from "./constants";
import * as url from "url";

export default class HueClient {
  /**
   * Handles HTTP requests to the Hue Bridge
   * when provided with an access token
   */
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

  public async get(route: string) {
    const username = await this.getUsername();
    return this.api.get(url.resolve(username, route));
  }

  public async put(route: string, data: unknown = {}) {
    const username = await this.getUsername();
    return this.api.put(url.resolve(username, route), data);
  }

  public async post(route: string, data: unknown = {}) {
    const username = await this.getUsername();
    return this.api.post(url.resolve(username, route), data);
  }
}
