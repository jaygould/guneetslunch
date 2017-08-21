# Installation and setup notes

## Initial setup

App was originally created using create-react-native-app. I ejected it straight away so the config with the whole setup was sorted so I could `npm install` all modules easily.

## First commit

The initial commit was made with a basic structure of the app already created in one of my test apps where I experimented with JWT's, Oauth, Chat system etc, but I thought the Instagram integration was worth creating a separate repo to refer to.

## react-native-navigation

Needed to follow the instructions on the docs, including adding the AppDelegate.m file to Xcode. Use the [Wix docs](https://wix.github.io/react-native-navigation/#/installation-ios).

The structure of the navigation is based on the recommended Github repo for [junedomingo's movieapp](https://github.com/junedomingo/movieapp), which shows how to split up the root index.ios.js file and reference the app.ios.js file in a newly created src/ directory/

## Moved app to app/ directory

When moving the app to the app/ dir, had to delete the build/ directory and re-reun `react-native run-ios` command else it didn't work.

## Config/env var (React Native)

Node process.env doesn't work in RN, so using [react-native-config](https://github.com/luggit/react-native-config) which enables Node style environment variables. This is useful for keeping the environment specific secret info out of source control as I can hide the .env file, but still keep the src/config.js file to hold all config info, both non-sensitive (hard-coded) and sensitive (imported from the .env file), allowing users on Github to see the config layout.

The one thing it can't do at the moment is have different .env files for each environment (dev, prod, staging etc). For now, I've made a .env file (which is used by default when running `react-native run-ios`.

## Config/env var (Node/Heroku)

While developing I use my local Node install, but for the production app it uses Heroku. These variables must be set using Heroku variables.

Local dev uses the dotenv Node package to bring in the environment variables from .env file in to Node. First the `require('dotenv').config()` is added at the top of the server file and it allows the use of .env variables.

There's no remote DB present in this app, so the only credentials needed to secure is the Instagram API keys and the current API URL (which is needed for the Instagram redirect URL). These are stored in a config.json file which is hidden from Git.

## Alternative to the env var used in this project

Heroku keeps its variables on their own system but in the event that we are using our own custom server, it will be best to have local and remote config variables on one file, and use environment variables to switch between the local/remote, similar to [this](https://medium.com/node-and-beyond/environment-dependent-node-js-configuration-b51149286e7e) or [this](https://stackoverflow.com/questions/45717379/using-environment-variables-in-node).

# To do

* Add caching or some way to save the instagram access token on the device.
* Storing sensitive data on the device is bad as per [this](https://rammic.github.io/2015/07/28/hiding-secrets-in-android-apps/) post. Need to get sensitive keys from server in real project.
