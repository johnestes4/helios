# README Helios

Helios is a single page application that displays a heat-map layer over a traditional google map. With the use of custom directives, angular filters, and directives provided by the angular google maps team, users are able to interact with different menu filters to display a new heatmap based on hashtag or status content.

The app uses a simple eventmachine/twitterstream gem combination to
provide our postgresql database with a stream of incoming tweet status, geo coordinates, and bounding boxes. We created a rails backend in order to serve this data as a json request that our mounted angular framework could pull from and manipulate.

The entire stack consists of postgresql for the database, Ruby on Rails for the back end custom api structure, and Angular mounted and integrated with rails for the front-end.

![ScreenShot](helois.jpg)

## Technologies Used
Rails Version ~ Rails 5.0.

The main rake file engine behind the app that grabs the data is based on the two gems that are [available](rubygems.org) at rubygems.org. Their github repositories are listed below. The different Angular resources and postgresql documentation can also be found below:
* [Angular](https://angularjs.org/) ~ Angular 1.5.8
* [Angular google maps](http://angular-ui.github.io/angular-google-maps/#!/) Angular Maps
* [Ruby on Rails](https://github.com/rails/rails) ~ Rails 5.0.
* [TweetStream](https://github.com/tweetstream/tweetstream): Connect and receive live tweets  ~ 2.6.0
* [Event Machine](https://github.com/eventmachine/eventmachine): set up tasks in combined gems ~ v1.2.0.1
* [postgresql](https://www.postgresql.org/)
* [Heroku](http://www.heroku.com/): hosting this bad boy

##App approach and planning
The app developed by [John Estes](https://github.com/johnestes4) [Michael Mahony](https://github.com/michaelmahony) and [Christopher Phillips](https://github.com/chris-A-phillips)

Before writing any code
I started with a very basic table model we had covered in class:

* User table
* Comments table

I then added tables for Tweets and Emojis since I knew that those were data types I wanted to have access to within the app.

Finally, I was able to create a join table that linked the 3 most relevant datatypes together to represent a place where an emoji was stored next to a tweet based on a user's input. This is the emojotweet table.

At its very core I wanted this app to be a simple stream, vote, and re-examine platform. User's view the stream, vote on their preferences with emojis, and then can examine other tweets that other users have also voted on.

##Back-End-Technology
The Helios backend is written in Ruby on Rails and is implemented as a JSON API. 

We query Twitter's Tweetstream API, sanitize the results as they come through in real time, and format each tweet for storage in Postgres. 

Tweets come in with a disparate amount of location data: some are fully populated with coordinates, but the majority have a Place object that defines, among other things, a bounding box that the tweet originated within.
 
We take the coordinates that define the boundaries of this box and use them to approximate a single point of origin for each tweet.

The Tweet's text, hashtags, and coordinate pair are then saved to our database to be served in response to API calls.

##Front-end-Technology


## Screencast and Demo

###Unsolved Problems
