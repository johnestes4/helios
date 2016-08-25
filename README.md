# README Helios

Helios is a single page application that displays a heat-map layer over a traditional google map. With the use of custom directives, angular filters, and directives provided by the angular google maps team, users are able to interact with different menu filters to display a new heatmap based on hashtag or status content.

The app uses a simple eventmachine/twitterstream gem combination to
provide our postgresql database with a stream of incoming tweet status, geo coordinates, and bounding boxes. We created a rails backend in order to serve this data as a json request that our mounted angular framework could pull from and manipulate.

The entire stack consists of postgresql for the database, Ruby on Rails for the back end custom api structure, and Angular mounted and integrated with rails for the front-end.

![ScreenShot](Front.jpg)
![ScreenShot](helois.jpg)

## Technologies Used
Angular Version ~ Angular 1.5.8
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
The app was developed and is currently being maintained and built on by [John Estes](https://github.com/johnestes4) [Michael Mahony](https://github.com/michaelmahony) and [Christopher Phillips](https://github.com/chris-A-phillips)

Timeline for product 5 days.

Before writing any code we made sure to whiteboard out the general data flow of our application. We wanted to hammer down the stack we were using to manage this path before starting up.

One of the bigger organizational features was a Trello Board where we were able to separate out features, branches, issues, and updates into lanes that were titled backlog, In Progress, Tracking, and Complete. We were able to reduce the majority of merge conflicts this way by staying in the specific feature files we had checked out

At its very core I wanted this app to be a simple stream, vote, and re-examine platform. User's view the stream, vote on their preferences with emojis, and then can examine other tweets that other users have also voted on.

##Back-End-Technology

##Front-end-Technology

## Screencast and Demo

###Unsolved Problems
