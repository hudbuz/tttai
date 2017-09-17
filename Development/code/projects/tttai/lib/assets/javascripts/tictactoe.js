
var settings = {'X':0, 'O':0}
var choice = ''
var wC = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]], [[0,0],[1,1],[2,2]], [[2,0],[1,1],[0,2]]]

$(document).ready(function() {

  attachListeners();



})


function attachListeners() {
  $('td').click(function(){

    var positionX = $(this).attr('data-x')
    var positionY = $(this).attr('data-y')

    doTurn(positionX, positionY)
  })

  $('.playerSettings').on('click', function(event){
    changeSettings(event);
  })
  $('#previous').on('click', function(event){
    previousGames(event);
  })

}

function changeSettings(event){
  if (event.target.value === '2'){
    settings['X'] = 1
    settings['O'] = 0
    message('Player 1 is Computer. You are Player 2')
  }
  else if (event.target.value === '1'){
    settings['X'] = 0
    settings['O'] = 1
    message('Player 2 is Computer. You are Player 1')

  }
  else{
    settings['X'] = 0
    settings['O'] = 0
    message('Both Players are Human')
  }
}

function makeXY(point){
  let coord = []
  coord.push(Math.floor(point/3))
  coord.push(point%3)
  return coord
}

function emptySpaces(board){
  empty = []

  for (i = 0; i < board.length; i ++){
    for (j = 0; j < board[i].length; j++){



    if (board[i][j] === ''){
      empty.push([j,i])
    }
  }

  }

  return empty
}
function doTurn(x,y, player) {

  var xx = '[data-x='+x+']'
  var yy = '[data-y='+y+']'

  updateState(xx,yy)
  checkWinner()
}

function aiMove(board){

  minimax(board,0)
  updateState('[data-x='+choice[0]+']', '[data-y='+choice[1]+']')

}

function player(board = null) {
  if (board === null){
  if ($('td:contains("X")').length - $('td:contains("O")').length > 0) {
    return "O"
  }
  else {
    return "X"
  }
  }
  else{

    let os = 0
    let xs = 0
    for (i = 0; i < board.length; i ++){

      for (j = 0; j < board[i].length; j ++){
        if (board[i][j] === 'X'){
          xs += 1
        }
        else if (board[i][j] === 'O'){
          os += 1
        }
      }
    }

    if (xs > os){
      return "O"

    }
  else{
    return "X"
  }}


  }



function getCell(x,y) {
  var xx = '[data-x='+x+']'
  var yy = '[data-y='+y+']'
  return $(xx+yy).text()
}

function getBoard() {
  var table = $('table tr')
  var state = [[],[],[]]
  for (i = 0; i < table.length; i ++) {
    for (c = 0; c < 3; c ++) {
      state[i].push(getCell(c,i))
    }
  }

  return state
}

// function fillBoard(array) {
//   var count = 0
//   for (i = 0; i < 3; i ++) {
//     for (c = 0; c < 3; c ++) {
//
//       $('[data-x='+c+'][data-y='+i+']').html(array[count])
//       count += 1
//
//
// }
// }
// }

function clearBoard() {

  for (i = 0; i < wC.length; i ++) {
    for (c = 0; c < wC[i].length; c ++) {

      $('[data-x='+wC[i][c][0]+']'+'[data-y=' + wC[i][c][1]+ ']').text("")
    }
}
return []
}

function updateState(x,y, board = 'screen') {
  if (board === 'screen'){

  if ($(x+y).text() === ""){

      $(x+y).html(player())
  }}
  else{
    debugger
    board[x][y] = player(board)
  }
  return board
}

function message(message) {
  $('#message').text(message)
}




function checkWinner(board = 'screen') {
if (board === 'screen'){
  var msg = false
  for (i = 0; i < wC.length; i ++) {
      if (getCell(wC[i][0][0], wC[i][0][1]) === "X" && getCell(wC[i][1][0], wC[i][1][1]) === "X" && getCell(wC[i][2][0], wC[i][2][1]) === "X") {
        msg = 'X'
        info = "Player X Won!"
        message(info)
         clearBoard()
      }
      else if (getCell(wC[i][0][0], wC[i][0][1]) === "O" && getCell(wC[i][1][0], wC[i][1][1]) === "O" && getCell(wC[i][2][0], wC[i][2][1]) === "O") {
         msg = 'O'
         info = "Player O Won!"
         message(info)
          clearBoard()

      }
  }}
  else{
    var msg = false
    for (i = 0; i < wC.length; i ++) {

        if (board[wC[i][0][1]][wC[i][0][0]] === "X" && board[wC[i][1][1]][wC[i][1][0]] === "X" && board[wC[i][2][1]][wC[i][2][0]] === "X") {
          msg = 'X'



        }
        else if (board[wC[i][0][1]][wC[i][0][0]] === "O" && board[wC[i][1][1]][wC[i][1][0]] === "O" && board[wC[i][2][1]][wC[i][2][0]] === "O") {
          msg = 'O'




        }
    }
  }
  if (msg === false && $('td:contains("X")').length === 5) {
    message("Tie game")

    clearBoard()
  }
  return msg
}

function score(board,depth){

  if (checkWinner(board) === player()){
    return 10 - depth
  }
  else if (checkWinner(board) && checkWinner(board) !== player()) {
    return depth - 10
  }
  else{
    return 0
  }

}
//
// function minimax(board, depth){
//   if (checkWinner(board)) {
//     return score(board,depth)
//   }
//
//   depth += 1
//   var scores = []
//   var moves = []
//   var es = emptySpaces(board)
//
//   for ( i = 0; i < es.length; i ++){
//     possible_move = updateState(es[i][0], es[i][1], board)
//     debugger
//     scores.push(minimax(possible_move, depth))
//     moves.push(es[i])
//   }
//
//
//   if (player() === player(board)){
//     let max_score_index = ''
//     let max_score = -10
//     for (var i = 0; i < scores.length; i ++){
//       if (scores[i] > max_score){
//         max_score_index = i
//         max_score = scores[i]
//       }
//     }
//     choice = moves[max_score_index]
//     return scores[max_score_index]
//   }
//   else{
//
//     var min_score_index = ''
//     var min_score = 10
//     for (var i = 0; i < scores.length; i ++){
//       if (scores[i] < min_score){
//
//         min_score_index = i
//         min_score = scores[i]
//       }
//     }
//     choice = moves[min_score_index]
//     return scores[min_score_index]
//
//   }
//
// }
