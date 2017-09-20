import React, { Component } from 'react';
import TodoListDetail from './todo-detail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
var $ = require("jquery");

export const addList = function(title) {
    $.ajax({
        method: 'POST',
        url: "/todos/create",
        data: { title: title }
    })
    
    window.location.reload()
}

class List extends Component {
    componentDidMount() {
        $.get( "/todos/list", function( data ) {}).then(todoLists => this.setState({ todoLists }));
    }

    constructor(props) {
        super(props);
        this.state = {
          value: '',
          todoLists: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        addList(this.state.value)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>List</h2>
                <ul>
                    {this.state.todoLists.map(list =>
                        <li class='todo-list' key={list.id}><Link to={'/details/'+list.id }>{list.title}</Link></li>
                    )}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New List: <br></br>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route path="/details/:value" component={TodoListDetail} />
                </Switch>
            </Router>
        );
    }
}

export default App;