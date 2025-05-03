import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
      
    return (
        <header className="header">
            <div className="header__menu">
                <div className="container">
                    <ul>
                        <li>
                            <a href="#"><span>INFO</span></a>
                            <ul>
                                <li>Стадионы</li>
                                <li>Руководители</li>
                                <li>партнеры</li>
                                <li>документы</li>
                                <li>stats</li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><span>ТУРНИРЫ</span></a>
                            <ul className='tournament'>
                                <h4><span>2025</span></h4>
                                <li>talabar ligasi</li>
                                <li>afc ayollar futzali</li>
                                <li>cafa ayollar futzali</li>
                                <div>
                                    <h5><span>Все матчи</span></h5>
                                    <h5><span>дисквалификации</span></h5>
                                    <h5><span>все турниры</span></h5>
                                </div>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><span>УЧАСТНИКИ</span></a>
                            <ul>
                                <li>команды</li>
                                <li>игроки</li>
                                <li onClick={()=> navigate("/participants/referee")}>судьи</li>
                                <li onClick={()=>navigate("/participants/coach-list")}>тренеры</li>
                                <li>трансферы</li>
                                <li className='zal-slavi'><span>зал славы</span></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><span>НОВОСТИ</span></a>
                        </li>
                        <li>
                            <a href="#"><span>МЕДИА</span></a>
                            <ul>
                                <li>фото</li>
                                <li>видео</li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><span>YOUR CORPORATE</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
