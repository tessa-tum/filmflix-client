# filmflix API client

## Objective

This responsive SPA is for movie enthusiasts who enjoy reading information about different movies and want to
keep an eye on their favorites. 

The client-side UI complements the previously set up [RESTful API](https://github.com/tessa-tum/filmflix-api) and MongoDB database, aiming to provide a seamless user experience. The app is built with the MERN-stack and [hosted on netlify](https://filmflix-project.netlify.app/).

I recently also created an Angular version of this client, the repo can be found [here](https://github.com/tessa-tum/filmflix-Angular-client)

## Visuals

Desktop view of home page

![Screenshot of main view](https://github.com/tessa-tum/filmflix-client/blob/main/src/assets/screenshot_movie-client_main.PNG)

## Built with

### Languages

- JavaScript, JSX
- HTML
- CSS, SCSS

### Framework, Libraries, Tools

- React
- React Bootstrap 
- Parcel as build tool
- Hosted on netlify

### Dependencies

- `bootstrap` 
- `prop-types` to transmit data between components and validate the data type based on the app's configuration
- `react` 
- `react-bootstrap` to use the react version of bootstrap modules
- `react-dom` to use as entry point to the DOM
- `react-toastify` for customized error and warning messages

## Features

- User registration and authentication
- Browse and search a catalogue of movies 
- View details for a single movie (incl. description, director, genre, movie poster)
- View similar movies
- Add and/or remove movies from a list of favorites
- Access and modify data in user profile view 
- Responsive design for various devices and screen sizes

## How to run

- Clone repository using command git clone https://github.com/tessa-tum/filmflix-client.git
- Navigate to the root directory and run npm install to install dependencies.
- Run the app using parcel src/index.html
- After this, app should be available in the browser at http://localhost:1234.


