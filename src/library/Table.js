import Player from './player.js'
import Deck from './Deck.js'

/**
 * Table is the main interface between App.vue and the rest of the objects
 *
 * @param  {String} player_name Name of the human player
 * @param  {Integer} num_of_players Total number of players in this game
 */
class Table {
    constructor(player_name, num_of_players) {
        this._players = [];
		this._active_player_index = 0;
		this._halt_game = false;
		this._winner_index;
		this._tie = false;

		// Initiate and shuffle the deck
		this._deck = new Deck();
		this._deck.shuffle(3);

		// Add human and num_of_players computer players to the table
		var human_player = new Player(player_name, 1);
		this._players.push(human_player);

		for (var i = 1; i < num_of_players; i++) {
			var next_player_index = (i+1 == num_of_players) ? 0 : i+1;
			this._players.push(new Player("Computer", next_player_index));
		};

    }

    // ES6 Getters
    get players(){
    	return this._players;
    }
    get active_player_index(){
    	return this._active_player_index;
    }
    get halt_game(){
    	return this._halt_game;
    }
    get winner_index(){
    	return this._winner_index;
    }
    get tie(){
    	return this._tie;
    }
    get deck(){
    	return this._deck;
    }

    // ES6 Setters
    set active_player_index(value) {
        this._active_player_index = value;
    }
  
    
	/**
	 * Deal 2 cards to each player and calculate their total values
	 */
	dealStartingHand(){
		this._deck.deal(this._players, 2);

		this._players.forEach(player => {
			player.calculateHandValue();
		})
	}

	/**
	 * Determine if any player got a Blackjack
	 * 
	 * @return {Boolean} Flag denoting weather any player got a Blackjack
	 */
	blackjackCheck(){
		let high_score = 0;
		let local_winner_index;
		let local_tie = false;
		let blackjack = false;

		this._players.forEach(function(player, index){
			if(player.total == 21){
				// A player got a Blackjack.  Set winner_index to that player
				high_score = player.total;
				local_winner_index = index;
				blackjack = true;
			}
			else if(player.total == high_score){
				// Only enter this condition if both players got a Blackjack.  Set tie to true
				local_tie = true;
			}
		});

		// Set parent tie variable based on outcome
		this._winner_index = local_winner_index;
		this._tie = local_tie;

		return blackjack;
	}

	/**
	 * Deal 'cards_drawn' cards to active_player_index, calculate total value, determine 
	 * if game play is still active
	 *
 	 * @param  {Integer} active_player_index Index of this.players[] of the currently active player
 	 * @param  {Integer} cards_drawn Number of cards to draw
	 */
	draw(active_player_index, cards_drawn){
		this._deck.deal([this._players[active_player_index]], 1);

		this._players[active_player_index].calculateHandValue();

		// Currently active player went bust
		if(this._players[this._active_player_index].total > 21){
			this._halt_game = true;
			this._winner_index = this.determineWinner();
		}
	}

	/**
	 * Set the currently active player.stand = true
	 *
 	 * @param  {active_player_index} active_player_index Index of this.players[] of the currently active player
	 */
	stand(active_player_index){
		this._players[active_player_index].stand = true;
	}

	/**
	 * Determine who the next player is.  If all players are standing, 
	 * set game play to false and determine the winner
	 */
	nextPlayer(){
		var next_player_index = this._players[this._active_player_index].next_player_index;

		// Continue game if not all players are standing
		if(!this.allStandCheck()){
			// Advance through the players until we come to a player that is not standing
			while(this._players[next_player_index].stand == true){
				// Set current pointer 'active' to false
				this._players[this._active_player_index].active = false;

				// Move pointer to next player
				next_player_index = this._players[next_player_index].next_player_index;
				this._active_player_index = next_player_index;

				// Set current pointer 'active' to true
				this._players[this._active_player_index].active = true;
			}

			this._active_player_index = next_player_index;

			// If the next player is a computer, start the computer's move
			if(this._players[this._active_player_index].name != "Human"){
				this.computerTurn();
			}
		}
		else{
			// All players are standing.  Set game play to false and determine the winner
			this._halt_game = true;
			this._winner_index = this.determineWinner();
		}
	}

	/**
	 * The computer will draw cards until hand total >= 17, then stand
	 */
	computerTurn(){
		// If the computer player's hand < 17, draw another card
		if(this._players[this._active_player_index].total < 17){
			this.draw(this._active_player_index, 1);
		}
		else{
			this.stand(this._active_player_index);
		}

		// Here, use the nextPlayer() function to determine if the
		// game play is false, or if the computer should draw 
		// another card
		this.nextPlayer();
	}

	/**
	 * Determine if all players have decided to stand
	 * 
	 * @return {Boolean} Flag denoting all players have decided to stand
	 */
	allStandCheck(){
		var all_stand = true;
		this._players.forEach(player =>{
			if(!player.stand){
				all_stand = false;
			}
		});
		return all_stand;
	}

	/**
	 * This method is to be called after a player goes bust, or all
	 * players have decided to stand.  Loops through all players determining
	 * who had the highest total.  In the case of a tie, sets the parents'
	 * 'tie' variable to true
	 * 
	 * @return {Integer} Index of this.players[] winner
	 */
	determineWinner(){
		var high_score = 0;
		var winner_index;
		var local_tie = false;

		this._players.forEach(function(player, index){
			if(player.total > high_score && player.total <= 21){
				high_score = player.total;
				winner_index = index;
			}
			else if(player.total == high_score){
				// Only enter this condition if both players got the same score.  Set tie to true
				local_tie = true;
			}
		});

		// Set parent tie variable based on outcome
		this._tie = local_tie;

		return winner_index;
	}
}

export default Table