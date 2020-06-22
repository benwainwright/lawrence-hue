import HueClient, { Data } from "./HueClient";

export default class HueApi {
  private readonly client: HueClient;

  public constructor(client: HueClient) {
    this.client = client;
  }

  public async getLights() {
    return this.client.get("/lights");
  }

  public async setLightState(id: string, state: Data) {
    return this.client.put(`/lights/${id}/state`, state);
  }
}
