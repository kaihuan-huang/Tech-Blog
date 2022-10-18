# Tech-O-Pedia
![Github licence](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
* [Description](#description)
* [Assets](#assets)
* [Assets](#assets)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Questions](#questions)

## Description
Tech-O-Pedia is completely built from scratch and deploy it to Heroku, it's a CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts as well. Following the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.



- Deployed link: https://github.com/kaihuan-huang/Tech-Blog
- Heroku: https://stormy-anchorage-90135.herokuapp.com/posts


## More details
```
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a name and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my name and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s name, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s name, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```
## Assets

The following images demonstrate the web application's appearance and functionality in Insomnia & Draw.io:

![singlePost.png](public/images/singlePost.png)
![allPost.png](public/images/allPost.png)
![addComments.png](public/images/addComments.png)
![createNew.png](public/images/createNew.png)
![Home.png](public/images/Home.png)


## Installation 
The user should clone the repository from GitHub and download Node. 
Run `npm i ` to install.
Run `npm run seed ` to run the database.
Run `npm start ` to start the Tech-O-Pedia.

## Usage 
Use inquirer from your command line to answer questions about your project.
View walk through video here - [Tech-O-Pedia](https://youtu.be/bEumSy552Qw)<br>


## Contributing 
Contributors should read the installation section. 

## Technologies used


- [Javascript](https://www.w3schools.com/jsref/default.asp)
- [Node.js](https://nodejs.org/en/)
- [mySQL](https://www.mysql.com/)
- [JSON](https://www.json.org/json-en.html)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [InsomniaCore](https://insomnia.rest/products/insomnia)
- [Handlebars.js](https://handlebarsjs.com/)
- [Heroku](https://heroku.com/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)

## Questions
If you have any questions about this projects, please contact me directly at huangkaihuan0216@gmail.com. You can view more of my projects at https://github.com/kaihuan-huang.

## Made by 
```
Kaihuan Huang

```