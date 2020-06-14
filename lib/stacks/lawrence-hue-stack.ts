import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

const ID_BASE = "LawrenceHueApp";

export class LawrenceHueStack extends cdk.Stack {
  constructor(scope: cdk.Construct, props?: cdk.StackProps) {
    super(scope, `${ID_BASE}Stack`, props);

    const function = new lambda.Function(this, `${ID_BASE}AuthFunction`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "auth"))
    })


  }
}
