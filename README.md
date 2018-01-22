# Rob Olsen's Blackjack JS Project
####This is Rob Olsen's technical assesment for Next Century Corporation.  It is a simple game that follows the basic rules of Blackjack:
* There will be only 2 players – a “human” player and a dealer
* The players are each dealt 2 cards to start the hand
* The player can choose to hit one or more times, or stand with any amount
* The dealer must hit if his cards total less than 17 and stand otherwise
* If the player’s or dealer’s cards total over 21, they bust and their turn is over
* If either player has 21 with their first two cards, they win (unless they both have 21 on their first two cards, in which case it is a tie)
* If both players bust, the dealer wins
* If both players have the same score, they tie
* The player always takes their turn before the dealer
* All cards count as their face value, except A which can be 1 or 11 and J, Q, K all count as 10
* The deck should be shuffled before each game
* You do not need to implement advanced blackjack rules (split, double or insurance)
* Only one deck will be used per game

> This project was built using the Vue.js framework.  Vue-loader was used to transform single-file Vue Components into a plain JavaScript module.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites
Ensure that you have a copy of the development code.  Currently, this is only available via email.  To get a copy of it, please email the creator.
Make sure you have npm installed.
[Install NPM](https://www.npmjs.com/get-npm)
Navigate to the folder you extracted the zip files from

## Build Setup


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

Copy the index.html, favicon, and dist folder to production environment.  Entry point is index.html.

## Built With

* [Vue](https://vuejs.org/) - The JavaScript framework used
* [Vue-js](https://vue-loader.vuejs.org/en/) - Webpacker and ES6 Conversion
* [Bulma](https://bulma.io/) - CSS framework

## Authors

* **Rob Olsen** 


## Acknowledgments

* Thanks for [devdojo](https://devdojo.com/blog/tutorials/create-a-deck-of-cards-in-javascript) for the deck-building help.
* Shout out to [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) for showing me how to write this README
* Big thanks to Kevin Buckley and the folks at Next Century Corporation for giving me the opportunity to learn about Vue.js.
