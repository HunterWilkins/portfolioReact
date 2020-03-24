import React, {Component} from "react";
import "./style.css";

const axios = require("axios");


class Artwork extends Component {
    state = {
        fullscreen : false,
        images: ["test", "test", "test"]
    }

    componentDidMount = () => {
        axios.get("/api/artwork").then(function(data){
            console.log(data);
            this.setState({
                images: data
            });
        }).catch(function(err) {
            console.log(err);
        })
    }

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