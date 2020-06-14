import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as LawrenceHue from '../lib/stacks/lawrence-hue-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LawrenceHue.LawrenceHueStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
