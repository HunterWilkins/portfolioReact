import React from "react";
import "./style.css";

function Code(props) {
    const codeCards = [
        {
            href : "https://gigbook-p3.herokuapp.com/",
            github: "https://github.com/HunterWilkins/GigBook",
            title: "GigBook",
            img: "images/code/Gigbook-Icon.png",
            desc: "The Easiest Way for Venues and Artists to make Beautiful Music Together",
            project: true
        },
        {
            href : "https://hunterwilkins.github.io/project_one/",
            github: "https://github.com/HunterWilkins/project_one",
            title: "Nusic",
            img: "images/code/Nusic-logo-transparent.png",
            desc: "Discover New Music Playing in Your Area",
            project: true
        },

        {
            href: "https://bottomlessbox.herokuapp.com",
            github: "https://github.com/HunterWilkins/Bottomless-Box",
            title: "The Bottomless Box",
            img: "images/code/Icon.png",
            desc: "Inventory management and shopping lists made significantly less dull!",
            project: false
        },
        {
            href : "https://memelodge.herokuapp.com",
            github: "https://github.com/HunterWilkins/memesite2.0",
            title: "MemeLodge",
            img: "images/code/Memelodge_Logo.png",
            desc: "The Premier Spot for MEMES and DIVISIVE POLITICAL DISCOURSE!",
            project: false
        },
        {
            href : "https://rootbuyerremastered.herokuapp.com",
            github: "https://github.com/HunterWilkins/RootBuyerRemastered",
            title: "RootBuyer Remastered",
            img: "images/code/RootBuyer.png",
            desc: "An Unofficial Remastering of RootBuyer.com, using React.js",
            project: false
        },

    ];

    const cleanstyle = {
        background: "var(--blue)",
        color : "rgb(230,230,230)"
    }

    return (
        <div id = "code">
            {codeCards.map(item => {
                return(
                    <div key = {"CodePage" + item.title + codeCards.indexOf(item) + ""}className = "card" style = {props.groovy ? {} : cleanstyle}>
                        <p className = "title">{item.title}</p>
                        <br></br>
                        <a href = {item.href} target = "blank">
                            <img className = "project-link" src = {item.img} alt = "Project"></img>
                        </a>
                        <br />
                        <p className = "description">{item.desc}</p>
                        <a href = {item.github} target = "blank">
                            <img className = "github-link" src = "images/code/github-icon.png" alt = "Github"></img>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default Code;