# MySQL commands for reference
## Setting up your mysql database

DROP DATABASE IF EXISTS pivot;

CREATE DATABASE pivot;

USE pivot;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE projects(
    id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    created DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE teams(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    size INT NOT NULL,
    lead_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tasks(
    id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    created DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_team(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE user_task(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE team_project(
    id INT NOT NULL AUTO_INCREMENT,
    team_id INT NOT NULL,
    project_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'pivot'@'%' IDENTIFIED BY 'pivot!Node.js';
GRANT ALL PRIVILEGES ON pivot.* TO 'pivot'@'%';
FLUSH PRIVILEGES;
