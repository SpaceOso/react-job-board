const jobsController = require('../controllers').jobsController;
const userController = require('../controllers').userController;
const employerController = require('../controllers').employerController;
const applicantController = require('../controllers').applicantController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/login/logcheck', userController.loadOnLogin);
  app.post('/api/jobs', jobsController.create);
  app.post('/api/jobs/list', jobsController.list);
  app.post('/api/register', userController.create);
  // app.post('/api/createapplicant', applicantController.create);
  app.post('/api/user/addEmployer', userController.addEmployer);
  app.post('/api/listEmployer', employerController.getJobs);
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
