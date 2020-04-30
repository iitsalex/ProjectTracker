var mysql = require('mysql');
var db = mysql.createConnection({host: 'localhost', user: 'pivot', password: 'pivot!Node.js', database: 'pivot', multipleStatements: true});

db.connect(function(err) {
  if (err)
    throw err;
  }
);

var Pivot = {
  // Users
  getuser: function(email, callback) {
    return db.query('SELECT * FROM users WHERE email=?', email, callback);
  },
  getuserbyid: function(id, callback) {
    return db.query('SELECT id, fname, lname, email FROM users WHERE id=?', id, callback);
  },
  createuser: function(user, hash, callback) {
    return db.query('INSERT INTO users(email, password, fname, lname) VALUES(?, ?, ?, ?)', [
      user.email, hash, user.fname, user.lname
    ], callback);
  },
  getusersbyteam: function(team_id, callback) {
    return db.query('SELECT id, fname, lname, email FROM users WHERE id IN ' + '(SELECT user_id FROM user_team WHERE team_id=?) ' + 'ORDER BY lname', team_id, callback);
  },

  // Projects
  createproject: function(project, uid, today, callback) {
    return db.query('INSERT INTO projects(name, description, owner_id, created) VALUES(?, ?, ?, ?)', [
      project.name, project.description, uid, today
    ], callback);
  },
  getproject: function(project_id, callback) {
    return db.query('SELECT * FROM projects WHERE id=?', project_id, callback);
  },
  getprojectsbyteam: function(team_id, callback) {
    return db.query('SELECT * FROM projects WHERE id IN ' + '(SELECT project_id FROM team_project WHERE team_id=?) ' + 'ORDER BY name', team_id, callback);
  },
  addproject: function(team_id, project_id, callback) {
    return db.query('INSERT INTO team_project (team_id, project_id) VALUES(?, ?)', [
      team_id, project_id
    ], callback);
  },
  updateproject: function(project, callback) {
    return db.query('UPDATE projects SET name=?, owner_id=? WHERE id=?', [
      project.name, project.owner_id, project.id
    ], callback);
  },
  deleteproject: function(project_id, callback) {
    return db.query('DELETE FROM projects WHERE id=?', project_id, callback);
  },

  // Teams
  createteam: function(name, uid, callback) {
    return db.query('INSERT INTO teams(name, size, lead_id) VALUES(?, ?, ?)', [
      name, 1, uid
    ], callback);
  },
  getteam: function(team_id, callback) {
    return db.query('SELECT * FROM teams WHERE id=?', team_id, callback);
  },
  getteamanduser: function(user_id, team_id, callback) {
    return db.query('SELECT * FROM user_team WHERE user_id=? AND team_id=?', [
      user_id, team_id
    ], callback);
  },
  getteamsbyuser: function(user_id, callback) {
    return db.query('SELECT * FROM teams WHERE id IN ' + '(SELECT team_id FROM user_team WHERE user_id=?)', user_id, callback);
  },
  jointeam: function(user_id, team_id, callback) {
    return db.query('INSERT INTO user_team(user_id, team_id) VALUES(?, ?)', [
      user_id, team_id
    ], callback);
  },
  leaveteam: function(data, callback) {
    return db.query('DELETE FROM user_team WHERE user_id=? AND team_id=?', [
      data.user_id, data.team_id
    ], callback);
  },
  teamaddusers: function(team_id, val, callback) {
    return db.query('UPDATE teams SET size=size+? WHERE id=? AND size > 0', [
      val, team_id
    ], callback);
  },
  updateteam: function(team, callback) {
    return db.query('UPDATE teams SET name=?, owner_id=? WHERE id=?', [
      team.name, team.lead_id, team.id
    ], callback);
  },
  deleteteam: function(team_id, callback) {
    return db.query('DELETE FROM teams WHERE id=?', team_id, callback);
  },

  // Tasks
  createtask: function(data, uid, sprint_id, today, callback) {
    return db.query('INSERT INTO tasks (owner_id, assignee_id, project_id, name, description, status, points, created, sprint_id)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      uid,
      data.assignee_id,
      data.project_id,
      data.name,
      data.description,
      data.status,
      data.points,
      today,
      sprint_id
    ], callback);
  },
  gettask: function(task_id, callback) {
    return db.query('SELECT * FROM tasks WHERE id=?', task_id, callback);
  },
  gettasksbysprint: function(sprint_id, callback) {
    return db.query('SELECT * FROM tasks WHERE sprint_id=?', sprint_id, callback);
  },
  gettasksbyproject: function(project_id, callback) {
    return db.query('SELECT * from tasks WHERE project_id=? AND state <> 2', project_id, callback);
  },
  updatetask: function(task, callback) {
    return db.query('UPDATE tasks SET assignee_id=?, name=?, description=?, status=?, points=? WHERE id=?', [
      task.assignee_id,
      task.name,
      task.description,
      task.status,
      task.points,
      task.id
    ], callback);
  },
  updateinprogresstasks: function(project_id, sprint_id, callback) {
    return db.query('UPDATE tasks SET sprint_id=? WHERE project_id=? AND (status=? OR status=?)', [
      sprint_id, project_id, 0, 1
    ], callback);
  },
  deletetask: function(task_id, callback) {
    return db.query('DELETE FROM tasks WHERE id=?', task_id, callback);
  },

  // Sprint
  createsprint: function(name, project_id, today, callback) {
    return db.query('INSERT INTO project_sprint(name, project_id, created) VALUES(?, ?, ?)', [
      name, project_id, today
    ], callback);
  },
  latestsprint: function(project_id, callback) {
    return db.query('SELECT * FROM project_sprint WHERE project_id=? ORDER BY created DESC LIMIT 1', [project_id], callback);
  },
  completelatestsprint: function(project_id, today, callback) {
    console.log(project_id)
    return db.query('UPDATE project_sprint SET ended=? WHERE id=(SELECT id FROM project_sprint WHERE project_id=? ORDER BY created DESC LIMIT 1);' +
    'UPDATE tasks SET state=status WHERE project_id=?', [
      today, project_id, project_id
    ], callback);
  },
  getsprintsbyproject: function(project_id, callback) {
    return db.query('SELECT * FROM project_sprint WHERE project_id=? ORDER BY created DESC', [project_id], callback);
  }
}

module.exports = Pivot;
