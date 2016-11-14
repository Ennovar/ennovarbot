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
  'Independence Day': 'http://www.punjabigraphics.com/images/1/happy-independence-day.gif',
  'independence': 'http://s3.amazonaws.com/mtv-main-assets/files/resources/large_painting-of-the-crossing-of-the-delaware.jpg',
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
  'deck the halls': 'Deck the halls with boughs of holly, fa la la la LA la la la la!',
  'Easter': 'https://media.giphy.com/media/iTwkMeBGvj6r6/giphy.gif',
  'Pi Day': 'http://blog.freshtix.com/wp-content/uploads/2015/02/pieday4.jpg',
  'snowflake': 'https://s-media-cache-ak0.pinimg.com/originals/ab/4d/dd/ab4dddb377673da5837b706c82a14582.gif',
  'snow': 'https://shechive.files.wordpress.com/2014/08/snow-plow-o.gif?w=320&h=240',
  'new years': 'https://66.media.tumblr.com/3a08baaebe1d415b07d49b564812cf73/tumblr_myf7uxSD6m1s3zxldo1_500.gif',
  'Qing Ming Jie': 'http://journeymart.com/gifs/holidays-ideas/festivals/qingming-festival.jpg',
  'Dragon Boat Festival': 'http://www.blazesports.org/wp-content/uploads/2014/08/dragonBOAT1.jpg',
  'Tet Eve': 'https://vietnamweaselcoffee.files.wordpress.com/2016/01/4358145853_f8b3aecf06_o.jpg?w=1000',
  'Tet': 'http://www.eatingsaigon.com/wp-content/uploads/tet-1-451x500.png',
  'Chinese New Year': 'http://kaytons.co.uk/wp-content/uploads/2016/01/blog18.jpg',
  'Lent': 'http://www.dwellingplaceindy.org/wp-content/uploads/2016/02/lent.jpg',
  'Good Friday': 'https://s-media-cache-ak0.pinimg.com/originals/87/c5/a6/87c5a6ada33313b643b8944ee76c65d6.jpg',
  'Day of the Dead': 'http://www.inwhiteriver.com/wp-content/uploads/2016/10/Day-of-the-Dead-skulls-copy.jpg',
  'Dia de los Muertos': 'http://blogs.lib.luc.edu/locl/files/2015/10/DAY-OF-THE-DEAD-TANKA.jpg',
  'Presidents Day': 'http://24myfashion.com/2016/wp-content/uploads/2015/12/wpid-Happy-Presidents-Day-Sign-pictures-2016-0.jpg',
  'April showers': 'April showers bring May flowers!',
  'The First Noel': 'The First Noel the angel did say, was to certain poor shepherds in fields as they lay...',
  'O Christmas tree': 'O Christmas tree, O Christmas tree, how lovely are thy branches!',
  'Auld Lang Syne': 'For auld lang syne, my dear, For auld lang syne. We\'ll take a cup o\' kindness yet, For auld lang syne.',
  'Mother\'s Day': 'http://bestanimations.com/Holidays/MothersDay/pretty-pink-sparkle-flowers-happy-mothers-day-greeting-card-gif.gif',
  'Fathers\'s Day': 'https://media.giphy.com/media/FmfvhM00hwwPm/giphy.gif',
  'Rudolph the Red-nosed Reindeer': 'Rudolph the Red-Nosed Reindeer [reindeer], had a very shiny nose [like a light bulb!], and if you ever saw him [saw it], you could even say it glowed [like a flash light!]...',
  'Frosty the Snowman': 'Frosty the Snowman, was a jolly happy soul, With a corn cob pipe and a button nose, and two eyes made of coal.'
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
        var message = msg.message.text.toLowerCase();

          for (var key in phrases)
            {
              if (message == key.toLowerCase()) {
                selectedPhrase = phrases[key];
                return true;
              }
            }
    },
    function(msg) {
      msg.send(selectedPhrase);
    }
    );
}
