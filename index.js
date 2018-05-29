/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.ae375e59-cabd-4d7c-8243-8f88c2122920';

const SKILL_NAME = 'Flattery';
const GET_FACT_MESSAGE = "Hope this makes you feel better: ";
const GET_ADV_MESSAGE = "This should help: ";
const HELP_MESSAGE = 'I am here to brighten your day...ask me how I can cheer you up!';
const HELP_REPROMPT = 'How may I help you?';
const STOP_MESSAGE = 'Thank you for using Flattery';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'You are a gift to those around you',
    'You are wonderful',
    'People laugh a little harder when you tell the joke',
    'You are really something special',
    'I admire you, for being you',
    'All other Alexas are jealous because I am here with you',
    'I am honored to be your Alexa',
    'Take a deep breath and remember, you got this',
    'Give yourself a pat on the back, because you have accomplished a lot',
    'You are one of a kind, I know because I have searched multiple databases and nothing came remotely similar to you'
];
const advice = [
'Just take a deep breath and look back at everything you did to get you this far',
'Sometimes listening to classical music or jazz music clears your mind and creates coherent thoughts',
'They say for every 45 minutes of studying, you should take a 15 minute break',
'If you give up, then you set a limit. Go past your limits and you will impress yourself',
'Try something new and see if it works, otherwise back to the drawing board',
'Take some time to talk it out or write it down'
];
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('Compliment');
    },
    'Compliment': function () {
        const CompArr = data;
        const compliments = Math.floor(Math.random() * CompArr.length);
        const randComp = CompArr[compliments];
        const speechOutput = GET_FACT_MESSAGE + randComp;

        this.response.cardRenderer(SKILL_NAME, randComp);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AdviseMe': function () {
       const Comp = advice;
       const response = Math.floor(Math.random() * Comp.length);
       const randAdv = Comp[response];
       const speechOutput = GET_ADV_MESSAGE + randAdv;
       
       this.response.cardRenderer(SKILL_NAME, randAdv);
       this.response.speak(speechOutput);
       this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
