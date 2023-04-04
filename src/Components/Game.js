// Game.js
import React, { useState } from 'react';
import Card from './Card';
import './Game.css';

function Game() {
    const [deck, setDeck] = useState(Array.from({ length: 52 }, (_, i) => i + 1));
    const [playerCards, setPlayerCards] = useState(Array.from({ length: 4 }, () => null));
    const [opponentCards, setOpponentCards] = useState(Array.from({ length: 4 }, () => null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const drawCard = () => {
        const cardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[cardIndex];
        setDeck(deck.filter((_, i) => i !== cardIndex));
        if (isPlayerTurn) {
            const emptyIndex = playerCards.findIndex((card) => card === null);
            if (emptyIndex !== -1) {
                setPlayerCards([
                    ...playerCards.slice(0, emptyIndex),
                    card,
                    ...playerCards.slice(emptyIndex + 1),
                ]);
            }
        } else {
            const emptyIndex = opponentCards.findIndex((card) => card === null);
            if (emptyIndex !== -1) {
                setOpponentCards([
                    ...opponentCards.slice(0, emptyIndex),
                    card,
                    ...opponentCards.slice(emptyIndex + 1),
                ]);
            }
        }
        setIsPlayerTurn(!isPlayerTurn);
    };

    const handleCardClick = (index) => {
        if (isPlayerTurn) {
            const emptyIndex = playerCards.findIndex((card) => card === null);
            if (emptyIndex === -1) return;
            setPlayerCards([
                ...playerCards.slice(0, emptyIndex),
                playerCards[index],
                ...playerCards.slice(emptyIndex + 1),
            ]);
            setPlayerCards([
                ...opponentCards.slice(0, index),
                null,
                ...opponentCards.slice(index + 1),
            ]);
        } else {
            const emptyIndex = opponentCards.findIndex((card) => card === null);
            if (emptyIndex === -1) return;
            setOpponentCards([
                ...opponentCards.slice(0, emptyIndex),
                opponentCards[index],
                ...opponentCards.slice(emptyIndex + 1),
            ]);
            setOpponentCards([
                ...opponentCards.slice(0, index),
                null,
                ...opponentCards.slice(index + 1),
            ]);
        }
        setIsPlayerTurn(!isPlayerTurn);
    };

    return (
        <div className="game-container">
            <div className="player-container">
                <h2>You</h2>
                <div className="cards-container">
                    {playerCards.map((card, index) => (
                        <Card key={index} value={card} onClick={() => handleCardClick(index)} />
                    ))}
                </div>
            </div>
            <div className="opponent-container">
                <h2>Opponent</h2>
                <div className="cards-container">
                    {opponentCards.map((card, index) => (
                        <Card key={index} value={card} />
                    ))}
                </div>
            </div>
            <button className="draw-button" onClick={drawCard}>Draw Card</button>
        </div>
    );
}

export default Game;
