'use strict';

const Express = require('express');

// import CRUD actions
const {
  createTodo,
  readTodos,
  readTodo,
  updateTodo,
  deleteTodo,
  clearTodos,
  // eslint-disable-next-line comma-dangle
  patchTodo,
} = require('./actions');

const Todo = require('./todo');

const FILENAME = 'todos.json';
const PORT = 3000;
const TODO_SLUG = 'todos';

const todo = new Todo(FILENAME);

const app = new Express();

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());

app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));
app.patch(`/${TODO_SLUG}/:id`, patchTodo.bind(null, todo));

app.listen(PORT, (error) => {
  if (error) return console.error(error);

  console.log(`Listening on http://localhost:${PORT}...`);
});
