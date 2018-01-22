/**
 * Player tracks all of the stats for an individual player
 *
 * @param  {String} player_name Name of this player
 * @param  {Integer} next_player_index Index that will be used by the table object to determine who goes after this player
 */
class Player {
    constructor(player_name, next_player_index) {
        this._name = player_name;
		this._hand = [];
		this._has_ace = false;
		this._active = (player_name == 'Human') ? true : false;
		this._stand = false;
		this._bust = false;
		this._next_player_index = next_player_index;
		this._total = 0;
    }
  
	// ES6 Getters
    get name() {
        return this._name;
    }
    get hand() {
        return this._hand;
    }
    get has_ace() {
        return this._has_ace;
    }
    get active() {
        return this._active;
    }
    get stand() {
        return this._stand;
    }
    get bust() {
        return this._bust;
    }
    get next_player_index() {
        return this._next_player_index;
    }
    get total() {
        return this._total;
    }
  
  	// ES6 Setters
    set stand(value) {
        this._stand = value;
    }
    set active(value) {
        this._active = value;
    }
  
	/**
	 * Sum the value of all cards in hand[], with special case for aces
	 */
	calculateHandValue(){
		var player_total = 0;
		this._hand.forEach(card =>{
			if(card.value == 1){
				// Special case for Aces
				player_total += 11;
				this._has_ace = true;
			}
			else{
				player_total += card.value;
			}
		})

		// Did our Ace put us over 21?
		if (player_total > 21 && this._has_ace) {
			player_total -= 10;
		}

		// Did we go bust?
		if(player_total > 21){
			this._bust = true;
		}

		this._total = player_total;
	};
}

export default Player