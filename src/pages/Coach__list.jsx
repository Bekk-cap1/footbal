import React, { useEffect, useState } from 'react'

import './Coach__list.scss'
import Participants from './Participants'

function Coach__list() {
    const [all, setAll] = useState(1);
    const [refereeData, setRefereeData] = useState([]);

    const handleClick = (id) => {
        const numericId = parseInt(id, 10);
        setAll((prev) => (prev === numericId ? 0 : numericId));
    };

    const fetchData = async () => {
        try {
            const coatchList = await fetch('https://apiv2.uzllf.uz/api/v1/home/coach_list/');
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
        <>
            <Participants />
            <div className="coach w-full">
                <div className='coach__middle'>
                    <div className='coach__middle__inner'>
                        <div className='coach__middle__inner__header'>
                            <h2 className={all === 1 ? "hover" : ""} id='1' onClick={() => handleClick('1')}><span>Все</span></h2>
                            <h2 className={all === 2 ? "hover" : ""} id='2' onClick={() => handleClick('2')}><span>2025</span></h2>
                        </div>
                        <div className="coach__middle__inner__main">
                            <form action="#" onSubmit={searchReferee}>
                                <input type="text" placeholder="Поиск по ФИО" name="searchValue" required />
                                <button type="submit">найти</button>
                            </form>
                            <span onClick={resetFilters} className="cursor-pointer">
                                <i className="bi bi-arrow-counterclockwise"></i>
                                <p>Сбросить фильтры</p>
                            </span>
                        </div>
                        <div className="coach__middle__inner__table">
                            {refereeData.length === 0 ? (
                                <p className="text-center mt-4">Ничего не найдено</p>
                            ) : (
                                <table className="w-full text-center mt-2">
                                    <thead className='border-b-2'>
                                        <tr>
                                            <th>№</th>
                                            <th className='justify-start items-start'>Тренеры</th>
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
        </>
    )
}

export default Coach__list