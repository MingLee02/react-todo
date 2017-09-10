import React, { Component } from 'react';
var $ = require("jquery");

export const getId = function() {
    return window.location.pathname.replace('/details/', '');
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
    render() {
        var list = getList()

        return (
            <div>
                <h2>{list.title}</h2>
                <button onClick={deleteList}>
                    Delete List
                </button>
            </div>
        );
    }
}

export default App;