angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
      url: '/', 
      templateUrl: 'home.html'
      })

    .state('home.team', {
      url: 'team', 
      templateUrl: 'team/team.html'
    })
    .state('home.qb', {
      url: 'qb', 
      templateUrl: 'players/qb.html'
    })
    .state('home.rb', {
      url: 'rb', 
      templateUrl: 'players/rb.html'
    })
    .state('home.wr', {
      url: 'wr', 
      templateUrl: 'players/wr.html'
    })
    .state('home.te', {
      url: 'te', 
      templateUrl: 'players/te.html'
    })


       $urlRouterProvider.otherwise('/');


  })
