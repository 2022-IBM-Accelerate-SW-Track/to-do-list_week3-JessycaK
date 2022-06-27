import React, { Component } from "react";
import AddTodo from "../component/AddTodo";
import Todos from "../component/todos";
import "./Home.css";

class Home extends Component {
  // Create a default state of this component with an empty list of todos.
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  // the addTodo function simply creates a new array that includes the user submitted todo item and then
  // updates the state with the new list.
  addTodo = (todo) => {
    if (todo.due == null || todo.due == "Invalid Date") {
      return;
    }

    // In React, keys or ids in a list help identify which items have changed, been added or removed. Keys
    // should not share duplicate values.
    // To avoid having dup values, we use the Math.random() function to generate a random value for a todo id.
    // This solution works for a small application but a more complex hashing function should be used when
    // dealing with a larger data sensitive project.
    if (this.state.todos.find((item) => item.content === todo.content)) {
      return;
    } else {
      todo.id = Math.random();

      // Create a array that contains the current array and the new todo item

      let new_list = [...this.state.todos, todo];

      // Update the local state with the new array.
      this.setState({
        todos: new_list,
      });
    }
  };

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };
  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        {/* When passing the AddTodo component, addTodo is a prop that is used in the 
        AddTodo.js file when handling the submit */}
        <AddTodo addTodo={this.addTodo} />

        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        {/* When returning the Todos component, todos is a prop passed to the todos.js file
         to format and render the current todo list state */}
      </div>
    );
  }
}

export default Home;
