import React from "react";
import "./style.css";
const path = require("path");

function About(props) {
    let portrait = path.join(__dirname, "images/self-portrait.jpg");
    return(
        <div id = "about">
            {/* <h1 id = "logo">Hunter Wilkins</h1> */}

            <section id = "bio">
                <section id = {props.groovy ? "summary" : "summary-clean"}>
                    <figure id = "portrait">
                        <img src = {portrait} alt = "Me"/>
                    </figure>
                    
                    <p>
                        <strong>Hunter Wilkins</strong> is an artist, writer, singer, musician, and programmer.
                        With over nine years of experience in Adobe Photoshop and a certificate from the
                        Coding Bootcamp at UT Austin, he's excited to get started in the wonderful world of web development!
                    </p>
                </section>
                <br></br>
                <div id = "tabs" className = {props.groovy ? "" : "clean-links"}>
                    <a href = "https://github.com/HunterWilkins" target = "blank">GitHub</a>
                    <a href = "/images/Hunter Wilkins Resume.pdf" target = "blank">Resume</a>
                    <a href = "https://www.linkedin.com/in/hunter-wilkins-591047117/" target = "blank">LinkedIn</a>
                </div>
                <br></br>
                <article className = {props.groovy ? "" : "clean-blue"}>
                    {/* <p>He has extensive experience with...</p>
                    <ul>
                        <li>HTML, CSS, JavaScript, JQuery</li>
                        <li>MongoDB, Mongoose</li>
                        <li>MySQL, Sequelize</li>
                        <li>Handlebars</li>
                        <li>React.js</li>
                        <li>And more!</li>
                    </ul>
                    <br></br> */}
                    <p>If you wish to commission Hunter Wilkins for artwork or a website, contact him at <em>wilkins.hunter@gmail.com</em>.</p>
                </article>

            </section>
            <br />
            
            <br></br><br></br>
                        
        </div>
    )
}

export default About;