import React, { Component } from 'react';
import axios from 'axios';

var Photo = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
        }
    },
    HandleOnLoad: function(){
        this.setState(
            {loading: false});
        document.getEle
    },
    renderSpinner: function () {
        if (this.state.loading) {
            return <div className="preloader4"></div>;
        }
        else{
            return null;
        }
    },
    render: function () {
            var photo_url = `https://farm${this.props.photo_data.farm}.staticflickr.com/${this.props.photo_data.server}` +
                `/${this.props.photo_data.id}_${this.props.photo_data.secret}.jpg`;
            var display = 'none';
            if(!this.state.loading){display='inLine'}
            return (
                <div style={{display:'inLine'}}>
                    {this.renderSpinner()}
                    <img src={photo_url} className="photo" alt={this.props.source} onLoad={this.HandleOnLoad}
                         style={{display:display}} height="165" width="165"/>
                </div>
            );
        }
});

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
                    <select  className="dropdown" defaultValue='10' onInput={this.handleNumChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                <div className="Photos">
                    {
                        this.props.photos.slice(0,this.state.display_num).map((photo_data)=> {
                            return(
                                    <Photo photo_data={photo_data} key={photo_data.id}/>
                            );
                        })
                    }
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
           <form className="searchbox_1" onSubmit={this.handleSubmit}>
                <input type="search" className="search_1" onChange={this.handleChange} placeholder="Search Photos" />
                <button type="submit" className="submit_1" value="search">Go!</button>
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
