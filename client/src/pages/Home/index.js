import React, {Component} from "react";
import "./style.css";
import About from "../../components/About/index";
import {Link} from "react-router-dom";
import Artwork from "../Artwork/index";
import Code from "../Code/index";

const axios = require("axios");


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page : window.location.pathname.split("/")[1],
            artwork: []
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
        axios.get("/api/artwork").then((response) => {
            console.log(response);
            this.setState({
                artwork: response.data
            })
        }).catch(function(err) {
            console.log(err);
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
                currentPage = <Artwork artwork = {this.state.artwork}/>
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