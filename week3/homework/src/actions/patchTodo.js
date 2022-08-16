'use strict';

function patchTodo(todo, request, response) {
  const { todo: changeTodo } = request.body;

  const id = request.params.id;

  todo
    .patchTodo(id, changeTodo.description, changeTodo.done)
    .then((todo) => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });

  return todo;
}

module.exports = patchTodo;
