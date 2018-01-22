/**
 * Simple object for setting card values
 *
 * @param  {Integer} value Numerical value of this card
 * @param  {String} name Value to be displayed
 * @param  {String} suit Name of the suit
 */

class Card {
    constructor(value, name, suit, color) {
	  this._value = value;
	  this._name = name;
	  this._suit = suit;
	  this._color = color;
    }
  
  	// ES6 Getters
    get value() {
        return this._value;
    }
    get name() {
        return this._name;
    }
    get suit() {
        return this._suit;
    }
    get color() {
        return this._color;
    }
  
  	// ES6 Setters
    set value(value) {
        this._value = value; 
    }
    set name(value) {
        this._name = value; 
    }
    set suit(value) {
        this._suit = value; 
    }
}

export default Card