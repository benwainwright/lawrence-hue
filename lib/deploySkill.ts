import * as AWS from "aws-sdk";
import * as execa from "execa";

(async () => {
  const secretsManager = new AWS.SecretsManager({ region: "us-east-1" });

  console.log("Deploying skill");
  const { stdout } = await execa.command("ask deploy");
  const skillIdRegex = /^Skill ID: (?<skillId>.*)$/gm;
  const matches = skillIdRegex.exec(stdout.toString());
  const skillId = matches?.groups?.skillId;

  console.log("Getting Client ID");
  const id = await secretsManager
    .getSecretValue({ SecretId: "LawrenceHueApp/CLIENT_ID" })
    .promise();

  console.log("Getting Client Secret");
  const secret = await secretsManager
    .getSecretValue({ SecretId: "LawrenceHueApp/CLIENT_SECRET" })
    .promise();

  const linkingConfig = JSON.stringify({
    accessTokenScheme: "REQUEST_BODY_CREDENTIALS",
    accessTokenUrl: "https://api.meethue.com/oauth2/auth",
    type: "AUTH_CODE",
    clientId: id.SecretString,
    clientSecret: secret.SecretString
  });

  console.log("Updating account linking info");
  const command = `ask smapi update-account-linking-info \
                             --skill-id ${skillId} \
                             --stage development \
                             --account-linking-request '${linkingConfig}'`;

  const { stdout: linkingOutput } = await execa.command(command);
  console.log(linkingOutput);
})().catch(error => console.log(error));
