<template>
  <div id="app">
    <div class="container container_extra">
      <div class="notification rb_bg center">
          <div class="center">Welcome to Blackjack JS!</div>

          <!-- Only show before the beginning of the first game -->
          <button class="button" v-if="before_first_game" @click="beginGame();">Begin Game</button>
        
          <template v-if="!before_first_game">

            <!-- Player Names and Hands -->
            <div class="columns">
              <div class="column section" v-for="player in table.players">
                {{ player.name }}<span v-if="player.name == 'Human' || table.players[0].stand == true"> - {{ player.total }}</span><br>
                <div class="columns">

                  <!-- This displays all of the cards except for the computers first card -->
                  <div class="column" v-for="(card, key, index) in player.hand" v-if="player.name == 'Human' || table.players[0].stand == true || key == 1">

                    <!-- Card item -->
                    <table class="card_size">
                      <tr>
                        <td class="left"><span v-html="card.suit" :class="card.color"></span></td>
                        <td class="right"><span v-html="card.suit" :class="card.color"></span></td>
                      </tr>
                      <tr>
                        <td colspan="2" class="center">{{ card.name }}</td>
                      </tr>
                      <tr>
                        <td class="left"><span v-html="card.suit" :class="card.color"></span></td>
                        <td class="right"><span v-html="card.suit" :class="card.color"></span></td>
                      </tr>
                    </table>

                </div>

                  <!-- Here we'll display the computer's first card ('?' until the player stands, then it is revealed) -->
                  <div class="column" v-else>
                    <div class="card card_size">
                      <div class="content center">
                        ?
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Player buttons -->
            <button v-show="human_turn && game_active" @click="draw(1);" class="button is-success">Hit Me</button>
            <button v-show="human_turn && game_active" @click="stand();" class="button is-danger">Stand</button>

            <!-- Winner Information Section -->
            <section v-show="!game_active" class="hero">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title" v-html="winner_text">
                    <!-- {{winner_text}} -->
                  </h1>
                  <h2 class="subtitle">
                    <button v-show="!game_active" @click="startOver()" class="button is-primary">New Game</button>
                  </h2>
                </div>
              </div>
            </section>

          </template>
      </div>
    </div>

    
  </div>
</template>

<script>
import Table from './library/Table.js'

// Set initial variables and initiate table
const human_name = "Human";
const num_of_players = 2;

var myCard = {
  template:  `
    <div class="card">
      <div class="content center">
        {{ card.name }}<span v-html="card.suit" :class="card.color"></span>
      </div>
    </div>
  `
}

export default {
  name: 'app',
  data () {
    return {
      table: [],
      active_player_index: 0,
      human_turn: true,
      deck: {},
      game_active: true,
      winner_index: 0,
      winner_text: '',
      before_first_game: true
    }
  },
  methods:{
    /**
     * Resets all variables back to starting values
    */ 
    beginGame(){
      let vi = this;
      vi.table = new Table(human_name, num_of_players);
      vi.deck = vi.table.deck;
      vi.winner_text = '';

      // Deal Starting hand
      vi.table.dealStartingHand();

      // Check for initial Blackjack for both players
      if(vi.table.blackjackCheck()){
        vi.game_active = true;
        vi.before_first_game = false;

        vi.winner_text += "BLACKJACK!<br>";
        vi.announceWinner();
      }
      else{
        // Start the human player's turn
        vi.table.active_player_index = 0;
        vi.game_active = true;
        vi.advancePlayer();
        vi.before_first_game = false;
      }
    },

    /**
     * Method called when the human player presses the 'Hit Me' button.
     * Draws a card, and determines if game play is still valid
     *
     * @param  {Integer} cards_drawn Number of cards to draw
    */ 
    draw(cards_drawn){
      let vi = this;
      
      vi.table.draw(vi.active_player_index, cards_drawn);

      // Determine if game is still active
      vi.game_active = (vi.table.players[vi.active_player_index].bust) ? false : true;

      // Did the human player go bust?
      if(vi.table.halt_game){
        vi.announceWinner();
      }
    },

    /**
     * Method called when the human player presses the 'Stand' button.
     * Sets 'stand' to true and determines if game play is still valid
    */ 
    stand(){
      let vi = this;
      
      vi.table.stand(vi.active_player_index);

      // Advance play to the Computer player
      vi.table.nextPlayer();

      // Is Everybody standing?
      if(vi.table.halt_game){
        vi.announceWinner();
      }

      // If we reach this point, gameplay is still active.  Move pointers to next player.
      vi.advancePlayer();
    },

    /**
     * Basically just calls the beginGame() method, but first must set game play to active
    */ 
    startOver(){
      let vi = this;
      
      vi.game_active = true;
      vi.beginGame();
    },

    /**
     * Set the game as inactive to ensure no more moves are made and update the winner display variables
    */ 
    announceWinner(){
      let vi = this;
      
      vi.game_active = false;

      if(!vi.table.tie){
        vi.winner_index = vi.table.winner_index;
        vi.winner_text += "The winner is: " + vi.table.players[vi.winner_index].name;
      }
      else{
        vi.winner_text += "It was a tie";
      }
    },

    /**
     * Move the pointers to the next player
    */ 
    advancePlayer(){
      let vi = this;
      
      vi.active_player_index = vi.table.active_player_index;
      vi.human_turn = (vi.table.players[vi.active_player_index].name == "Human") ? true : false;
    }
  }
}
</script>

<style>
  .rb_bg{
    background-image: url('assets/red_black_bg_short.jpg');
    background-color: black;
    background-repeat: repeat-x;
    font-size: 30px;
    color: white;
  }
  .red{
    color: red;
  }
  .black{
    color:black;
  }
  .left{
    text-align: left;
  }
  .right{
    text-align: right;
  }
  .center{
    text-align: center;
  }
  div{
    text-align: left;
  }
  .card_size{
    background-color: white;
    width:50px;
    height:60px;
    font-size: 20px;
    line-height: 20px;
    color: black;
  }
  .card_size tr td{
    padding: 2px 1px;
  }
</style>
