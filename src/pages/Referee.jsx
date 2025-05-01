import React, { useEffect, useState } from 'react';
import './Referee.scss';
import { useLocation } from 'react-router-dom';

function Referee() {
    const [all, setAll] = useState(1);
    const [refereeData, setRefereeData] = useState([]);

    const handleClick = (id) => {
        // Convert id to number to ensure consistent comparison
        const numericId = parseInt(id, 10);
        setAll((prev) => (prev === numericId ? 0 : numericId));
    };
    const local = useLocation()


    const fetchData = async () => {
        try {
            const coatchList = await fetch('http://apiv2.uzllf.uz/api/v1/home/coach_list/');
            if (!coatchList.ok) {
                throw new Error('Ошибка сети при загрузке матчей');
            }
            const data = await coatchList.json();
            setRefereeData(data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const searchReferee = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchValue.value.trim().toLowerCase();

        if (searchValue === "") {
            fetchData();
            return;
        }

        const filteredData = refereeData.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setRefereeData(filteredData);
    };

    const resetFilters = () => {
        fetchData();
        document.querySelector('input[name="searchValue"]').value = '';
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="referee w-full">
            <div className="referee__inner w-full py-2 shadow-lg bg-white">
                <div className="referee__inner__title flex flex-col md:flex-row justify-around items-center mx-auto px-1.5 max-w-screen-xl">
                    <h1 className="text-2xl md:text-4xl uppercase mb-4 md:mb-0">участники</h1>
                    <ul className="flex flex-col md:flex-row flex-wrap justify-center items-center uppercase bg-blue-800 px-0 -skew-x-[15deg] mb-4 md:mb-0">
                        <li className="px-2 py-1 text-white hover:bg-blue-600 cursor-pointer">
                            <span className="block skew-x-[15deg]">команды</span>
                        </li>
                        <li className="px-2 py-1 text-white hover:bg-blue-600 cursor-pointer">
                            <span className="block skew-x-[15deg]">игроки</span>
                        </li>
                        <li className={local.pathname == "/referee" ? `px-2 py-1 text-white bg-[rgba(var(--color-bg-hover))] hover:bg-blue-600 cursor-pointer` : ``}>
                            <span className="block skew-x-[15deg]">судьи</span>
                        </li>
                        <li className="px-2 py-1 text-white hover:bg-blue-600 cursor-pointer">
                            <span className="block skew-x-[15deg]">тренеры</span>
                        </li>
                        <li className="px-2 py-1 text-white hover:bg-blue-600 cursor-pointer">
                            <span className="block skew-x-[15deg]">трансферы</span>
                        </li>
                    </ul>
                    <div className="">
                        <h4 className="px-3 py-1 -skew-x-[15deg] text-white bg-blue-500 uppercase cursor-pointer mb-4 md:mb-0 hover:bg-blue-600">
                            <span className="block skew-x-[15deg]">Зал славы</span>
                        </h4>
                        <select
                            name="year"
                            id="year"
                            className="mx-2 outline-none -skew-x-[15deg] py-1 bg-blue-500 text-white w-12"
                        >
                            <option className="inline-block skew-x-[15deg]">2025</option>
                            <option className="inline-block skew-x-[15deg]">2024</option>
                            <option className="inline-block skew-x-[15deg]">2023</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='referee__middle'>
                <div className='referee__middle__inner'>
                    <div className='referee__middle__inner__header'>
                        <h2 className={all === 1 ? "hover" : ""} id='1' onClick={() => handleClick('1')}><span>Все</span></h2>
                        <h2 className={all === 2 ? "hover" : ""} id='2' onClick={() => handleClick('2')}><span>2025</span></h2>
                    </div>
                    <div className="referee__middle__inner__main">
                        <form action="#" onSubmit={searchReferee}>
                            <input type="text" placeholder="Поиск по ФИО" name="searchValue" required />
                            <button type="submit">найти</button>
                        </form>
                        <span onClick={resetFilters} className="cursor-pointer">
                            <i className="bi bi-arrow-counterclockwise"></i>
                            <p>Сбросить фильтры</p>
                        </span>
                    </div>
                    <div className="referee__middle__inner__table">
                        {refereeData.length === 0 ? (
                            <p className="text-center mt-4">Ничего не найдено</p>
                        ) : (
                            <table className="w-full text-center mt-2">
                                <thead className='border-b-2'>
                                    <tr>
                                        <th>№</th>
                                        <th className='justify-start items-start'>Судья</th>
                                        <th>И</th>
                                        <th>ЖК</th>
                                        <th>СР</th>
                                        <th>КК</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {refereeData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                                            <td>{index + 1}</td>
                                            <td className="name">
                                                <span className="text-left">{item.name}</span>
                                            </td>
                                            <td>{item.yellowCards ? item.yellowCards : Math.ceil(Math.random() * 20)}</td>
                                            <td>{item.redCards ? item.redCards : Math.ceil(Math.random() * 20)}</td>
                                            <td>{item.suspensions ? item.suspensions : Math.ceil(Math.random() * 20)}</td>
                                            <td>{item.penalties ? item.penalties : Math.ceil(Math.random() * 20)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Referee;