// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory } = require('botbuilder');
// Import AdaptiveCard content.
const FlightItineraryCard = require('../resources/FlightItineraryCard.json');
const ImageGalleryCard = require('../resources/ImageGalleryCard.json');
const LargeWeatherCard = require('../resources/LargeWeatherCard.json');
const RestaurantCard = require('../resources/RestaurantCard.json');
const SolitaireCard = require('../resources/SolitaireCard.json');

// Create array of AdaptiveCard content, this will be used to send a random card to the user.
const CARDS = [
    FlightItineraryCard,
    ImageGalleryCard,
    LargeWeatherCard,
    RestaurantCard,
    SolitaireCard
];

const WELCOME_TEXT = 'This bot will introduce you to Adaptive Cards. Type anything to see an Adaptive Card.';

class AdaptiveCardsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Welcome to Adaptive Cards Bot  ${ membersAdded[cnt].name }. ${ WELCOME_TEXT }`);
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            // var randomlySelectedCard = CARDS[Math.floor((Math.random() * CARDS.length - 1) + 1)];
            const text = context.activity.text.toLowerCase();
            switch (text) {
            case '1':
                await context.sendActivity({ text: 'adap1:', attachments: [CardFactory.adaptiveCard(CARDS[0])] });
                break;
            case '2':
                await context.sendActivity({ text: 'adap2:', attachments: [CardFactory.adaptiveCard(CARDS[1])] });
                break;
            case '3':
                await context.sendActivity({ text: 'adap3:', attachments: [CardFactory.adaptiveCard(CARDS[2])] });
                break;
            case '4':
                await context.sendActivity({ text: 'adap4:', attachments: [CardFactory.adaptiveCard(CARDS[3])] });
                break;
            case '5':
                await context.sendActivity({ text: 'adap5:', attachments: [CardFactory.adaptiveCard(CARDS[4])] });
                break;
            default:
                await context.sendActivity(`This is a simple Welcome Bot sample. You can say 'intro' to
                                                see the introduction card. If you are running this bot in the Bot
                                                Framework Emulator, press the 'Start Over' button to simulate user joining a bot or a channel`);
            }
            // await context.sendActivity({
            //     text: 'Here is an Adaptive Card:',
            //     attachments: [CardFactory.adaptiveCard(randomlySelectedCard)]
            // });

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.AdaptiveCardsBot = AdaptiveCardsBot;
