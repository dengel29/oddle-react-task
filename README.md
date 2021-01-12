# Oddle React Task

This project was built as a front-end take-home test for [Oddle](https://oddle.me). Thanks a lot for this opportunity! While you're evaluating this code I want gently to remind you this is my first time writing React; I tried my best to absorb as many best practices and high level concepts as possible, but I know it's not perfect. Either way I appreciate the opportunity and am looking forward to any feedback.

## How it works

This is a React app, bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Therefore you have all the [available scripts](#available-scripts) that come with it. Quickly, how to use it:

1. Fork or clone the repository;
2. In the repository; run `yarn install`; it will yell at you if you use `npm`
3. At the root, create a `.env` file with your Github token (go (here)[https://github.com/settings/tokens] to generate a new one). The format looks like:
```
REACT_APP_GH_TOKEN=yourtokenhere123456789876543212345
```
4. Run `yarn start` and visit localhost:3000 to see the app running in development.

### Technology Used
A brief rundown of other technologies used in this project:
* [styled-components™](https://styled-components.com) for styling and theming;
* Redux for state management (specifically (Redux Toolkit)[https://redux-toolkit.js.org/]);
* `react-router-dom` for navigation
* AWS Amplify for deployment and hosting;

### Main Component: Cockpit
As for the logic, most of it you will find in the Cockpit component. I'm not a fan of the name, but it's the component which does most of the logical operations. I use a custom hook called `isMount` to check if this is the first render of the website; if so this first render and state initialization won't trigger the `useEffect` which triggers search. 

### Searchbar Input and Trigger Logic
The Cockpit components waits for input in the `Searchbar`, which triggers search 1250ms after the user stops typing, or if they hit the search button. The search button, if pressed, cancels any search queued by the act of typing, so no unnecessary searches are made. This delay and cancel logic is supplied by lodash `debounce` package. There is a `useEffect` hook listening for the changes on either `lastTriggeredQuery` (coming from the `Searchbar`) or `pageNum` (which would come from the user pressing a `Pagination` button); when either change, it will trigger the search with the supplied query and page-number.


### Search Request + Pagination
When a search is triggered, the query is sent to the Github `search/users` API endpoint with the query and a page number. The page number is stored in Redux, so it can be accessed again after navigating to the UserProfile page. If no users match the search, a vanilla browser `alert` is triggered to inform the user, and the rest of the logic is cancelled. If users are returned by the search, they are stored in Redux as the `displayedUsers`. A `Pagination` component is also rendered to show the user if they can go back one page of results, forward one page of results, and what the current page is. These buttons are only rendered if next or previous pages of results are available.

### User Profile
When a user clicks one of the profiles in the search results, they are shown a `UserProfile` component which calls the Github `user` endpoint, which in turn supplies more endpoints to fetch collections of the selected user's followers, following, and repos among other information. This information is displayed to the user, as well as a full JSON payload in a discrete summary-details toggle below the list of followers/following/repos. If the user has zero (0) of any of those collections, a message will be displayed to the user to inform them there are in fact 0 and there has not been an error in fetching them. From here, a user can press the BACK button and be brought back to the previous page they were on, mantaining their progress in their search for the user they so desperately seek.

### Theme Toggle

At any point a user can press the sunshine button in the top-right corner to toggle the theme.This theme changes a global state switch in Redux which at any point holds one of two themes: "LIGHT" or "DARK". I wish I had time to add more. All of the styled-component™ have a theme prop on them which can be used in a simple ternary to change the background and font-color. I'm sure there must be a more DRY way to achieve this logic, but I implemented this at the last minute and did not have time to optimize it. However, it gets the job done!

### Improvements

All that said, I recognize a few improvements that could be made: 

* my logic for `goBack()` seems to re-call the Github API instead of getting the users directly from the recent history state. I got this for free earlier in the project but seem to have overridden react-router's behavior, most likely with a `useEffect`;
* I wanted to make all URLs re-visitable: I accomplished this on the UseProfile page (if you go to /userName you will get the correct profile), but not for the search page.
* Accessibility: I tried to use semantic HTML as much as possible but I'm not sure how DOM changes are communicated to users with accessibility needs. I definitely need a deeper understanding of React to make this project more accessibility-friendly;

There's more but I've already written a lot so I'll save it for our conversation!


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Eject if, say, you want to configure the webpack config.