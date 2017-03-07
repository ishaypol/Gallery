import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

function Photo(props){
        var photo_url = `https://farm${props.photo_data.farm}.staticflickr.com/${props.photo_data.server}` +
            `/${props.photo_data.id}_${props.photo_data.secret}.jpg`;
        var pic = axios.get(photo_url).then(res => {
            return res.data;
        });
        return (
            <img src={photo_url} className="photo" alt={props.source} height="200" width="200"/>
        );
}

var PhotoContainer = React.createClass({

    getInitialState: function(){
        return {display_num: 10};
    },
    handleNumChange: function (event) {
        this.setState({display_num: event.target.value});
    },
    render: function () {
        return (
            <div>
                <div>
                    {
                        this.props.photos.slice(0,this.state.display_num).map((photo_data)=> {
                            return(
                                    <Photo photo_data={photo_data} key={photo_data.id}/>
                            );
                        })
                    }
                </div>
                <div>
                    <select className="dropdown" onInput={this.handleNumChange}>
                        <option value="5">5</option>
                        <option value="10" selected="selected">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        );
    }
});

var Layout = React.createClass({
    getInitialState: function () {
        return {photos: []};
    },
    searchPhotos: function (query) {
        const api_key = 'b4f935ecf2ae1382defc3b002a7f6b80';
        const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&' +
            'api_key=' + api_key + '&text=' + query + '&format=json&per_page=60' +
            '&nojsoncallback=1&sort=interestingness-desc';

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
                <PhotoContainer photos={this.state.photos}/>
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
               <input type="text"  value={this.state.value}  onChange={this.handleChange} placeholder="what do you want to look for?"/>
               <input type="submit" value="Search"/>
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
