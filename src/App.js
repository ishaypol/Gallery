import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import Flickr from "flickrapi"


function Photo(props){
        return (
            <img src={props.source} alt={props.source} />
        );
}

var PhotoPan = React.createClass({

    render: function () {
        return (
            <ul>
                {
                    this.props.photos.map((source)=> {
                        return(
                            <li key={source}>
                                <Photo source={source} />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});

var Layout = React.createClass({
    getInitialState: function () {
        return {photos: []};
    },
    searchPhotos: function (query) {
        var api_key = 'b4f935ecf2ae1382defc3b002a7f6b80';
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&' +
            'api_key=' + api_key + '&text=' + query + '&format=json&per_page=5&nojsoncallback=1';

        axios.get(url).then(res => {
                var res_dict = res.data.photos.photo;
                this.setState({ photos: res_dict });
            });
    },
    render: function () {
        return (
            <div>
                <h1> My Photo Gallery</h1>
                <SearchField searchPhotos={this.searchPhotos}/>
                <PhotoPan photos={this.state.photos}/>
            </div>
        );
    }
});

var SearchField = React.createClass({

    getInitialState: function () {
        return {value: ""}
    },
    handleChange(event) {
        this.setState({value: event.target.value});
    },

    handleSubmit: function (event) {
        event.preventDefault();
        this.props.searchPhotos(this.state.value);
    },
   render: function () {
       return(
           <form onSubmit={this.handleSubmit} >
               <input type="text"  value={this.state.value}  onChange={this.handleChange}/>
               <input type="submit" value="submit"/>
           </form>
       );
   }
});


class App extends Component {
  render() {
    return (
          <Layout/>
    );
  }
}

export default App;
