import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import TodoList from './components/todo-list';
import TodoListDetail from './components/todo-detail';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <Router>
          <div>
            <div className="container">
              <Switch>
                <Route path="/details/:value" component={TodoListDetail} />
                <Route exact path="/" component={TodoList} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;