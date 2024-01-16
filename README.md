# Waiter Availability App ☕
![image](https://github.com/TendaniMamadi/waiter_webapp/assets/125261636/e1d0f500-b6f7-49e2-831e-4deba500ff21)

Link to app 🔗:  

https://waiters-app-d49d.onrender.com

Please note the app is using a free hosting account on Render.com which has limitations. To speed up the loading process open and then close the site and reload it again a few times.

## Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)

## Overview 📝<a name="overview"></a>

The Waiter Availability app is a useful app that allows waiters at a coffee shop to select days when they are able to work during the week, and give restaurant managers the ability to see how many waiters and which waiters are available to work during the week.

## Features 🌟<a name="features"></a>

### Shift scheduling
Waiters can log in and set or update their shifts for the week. The data is persisted and stored in a database, so when they logout and login again the previous shift set is still set.

### Accounts


Waiters are able to create accounts. Waiters and restaurant managers can log into the system and access their respective pages. Waiters are only allowed to access their specific page for their account while logged in and everyone else is restricted. Only managers have access to the admin page. When signing up, waiters passwords are encrypted and stored safely.

*NB: There are demo login details for waiters and admins on the homepage for those interested in testing the app. You can also sign up for an account as a waiter.*

### Demo logins

	John	password123	
	Mary	password456	
	Kate	password789	
	Mike	password000	admin
	Alex	password012

### Statistics

Managers can see nice statistics and breakdown of waiters available by a particular day or see all the days a particular waiter will be available. There is also a nice colour coded bar chart reflecting when there are enough/not enough/more than enough waiters available for a particular day. For reference 3 waiters available equal enough, less than 3 equals not enough and more than 3 equals more than enough.

### Form Validation

There are useful error messages when logging in and signing up that notify the user

## Technologies Used 💻<a name="technologies-used"></a>

#### HTML/CSS
Used for adding the structure of elements on the page and styling
#### Javascript
Used for user interactivity
#### Node.js/Express
Used for setting up a server and handling routes and logic  
#### Handlebars  
Used for HTML templating
#### PostgreSQL
Used for providing database and crud functionality
#### Session
Used to protect certain routes that can only be accessed when the authorized user is logged in

[![Node.js CI](https://github.com/TendaniMamadi/waiter_webapp/actions/workflows/node.js.yml/badge.svg)](https://github.com/TendaniMamadi/waiter_webapp/actions/workflows/node.js.yml)



