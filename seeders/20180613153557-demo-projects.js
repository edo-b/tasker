'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('User', [
        { 
            firstName: 'John', 
            lastName: 'Doe', 
            userName: "john", 
            passwordHash: "fcbb9ffe1b292acbec0a2367b2573451381360edd25892642abbedaf825b3eea27c26f307926425bb104ad99b0db84c6648a0a13ba3eddd76a77a3356875265a", 
            salt: "ffe16f1a379044a6" 
        },
        { 
            firstName: 'Mary', 
            lastName: 'Smith', 
            userName: "mary", 
            passwordHash: "be79795896c4e07a20f8b1f9e87ed7723d6e13d554793f20a616bb59f7933e5ffead40cad6bfd3cda38777d6985729856b369284f6f18f624b1a1735cfc773e8", 
            salt: "e6a5776fce007fa1" 
        },
    ], {});

    const users = await queryInterface.sequelize.query('select id from user');
    const userIds = users[0];
    
    await queryInterface.bulkInsert('Project', [
        { name: 'Tasker', color: 'red', userId: userIds[0].id },
        { name: 'Learning ReactJS', color: 'green', userId: userIds[0].id },
        { name: 'Room decoration', color: 'blue', userId: userIds[0].id },
        { name: 'GOkart building', color: 'orange', userId: userIds[0].id },
        { name: 'Making short films', color: 'yellow', userId: userIds[0].id }
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
    await queryInterface.bulkDelete('User', null, {});
    await queryInterface.bulkDelete('Project', null, {});
    await queryInterface.bulkDelete('Task', null, {});
  }
};