import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import CreateTodo from './create-todo';

class App extends Component {
  state = {todoLists: []}

  componentDidMount() {
    fetch('/todos/list')
      .then(res => res.json())
      .then(todoLists => this.setState({ todoLists }));
  }

  render() {
    return (
      <div>
        <h2>Todo List</h2>
        {this.state.todoLists.map(list =>
          <div key={list.id}>{list.title}</div>
        )}
        <Router>
          <Switch>
            <Route exact path="/create-todo-list" component={CreateTodo} />
            <button><Link to="/create-todo-list">Create New List</Link></button>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;