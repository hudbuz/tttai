(function(){
  
  function PlayerService($http) {


    this.getPlayers = function() {
      
    return $http.get('http://localhost:3000/players')


    }



  }

  angular
    .module('app')
    .service('PlayerService', PlayerService)

}())