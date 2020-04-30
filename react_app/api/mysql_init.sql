# MySQL commands for reference
## Setting up your mysql database

DROP DATABASE IF EXISTS pivot;

CREATE DATABASE pivot;

USE pivot;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password CHAR(60) NOT NULL,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE projects(
    id INT NOT NULL AUTO_INCREMENT,
    owner_id INT, -- May be null
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE teams(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    lead_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE project_sprint(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tasks(
    id INT NOT NULL AUTO_INCREMENT,
    owner_id INT, -- May be null
    assignee_id INT, -- May be null
    project_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status INT NOT NULL,
    points INT NOT NULL,
    sprint_id INT NOT NULL,
    state INT DEFAULT 1, -- 0: in backlog, 1: in sprint,  2: completed not in sprint
    created DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (sprint_id) REFERENCES project_sprint(id) ON DELETE CASCADE
);

CREATE TABLE user_team(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
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
