'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "red",
      values: ['red', 'green', 'yellow', 'orange', 'blue']
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  Project.associate = function(models) {
    models.Project.hasMany(models.Task, {as: 'tasks'});
  };

  return Project;
};