import React, { useContext, useState } from 'react'

import "./Participants.scss"
import { useNavigate } from 'react-router-dom'
import { Context } from '../assets/Context/Context';

function Participants() {
    const {activeIdParticipants, setActiveIdParticipants} = useContext(Context)

    const handleClick = (id) => {
        // Convert id to number to ensure consistent comparison
        const numericId = parseInt(id, 10);
        setActiveIdParticipants((prev) => (prev === numericId ? 0 : numericId));
    };


    const navigate = useNavigate()
    return (
        <div className='participants'>
            <div className="participants__inner">
                <div className="participants__inner__container">
                    <h1>участники</h1>
                    <div className='participants__inner__container__menu'>
                        <ul>
                            <li className={activeIdParticipants == 1 ? "hover" : ""} onClick={() => handleClick("1")}><span>команды</span></li>
                            <li className={activeIdParticipants == 2 ? "hover" : ""} onClick={() => handleClick("2")}><span>игроки</span></li>
                            <li className={activeIdParticipants == 3 ? "hover" : ""} onClick={() => {
                                handleClick("3")
                                navigate("/participants/referee")
                            }}><span>судьи</span></li>
                            <li className={activeIdParticipants == 4 ? "hover" : ""} onClick={() => {
                                handleClick("4")
                                navigate("/participants/coach-list")
                            }}><span>тренеры</span></li>
                            <li className={activeIdParticipants == 5 ? "hover" : ""} onClick={() => handleClick("5")}><span>трансферы</span></li>
                        </ul>
                        <div>
                            <h4><span>Зал славы</span></h4>
                            <select name="year" id="year">
                                <option >2025</option>
                                <option >2024</option>
                                <option >2023</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Participants