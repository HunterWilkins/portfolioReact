import React, {Component} from "react";
import "./style.css";

const axios = require("axios");



function Artwork(props) {
    
    console.log(props.artwork);

    let thumbnails = [];


    return (
        <div>
            <h1>Artwork</h1>
            <div id = "gallery">
                { props.genre !== "all" ? 
                
                props.artwork[props.genre].map(image => {
                    let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                    return (
                        <div className = "thumbnail">
                            <img src = {"/images/Artwork/" + props.genre + "/thumbnails/" + image + ""} alt = {"" + name + ""}></img>
                            <p className = "bottom">{name}</p>
                        </div>
                    )
                })
                
                :
                props.artwork.map(genre => {
                    return(
                        <div>
                        <p>{genre.name}</p>
                        <div>
                        {genre.array.map(image => {
                            let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                            console.log(name);
                            console.log(genre.name);
                            return (
                                <div className = "thumbnail">
                                <img src = {"/images/Artwork/" + genre.name + "/thumbnails/" + image + ""} alt = {"" + name + ""}></img>
                                <p className = "bottom">{name}</p>
                                </div>
                            )
                        })}
                        </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default Artwork;