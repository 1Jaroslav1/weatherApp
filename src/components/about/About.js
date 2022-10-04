import React from 'react';
import weatherApiImage from '../../images/Asset-62.png'
import freepikImage from '../../images/1841784.png'
import flaticonImage from '../../images/flaticon_negative.svg'
import './About.scss';

const About = () => {
    return (
        <div className="about">
            <div className="about__title">
                About
            </div>
            <div className="about__descr">
                This project was made with help of:
            </div>
            <div className="about__wrapper">
                <div className="about__item">
                    <a className="about__item-title" href='https://www.freepik.com/'><img src={freepikImage} alt="" className="about__item-icon" /></a>
                </div>
                <div className="about__item">
                    <a className="about__item-title" href='https://www.weatherapi.com/'><img src={weatherApiImage} alt="" className="about__item-icon" /></a>
                </div>
                <div className="about__item">
                    <a className="about__item-title" href='https://www.flaticon.com/'><img src={flaticonImage} alt="" className="about__item-icon" /></a>
                </div>
            </div>
        </div>
    );
};

export default About;