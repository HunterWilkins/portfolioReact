import React, {Component} from "react";
import "./style.css";
import About from "../../components/About/index";
import {Link} from "react-router-dom";
import Artwork from "../../components/Artwork/index";
import Code from "../Code/index";

const axios = require("axios");


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page : window.location.pathname.split("/")[1],
            artwork: [],
            artGenre: "all",
            image: "",
            fullscreen: false
        }
    }

    componentDidMount = () => {
        console.log(this.state);
        this.getArt();
    }

    route = (destination) => {
        console.log(destination);
        this.setState({
            page: destination
        });
    }


    getArt = () => {
        axios.post("/api/artwork", {genre: "all", fileName: ""}).then((response) => {
            console.log(response);
            this.setState({
                artwork: response.data
            })
        }).catch(function(err) {
            console.log(err);
        });
    }

    fullScreen = (imageName, display) => {
        this.setState({
            fullscreen: display,
            image: imageName
        });
    }

    renameArt = () => {
        axios.get("/api/rename/equals", (response) => {
            console.log(response)
        });
    }

    render() {
        let pages = ["About", "Artwork", "Code"];
        let currentPage;
        
        switch(this.state.page) {
            case "about":
                currentPage = <About />
                break;
            case "artwork":
                currentPage = <Artwork fullscreen = {this.state.fullscreen} 
                                image = {this.state.image} 
                                genre = {this.state.artGenre} 
                                artwork = {this.state.artwork}
                                showFullScreen = {this.fullScreen}
                                />
                break;
            case "code":
                currentPage = <Code />
                break;
            default:
        }

        return (
            <div>
                <aside>
                    {pages.map(item => {
                        return(
                            <Link to = {"/" + item.toLowerCase()} className = {this.state.page === item.toLowerCase() ? "active-tab" : ""} onClick = {() => {this.route(item.toLowerCase())}}>{item}</Link>
                        )    
                    })}

                    <button onClick = {this.renameArt}>Rename</button>

                </aside>
                
                <main>
                    {
                        currentPage
                    }
                </main>

                <footer>
                    <p className = "center">wilkins.hunter@gmail.com</p>
                </footer>
            </div>
        )
    }
}

export default Home;