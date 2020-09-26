# Mobile Flashcards

Mobile Flashcards is a React Native app for iOS and Android that allows users to create decks, add cards and quiz themselves.

## Features

* Create Decks
* Create Cards
* Add Cards to your Decks
* Attempt Quiz from any Deck
* Notifications for Quizzes

- Make sure you have an Android or iOS simulator already installed

## Steps to Install

- Clone the repository or download zip files
- Navigate to the directory of `MobileFlashcards` application
- Run `yarn install` to install required libraries
- Run  `npx pod-install`  (If this failds then run  `cd ios && pod install`)
- Run `yarn ios` to start application in iOS Emulator (Try `sudo yarn ios` if fails)
- Open `/android/local.properties` file and add your Android SDK path `sdk.dir = /...path/Android/sdk`)
- Run `yarn android` to start application in Android Emulator (Run `sudo yarn android` if `Execution failed for task` error)

This project has been tested on the following platforms:
- iOS 11+
- Android 9+


So, what are you waiting for? Download and start preparing for your exams right now!
