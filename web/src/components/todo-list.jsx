import React, { Component } from 'react';
var $ = require("jquery");

export const addList = function(title) {
    $.ajax({
        method: 'POST',
        url: "/todos/create",
        data: { title: title }
    }).done(function(msg) {
        window.location.reload()
    })
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
                <h2>Todo List</h2>
                {this.state.todoLists.map(list =>
                <div key={list.id}>{list.title}</div>
                )}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New List: 
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default App;