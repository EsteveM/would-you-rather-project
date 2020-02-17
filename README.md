# Would You Rather Project

This application implements the classical "Would You Rather" game. Users are asked question polls such as "Would you rather A or B?". They will have the ability to answer questions, see those which they have already answered and those which they have not yet. For the former, they can see how others have voted in an aggregated way, and for the latter, they can vote. It is also possible to create new question polls, and have access to a leaderboard that ranks users. The application has been built using React and Redux, and makes use of an already existing API server. 

## Table of Contents

* [Description of the Project](#description-of-the-project)
* [Getting Started](#getting-started)
* [Contributing](#contributing)
* [Acknowledgment](#acknowledgment)

## Description of the Project

As has already been mentioned, this project implements a version of the "Would you rather" game. With this aim in view, a React/Redux front end for the application has been built up. The work that has been done is best described by explaining its main components:

* *Application Setup*: the application can be installed and started easily, and includes the README file you are viewing right now, with installation and launch instructions.
* *Login Flow*: log in and log out functionality is provided, and the application works correctly regardless of which user is the logged in one.
* *Application Functionality*: the application features a home page, where question polls are classified into answered and unanswered ones. Question poll details can be seen, and a voting mechanism provided. It is also possible to add new question polls, and access is provided to a leaderboard that ranks users. In addition, a navigation bar is provided. Finally, it is noteworthy that the application interacts with the already existing backend, and runs without errors or undue warnings, and features conveniently formatted code.
* *Architecture*: the application has the store as its only source of truth, and its state is managed by Redux, and correctly updated. Moreover, code is logically structured, and modularity and reusability of components is enforced.

This is the React component hierarchy that has been chosen:
```bash
App.js
├── Login.js
├── Dashboard.js
│   └── Nav.js
│   └── Question.js
│       └── PollDetails.js
│           └── Nav.js
├── NewQuestion.js
│   └── Nav.js
├── Leaderboard.js
│       └── Nav.js
│       └── UserRank.js
├── NotFound.js
    └── Nav.js
```
## Getting Started

These are the steps to be followed to further develop and/or test this project:

* Firstly, you have to download/clone the project files from this repository onto your local machine. Then, cd into the root folder where the project files are located.
* Secondly, you have to run `yarn install` and `yarn start` to install all project dependencies, and start the development server, respectively. You should be able to view your app in the browser at *http://localhost:3000/*.
* Thirdly, the application can be manually tested:
    * The user is initially shown a login page where one of the existing users can be chosen, in order to be logged in.
    ![login1](/ScreenShots/login1.png)
    ![login2](/ScreenShots/login2.png)
    * Once the user is logged in, they are shown the home page. A number of features can be observed here:
        * The user can click a button which allows them to log out, so that they can log back in again. 
        * If the user types something in the address bar, it is necessary for them to log back in again before the requested page is actually shown. 
        * The user is shown all question polls classified into two groups, those that they have answered, and those that they have not. They can toggle between both groups, and the unanswered ones are shown by default. Within each group, question polls are sorted by their creation date, from more recent (top) to least recent (bottom).
        * The name of the user that is logged in is shown at the top right corner of the page.
        * There is a navigation bar that allows the user to navigate to the leaderboard, and to the form that allows them to add a new question poll to the system.
        * Each question poll listed has a link to their details. 
    ![homepage1](/ScreenShots/homepage1.png)
    * When the user clicks on the "VIEW POLL" button within one of the unanswered questions in the home page, its details are shown at `questions/:question_id`. All of the "Would you rather" text, both options, and owner avatar are shown. 
    ![polldetails1](/ScreenShots/polldetails1.png)
    * When the user clicks on the "VIEW POLL" button within one of the answered questions in the home page, its details are shown at `questions/:question_id`. For each option, all of the text of the option, and percentage and number of people that voted for it are shown. Furthermore, the option voted by the user that is logged in is clearly identified.
    ![polldetails2](/ScreenShots/polldetails2.png)
    * If a user types in the address bar the URL of a question that does not exist (e.g. http://localhost:3000/questions/thisquestiondoesnotexist), they have to log back in, and are then shown a 404 page (not found).
    ![polldetails3](/ScreenShots/polldetails3.png)
    ![polldetails4](/ScreenShots/polldetails4.png)
    ![polldetails5](/ScreenShots/polldetails5.png)
    * If a user votes in a poll, the information of the answered poll is immediately shown, where their vote is also clearly identified. Moreover, the question poll can now be found in the answered question polls category on the home page. Data in the leaderboard is also coherently updated.
    ![polldetails6](/ScreenShots/polldetails6.png)
    ![polldetails7](/ScreenShots/polldetails7.png)
    ![polldetails8](/ScreenShots/polldetails8.png)
    ![polldetails9](/ScreenShots/polldetails9.png)
    * The leaderboard can be found at `/leaderboard`. For each user, it shows their name, avatar, questions created by them, and answered by them, together with a score which is the sum of both created and answered questions. Users are sorted in descending order by their score.
    ![leaderboard1](/ScreenShots/leaderboard1.png)
    * Users have a form to create new questions at `/add`. To this end, two options are filled out after the "Would you rather" text. Once the question has been created, the user is redirected to the home page, where the newly created question can be seen under the correct category.
    ![newquestion1](/ScreenShots/newquestion1.png)
    ![newquestion2](/ScreenShots/newquestion2.png)

## Contributing

This repository contains all the work that makes up the project. Individuals and I myself are encouraged to further improve this project. As a result, I will be more than happy to consider any pull requests.

## Acknowledgment

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md).

The starter code for this project can be found at [this Github repository](https://github.com/udacity/reactnd-project-would-you-rather-starter). It belongs to the Udacity's React & Redux course.
