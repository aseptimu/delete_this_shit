import React from 'react';
import './HomePage.css'
import {NavLink} from "react-router-dom";

function HomePage(props) {
    return (
        <div className="container">
            <div className="logo">RUTUBE</div>
            <div className="description">Проверьте ваше видео на уникальность</div>
            <div className="sub-description">Узнайте, нарушает ли ваше видео авторское право</div>
            <NavLink className="button" to={'/check'}>Проверить</NavLink>
            <NavLink to="/upload" className="link">Добавить видео в базу</NavLink>
        </div>
    );
}

export default HomePage;