var db = require('../db');

var Pivot = {
    getuser: function(email, callback) {
        return db.query('SELECT * FROM users WHERE email=?', email, callback);
    },
    createuser: function(user, hash, callback) {
        return db.query('INSERT INTO users(email, password, name) VALUES(?, ?, ?)',
            [user.email, hash, user.name], callback);
    },

    getprojectsbyowner: function(user_id, callback) {
        return db.query('SELECT * FROM projects WHERE owner_id=?', user_id, callback);
    },
    getproject: function(project_id, callback) {
        return db.query('SELECT * FROM projects WHERE id=?', project_id, callback);
    },
    getprojectsbyteam: function (team_id, callback) {
        return db.query('SELECT p.* FROM projects AS p, ' +
            '(SELECT user_id AS o_id FROM user_team WHERE team_id=?)' +
            'WHERE user_id = o_id',
            team_id, callback);
    },
    createproject: function(project, callback) {
        return db.query('INSERT INTO projects(name, team_id, owner_id, created) VALUES(?, ?, ?, ?)',
            [project.name, project.team_id, project.owner_id, project.created], callback);
    },
    updateproject: function(project, callback) {
        return db.query('UPDATE projects SET name=?, team_id=?, owner_id=? WHERE id=?',
            [project.name, project.team_id, project.owner_id, project.id], callback);
    },
    deleteproject: function(project_id, callback) {
        return db.query('DELETE FROM projects WHERE id=?', project_id, callback);
    },

    getteam: function(team_id, callback) {
        return db.query('SELECT * FROM teams WHERE id=?', team_id, callback);
    },
    getteamsbyuser: function(user_id, callback) {
        return db.query('SELECT * FROM teams WHERE id IN (SELECT team_id FROM user_team WHERE user_id=?)', user_id, callback);
    },
    jointeam: function (data, callback) {
        return db.query('INSERT INTO user_team(user_id, team_id) VALUES(?, ?)',
            [data.user_id, data.team_id], callback);
    },
    leaveteam: function (data, callback) {
        return db.query('DELETE FROM user_team WHERE user_id=? AND team_id=?',
            [data.user_id, data.team_id], callback);
    },
    teamadd: function (team_id, val, callback) {
        return db.query('UPDATE teams SET size=size+? WHERE id=? AND size > 0',
            [val, team_id], callback);
    },
    createteam: function(team, callback) {
        return db.query('INSERT INTO teams(name, size, owner_id) VALUES(?, ?)',
            [team.name, 1, team.owner_id], callback);
    },
    updateteam: function(team, callback) {
    	return db.query('UPDATE teams SET name=?, owner_id=? WHERE id=?',
            [team.name, team.owner_id, team.id], callback);
    },
    deleteteam: function(team_id, callback) {
    	return db.query('DELETE FROM teams WHERE id=?', team_id, callback);
    },

    gettasksbyproject: function(project_id, callback) {
        return db.query('SELECT * from tasks WHERE id IN (SELECT task_id FROM project_task WHERE project_id=?)', project_id, callback);
    },
    addtask: function(data, callback) {
        return db.query('INSERT INTO project_task (project_id, task_id) VALUES(?, ?)',
            [data.project_id, data.task_id], callback);
    }
}

module.exports = Pivot;
