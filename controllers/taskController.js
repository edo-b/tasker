const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const models = require('../models');
const { verifyToken } = require('../services/authService');

exports.get_list = (req, res, next) => {
    models.Task.findAll({ include: [ models.Project ]})
        .then(taskList => {
            res.json(taskList);
        })
        .catch(err => {
            return next(err);
        });
};

exports.post_instance = [
    verifyToken,
    check('projectId').trim().isLength({ min: 1 }).isInt().withMessage('Project id is required!'),
    check('title').trim().isLength({ min: 1 }).withMessage('Title is required!'),
    check('description').optional({checkFalsy: true}),
    check('color').trim().isIn(["red", "green", "blue", "yellow", "orange"]).withMessage('Color must be red, green, blue, yellow or orange!'),
    check('status').trim().isIn(["todo", "doing", "done"]).withMessage('Status must be todo, doing or done!'),

    sanitizeBody('title').trim(),
    sanitizeBody('description').trim(),
    sanitizeBody('color').trim(),
    sanitizeBody('status').trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400);
            res.json({status: 1, errors: errors.array()});
        }
        else{
            models.Project.findById(req.body.projectId)
                .then(project => {
                    if(!project){
                        res.status(404);
                        res.json({ status: 1, message:"Project not found!" });
                    }
                    else{
                        models.Task.create({
                            title: req.body.title,
                            description: req.body.description,
                            status: req.body.status,
                            color: req.body.color,
                            ProjectId: req.body.projectId
                        })
                        .then(task => {
                            res.send({status: 0, message: "Task created", task: task});
                        })
                        .catch(err => {
                            res.status(500);
                            res.send({status: 1, error: err});
                        });
                    }
                })
                .catch(err => {
                    res.status(500);
                    res.send({status: 1, error: err});
                });
        }
}];

exports.put_instance = [
    verifyToken,
    check('title').trim().isLength({ min: 1 }).withMessage('Title is required!'),
    check('description').optional({checkFalsy: true}),
    check('color').trim().isIn(["red", "green", "blue", "yellow", "orange"]).withMessage('Color must be red, green, blue, yellow or orange!'),
    check('status').trim().isIn(["todo", "doing", "done"]).withMessage('Status must be todo, doing or done!'),

    sanitizeBody('title').trim(),
    sanitizeBody('description').trim(),
    sanitizeBody('color').trim(),
    sanitizeBody('status').trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400);
            res.json({status: 1, errors: errors.array()});
        }
        else{
            models.Task.findById(req.params.id)
                .then(task => {
                    if(!task){
                        res.status(404);
                        res.json({ status: 1, message:"Task not found!" });
                    }
                    else{
                        task.update({
                            title: req.body.title,
                            description: req.body.description,
                            status: req.body.status,
                            color: req.body.color,
                            ProjectId: task.ProjectId
                        })
                        .then(task => {
                            res.send({status: 0, message: "Task updated", task: task});
                        })
                        .catch(err => {
                            res.status(500);
                            res.send({status: 1, error: err});
                        });
                    }
                })
                .catch(err => {
                    res.status(500);
                    res.send({status: 1, error: err});
                });
        }
}];

exports.delete_intance = [
    verifyToken,
    (req, res, next) => {
        models.Task.findById(req.params.id)
            .then(task => {
                if(!task){
                    res.status(404);
                    res.send({status: 2, message: "Not found"});
                }
                else{
                    task.destroy()
                        .then(() => {
                            res.json({status: 0, message: "Task deleted successfully"})
                        })
                        .catch(err => {
                            res.status(500);
                            res.json({status: 2, error: err});
                        })
                }
            })
            .catch(err => {
                res.status(500);
                res.send({status: 1, error: err});
            });
    }
];