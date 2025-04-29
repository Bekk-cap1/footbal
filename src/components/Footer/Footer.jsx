import React, { useContext, useEffect, useState } from 'react'
import './Footer.scss'
import { Context } from '../../assets/Context/Context';

function Footer() {
    const [socialData, setSocialData] = useState([])
    const { activeId, setActiveId } = useContext(Context);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://apiv2.uzllf.uz/api/v1/news/socials/');
                if (!response.ok) {
                    throw new Error('Ошибка сети при загрузке данных');
                }
                const data = await response.json();
                setSocialData(data);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }

        fetchData()

    }, [])

    return (
        <div className={`footer ${activeId !== 0 ? 'shifted' : ''}`}>
            <div className="footer__inner">
                <div className="footer__inner__container">
                    <div className="footer__inner__container__copyright">
                        <h4>© 2025 TATU UZ</h4>
                    </div>
                    <div className="footer__inner__container__socials">
                        {
                            socialData.map((e, i) => (
                                <a key={i} href={e.link} target="_blank" rel="noopener noreferrer">
                                    <img src={e.icon} alt={e.name} className='footer__inner__container__socials__icon' />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer