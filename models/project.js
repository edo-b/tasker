'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  });

  Project.associate = function(models) {
    models.Project.hasMany(models.Task);
  };

  return Project;
};