import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as path from "path";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";
import { SecretValue } from "@aws-cdk/core";
import { Code } from "@aws-cdk/aws-lambda";

const ID_BASE = "LawrenceHueApp";

export class LawrenceHueStack extends cdk.Stack {
  constructor(scope: cdk.Construct, props?: cdk.StackProps) {
    super(scope, `${ID_BASE}Stack`, props);

    const clientId = new secretsmanager.Secret(this, `${ID_BASE}ClientId`, {
      secretName: `${ID_BASE}/CLIENT_ID`,
    });

    const clientSecret = new secretsmanager.Secret(
      this,
      `${ID_BASE}ClientSecret`,
      {
        secretName: `${ID_BASE}/CLIENT_SECRET`,
      }
    );

    const authFunction = new lambda.Function(this, `${ID_BASE}AuthFunction`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "auth.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "..", "bundles", "auth")
      ),
      environment: {
        CLIENT_ID: SecretValue.secretsManager(clientId.secretArn).toString(),
        CLIENT_SECRET: SecretValue.secretsManager(
          clientSecret.secretArn
        ).toString(),
      },
    });

    new apigateway.LambdaRestApi(this, `${ID_BASE}Api`, {
      handler: authFunction,
    });
  }
}
