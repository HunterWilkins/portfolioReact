import React, {Component} from "react";
import "./style.css";
import axios from "axios";

class Blog extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    
    }

    componentDidMount = () => {
        axios.get("/api/documents").then((response) => {
            console.log(response);
            let trimmedNames = [];
            response.data.forEach(item => {
                trimmedNames.push(item.replace(".txt", ""));
            });

            this.setState({
                posts: trimmedNames
            })
        });
    }

    getPosts = (data) => {
        
    }

    render() {
        return (
            <div>
                {
                this.state.posts.map(item => {
                    return(
                        <p>{item}</p>
                    )
                })
                }
            </div>
        )
    
    }

}

export default Blog;