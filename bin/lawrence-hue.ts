#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { LawrenceHueStack } from "../lib/stacks/lawrence-hue-stack";

const app = new cdk.App();
new LawrenceHueStack(app, {
  env: {
    region: "us-east-1",
    account: "661272765443"
  },
});
