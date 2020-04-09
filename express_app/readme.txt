Pivot

On clone, run the following commands:

	npm install
	node server.js

To prepare MySQL, run the following in MySQL workbench, assuming established schema named 'pivot':

	CREATE USER 'pivot'@'%' IDENTIFIED WITH mysql_native_password BY 'pivot!Node.js';

	CREATE TABLE 'pivot'.'projects' (
		'id' INT NOT NULL AUTO_INCREMENT,
		'team_id' INT NOT NULL,
		'owner_id' INT NOT NULL,
		'created' DATE,
		PRIMARY KEY ('id')
	);

	GRANT ALL PRIVILEGES ON pivot.* TO 'pivot'@'%';
	FLUSH PRIVILEGES;

This is still a rough example to be worked out later down the line.
To test functionality, visit http://localhost:3000/.
Alternatively, use CURL or Postman to test POST and GET
