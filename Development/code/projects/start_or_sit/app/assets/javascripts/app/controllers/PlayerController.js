(function(){
  
function PlayerController(players, $filter, position) {

   
   
    var player = this
    player.data = players.data
    

    player.left = ""
    player.right = ""


    player.filteredList = $filter('filter')(player.data, position)


    player.searchFilter = function() {
    
      player.searchedList = $filter('filter')(player.filteredList, player.left)
    }
    player.searchedList = []


}

angular 
  .module('app')
  .controller('PlayerController', PlayerController)

}())