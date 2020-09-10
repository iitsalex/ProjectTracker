# Pivot ProjectTracker

Hosted on http://pivot.root.sx/

## Initial Setup

### MySQL

This step can be done with a GUI for easier set up.

`mysql -u username -p password pivot < ./react_app/api/mysql_init.sql`

### Express

`cd react_app/api`

`npm install`

`npm start`

This will print all API calls to the console.
As a general rule, posts and puts will rely on JSON body.

To test functionality, visit http://localhost:3000/.
Alternatively, use CURL or Postman to test POST and GET

### React

`cd react_app`

`npm install`

`npm start`

## Deployment

Deployment may also involve setting environment variables for database access.

`cd react_app`

`npm run build`

`cd api`

`npm start`
