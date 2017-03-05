import React, { Component } from 'react';
import './App.css';


var Photo = React.createClass({
    render: function() {
        return (
            <img src="C:\Users\Ishay\Pictures\Feedback\{B8EF1783-573B-4A4E-A6BD-48AEF1A4E7D1}\Capture001.png"/>
        );
    }
});

var photoPane = React.createClass({
    photos: [],
    render: function () {
        return <h1> asdsadsa</h1>;
    }
});

var SearchField = React.createClass({

    search: function () {
        alert('asdasdsa');
    },
   render: function () {
       return(
           <form>
               <input type="text"  default="Search photos here" onee={this.search} />
           </form>
       );
   }
});

class App extends Component {
  render() {
    return (
      <div>
          <SearchField />
          <Photo> hello</Photo>
      </div>
    );
  }
}

export default App;
