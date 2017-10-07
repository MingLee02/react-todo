import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
var $ = require("jquery");

export const addList = (title) => {
    $.ajax({
        method: 'POST',
        url: "/todos/create",
        data: { title: title }
    })
    
    window.location.reload()
}

class App extends Component {
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
                        <li key={list.id}><Link to={'/details/'+list.id }>{list.title}</Link></li>
                    )}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} placeholder="Add New List"onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default App;