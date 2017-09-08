import React, { Component } from 'react';
var $ = require("jquery");

export const getList = function(listId) {
    var result = null;
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

class App extends Component {
    render() {
        var id = window.location.pathname.replace('/details/', '');
        var list = getList(id)
        console.log(list)

        return (
            <div>
                <h2>Todo</h2>
            </div>
        );
    }
}

export default App;