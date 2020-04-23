var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Pivot = require('./Pivot');

/* All calls require respective object
 * interface unless solely param based.
 *
 * user calls require user interface
 * projects calls require project interface
 * teams calls require team interface
 * parks calls require park interface
 */

router.get('/testinvalid', function (req, res) {
  res.status(400).json(err);
});

router.get('/test', function (req, res) {
  res.send('Welcome!');
});

// Users
router.get('/user/login', function (req, res) {
    Pivot.getuser(req.query.email, function(err, user) {
        if(err) {
            res.status(400).json(err);
        } else {
            if (user === undefined || user.length === 0) {
                res.status(401).send('No such user');
            } else {
                bcrypt.compare(req.query.password, user[0].password, function(err, valid) {
                    if (valid) {
                        user[0].password = '';
                        res.json(user[0]);
                    } else if (!valid) {
                        res.status(401).send('Invalid password');
                    } else {
                        res.status(400).json(err);
                    }
                });
            }
        }
    });
});

router.post('/user/create', function (req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        Pivot.createuser(req.body, hash, function(err) {
            if(err) {
                res.status(400).json(err);
            } else {
                res.json(req.body);
            }
        });
    });
});

// Projects
router.post('/projects', function (req, res) {
    Pivot.createproject(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/projects/id/:project_id', function (req, res) {
    Pivot.getproject(req.params.project_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/projects/owner/:user_id', function (req, res) {
    Pivot.getprojectsbyowner(req.params.user_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/projects/team/:team', function (req, res) {
    Pivot.getprojectsbyteam(req.params.team, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/projects', function (req, res) {
    Pivot.updateproject(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/projects/:project_id', function (req, res) {
    Pivot.deleteproject(req.params.project_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

// Teams
router.post('/teams', function (req, res) {
    Pivot.createteam(req.body, function(err, team) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(team.insertId);
        }
    });
});

router.get('/teams/id/:team_id', function (req, res) {
    Pivot.getteam(req.params.team_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/teams/user/:user_id', function (req, res) {
    Pivot.getteamsbyuser(req.params.user_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/teams/join', function (req, res) {
    Pivot.jointeam(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            Pivot.teamaddusers(req.body.team_id, 1, function(err, count) {
                if(err) {
                    res.status(400).json(err);
                }
            });
            res.json(req.body);
        }
    });
});

router.post('/teams/leave', function (req, res) {
    Pivot.getteam(req.body.team_id, function(err, team) {
        if (err) {
            res.status(400).json(err);
        } else {
          if (team[0].size <= 1) {
              Pivot.deleteteam(req.body.team_id, function(err, count) {
                  if(err) {
                      res.status(400).json(err);
                  } else {
                      res.json(req.body);
                  }
              });
          } else {
              Pivot.leaveteam(req.body, function(err, count) {
                  if(err) {
                      res.status(400).json(err);
                  } else {
                      Pivot.teamaddusers(req.body.team_id, -1, function(err, count) {
                          if(err) {
                              res.status(400).json(err);
                          }
                      });
                      res.json(req.body);
                  }
              });
          }
        }
    });
});

router.put('/teams', function (req, res) {
    Pivot.updateteam(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/teams/:team_id', function (req, res) {
    Pivot.deleteteam(req.params.team_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

// Tasks
router.post('/tasks', function (req, res) {
    Pivot.createtask(req.body, function(err, task) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(task.insertId);
        }
    });
});

router.get('/tasks/id/:task_id', function (req, res) {
    Pivot.gettask(req.params.task_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/tasks/project/:project_id', function(req, res) {
    Pivot.gettasksbyproject(req.params.project_id, function(err, tasks) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(tasks);
        }
    });
});

router.post('/tasks', function(req, res) {
    Pivot.addtask(req.body, function(err, tasks) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(tasks);
        }
    });
});

router.post('/tasks/assign', function(req, res) {
    Pivot.assigntask(req.body, function(err, tasks) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(tasks);
        }
    });
});

router.put('/tasks', function (req, res) {
    Pivot.updatetask(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/tasks/:task_id', function (req, res) {
    Pivot.deletetask(req.params.task_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
