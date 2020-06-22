import HueClient from "./HueClient";
import HueApi from "./HueApi";

const asMocked = <T>(thing: jest.Mock<T>): jest.Mocked<T> => {
  return (thing as unknown) as jest.Mocked<T>;
};

describe("The HUE api", () => {
  describe("Getlights", () => {
    it("Calls GET /lights on the hue client", async () => {
      const mockClient = jest.fn() as jest.Mock<HueClient>;
      const mockedClient = asMocked(mockClient);
      mockedClient.get = jest.fn();
      const api = new HueApi(mockedClient);
      await api.getLights();
      expect(mockedClient.get).toBeCalledWith("/lights");
    });
  });

  describe("Setlights", () => {
    it("Calls PUT /lights/<id>/state route on the hue client with the correct data", async () => {
      const mockClient = jest.fn() as jest.Mock<HueClient>;
      const mockedClient = asMocked(mockClient);
      mockedClient.put = jest.fn();
      const api = new HueApi(mockedClient);
      const myId = "3";
      const newState = { on: true };
      await api.setLightState(myId, newState);
      expect(mockedClient.put).toBeCalledWith("/lights/3/state", newState);
    });
  });
});
