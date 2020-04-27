var db = require('../db');

var Pivot = {
    // Users
    getuser: function(email, callback) {
        return db.query('SELECT * FROM users WHERE email=?', email, callback);
    },
    createuser: function(user, hash, callback) {
        return db.query('INSERT INTO users(email, password, fname, lname) VALUES(?, ?, ?, ?)',
            [user.email, hash, user.fname, user.lname], callback);
    },

    // Projects
    createproject: function(project, uid, today, callback) {
        return db.query('INSERT INTO projects(name, description, owner_id, created) VALUES(?, ?, ?, ?)',
        [project.name, project.description, uid, today], callback);
    },
    getproject: function(project_id, callback) {
        return db.query('SELECT * FROM projects WHERE id=?', project_id, callback);
    },
    getprojectsbyowner: function(user_id, callback) {
        return db.query('SELECT * FROM projects WHERE owner_id=?', user_id, callback);
    },
    getprojectsbyteam: function (team_id, callback) {
        return db.query('SELECT * FROM projects WHERE id IN ' +
            '(SELECT project_id FROM team_project WHERE team_id=?)',
            team_id, callback);
    },
    addproject: function(team_id, project_id, callback) {
        return db.query('INSERT INTO team_project (team_id, project_id) VALUES(?, ?)',
            [data.team_id, data.project_id], callback);
    },
    updateproject: function(project, callback) {
        return db.query('UPDATE projects SET name=?, owner_id=? WHERE id=?',
            [project.name, project.owner_id, project.id], callback);
    },
    deleteproject: function(project_id, callback) {
        return db.query('DELETE FROM projects WHERE id=?', project_id, callback);
    },

    // Teams
    createteam: function(name, uid, callback) {
        return db.query('INSERT INTO teams(name, size, lead_id) VALUES(?, ?, ?)',
            [name, 1, uid], callback);
    },
    getteam: function(team_id, callback) {
        return db.query('SELECT * FROM teams WHERE id=?', team_id, callback);
    },
    getteamanduser: function(user_id, team_id, callback) {
        return db.query('SELECT * FROM user_team WHERE user_id=? AND team_id=?',
            [user_id, team_id], callback);
    },
    getteamsbyuser: function(user_id, callback) {
        return db.query('SELECT * FROM teams WHERE id IN ' +
            '(SELECT team_id FROM user_team WHERE user_id=?)',
            user_id, callback);
    },
    jointeam: function (user_id, team_id, callback) {
        return db.query('INSERT INTO user_team(user_id, team_id) VALUES(?, ?)',
            [user_id, team_id], callback);
    },
    leaveteam: function (data, callback) {
        return db.query('DELETE FROM user_team WHERE user_id=? AND team_id=?',
            [data.user_id, data.team_id], callback);
    },
    teamaddusers: function (team_id, val, callback) {
        return db.query('UPDATE teams SET size=size+? WHERE id=? AND size > 0',
            [val, team_id], callback);
    },
    updateteam: function(team, callback) {
    	return db.query('UPDATE teams SET name=?, owner_id=? WHERE id=?',
            [team.name, team.lead_id, team.id], callback);
    },
    deleteteam: function(team_id, callback) {
    	return db.query('DELETE FROM teams WHERE id=?', team_id, callback);
    },

    // Tasks
    createtask: function(data, callback) {
        return db.query('INSERT INTO tasks (owner_id, project_id, name, created) VALUES(?, ?, ?, ?)',
        [data.owner_id, data.project_id, data.name, data.created], callback);
    },
    gettask: function(task_id, callback) {
        return db.query('SELECT * FROM tasks WHERE id=?', task_id, callback);
    },
    gettasksbyproject: function(project_id, callback) {
        return db.query('SELECT * from tasks WHERE id IN ' +
            '(SELECT task_id FROM project_task WHERE project_id=?)',
            project_id, callback);
    },
    addtask: function(data, callback) {
        return db.query('INSERT INTO project_task (project_id, task_id) VALUES(?, ?)',
            [data.project_id, data.task_id], callback);
    },
    assigntask: function(data, callback) {
        return db.query('INSERT INTO user_task (user_id, task_id) VALUES(?, ?)',
            [data.user_id, data.task_id], callback);
    },
    updatetask: function(task, callback) {
    	return db.query('UPDATE tasks SET name=?, owner_id=? WHERE id=?',
            [task.name, task.lead_id, task.id], callback);
    },
    deletetask: function(task_id, callback) {
    	return db.query('DELETE FROM tasks WHERE id=?', task_id, callback);
    }
}

module.exports = Pivot;
