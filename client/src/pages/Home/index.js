import React, {Component} from "react";
import "./style.css";
import About from "../../components/About/index";
import {Link} from "react-router-dom";
import Artwork from "../Artwork/index";
import Code from "../Code/index";

class Home extends Component {
    state = {
        page : window.location.pathname.split("/")[1]
    }

    route = (destination) => {
        console.log(destination);
        this.setState({
            page: destination
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
                currentPage = <Artwork />
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