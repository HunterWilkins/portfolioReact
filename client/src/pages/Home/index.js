import React, {Component} from "react";
import "./style.css";
import About from "../../components/About/index";
import {Link} from "react-router-dom";
import Artwork from "../../components/Artwork/index";
import Code from "../../components/Code/index";

const axios = require("axios");


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page : window.location.pathname.split("/")[1],
            artwork: [],
            artGenre: "all",
            groovy: true,
            image: "",
            fullscreen: false
        }
    }

    componentDidMount = () => {
        let date = new Date();
        let currentHour = date.getHours();

        // Changes theme to dark mode if it's past 9:00pm (currently irrelevant)
        if (currentHour >= 21) {
            this.changeTheme(false);
        }
        else {
            this.changeTheme(true);
        }


        this.getArt();
    }

    changeTheme = (theme) => {
        const groovyTheme = {
            "--shade": "rgb(17,15,15)",
            "--layer0": "rgb(32, 27, 27)",
            "--layer1": "rgb(20, 12, 12)",
            "--layer2": "rgb(97, 88, 82)",
            "--highlight": "rgb(231, 215, 180)",
            "--text-color": "rgb(230,230,230)"
        }

        const cleanTheme = {
            "--text-color": "rgb(36, 36, 36)",
            "--shade": "rgb(255, 255, 255)",
            "--layer0" : "rgb(228,228,228",
            "--layer1": "rgb(255, 255, 255)",
            "--layer2": "rgb(190, 190, 190)",
            "--highlight": "rgb(0, 0, 0)",
        }
        
        if (theme.length > 0) { //clicked lightbulb
            this.setState({
                groovy: theme
            });
        }
        
        else { //automated
            this.setState({
                groovy: !this.state.groovy
            });    
        }

        if (this.state.groovy === false) {
            for (var x in groovyTheme) {
                document.documentElement.style.setProperty(x, groovyTheme[x]);
            }
        }

        else {
            for (var x in cleanTheme) {
                document.documentElement.style.setProperty(x, cleanTheme[x]);
            }
        }
    }

    route = (destination) => { 
        //Handlebars-esque routing, using this component as the "main" view,
        //accomplished by "mocking" html routes
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
            image: imageName === "null" ? this.state.image : imageName,
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
            case "":
                currentPage = <About groovy = {this.state.groovy}/>
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
                currentPage = <Code groovy = {this.state.groovy}/>
                break;
            default:
                currentPage = <About groovy = {this.state.groovy}/>
                break;
        }

        return (
            <div>
                <nav className = {this.state.groovy ? "" : "clean-blue"}>
                    <p>Hunter Wilkins</p>
                    <div id = "themes-button">
                        <input id = "theme" type = "checkbox"></input>
                        <label className = {this.state.groovy ? "check-button invert" : "check-button"} for = "theme" onClick = {this.changeTheme}>
                            <img src = "images/lightbulb-icon.png"></img>
                        </label>
                    </div>
                </nav>
                <aside className = {this.state.groovy ? "" : "clean-blue"}>
                    {pages.map(item => {
                        if (item !== "About") {
                            return(
                                <Link to = {"/" + item.toLowerCase()} className = {this.state.page === item.toLowerCase() ? "active-tab" : ""} onClick = {() => {this.route(item.toLowerCase())}}>{item}</Link>
                            )        
                        }
                        else {
                            return (
                                <Link to = {"/"} className = {this.state.page === "" || this.state.page === "about" ? "active-tab" : ""} onClick = {() => {this.route("")}}>{item}</Link>
                            )
                        }
                    })}

                    {/* <button onClick = {this.renameArt}>Rename</button> */}
                    
                </aside>
                
                <main>
                    {
                        currentPage
                    }
                    
                    
                </main>

                <footer className = {this.state.groovy ? "" : "clean-blue"}>
                    <p>wilkins.hunter@gmail.com</p>
                </footer>
            </div>
        )
    }
}

export default Home;