# Blogify

A blog app with role based access controll system.

# Getting Started with Create React App

This project was bootstrapped with [Vite](https://github.com/vitejs/create-vite-app).

## Available Scripts

In the project directory, you can run:

**`npm install`**

Install all the dependencies needed for the application to run.

**`npm run dev`**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

**`npm run build`**

Builds the app for production to the `dist` folder.\
It bundles the code efficiently for optimal performance.

**`npm run preview`**

Serves the production build locally.\
Useful for testing the production build before deployment.

**`npm run eject`**

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

# Installation

1. Clone the repo

```sh
git clone https://github.com/mohitcofficial/interview-task-2/frontend
```

2. Go to code directory

```sh
cd frontend
```

3. Install NPM packages

```sh
npm install
```

4. Start the project

```sh
npm start
```

## Technologies Used

**ReactJs :**
A JavaScript library for building user interfaces. React.js was chosen for its component-based architecture and efficient rendering capabilities.

**Material-UI(MUI) :**
A popular React UI framework that provides pre-designed components following Google's Material Design guidelines. Material-UI offers a wide range of customizable components for building modern and responsive user interfaces.

**Axios :**
A promise-based HTTP client for making AJAX requests in the browser and Node.js environment. Axios simplifies the process of making asynchronous HTTP requests and handling responses in React applications.

**Redux Toolkit :**
Redux Toolkit is a simplified and powerful way to manage state in React applications, providing tools to create, update, and manage a global store with less boilerplate code.

# Features

**User Authentication & Authorization :** JWT based authentication is done for more secure and reliable authentication.

**Interactive User Interface**: All the UI, such as buttons, forms and modals are designed in a professional manner to promote/enhance user experience.

**State Management :** All the complex states are managed by Redux Toolkit.

**Error Handling :** Proper error handling is done at various steps and fallbacks are added at the time for any faliure.

**Performance Optimization :** Performance optimization techniques are implemented such as multithreading, code splitting, lazy loading, or memoization for better and top notch user experience.

**Form Handling**: Proper form validation, submission, and error handling is done at every level using pre-build reliable libraries such as Formik.

# Folder Structure

The project's folder structure is organized to promote maintainability, scalability, and ease of navigation. Here's a breakdown of the main directories:

\
**public/** \
Contains publicly accessible files used by the application.

- `index.html`: The main HTML file serving as the entry point of the application.
- `worker threads`: Handles multithreading in fontend for all time consuming tasks.
- `favicon.ico`: The application's favicon
  \
  **src/** \
  This directory holds all the source code of the React application.
- **assets/**: Contains all the images and svgs used throughout the project.
- **components/**: Seperate and Reusable React components utilized across multiple pages.

  - `Header`: Component for the application's header section.
  - `Modals`: Component for the footer section.
  - `common`: Folder with common Components for all pages.
  - `buttons`: Reusable buttons
  - ...

- **pages/**: Houses React components representing different pages or views of the application. Inside pages folder there is a seperate folder for every page including the main pages as well as its code splitting components inside components folder.

  - `home`: home page folder. \
    -`Home.jsx`: Home Page of the application \
    -`components`: Folder will all the code splitting -`authorized`: admin & user
  - `login`: login page folder. \
    -`Login.jsx`: Login Page of the application \
    -`components`: Folder will all the code splitting -`authorized`: admin & user
  - `signup`: signup page folder. \
    -`SignUp.jsx`: Sign Up Page of the application \
    -`components`: Folder will all the code splitting -`authorized`: admin & user
  - `blog`: Blog page folder. \
    -`Blog.jsx`: Contains Blog information \
    -`components`: Folder will all the code splitting -`authorized`: admin & user
  - `blog/add`: Add-Blog page folder. \
    -`AddBlog.jsx`: Page to add new blog \
    -`authorized`: admin
  - `dashboard`: Dashboard page folder. \
    -`Dashboard.jsx`: Admin Dashboard Page\
    -`authorized`: admin

  - `profile`: Profile page folder. \
    -`Profile.jsx`: Profile page of the user \
    -`components`: Folder will all the code splitting -`authorized`: admin & user
  - `not-found`: not found page folder. \
    -`404.jsx`: 404 page of the application \
    -`404.css`: Stylesheet of 404 page -`authorized`: admin & user
  - ...

![image alt](https://github.com/mohitcofficial/interview-task-2/blob/ef8bdf9de749005d7a58015ec3ba00cd26a01af0/frontend/Screenshot%20(402).png)

- **store/**: Stores Redux related stuff for state management

  - `store.js`: Contains the store configurations.
  - `userSlice.js`: Contains user auth related state and reducer functions.

- **services/**: stores all the APIs of the project

  - `api`: folder different jsx files containing async function call with respect to different pages.
  - `http.services.js`: All the api urls with respect to different pages/coponents.

- **utils/**: contains utility functions or helper modules that provide commonly used functionality across the project

\
**App.jsx/**

The main component orchestrating the rendering of various pages and components.

**index.html/** \

Entry point of the React application where React DOM renders the `App` component into the HTML document.

**.gitignore**\

To specifies intentionally untracked files that Git should ignore.

**package.json**\

Metadata about the project and its dependencies.

**README.md**\

Documentation providing information about the project, its setup, usage, and architecture.
