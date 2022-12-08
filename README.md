<img src=https://i.imgur.com/SaOSr8Q.png[/img height=150 alt="A big hand drawn dot"/>

# Sticky Todolists Challenge powered by React

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white) [![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
  
[![todo-lists-challenge v0.0.1 badge][changelog-badge]][changelog] [![Version 0.0.1 Badge][version-badge]][changelog] [![MIT License Badge][license-badge]][license]
 
## Development

This app was developed on a test job, from a figma design template. It was also a test of skills, and I intend to continue this project, as some of the features I planned ended up being left out.

My initial idea was to make a **trello-like** application, with data persistence, with the option for the user to save and export their to-do lists, in a standard object model, both from their devices and from the internet. In fact, my main intention was/is to make this app compliant with the Web of Data devised by Tim Berners-lee, keeping the task lists indexable by RDF, and mainly providing the imports/exports through **Solid Pods**. And as an additional aesthetic I would/will add a theme activated by a button on the side of the page, with reddish tones, dark colors and shadow effects with material design simulating that the light would be coming out of the dot at the top of the screen, and instead of a list of tasks it would be lists of random phrases 👻

spoiler: **but most of it failed**

  
    
Currently the app is in beta-development, the animations are almost 100% as I would like for the base, however the drag and drop features are very flawed. Due to bad planning choices I wasted a lot of time trying to get drag and drops to work, since it was my first time using react "for real" (I currently work with ionic) and I ended up falling into an abyss of bugs that were never resolved from the deprecated react-beautiful-dnd (summed up with some planning mistakes) 

Below is a list of bugs and future features.

## Bugs
- **Drag-and-drop** between tasks in the same list works but it literally reverses the position of two tasks. For sibling cards it looks nice, but for distant cards on the same list the effect is unnatural and abrupt, and I still haven't figured out why some specific data isn't being persisted even though it's being set in the store.

- DnD between items from **different lists** invariably buggy, however as far as I can debug the switches are happening normally. I believe **this and the other bugs** were due to me using Objects to handle the data on the reducer side, and Arrays on the component side, and not being able to assemble the arrays into objects efficiently 

## To-do (pun intended)
- **First, rebuilding the app from scratch**, using practices I've been seeing about TDD, and redesigning it more calmly, to make it more modular (one of my main mistakes was not knowing how to componentize the drag-and-drop elements, I believe).
- Launch import and export of to-do lists, and the "inverted theme"
- It would be fun to test implementation with blockchains and create immutable task lists


## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
