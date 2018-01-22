import Card from './Card.js'

/**
 * The deck object contains the array of card objects, as well as the functions
 * for manipulating the deck
 */
class Deck {
    constructor(name) {
        this._cards = [];
		this._names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		this._suits = ['&hearts;','&diams;','&spades;','&clubs;'];
	  	this._color_map = {'&hearts;':'red', '&diams;':'red', '&spades;':'black','&clubs;':'black'};

		// Build the default deck (one of each card in a standard deck)
		for( var s = 0; s < this._suits.length; s++ ) {
			for( var n = 0; n < this._names.length; n++ ) {
				var value = (n >= 9) ? 10 : n+1;
				this._cards.push( new Card( value, this._names[n], this._suits[s], this._color_map[this._suits[s]] ) );
			}
		}

		console.log(this._cards);
    }
  
  	// ES6 Getters
    get cards() {
        return this._cards;
    }
  
	/**
	 * Shuffles the deck by switching 2 cards at a time based on Math.random()
	 *
 	 * @param  {Integer} shuffles Number of times to shuffle
	 */
	shuffle(shuffles){
		var my_cards = this.cards;

		for (var i = 0; i < shuffles; i++) {
			my_cards.forEach(function(card, index){
				var size_of_deck = my_cards.length;
				var shuffle_location = Math.floor(Math.random() * size_of_deck);
				var tmp_card = my_cards[shuffle_location];

				// Swap current card with the randomly selected card
				my_cards[shuffle_location] = my_cards[index];
				my_cards[index] = tmp_card;
			});
		}
	}

	/**
	 * Function to be used to deal multiple cards to multiple players
	 * switching each player between draws
	 *
 	 * @param  {Array} players Array of player objects
 	 * @param  {Integer} cards_dealt Number cards to deal
	 */
	deal(players, cards_dealt){
		var local_obj = this;

		for (var i = 0; i < cards_dealt; i++) {
			players.forEach(player =>{
				local_obj.draw(player,1);
			});
		}
	}

	/**
	 * Function to be used to deal cards to a single player
	 *
 	 * @param  {Object} player Player object
 	 * @param  {Integer} cards_drawn Number cards to deal
	 */
	draw(player, cards_drawn){
		for (var i = 0; i < cards_drawn; i++) {
			player.hand.push(this.cards.shift());
		}
	}
}

export default Deck