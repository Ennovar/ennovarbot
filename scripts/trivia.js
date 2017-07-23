const axios = require('axios');

function getCategories() {
  const categoriesURL = 'https://opentdb.com/api_category.php';

  return axios.get(categoriesURL);
}

function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#039', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function printQuestion(question, answers, msg, correctAnswerText) {
  msg.send(question);
  var letter = 'A';
  msg.send(answers.map(function(answer) {
    if (correctAnswerText && answer === correctAnswerText) {
      correctAnswer = letter;
    }
    const option = letter + ') ' + answer + '\n';
    letter = nextChar(letter);
    return option;
  }));
}

function getQuestion(msg) {
  const URL = constructAPIURL();
  axios.get(URL).then(
    function(response) {
      question = decodeHTMLEntities(response.data.results[0].question);
      var correctAnswerText = response.data.results[0].correct_answer;
      var unrandom = response.data.results[0].incorrect_answers;
      unrandom.push(response.data.results[0].correct_answer);
      answers = shuffleArray(unrandom);
      printQuestion(question, answers, msg, correctAnswerText);
    }
  )
}

function constructAPIURL() {
  var baseURL = 'https://opentdb.com/api.php?amount=1&type=' + type;
  if (categoryID !== 'any') {
    baseURL = baseURL + '&category=' + categoryID.toString();
  }
  if (difficulty !== 'any') {
    baseURL = baseURL + '&difficulty=' + difficulty;
  }
  return baseURL;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function checkAnswer(guess, correct) {
  if (guess.toLowerCase() === correct.toLowerCase()) {
    return true;
  }
  return false;
}

function printCategories(msg) {
  getCategories()
    .then(function(response) {
    if ('trivia_categories' in response.data) {
      const trivia_categories = response.data.trivia_categories;
      msg.send(trivia_categories.map(function(category) {
        return ' ' + category.id + ': ' + category.name + '\n';
      }));
    }
  });
}

function checkIfCategory(check, msg) {
  const value = check.toLowerCase();
  if (value === 'any' || value === 'random') {
    categoryName = 'any';
    categoryID = 'any';
  }
  getCategories().then(function(response) {
    var isValid = false;
    if ('trivia_categories' in response.data) {
      for (let i = 0; i < response.data.trivia_categories.length; i += 1) {
        const category = response.data.trivia_categories[i];
        if (category.id.toString() === value || category.name.toLowerCase() === value) {
          categoryID = category.id;
          categoryName = category.name;
          isValid = true;
          msg.send('Category is now : ' + category.name);
        }
      }
      if (!isValid) {
        msg.send('Please choose a valid category');
      }
    }
  });
}

var question = '';
var answers = [];
var correctAnswer = '';
var categoryID = 'any';
var categoryName = 'any';
var difficulty = 'any';
var type = 'multiple';
var difficulties = ['Any', 'Easy', 'Medium', 'Hard'];
var answered = false;

module.exports = function(robot) {

  robot.respond(/trivia help$/i, function(msg) {
    msg.send('trivia get-categories\ntrivia get-current-category\ntrivia select-category [category(id or name)]\n\ntrivia get-difficulties\ntrivia get-current-difficulty\ntrivia select-difficulty [difficulty]\n\ntrivia get-new-question\ntrivia get-current-question\ntrivia skip-current-question\ntrivia answer-question [answer letter]');
  });

  robot.respond(/trivia get-new-question$/i, function(msg) {
    if (correctAnswer !== '') {
      correctAnswer = '';
      answered = false;
      getQuestion(msg);
    } else {
      msg.send('Please answer the current question or use trivia skip-current-question');
    }
  });

  robot.respond(/trivia get-current-question$/i, function(msg) {
    if (correctAnswer !== '') {
      printQuestion(question, answers, msg);
    } else {
      msg.send('Please get a new question first by typing: (bot?) trivia get-new-question')
    }
  });

  robot.respond(/trivia skip-current-question$/i, function(msg) {
    if (correctAnswer !== '') {
      question = '';
      answers = [];
      correctAnswer = '';
    } else {
      msg.send('You cannot skip the current question because there is no question');
    }
  });

  robot.respond(/trivia get-current-question$/i, function(msg) {
    printQuestion(question, answers, msg);
  });

  robot.respond(/trivia answer-question (.*)$/i, function(msg) {
    if (answered) {
      msg.send('This question has already been answered. Please get a new question by typing: (bot?) trivia get-new-question');
    } else {
      const input = msg.match[1];
      answered = true;
      const isCorrect = checkAnswer(input, correctAnswer);
      if (isCorrect) {
        msg.send('That is the correct answer!!!');
      } else {
        msg.send('Your answer is incorrect. The correct answer was ' + correctAnswer);
      }
      correctAnswer = '';
    }
  });

  robot.respond(/trivia select-category (.*)$/i, function(msg) {
    if (correctAnswer === '') {
      const input = msg.match[1];
      checkIfCategory(input, msg);
    } else {
      msg.send('Please answer the current question before selecting a new category');
    }
  });

  robot.respond(/trivia select-difficulty (.*)$/i, function(msg) {
    if (correctAnswer === '') {
      const input = toTitleCase(msg.match[1]);
      if (difficulties.includes(input)) {
        difficulty = input.toLowerCase();
        msg.send('The difficulty is now: ' + input);
      } else {
        msg.send('Please choose a valid difficulty');
      }
    } else {
      msg.send('Please answer the current question before selecting a new difficulty');
    }
  });

  robot.respond(/trivia get-categories$/i, function(msg) {
    printCategories(msg);
  });

  robot.respond(/trivia get-current-category$/i, function(msg) {
    msg.send('The current category is: ' + categoryName);
  });

  robot.respond(/trivia get-difficulties$/i, function(msg) {
    msg.send(difficulties);
  });

  robot.respond(/trivia get-current-difficulty$/i, function(msg) {
    msg.send('The current difficulty is: ' + toTitleCase(difficulty));
  });
}
