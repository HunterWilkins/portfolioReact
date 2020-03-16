import React, {Component} from "react";
import "./style.css";


class Artwork extends Component {
    state = {
        fullscreen : false,
        images: []
    }

    componentDidMount = () => {
        fetch("/api/artwork", {
            method: "GET"
        }).then(response => {
            console.log(response);
            console.log(response.json());
            return response.json();
        }).then(artwork => {
            console.log(artwork);
            this.setState({
                images: artwork.thumbnails,
                source: artwork.source
            });
        });
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