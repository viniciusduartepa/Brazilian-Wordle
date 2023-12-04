import React from 'react';
import './style.css'; // Importa o arquivo de estilo

import { Game } from './components/Game';

export const MainPage = () => {
    return (
        <div className="main-page">
            <span className="logo-text">
                <span className="blue">Wordle</span>
                <span className="green">B</span>
                <span className="yellow">R</span>
            </span>
            <Game></Game>
        </div>
    )
}