// Card.js
import React from 'react';
import './Card.css';

function Card(props) {
    const { value, onClick } = props;
    const isHidden = value === null;

    return (
        <div className={`card ${isHidden ? 'hidden' : ''}`} onClick={onClick}>
            <div className="card-inner">
                <div className="card-front">
                    <div className="card-corner top-left">
                        <div className="corner-value">{value}</div>
                        <div className="corner-suit">{props.suit}</div>
                    </div>
                    <div className="card-corner bottom-right">
                        <div className="corner-value">{value}</div>
                        <div className="corner-suit">{props.suit}</div>
                    </div>
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    );
}

export default Card;
