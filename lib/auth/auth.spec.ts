import * as Lambda from "aws-lambda";
import * as HttpStatusCodes from "http-status-codes";
import * as constants from "./constants";
import * as Verify from "verify-it";
import { handler } from "./auth";

describe("The auth function", () => {
  it("Returns a 302 redirect with the correct params if no code is supplied", async () => {
    process.env.CLIENT_ID = Verify.Gen.string();
    process.env.APP_ID = Verify.Gen.string();
    process.env.DEVICE_ID = Verify.Gen.string();

    const mockEvent = (jest.fn() as unknown) as Lambda.APIGatewayProxyEvent;
    const response = await handler(mockEvent, {} as any, {} as any);

    expect(response).toBeDefined();

    if (response) {
      expect(response.statusCode).toEqual(HttpStatusCodes.MOVED_TEMPORARILY);
      expect(response.headers).toEqual(
        expect.objectContaining({
          location: `${constants.HUE_API}/oauth2/auth?clientid=${process.env.CLIENT_ID}&appid=${process.env.APP_ID}&deviceid=${constants.DEVICE_ID}&response_type=code`,
        })
      );
    }

    delete process.env.CLIENT_ID;
    delete process.env.APP_ID;
    delete process.env.DEVICE_ID;
  });
});
