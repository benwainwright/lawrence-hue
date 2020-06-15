import * as Alexa from "ask-sdk";
import * as AlexaModel from "ask-sdk-model";

const canHandle = (handlerInput: Alexa.HandlerInput): boolean => {
  return handlerInput.requestEnvelope.request.type === "LaunchRequest";
};

const handle = (handlerInput: Alexa.HandlerInput): AlexaModel.Response => {
  const speechText = "Welcome to the Alexa Skills Kit, you can say hello!";

  return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard("Hello World", speechText)
    .getResponse();
};

const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle,
  handle,
};
