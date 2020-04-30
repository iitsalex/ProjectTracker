var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var Pivot = require('./Pivot');
var withAuth = require('./PivotMiddleware');

var secret = 'devsecret';

/* All calls require respective object
 * interface unless solely param based.
 *
 * user calls require user interface
 * projects calls require project interface
 * teams calls require team interface
 * parks calls require park interface
 */

// Authentication
router.get('/user/auth', withAuth, function(req, res) {
  const uid = req.cookies.uid;
  Pivot.getuserbyid(uid, function(err, user) {
    if (user === undefined || user.length === 0) {
      res.status(401).send('Invalid cookie');
    } else {
      res.status(200).json(user[0]);
    }
  });
});

router.get('/user/deauth', withAuth, function(req, res) {
  res.clearCookie('token').sendStatus(200);
});

// Users
router.post('/user/login', function(req, res) {
  Pivot.getuser(req.body.email, function(err, user) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      if (user === undefined || user.length === 0) {
        res.status(401).send('No such user');
      } else {
        bcrypt.compare(req.body.password, user[0].password, function(err, valid) {
          if (valid) {
            const id = user[0].id;
            const payload = {
              id
            };
            const token = jwt.sign(payload, secret, {expiresIn: '1h'});
            user[0].password = '';
            res.cookie('uid', id, {httpOnly: true});
            res.cookie('token', token, {httpOnly: true});
            res.status(200).json(user[0]);
          } else if (!valid) {
            res.status(401).send('Invalid password');
          } else {
            res.status(400).json(err);
            console.log(err);
          }
        });
      }
    }
  });
});

router.post('/user/create', function(req, res) {
  Pivot.getuser(req.body.email, function(err, user) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      if (user !== undefined && user.length !== 0) {
        res.status(403).send('User exists');
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          Pivot.createuser(req.body, hash, function(err, user) {
            if (err) {
              res.status(400).json(err);
              console.log(err);
            } else {
              const id = user.insertId;
              const payload = {
                id
              };
              const token = jwt.sign(payload, secret, {expiresIn: '1h'});
              req.body.password = '';
              res.cookie('uid', id, {httpOnly: true});
              res.cookie('token', token, {httpOnly: true});
              res.status(200).json(req.body);
            }
          });
        });
      }
    }
  });
});

router.get('/user/team/:team_id', withAuth, function(req, res) {
  Pivot.getusersbyteam(req.params.team_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

// Projects
router.post('/projects', withAuth, function(req, res) {
  const uid = req.cookies.uid;
  var today = new Date();
  Pivot.createproject(req.body, uid, today, function(err, project) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      Pivot.createsprint('Sprint X', project.insertId, today, function(err, sprint) {
        if (err) {
          res.status(400).json(err);
          console.log(err);
        } else {
          res.status(200).json(req.body);
        }
      });
    }
  });
});

router.get('/projects/id/:project_id', withAuth, function(req, res) {
  Pivot.getproject(req.params.project_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows[0]);
    }
  });
});

router.get('/projects/team/:team', withAuth, function(req, res) {
  Pivot.getprojectsbyteam(req.params.team, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.put('/projects', withAuth, function(req, res) {
  Pivot.updateproject(req.body, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete('/projects/:project_id', withAuth, function(req, res) {
  Pivot.deleteproject(req.params.project_id, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

// Teams
router.post('/teams', withAuth, function(req, res) {
  const uid = req.cookies.uid;
  Pivot.createteam(req.body.name, uid, function(err, team) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      Pivot.jointeam(uid, team.insertId, function(err) {
        if (err) {
          res.status(400).json(err);
          console.log(err);
        } else {
          res.status(200).json(req.body.name);
        }
      });
    }
  });
});

router.get('/teams/id/:team_id', withAuth, function(req, res) {
  Pivot.getteam(req.params.team_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows[0]);
    }
  });
});

router.get('/teams/user/:user_id', withAuth, function(req, res) {
  Pivot.getteamsbyuser(req.params.user_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/teams/currentuser', withAuth, function(req, res) {
  const uid = req.cookies.uid;
  Pivot.getteamsbyuser(uid, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.post('/teams/join', withAuth, function(req, res) {
  Pivot.getuser(req.body.email, function(err, user) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      if (user === undefined || user.length === 0) {
        res.status(404).send('No such user');
      } else {
        const user_id = user[0].id;
        Pivot.getteamanduser(user_id, req.body.team_id, function(err, match) {
          if (match !== undefined && match.length !== 0) {
            res.status(412).send('Already in this team or invalid team');
          } else {
            Pivot.jointeam(user_id, req.body.team_id, function(err, count) {
              if (err) {
                res.status(400).json(err);
                console.log(err);
              } else {
                Pivot.teamaddusers(req.body.team_id, 1, function(err, count) {
                  if (err) {
                    res.status(400).json(err);
                    console.log(err);
                  }
                });
                delete user[0].password;
                res.status(200).json(user[0]);
              }
            });
          }
        });
      }
    }
  });
});

router.post('/teams/leave', withAuth, function(req, res) {
  Pivot.getteam(req.body.team_id, function(err, team) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      if (team[0].size <= 1) {
        Pivot.deleteteam(req.body.team_id, function(err, count) {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          } else {
            res.json(req.body);
          }
        });
      } else {
        Pivot.leaveteam(req.body, function(err, count) {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          } else {
            Pivot.teamaddusers(req.body.team_id, -1, function(err, count) {
              if (err) {
                res.status(400).json(err);
                console.log(err);
              }
            });
            res.json(req.body);
          }
        });
      }
    }
  });
});

router.put('/teams', withAuth, function(req, res) {
  Pivot.updateteam(req.body, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete('/teams/:team_id', withAuth, function(req, res) {
  Pivot.deleteteam(req.params.team_id, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.params.team_id);
    }
  });
});

// Tasks
router.post('/tasks', withAuth, function(req, res) {
  const uid = req.cookies.uid;
  var today = new Date();
  if (req.body.assignee_id === 'null') {
    req.body.assignee_id = null;
  }
  Pivot.latestsprint(req.body.project_id, function(err, sprints) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      Pivot.createtask(req.body, uid, sprints[0].id, today, function(err, task) {
        if (err) {
          res.status(400).json(err);
          console.log(err);
        } else {
          res.json(task.insertId);
        }
      });
    }
  })
});

router.get('/tasks/id/:task_id', withAuth, function(req, res) {
  Pivot.gettask(req.params.task_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows[0]);
    }
  });
});

router.get('/tasks/sprint/:sprint_id', withAuth, function(req, res) {
  Pivot.gettasksbysprint(req.params.sprint_id, function(err, rows) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/tasks/project/:project_id', withAuth, function(req, res) {
  Pivot.gettasksbyproject(req.params.project_id, function(err, tasks) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      let backlog_tasks = tasks.filter(task => task.state === 0);
      let active_tasks = tasks.filter(task => task.state === 1);
      let task_dist = [
        {name: 'New', container: []},
        {name: 'In Progress', container: []},
        {name: 'Done', container: []}
      ]

      active_tasks.forEach((task) => {
        switch (task.status) {
          case 0:
            task_dist[0].container.push(task);
            break;
          case 1:
            task_dist[1].container.push(task);
            break;
          case 2:
            task_dist[2].container.push(task);
            break;
          default:
            const error = new Error('Unknown task status: ' + task.status);
            throw error;
        }
      });
      sorted_tasks = {
        backlog: backlog_tasks, // list of tasks
        active: task_dist // list of objects, each with container for tasks
      }
      res.json(sorted_tasks);
    }
  });
});

router.put('/tasks', withAuth, function(req, res) {
  if (req.body.assignee_id === 'null') {
    req.body.assignee_id = null;
  }
  Pivot.updatetask(req.body, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete('/tasks/:task_id', withAuth, function(req, res) {
  Pivot.deletetask(req.params.task_id, function(err, count) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

// Sprints
router.post('/sprints', withAuth, function(req, res) {
  var today = new Date();
  Pivot.createsprint(req.body.name, req.body.project_id, today, function(err, sprint) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.json(sprint.insertId);
    }
  });
});

router.post('/sprints/complete/latest', withAuth, function(req, res) {
  var today = new Date();
  Pivot.completelatestsprint(req.body.project_id, today, function(err) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      Pivot.createsprint('Sprint X', req.body.project_id, today, function(err, sprint) {
        if (err) {
          res.status(400).json(err);
          console.log(err);
        } else {
          Pivot.updateinprogresstasks(req.body.project_id, sprint.insertId, function(err, sprints) {
            if (err) {
              res.status(400).json(err);
              console.log(err);
            } else {
              res.status(200).json(sprint.insertId);
            }
          });
        }
      });
    }
  })
});

router.get('/sprints/project/:project_id', withAuth, function(req, res) {
  Pivot.getsprintsbyproject(req.params.project_id, function(err, sprints) {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.status(200).json(sprints);
    }
  });
});

module.exports = router;
