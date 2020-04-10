# Pivot ProjectTracker

## Initial Setup

### Express

`cd express_app`

This step can be done with a GUI for easier set up.

`mysql -u username -p password pivot < ./mysql_init.sql`

`npm install`

`node server.js`

This should print out all API paths available.
As a general rule, posts and puts will rely on JSON body.

To test functionality, visit http://localhost:3000/.
Alternatively, use CURL or Postman to test POST and GET

### React

`cd react_app`

`npm install`

`npm start`
