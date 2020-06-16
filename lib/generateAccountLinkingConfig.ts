import * as AWS from "aws-sdk";
import { promises as fs } from "fs";
import * as path from "path";

const LINKING_CONFIG_FILE_NAME = "accountLinking.json";

const dirExists = async (path: string) => {
  try {
    const stat = await fs.stat("dist");
    return stat.isDirectory();
  } catch {
    return false;
  }
};

(async () => {
  const secretsManager = new AWS.SecretsManager({ region: "us-east-1" });

  console.log("Getting Client ID");
  const id = await secretsManager
    .getSecretValue({ SecretId: "LawrenceHueApp/CLIENT_ID" })
    .promise();

  console.log("Getting Client Secret");
  const secret = await secretsManager
    .getSecretValue({ SecretId: "LawrenceHueApp/CLIENT_SECRET" })
    .promise();

  const config = JSON.stringify({
    accessTokenScheme: "REQUEST_BODY_CREDENTIALS",
    accessTokenUrl: "https://api.meethue.com/oauth2/auth",
    type: "AUTH_CODE",
    clientId: id.SecretString,
    clientSecret: secret.SecretString,
  });

  console.log("Writing config to disk");

  if (!(await dirExists("dist"))) {
    await fs.mkdir("dist");
  }

  await fs.writeFile(
    path.resolve(process.cwd(), "dist", LINKING_CONFIG_FILE_NAME),
    config
  );
})().catch((error) => console.log(error));
