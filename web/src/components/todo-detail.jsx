import React, { Component } from 'react';
var $ = require("jquery");

export const getId = function() {
    return window.location.pathname.replace('/details/', '');
}

export const addItem = function(item) {
    var listId = getId();

    $.ajax({
        method: 'POST',
        url: "/todos/item/create",
        data: { 
            content: item,
            todoId: listId
        }
    })
    
    window.location.reload()
}

export const getList = function() {
    var result = null;
    var listId = getId();

    $.ajax({
        url: "/todos/" + listId,
        type: 'get',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
    return result;
}

export const deleteList = function (listId) {
    var listId = getId();

    $.ajax({
        url: "/todos/" + listId + "/delete",
        type: 'delete',
        async: false,
        success: function(data) {
            window.location = '/';
        } 
    });
}

class App extends Component {
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
        addItem(this.state.value)
        event.preventDefault();
    }

    render() {
        var list = getList()
        var items = list.todoItems;

        return (
            <div>
                <h2>{list.title}</h2>
                {items.map(list =>
                    <li key={list.id}>{list.content}</li>
                )}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add New Todo Item: 
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={deleteList}>
                    Delete List
                </button>
            </div>
        );
    }
}

export default App;