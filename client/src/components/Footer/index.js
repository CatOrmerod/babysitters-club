import React from 'react';
import './footer.css';
import { FaGithub, FaLinkedin, FaSlack } from "react-icons/fa";

const Footer = () => {

    return (
        <footer class="container-fluid text-center" id="contact-me">
            <div class="icon-bar">
                <a href="https://www.linkedin.com/in/cat-ormerod/" className="linkedin" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/CatOrmerod" className="github" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="https://usyd-fsf-feb-2021.slack.com/team/U01JL79DMMH" className="Slack" target="_blank" rel="noreferrer"><FaSlack /></a>
            </div>
        </footer>
    );
};

export default Footer;
