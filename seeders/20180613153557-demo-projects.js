'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Project', [
        { name: 'Tasker',color: 'red' },
        { name: 'Learning ReactJS', color: 'green' },
        { name: 'Room decoration', color: 'blue' },
        { name: 'GOkart building', color: 'orange' },
        { name: 'Making short films', color: 'yellow' }
    ], {});

    const projects = await queryInterface.sequelize.query('select id from project');
    const projectIds = projects[0];

    return await queryInterface.bulkInsert('Task', [
        { title: 'Finish backend', description:'This task is longer than it seems', color: 'red', status: 'todo', projectId: projectIds[0].id },
        { title: 'Handle errors on client', color: 'green', status: 'todo', projectId: projectIds[0].id },
        { title: 'Create seed data', description:'Some description', color: 'blue', status: 'doing', projectId: projectIds[0].id },
        { title: 'Add users to project', color: 'orange', status: 'todo', projectId: projectIds[0].id },
        { title: 'Create some client stuff', color: 'orange', status: 'done', projectId: projectIds[0].id },
        { title: 'Authentication and authorization', description:'Some description for this task', color: 'yellow', status: 'todo', projectId: projectIds[0].id }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Project', null, {});
      await queryInterface.bulkDelete('Task', null, {});
  }
};
