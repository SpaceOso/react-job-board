const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const jobsController = require('../controllers').jobsController;
const userController = require('../controllers').userController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/jobs', jobsController.create);
  app.post('/api/user', userController.create);
  app.post('/api/user/addEmployer', userController.addEmployer);
  app.get('/api/user/list', userController.list);


  // FROM TUTORIAL
  // app.post('/api/todos', todosController.create);
  // app.get('/api/todos', todosController.list);
  // app.get('/api/todos/:todoId', todosController.retrieve);
  // app.put('/api/todos/:todoId', todosController.update);
  // app.delete('/api/todos/:todoId', todosController.destroy);
  //
  // app.post('/api/todos/:todoId/items', todoItemsController.create);
  // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  // app.delete(
  //   '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  // );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
