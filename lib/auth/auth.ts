import * as Lambda from "aws-lambda";
import * as HttpStatusCodes from "http-status-codes";
import * as constants from "./constants";

export const handler: Lambda.APIGatewayProxyHandler = async (
  event: Lambda.APIGatewayProxyEvent
) => {
  if (!event.queryStringParameters?.hasOwnProperty("code")) {
    return {
      statusCode: HttpStatusCodes.MOVED_TEMPORARILY,
      headers: {
        location: `${constants.HUE_API}/oauth2/auth?clientid=${process.env.CLIENT_ID}&appid=${process.env.APP_ID}&deviceid=${constants.DEVICE_ID}&response_type=code`
      },
      body: "Redirecting"
    };
  } else {
    return {
      statusCode: HttpStatusCodes.OK,
      body: "Success"
    };
  }
};
