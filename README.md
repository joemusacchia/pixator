# README

## Pixator

I have always had a very strong interest in imaging research and image processing, so I created a simple tool for modulating image color channels in a web browser as well as adding text to the images.  Pixator is collaborative tool and allows users to fork edits of other users to create their own edits. Users can also comment on exported images of other users to receive feedback.

Pixator is available on Heroku [here](https://pixator.herokuapp.com).

## Features

* Users can register accounts using Devise authentication
* To begin working on an image, users can upload new images on the index page
* Once uploaded, one can click on an image to begin editing the image on the editor page
* When satisfied, a user can save their progress by clicking 'save edit'
* On the home/index page, users can see all available images on the site for editing, and click on an edit in progress
* If the edit belongs to a particular user, the edit overwrites the current edit in progress; if the edit is owned by another user, the edit is forked, and a new edit is created with new ownership
* Once a user is satisfied with their work, edited images can be exported
* On the index page, all exported images are viewable and actionable to separate show pages
* Users can add comments to exported images to provide feedback for the creator

## Technologies implemented

* Pixator uses `Rails 5.1.4`
* The app provides a single page experience through `React.js` and `react-router` which is mounted to embedded ruby code
* Images are manipulated inside the `<canvas>` HTML5 API
* Images are loaded into `<canvas>` by first creating a `<canvas>` object, getting it's context via the `getContext()` method, then drawing the preloaded `<img>` object with the `drawImage()` method
* Pixel data is manipulated by grabbing the data stored inside the context with (ES6 syntax)
```
let imageData = context.getImageData()
let rawPixelDataArray = imageData.data
```
* After manipulation of the array, the original manipulated `imageData` object is then drawn back onto the canvas with the `putImageData()` method
* To export images, the images is encoded into a base64 data URL (functionality provided by `<canvas>`) which is converted to a file object and uploaded to the controller via `fetch` and a multipart form object
* All data is sent and received from the controller using `fetch` from HTML5, stored in a `PostgreSQL 9.6` database, and delivered to the view by `ActiveRecord`
* Authentication is provided using the `devise` ruby gem
* Images are saved to the database using the `carrierwave` ruby gem, and delivered to the Amazon S3 CDN via the `fog` gem
* Styling is provided in part by `foundation` and supports a single-app mobile and tablet experience

## Local installation instructions

The app uses `Ruby on Rails` so you will need to install both to get the app to work. Please note that these instructions are specific to Mac OSX and assumes you have `homebrew` and `git` appropriately installed!

### Initial setup

* First, install the ruby installer, and build `ruby 2.3.3`:
```
$ brew install ruby-install
$ ruby-install ruby 2.3.3
```
* Also, importantly, this app uses ruby gems, so you will need to install bundler as well to manage and install the gem dependencies:
```
$ gem install bundler
```
* You will need to install `Rails` in order to run this app:
```
$ gem install rails
```
* To be able to save data, the app also depends on `Postgres`; you can download the Mac app here: [PostgreSQL](http://postgresapp.com/)
* Finally, in order to use `React.js` and all it's dependencies, you will need to have node installed; go here and install: [Node](https://nodejs.org/en/)

### Download app, install gems, node packages, and setup database

* Download the git repository:
```
$ git clone https://github.com/joemusacchia/pixator.git
```
* Navigate to the app root directory:
```
$ cd pixator
```
* To compress and resize images, `mini_magick` is used; this requires that the `imagemagick` dependency be installed on the system before installing the gems:
```
$ brew install imagemagick
```
* Install gems, node packages, and `webpacker`
```
$ bundle install
$ rake webpacker:install
$ rake webpacker:install:react
$ npm install
```
* Now, setup the database (create and migrate):
```
$ rake db:create
$ rake db:migrate
```

### Running Pixator on your local machine

* In one terminal window, start the rails server:
```
$ rails s
```
* In another tab, start `webpack-dev-server` to serve React:
```
$ ./bin/webpack-dev-server
```
* Navigate to `localhost:3000` in your web browser and start using the dev environment for Pixator!

## Recent changes to Pixator

* Added multi-line text support with impact and stroke text styling

## Dream features for Pixator

* I would really love to integrate Instagram authentication to allow users to seamlessly share edited photos to Instagram
* Automatic preview generation of edits for the index page to disambiguate edits across users and individual accounts
* In line with preview generation, modify the UI on the index page to direct the user more clearly to the correct actions, disambiguating the functionality of the Uploads, Edits, and Exports panels
* I plan on adding more filters to images, such as color saturation and exposure, to add value
* Provide more user controls for text so that users can more freely manipulate the font size and placement in the image
* Pixator was designed to be extensible with many opportunities to add overall value
