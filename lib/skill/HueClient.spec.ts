import HueClient from "./HueClient";
import * as constants from "./constants";
import * as nock from "nock";

describe("The Hue Client", () => {
  describe("post", () => {
    it("Sets up a whitelist user and uses it when you make requests", async () => {
      const scope = nock(constants.HUE_API);
      const token = "my-token";

      scope
        .options("/bridge/0/config")
        .optionally()
        .reply(
          200,
          {},
          {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }
        );

      scope
        .put("/bridge/0/config", '{"linkbutton":true}', {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              "/config/linkbutton": true
            }
          }
        ]);

      const deviceType = "my-device-type";
      const username = "my-returned-username";

      scope
        .post("/bridge/", `{"devicetype":"${deviceType}"}`, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              username
            }
          }
        ]);

      const myData = { myKey: "my-value" };

      scope
        .post("/bridge/my-route", myData, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200);

      const client = new HueClient(token, deviceType);
      await client.post("/my-route", myData);

      scope.done();
    });

    it("Does not try to set up a whitelist user more than once", async () => {
      const scope = nock(constants.HUE_API);
      const token = "my-token";

      scope
        .options("/bridge/0/config")
        .optionally()
        .reply(
          200,
          {},
          {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }
        );

      scope
        .put("/bridge/0/config", '{"linkbutton":true}', {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              "/config/linkbutton": true
            }
          }
        ]);

      const deviceType = "my-device-type";
      const username = "my-returned-username";

      scope
        .post("/bridge/", `{"devicetype":"${deviceType}"}`, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              username
            }
          }
        ]);

      const myData = { myKey: "my-value" };

      scope
        .post("/bridge/my-route", myData, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .times(2)
        .reply(200);

      const client = new HueClient(token, deviceType);
      await client.post("/my-route", myData);
      await client.post("/my-route", myData);

      scope.done();
    });
  });

  describe("get", () => {
    it("Sets up a whitelist user and uses it when you make requests", async () => {
      const scope = nock(constants.HUE_API);
      const token = "my-token";

      scope
        .options("/bridge/0/config")
        .optionally()
        .reply(
          200,
          {},
          {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }
        );

      scope
        .put("/bridge/0/config", '{"linkbutton":true}', {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              "/config/linkbutton": true
            }
          }
        ]);

      const deviceType = "my-device-type";
      const username = "my-returned-username";

      scope
        .post("/bridge/", `{"devicetype":"${deviceType}"}`, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              username
            }
          }
        ]);

      scope
        .get(
          "/bridge/my-route",
          {},
          {
            reqheaders: expect.objectContaining({
              authorization: `Bearer ${token}`,
              "content-type": "application/json"
            })
          }
        )
        .reply(200);

      const client = new HueClient(token, deviceType);
      await client.get("/my-route");

      scope.done();
    });

    it("Does not try to set up the whitelist user more than once", async () => {
      const scope = nock(constants.HUE_API);
      const token = "my-token";

      scope
        .options("/bridge/0/config")
        .optionally()
        .reply(
          200,
          {},
          {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }
        );

      scope
        .put("/bridge/0/config", '{"linkbutton":true}', {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              "/config/linkbutton": true
            }
          }
        ]);

      const deviceType = "my-device-type";
      const username = "my-returned-username";

      scope
        .post("/bridge/", `{"devicetype":"${deviceType}"}`, {
          reqheaders: expect.objectContaining({
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          })
        })
        .reply(200, [
          {
            success: {
              username
            }
          }
        ]);

      scope
        .get(
          "/bridge/my-route",
          {},
          {
            reqheaders: expect.objectContaining({
              authorization: `Bearer ${token}`,
              "content-type": "application/json"
            })
          }
        )
        .times(2)
        .reply(200);

      const client = new HueClient(token, deviceType);
      await client.get("/my-route");
      await client.get("/my-route");

      scope.done();
    });
  });
});
