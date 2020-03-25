import React, {Component} from "react";
import "./style.css";

const axios = require("axios");


class Artwork extends Component {
    state = {
        fullscreen : false,
        images: []
    }


    componentDidMount = () => {
        console.log(this.state);
    }

    // getArt = async () => {
    //     let response = await axios.get("/api/artwork").then(function(data){
    //             console.log(data);
    //             console.log(this.state);
    //         }).catch(function(err) {
    //             console.log(err);
    //         });
    //     let {data} = response.data;
    //     this.setState({images: data});
    // }

    render() {
        return (
            <div>
                <h1>Artwork</h1>
                <div id = "gallery">
                    {this.state.images.map(image => {
                        let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                        return (
                            <div className = "thumbnail">
                                <img src = {"/images/thumbnails/" + image + ""} alt = {"" + name + ""}></img>
                                <p className = "bottom">{name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Artwork;