const { check, validationResult }   = require('express-validator/check');
const { sanitizeBody }              = require('express-validator/filter');

var models = require('../models');
var { verifyToken } = require('../services/authService');

exports.get_list = [verifyToken, function (req, res, next){
    models.Project.findAll({ 
        where: {
            userId: res.locals.id
        }
     })
    .then(projectList => {
        res.send(JSON.stringify(projectList));
    })
    .catch(err => {
        return next(err);
    });
}];

exports.get_instance = [verifyToken, function(req, res, next){
    if(!req.params.id){
        res.status(401);
        res.send("You need to provide ID");
    }
    else{
        models.Project.findAll({
            where: {
                id: req.params.id
            },
            include: [{model: models.Task, as: 'tasks'}]
        })
        .then(projectInstance => {
            if(!projectInstance[0]){
                res.status(404);
                res.send("Project not found");
            }
            else if(projectInstance[0].UserId != res.locals.id){
                res.status(403);
                res.send("Not authorized");
            }
            else{
                res.send(JSON.stringify(projectInstance[0]));
            }
        })
        .catch(err => {
            return next(err);
        });
    }
}];

exports.post_instance = [
    verifyToken,
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required!'),
    check('color').trim().isIn(["red", "green", "blue", "yellow", "orange"]).withMessage('Color must be red, green, blue, yellow or orange!'),

    sanitizeBody('name').trim(),
    sanitizeBody('color').trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400);
            res.json({status: 1, errors: errors.array()});
        }
        else{
            models.Project.create({
                name: req.body.name,
                color: req.body.color,
                UserId: res.locals.id
            })
            .then(project => {
                res.send({status: 0, message: "Project created", project: project});
            })
            .catch(err => {
                res.status(500);
                res.send({status: 1, error: err});
            })
        }
}];

exports.put_instance = [
    verifyToken,
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required!'),
    check('color').trim().isIn(["red", "green", "blue", "yellow", "orange"]).withMessage('Color must be red, green, blue, yellow or orange!'),

    sanitizeBody('name').trim(),
    sanitizeBody('color').trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400);
            res.json({status: 1, errors: errors.array()});
        }
        else{
            models.Project.findById(req.params.id)
                .then(project => {
                    if(!project){
                        res.status(404);
                        res.json({ status: 1, message: "Not found" });
                    }
                    else if(project.UserId != res.locals.id){
                        res.status(403);
                        res.json({ status: 1, message: "Not authorized" });
                    }
                    else{
                        project.update({
                            name: req.body.name,
                            color: req.body.color
                        })
                        .then(() => {
                            res.json({status: 0, message: "Project updated.", project: project});
                        })
                        .catch(err => {
                            res.status(500);
                            res.json({status: 2, error: err});
                        });
                    }
                })
                .catch(err => {
                    res.status(500);
                    res.json({status: 2, error: err});
                });
        }
}];

exports.delete_instance = [
    verifyToken,
    (req, res, next) => {
        models.Project.findById(req.params.id)
            .then(project => {
                if(!project){
                    res.status(404);
                    res.json({ status: 1, message: "Not found" });
                }
                else {
                    project.destroy()
                        .then(result => {
                            res.json({ status: 0, message: "Project deleted successfully", project: project });
                        })
                        .catch(err => {
                            res.json({status: 2, error: err});
                        });
                }
            })
            .catch(err => {
                res.status(500);
                res.json({status: 2, error: err});
            });
    }
];