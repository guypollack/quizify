# 🎧 Quizify - A Music Quiz Using Spotify API

## What is Quizify?

Quizify is an interactive music quiz app built by Guy Pollack, using React, HTML, CSS and JavaScript.  
It was created as a project to practice using React and JavaScript's Fetch API, and for users to have fun by testing their knowledge of their favourite artists!

## How Do I Play?

1. You can play by visiting [http://quizify-music.surge.sh/](http://quizify-music.surge.sh/).

2. To use the app, sign in to Spotify when prompted using these details - Username: quizify_user@guypollack.com; Password: LetMePlay.

3. Once you have signed in, enter the name of an artist in the 'Choose an Artist' box and confirm your selection by clicking on the correct name from the dropdown that appears. The dropdown options will change as you type, as the app sends requests to Spotify's API to find your chosen artist.

4. Then enter your guesses of the artist's top 5 tracks on Spotify in the appropriate fields, and confirm your selections by clicking on the correct track names from the dropdowns. Once again, the dropdown options will change as you type, as the app sends requests to the API. Please note, an artist's top 5 tracks are not necessarily their 5 most played songs on Spotify; there is a note in the app explaining this in more detail.

5. When you are happy with your selections, click 'CHECK MY ANSWERS' and the app will mark your guesses in the following way:
  * 3 points for guessing a _correct_ track in the _correct_ position in the artist's top 5
  * 1 point for guessing a _correct_ track in the _wrong_ position in the artist's top 5
  * 0 points for guessing a _wrong_ track

6. The app will display your score for the current artist out of a maximum of 15 points, as well as keeping track of your total score at the top of the page.