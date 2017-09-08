import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import TodoList from './components/todo-list';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <Router>
          <div>
            <div className="App">
                <Link to="/">Home</Link>
            </div>

            <div className="container">
              <Switch>
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