const fs = require('fs');
var args = process.argv.slice(2);

//Creates a to-do list file
const createTodoList = fs.appendFileSync('./todo.txt', '', (err) => {
  if (err) throw err;
  console.log('To-do list created');
});

//-----Displays usage info when 'help' is passed as an argument or no argument is passed.
const info = () => {
  const usageInfo = `Usage: 
  % node index.js help               #Show usage info
  % node index.js ls                 #Show remaining to-dos
  % node index.js add "to-do item"   #Add to-do item
  % node index.js remove "NUMBER"    #Remove to-do item
  % node index.js reset              #Remove all to-do items
  `;
  console.log(usageInfo);
};

//-----Adds a new to-do item to the list
const addTodo = () => {
  const newTodo = args[1];
  if (newTodo) {
    let data = [];
    const fileData = fs.readFileSync('./todo.txt').toString();
    fs.writeFile('./todo.txt', newTodo + '\n' + fileData, function (err) {
      if (err) throw err;
      console.log('Added to-do item: "' + newTodo + '"');
    });
  } else {
    console.log('Error: Missing to-do string. No new items added!');
  }
};

//-----Reads data from todo.txt and displays them
const list = () => {
  let data = [];
  //Read from todo.txt and convert into string
  const fileData = fs.readFileSync('./todo.txt').toString();
  //Split string and store into array
  data = fileData.split('\n');
  //Filter string for any empty lines
  let filterData = data.filter(function (value) {
    return value !== '';
  });
  if (fileData.length === 0) {
    console.log('There are no pending to-dos');
  }
  for (let i = 0; i < filterData.length; i++) {
    console.log(filterData.length - i + '. ' + filterData[i]);
  }
};

//-----Deletes a to-do item from the list
const deleteTodo = () => {
  const deleteIndex = args[1];
  if (deleteIndex) {
    let data = [];
    const fileData = fs.readFileSync('./todo.txt').toString();
    data = fileData.split('\n');
    //Filter data for any empty lines
    let filterData = data.filter(function (value) {
      return value !== '';
    });
    //If delete index is greater than number of task or less than zero
    if (deleteIndex > filterData.length || deleteIndex <= 0) {
      console.log(`Error: to-do # ${deleteIndex} doesn't exist. Nothing was deleted.`);
    } else {
      //Remove the to-do item
      filterData.splice(filterData.length - deleteIndex, 1);
      //Join the array to form a string
      const newData = filterData.join('\n');
      //Write the new data back in file
      fs.writeFile('./todo.txt', newData, function (err) {
        if (err) throw err;
        // Logs the deleted index
        console.log(`Deleted to-do # ${deleteIndex}`);
      });
    }
  } else {
    console.log('Error: Missing NUMBER for deleting to-do item.');
  }
};

//Removes all to-do items from the list
const reset = () => {
  const deleteAll = args[0];
  if (deleteAll) {
    fs.writeFile('./todo.txt', '', function (err) {
      if (err) throw err;
      console.log('New to-do list file');
    });
  }
};

switch (args[0]) {
  case 'help': {
    info();
    break;
  }
  case 'list': {
    list();
    break;
  }
  case 'add': {
    addTodo();
    break;
  }
  case 'remove': {
    deleteTodo();
    break;
  }
  case 'reset': {
    reset();
    break;
  }
  default: {
    info();
  }
}
