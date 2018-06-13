'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    status: DataTypes.STRING
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.Project, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};