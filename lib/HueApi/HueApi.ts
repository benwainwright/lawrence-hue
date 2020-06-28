import HueClient from "./HueClient";

type LightAlertValue = "none" | "select" | "lselect";
type LightEffectValue = "none" | "colorloop";

interface SetLightStateOptions {
  on?: boolean;
  bri?: number;
  hue?: number;
  sat?: number;
  xy?: [number, number];
  ct?: number;
  alert?: LightAlertValue;
  effect?: LightEffectValue;
  bri_inc?: number;
  sat_inc?: number;
  hue_inc?: number;
  ct_inc?: number;
  xy_inc?: [number, number];
}

export default class HueApi {
  private readonly client: HueClient;

  public constructor(client: HueClient) {
    this.client = client;
  }

  public async getLights() {
    return this.client.get("/lights");
  }

  public async setLightState(id: string, state: SetLightStateOptions) {
    return this.client.put(`/lights/${id}/state`, state);
  }
}
