import React from 'react';
import './styles.css';
import { Title } from './components/Title'; // Importa o arquivo de estilo

import { Game } from './components/Game';

export const MainPage = () => {
    return (
        <div className="main-page">
            <Title/>
            <Game></Game>
        </div>
    )
}