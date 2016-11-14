// Description:
//   Allows hubot to run commands for playing hangman.
//
// Commands:
//   bot converge <server> - chef: Runs chef-client on node
//   bot converge-environment <environment> - chef: Runs chef-client across an environment
//   bot environment list -  chef: Lists all environments on chef server
//   bot knife client show <name> - chef: Display client configurations et al
//   bot knife node show <name> - chef: Display node run_list et al
//   bot knife role show <name> - chef: Display role configurations et al
//   bot knife status - chef: Display status for all nodes
//   bot node list - chef: Lists all nodes on chef server
//   bot node show <node> - chef: Get knife status of all nodes
//   bot uptime <server> - chef: Prints uptime per node
//
// Authors:
//   jerekshoe
//   NOTE: everyone please add your gitlab usernames here
//

const words = require('../constants/words.js');
var hangState = [
  '           _____      \n' +
  '          |         |     \n' +
  '          |          \n' +
  '          |          \n' +
  '          |          \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |          \n' +
  '          |          \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |         |     \n' +
  '          |          \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |         |     \n' +
  '          |      /      \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |         |     \n' +
  '          |      /   \\    \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |       /\|    \n' +
  '          |      /   \\    \n' +
  ' _____|_____     \n',
  '           _____      \n' +
  '          |         |     \n' +
  '          |        O     \n' +
  '          |       /\|\\\ \n' +
  '          |      /   \\   \n' +
  ' _____|_____     \n'
];

function didComplete() {
  for (var i = 0; i < word.length; i += 1) {
    if (guesses.indexOf(word[i]) === -1) {
      return false;
    }
  }
  return true;
}

function didMiss(guess) {
  if (word.indexOf(guess) === -1) {
    misses += 1;
  }
}

function endGame() {
  if (misses === 6) {
    message = 'You lose :sob:' + '\n' + word;
  } else if (didComplete()) {
    message =  'You win :sunglasses:!!!';
  }
  category = '';
  guesses = [];
  misses = 0;
  word = '';
  inProgress = false;
  return message;
}

function guessLetter(guess) {
  guesses.push(guess);
  didMiss(guess);
}

function guessWord(guess) {
  if (guess === word) {
    for (var i = 0; i < guess.length; i += 1) {
      if (guesses.indexOf(guess[i]) === -1) {
        guesses.push(guess[i]);
      }
    }
  } else {
    misses += 1;
  }
}

function hasGuessed(guess) {
  return guesses.indexOf(guess) !== -1
}

function isGameOver() {
  if (misses === 6 || didComplete()) {
    return true;
  }
  return false;
}

function isCategory(input) {
  return Object.keys(words).indexOf(input) !== -1;
}

function isLetter(char) {
  return char.length === 1 && char.match(/[a-z]/i);
}

function isWord(guess) {
  return /[a-z]+/.test(guess);
}

function isValidGuess(guess) {
  return guess.length === word.length;
}

// Function: printGuesses
// Description: Prints all of the letters that have been guessed
// Input:
// - guesses: Array of chars
// Output:
// - string: String of the form 'a, b, c'
function printCategory(category) {
   return '\n  ' + category.toUpperCase();
}

// Function: printGuesses
// Description: Prints all of the letters that have been guessed
// Input:
// - guesses: Array of chars
// Output:
// - string: String of the form 'a, b, c'
function printGuesses(guesses) {
   var string = ` `;
   for (var i = 0; i < guesses.length; i += 1) {
     string += guesses[i];
     // Every letter but the last gets a ,
     if (i !== guesses.length - 1) {
       string += ', ';
     }
   }
   return string;
}

// Function: printHangman
// Description: Print the hangmans state
// Input:
// - state: Hangman state
// Output:
// -: String containing the hangman state
function printHangman() {
  return hangState[misses];
}

// Function: printSpaces
// Description: Print spaces and letters in their right places
// Input:
// - word: Correct word string
// - guesses: Array of letters
// Output:
// - spacedWord: String of the form '_ _ a _ b _'
function printSpaces(word, guesses) {
  var spacedWord = '';
  for (var i = 0; i < word.length; i++) {
    // Letter hasn't been guessed
    if (guesses.indexOf(word[i]) === -1 && word[i] !== ' ') {
      spacedWord += ' __ ';
    } else {
      spacedWord += ' ' + word[i] + ' ';
    }
  }
  return spacedWord + '\n';
}

// Function: printStatus
// Description: Prints the games' current status
// Input:
// - word: String
// - guesses: Array of chars
// - state: Integer
// Output:
// -: String of the entire state
function printStatus() {
  if (inProgress) {
    return printCategory(category) + '\n' +
      printHangman() + '\n' +
      printSpaces(word, guesses) + '\n' +
      printGuesses(guesses);
  } else {
    return 'There is no game in progress';
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function prepareCategories(categories) {
  return Object.keys(categories).map(function (category, i) {
    if (i !== 0) {
      return ' ' + category.toUpperCase();
    }
    return category.toUpperCase();
  });
}

function randomWord(category) {
  const index = Math.floor((Math.random() * words[category].length - 1) + 1);
  return words[category][index];
}

function restartGame() {
  category = '';
  guesses = [];
  word = '';
  misses = 0;
  inProgress = true;
}

function startGame(category) {
  inProgress = true;
  word = randomWord(category);
}

var category = '';
var guesses = [];
var word = '';
var misses = 0;
var inProgress = false;

// printStatus('animals', 'apple', ['a', 'b', 'c', 'd'], 1)

// Main function
module.exports = function(robot) {

  // hangman categories
  robot.respond(/hangman categories$/i, function(msg) {
    msg.send(prepareCategories(words));
  });

  // hangman category
  robot.respond(/hangman category$/i, function(msg) {
    msg.send(category.toUpperCase());
  });

  // hangman info
  robot.respond(/hangman info$/i, function(msg) {
    msg.send('info');
  });

  // hangman guess (a letter)
  robot.respond(/hangman guess (.*)$/i, function(msg) {
    if (inProgress) {
      var input = msg.match[1].toLowerCase();
      if (input.length === 1) {
        if (isLetter(input)) {
          if (!hasGuessed(input)) {
            guessLetter(input);
            msg.send(printStatus());
            if (isGameOver()) {
              msg.send(endGame());
            }
          } else {
            msg.send('Choose a different letter moron');
          }
        } else {
          msg.send('Please choose a letter next time');
        }
      } else {
        if (isWord(input) && isValidGuess(input)) {
          guessWord(input);
          msg.send(printStatus());
          if (isGameOver()) {
            msg.send(endGame());
          }
        } else {
          msg.send('Please enter a valid word dumbo');
        }
      }
    } else {
      msg.send('Start a game first');
    }
  });

  // hangman play
  robot.respond(/hangman play$/i, function(msg) {
    if (!inProgress) {
      msg.send('Please select a category then type hangman play <category>:\n');
      msg.send(prepareCategories(words));
    } else {
      msg.send('There is already a game in progress. Wait your turn');
    }
  });

  // hangman play
  robot.respond(/hangman play (.*)$/i, function(msg) {
    if (!inProgress) {
      input = msg.match[1].toLowerCase();
      if (isCategory(input)) {
        category = input;
        startGame(category);
        msg.send(printStatus());
      } else {
        msg.send('Please choose a valid category');
      }
    } else {
      msg.send('There is already a game in progress. Wait your turn');
    }
  });

  // hangman restart
  robot.respond(/hangman restart$/i, function(msg) {
    msg.send('Please select a category then type hangman restart <category>:\n');
    msg.send(prepareCategories(words));
  });

  // hangman restart
  robot.respond(/hangman restart (.*)$/i, function(msg) {
    if (inProgress) {
      input = msg.match[1].toLowerCase();
      if (isCategory(input)) {
        restartGame();
        category = input;
        startGame(category);
        msg.send(printStatus());
      } else {
        msg.send('Please choose a valid category');
      }
    } else {
      msg.send('There is no game in progress dummy');
    }
  });

  // hangman status
  robot.respond(/hangman status$/i, function(msg) {
    msg.send(printStatus());
  });
}
