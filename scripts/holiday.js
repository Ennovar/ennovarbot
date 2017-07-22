// Description:
//   Play Blackjack through hubot
//
// Dependencies:
//
//
// Commands:
//   hubot deal - Puts you in the current blackjack game.  Starts a new game if there is none.
//   hubot hit - Adds 1 card to your hand
//   hubot stand - Holds your current total until the end of the round
//
//
// Author:
//   Ryan Fisher and Austin Crane

var phrases = { 
  'Santa Claus': 'http://www.christmas-clipart.com/free_christmas_clip_art_images/santa_claus_saying_ho_ho_ho_0515-0911-2122-4251_SMU.jpg',
  'Jingle Bells': 'Jingle Bells! Batman smells. Robin laid an egg...',
  'Silent Night': 'Silent Night, Holy Night, All is Calm, All is Bright!',
  'turkey': 'http://www.onhold.on.ca/wordpress/wp-content/uploads/2016/10/eat-ham.png',
  'new year': 'http://animations.fg-a.com/new-year/happy-new-year-fireworks.gif',
  'Christmas tree': 'https://media.giphy.com/media/lzU2Vr8csxioM/giphy.gif',
  'Valentine': 'http://bestanimations.com/Holidays/Valentines/greetings/pusheen-happy-valentines-day-animated-gif.gif',
  'Patrick': 'http://orig01.deviantart.net/524c/f/2012/077/0/1/happy_st__patrick__s_day______from_patrick_star_by_dxvsnwo1994-d4t5euy.jpg',
  'Easter eggs': 'http://bestanimations.com/Holidays/Easter/snoopy-throwing-easter-eggs-animated-gif-1.gif',
  '4th of July': 'http://bestanimations.com/Holidays/Fireworks/4thofjuly/happy-4th-of-july-fireworks-animation-33.gif',
  'Independence': 'https://midweekwire.files.wordpress.com/2013/12/washingtonc.jpg',
  'Veterans Day': 'https://c.tadst.com/gfx/750w/american-veteran.jpg?1',
  'Halloween': 'https://media.giphy.com/media/qUHxAava8vmUg/giphy.gif',
  'Hanukkah': 'http://cdn.history.com/sites/2/2013/12/hanukkah-dreidel.jpg',
  'Eid': 'http://eidmubarakwishess.com/wp-content/uploads/2016/04/Happy-Eid-Cards-1024x768.jpg',
  'Ramadan': 'http://www.isglmasjid.org/uploads/2/4/6/3/24639313/s187386973411428658_p33_i1_w250.jpeg',
  'reindeer': 'https://s-media-cache-ak0.pinimg.com/originals/5d/81/3c/5d813c61558edba429fe0549da299379.png',
  'Rudolph': 'https://i.ytimg.com/vi/mfWH2AVSrww/hqdefault.jpg',
  'gingerbread': 'http://www-tc.pbs.org/food/wp-content/blogs.dir/2/files/2013/12/gingerbread-5.jpg',
  'candy canes': 'http://www.picgifs.com/graphics/c/christmas-candy-cane/graphics-christmas-candy-cane-562089.gif',
  'snowman': 'https://media.giphy.com/media/gSxwClHFJeTQc/giphy.gif',
  'candy': 'https://media.giphy.com/media/5kvGTbNJqi5nG/giphy.gif',
  'first day of Christmas': 'On the first day of Christmas my true love gave to me...a partridge in a pear tree!',
  'deck the halls': 'Deck the halls with boughs of holly, fa la la la LA la la la la!'
}
// sleep time expects milliseconds
 function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}


var selectedPhrase = "";
module.exports = function(robot) {
	   robot.listen(
      // this function should return true if the bot should respond
      // return false meanse response function wont get called
      function(msg) {
		if(msg != undefined) {
        var message = msg.message.text.toLowerCase();

          for (var key in phrases)
            {
              if (message == key.toLowerCase()) {
                selectedPhrase = phrases[key];
                return true;
              }
            }
		}
    },
    function(msg) {
	if(msg != undefined) {
      msg.send(selectedPhrase);
	}
    }
    );
}
