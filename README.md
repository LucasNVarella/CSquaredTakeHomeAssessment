# Lucas Varella: CSquared Take-Home Technical Assessment

This is an assigment to create a simple, single-page web app that displays a calendar. It is written using a Node.js stack with React/TS served by webpack, with Jest for testing. I started with a React.js template project which can be found [at this MIT-licensed repository](https://github.com/CreativeTechGuy/ReactTemplate), as an alternative to using create-react-app or starting a project from scratch. I decided to go with this template because it did more for me in terms of setup than create-react-app.

## Usage

-   `npm start` - starts a local server at http://localhost:7579
-   `npm test` - runs all unit tests
-   `npm run release` - This runs all checks provided by the template to ensure the code works, is formatted, etc (ex.: linting, unit tests, prettier).
    More npm scripts are available from the template (such as a build script) but I did not create/modify them, nor did I extensively test them. I focused on completing the assessment.

## Implementation

I decided to use a third-party calendar package called react-datepicker. I've worked with it before, and it was a very close match in features to the assessment parameters. I believe the time I spent adapting and getting around some of its shortcomings (such as having no means to disable date buttons outside of the currently selected month) was less time consuming than researching a different calendar, or especially writing one from scratch. This is definitely a time-sontrained solution though, as my code to circumvent react-datepicker's shortcomings would likely end up as bloat and/or tech debt down the line in production. A better approach to this task (time constraints permitting) would be to research different third-party calendar offerings on the web, weighing pros/cons for each, then determining which package would be best to work with and add the least tech debt.

Since the template I chose already has a bit of a heavy stack, I decided not to add any further packages to prevent adding more tech debt to the project.

## Testing

My aim with the tests was to cover the most important details of the assignment, without testing react-datepicker itself. As such, I focused on ensuring the day bubbles were colored correctly and changed colors appropriately. Feedback here would be greatly appreciated as I have no professional experience with testing.

## Known Issues

-   One feature lacking from react-datepicker is an option to display only days that belong to the currently selected month. As this was strictly part of the assessment, I got around this shortcoming by leveraging an existing feature that allows for custom classNames for the Day buttons, as well as a custom renderer for them. Using CSS I made the Day buttons & their colors look closer to the example calendar in the assessment, and also hid any Day buttons that don't belong to the current month.
-   the release script stops at the typescript check due to an internal import issue with react-datepicker.

## React Template Original README

This repository exists as a starting point for a new React 18 application (with hooks). The build system, testing, linting, formatting, compiling, spellchecking and more are all pre-configured.

This repository should be generic enough that most people can use it out of the box. It comes with an existing "hello world" application which you can build and run right away.

It also includes all of the nice-to-haves to ensure that you code is high quality and follows best practices. This is very helpful for a beginner who needs nudges in the right direction but also helps an expert focus on the higher level problems and not worry about missing smaller errors.

## Setup

-   Be sure you have [the current LTS version of Node.js installed](https://nodejs.org/)
-   If you are on Windows, you probably want to be using either [GitBash which comes with Git](https://git-scm.com/download/win) or [WSL](https://docs.microsoft.com/en-us/windows/wsl/install).
-   Run `npm ci` to install dependencies
-   Run `npm run start` to start the dev server and visit the link provided in the terminal to view it in your browser

## Core Dependencies Included

-   [React](https://react.dev/learn) (JavaScript UI framework)
-   [Webpack](https://webpack.js.org/) (Asset bundling)
-   [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) (JavaScript with Types)
-   [Babel](https://babeljs.io/docs/en/) (Transpiling JavaScript for older browsers)
-   [ESLint](https://eslint.org/) (Identifying and reporting errors in code)
-   [Prettier](https://prettier.io/docs/en/index.html) (Code formatter)
-   [CSpell](https://github.com/streetsidesoftware/cspell) (Code Spellchecker)
-   [SCSS](https://sass-lang.com/guide) (Enhanced CSS)
-   [Jest](https://jestjs.io/docs/en/getting-started) (Unit test framework)
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (React unit test utilities)
-   [Husky](https://typicode.github.io/husky) (Git hooks - run commands on commit)

## NPM scripts

-   `npm clean-install` - install all dependencies. _Do this first before anything else_
-   `npm run start` - starts a local server which can be accessed at http://localhost:7579. As long as this server is running it'll auto refresh whenever you save changes.
-   `npm run release` - creates a release build of your application. All output files will be located in the dist folder. This also runs all of the checks to ensure the code works, is formatted, etc.
-   `npm run verify` - checks the application without building
-   `npm run bundle-analysis` - opens a bundle analysis UI showing the file size of each dependency in your output JavaScript bundle.
-   `npm run lint` - runs ESLint enforcing good coding style and habits and erroring if any are broken.
    -   `npm run lint:fix` - fixes any auto-fixable ESLint errors
-   `npm run format` - runs Prettier to reformat all files
-   `npm run autofix` - fix all autofixable issues
-   `npm run ts-check` - runs the TypeScript compiler to see TypeScript errors
-   `npm run spellcheck` - runs CSpell to see any typos. If the word is misidentified, add it to `cspell.json`.
-   `npm run test` - runs Jest and all unit tests
-   `npm run clean` - removes all auto-generated files and dependencies
-   `npm run list-outdated-dependencies` - lists the dependencies that have newer versions available with links to their repository and changelog
-   `npm run update-dependencies` - update and install all outdated dependencies

## Why use this instead of create-react-app?

Tools like create-react-app bring everything and the kitchen sink when setting up a new project. They are great to start quickly, but as soon as you want to customize or understand how it all works you'll have trouble. My goal is to expose all of the tools and show how easy it can be to configure from scratch. This makes it easier to debug and tweak settings to fit your needs.
