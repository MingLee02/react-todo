import React, { Component } from 'react';
var $ = require("jquery");

export const getId = () => { return window.location.pathname.replace('/details/', '') };

export const addItem = (item) => {
    var listId = getId();

    $.ajax({
        method: 'POST',
        url: "/todos/item/create",
        data: { 
            content: item,
            todoId: listId
        }
    })
    window.location.reload();
}

export const getList = () => {
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

export const deleteList = () => {
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

export const updateItem = (id, status) => {
    var listId = getId();
    $.ajax({
        url: "/todos/item/" + id + "/update",
        type: 'put',
        async: false,
        data: { 
            todoItemId: id,
            todoId: listId,
            complete: status
        },
        success: function(data) {
        } 
    });
}

export const getItems = () => {
    var list = getList()
    return list.todoItems;
}

var items = null;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          todoLists: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleInputChange(event) {
        var items = getItems()
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(event.target.value, 10)) {
                if (items[i].complete === false) {
                    updateItem(items[i].id, true)
                } else {
                    updateItem(items[i].id, false)
                }
            }
        }
    }

    handleSubmit(event) {
        addItem(this.state.value)
        event.preventDefault();
    }

    render() {
        var list = getList()
        items = list.todoItems;

        return (
            <div>
                <a href='/'>List</a>
                <h2>{list.title}</h2>
                <ul>
                    {items.map(item =>
                        <li key={item.id}>
                            <form>
                                <label>
                                  <input
                                    name="complete"
                                    type="checkbox"
                                    value={item.id}
                                    defaultChecked={item.complete}
                                    onChange={this.handleInputChange} />
                                </label>
                                {item.content}
                            </form>
                        </li>
                    )}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} placeholder="Add New Todo Item" onChange={this.handleChange} />
                    <input type="submit" value="Add new todo" />
                </form>
                <br/>
                <button onClick={deleteList}>
                    Delete List
                </button>
            </div>
        );
    }
}

export default App;