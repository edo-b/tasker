'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "red",
      values: ['red', 'green', 'yellow', 'orange', 'blue']
    },
    
    status:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "todo",
      values: ['todo', 'doing', 'done']
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};