const { check, validationResult }   = require('express-validator/check');
const { sanitizeBody }              = require('express-validator/filter');

var models = require('../models');

exports.get_list = function (req, res, next){
    models.Project.findAll()
        .then(projectList => {
            res.send(JSON.stringify(projectList));
        })
        .catch(err => {
            return next(err);
        });
};

exports.get_instance = function(req, res, next){
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
            else{
                res.send(JSON.stringify(projectInstance[0]));
            }
        })
        .catch(err => {
            return next(err);
        });
    }
};

exports.post_instance = [
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
                color: req.body.color
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

exports.delete_instance = (req, res, next) => {
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
};

// exports.get_instance = function(req, res, next){
//     const projectInstances = [
//         {
//             id: 1, name:"Learn React", color:"red",
//             tasks: [
//                 {id:1, title:'Project activity bla', description:'In this task we need to do something', color:'red', status:'todo'},
//                 {id:2, title:'Some task to do 123', description:'This is another task of this project', color:'blue', status:'todo'},
//                 {id:3, title:'Test', description:'', color:'blue', status:'doing'},
//                 {id:4, title:'This task is done', description:'Sample description', color:'green', status:'done'},
//                 {id:5, title:'Another done task', description:'', color:'yellow', status:'done'},
//                 {id:6, title:'Done tasksks test', description:'', color:'orange', status:'done'},
//                 {id:7, title:'Task title 12', description:'', color:'blue', status:'done'},
//                 {id:8, title:'1458 things to do', description:'', color:'green', status:'done'},
//                 {id:9, title:'Hello world', description:'', color:'yellow', status:'done'},
//             ]
//         },
//         {id: 2, name:"Tasker project", color:"blue"},
//         {id: 3, name:"School homework", color:"green"},
//         {id: 4, name:"Write seminar", color:"yellow"},
//         {id: 5, name:"Prepare for speach", color:"orange"},
//         {id: 6, name:"Dummy project", color:"blue"}
//     ];

//     setTimeout(function(){
//         let projectInstance = projectInstances.find( instance => instance.id == req.params.id);

//         if(!projectInstance){
//             res.status(404);
//             res.send("Not found");
//         }
//         else {
//             res.send(JSON.stringify(projectInstance));
//         }
//     }, 2000);
// }