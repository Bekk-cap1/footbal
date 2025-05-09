import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ContentLoader from "react-content-loader"

import './Home.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import zal__slavi from '/public/image/zal-slavi.png'
import { Context } from '../assets/Context/Context';



const lapDetails = {
  "ce30558c-da7a-4316-8445-645219a28bc7": {
    place: "TATU SM",
    stage: "ФИНАЛ"
  },
};

function Home() {
  const {activeId, setActiveId} = useContext(Context);
  const [endMatchData, setEndMatchData] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [allNews, setAllNews] = useState([])

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const matchsEnd = useRef(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const matchResponse = await fetch('https://apiv2.uzllf.uz/api/v1/home/last10matches/');

        if (!matchResponse.ok) {
          throw new Error('Ошибка сети при загрузке матчей');
        }
        const matchData = await matchResponse.json();
        console.log(matchData);
        setEndMatchData(matchData);

        const leagueResponse = await fetch('https://apiv2.uzllf.uz/api/v1/home/leaguelist/');
        if (!leagueResponse.ok) {
          throw new Error('Ошибка сети при загрузке лиг');
        }
        const leagueData = await leagueResponse.json();
        setBannerData(leagueData);

        const allNewsResponse = await fetch('https://apiv2.uzllf.uz/api/v1/news/allnews/');
        if (!allNewsResponse.ok) {
          throw new Error('Ошибка сети при загрузке лиг');
        }
        const allNewsData = await allNewsResponse.json();
        setAllNews(allNewsData);
        console.log(allNewsData);


        setLoading(false);
      } catch (error) {
        console.error('Произошла ошибка:', error);
        setLoading(false);
      }
    }
    fetchData();

    if (activeId == 1) {
      matchsEnd.current.classList.add("active")
    }
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (!loading && endMatchData !== null && progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      const seconds = Math.max(0, Math.ceil(time / 1000));
      progressContent.current.textContent = `${seconds}s`;
    }
  };


  const handleClick = (id) => {
    setActiveId(prevId => prevId === id ? 0 : id);
  }

  const formatDate = (dateString, excludeTime = false) => {
    const date = new Date(dateString);

    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekday = days[date.getDay()];

    if (excludeTime) {
      return `${day} ${month} ${weekday}`;
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${hours}:${minutes} ${weekday}`;
  };
  

  console.log(endMatchData);
  


  return (
    <div className='home'>
      <div className="home__inner">
        <div className="home__inner__container">
          <div className="home__inner__container__header">
            <div className='home__inner__container__header__title'>
              <span>
                <i className="bi bi-calendar3" id='1' onClick={() => handleClick("1")}></i>
                <h4
                  id='1'
                  onClick={() => handleClick('1')}
                  className=""
                >
                  <a href="#">Календарь</a>
                </h4>
              </span>
              <h4
                id='2'
                onClick={() => handleClick('2')}
                className={activeId === '2' || activeId === "1" ? 'active ending-match' : 'ending-match'} ref={matchsEnd}
              >
                <a href="#">Прошедшие</a>
              </h4>
              <h4
                id='3'
                onClick={() => handleClick('3')}
                className={activeId === '3' ? 'active' : ''}
              >
                <a href="#">Будущие</a>
              </h4>
            </div>
            <div className={activeId !== 0 ? "home__inner__container__end__matches" : "home__inner__container__end__matches none"}>
              <Swiper
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
                slidesPerView={5}
                breakpoints={{
                  280: {slidesPerView: 1},
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
              >
                {loading ? (
                  // Показываем несколько скелетонов, чтобы имитировать слайды
                  Array.from({ length: 5 }).map((_, index) => (
                    <SwiperSlide key={`loader-${index}`}>
                      <ContentLoader
                        speed={2}
                        width={230}
                        height={260}
                        viewBox="0 0 230 260"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect x="46" y="30" rx="3" ry="3" width="154" height="11" />
                        <rect x="78" y="54" rx="3" ry="3" width="90" height="11" />
                        <circle cx="57" cy="138" r="35" />
                        <rect x="188" y="162" rx="0" ry="0" width="4" height="17" />
                        <rect x="75" y="243" rx="0" ry="0" width="0" height="1" />
                        <circle cx="189" cy="138" r="36" />
                        <rect x="62" y="191" rx="3" ry="3" width="142" height="12" />
                        <rect x="55" y="221" rx="3" ry="3" width="154" height="11" />
                      </ContentLoader>
                    </SwiperSlide>
                  ))
                ) : (
                  // Показываем реальные данные
                  endMatchData?.map((e) => (
                    <SwiperSlide className="mySwiper__slide" key={e.id}>
                      <li>
                        <h6>{formatDate(e.updated_at)}</h6>
                        {lapDetails[e.lap] ? (
                          <div>
                            <p>Место: {lapDetails[e.lap].place}</p>
                          </div>
                        ) : (
                          <p>Нет данных о месте и этапе</p>
                        )}
                        {e.team1?.name && e.team2?.name && (
                          <p className="match__score">
                            <img
                              src={e.team1.icon_url}
                              alt="team1"
                            />
                            {e.team1_goals} : {e.team2_goals}
                            <img
                              src={e.team2.icon_url}
                              alt="team2"
                            />
                          </p>
                        )}
                        <h4>{e?.name}</h4>
                        <h5>{e.league?.name}</h5>
                      </li>
                    </SwiperSlide>
                  ))
                )}
                {
                  loading ? null :
                    <div className="autoplay-progress" slot="container-end">
                      <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                      </svg>
                      <span ref={progressContent}></span>
                    </div>
                }

              </Swiper>
              <button className="swiper-button-prev-custom"><i className="bi bi-chevron-compact-left"></i></button>
              <button className="swiper-button-next-custom"><i className="bi bi-chevron-compact-right"></i></button>
            </div>
            <div className={`home__inner__container__league__info ${activeId !== 0 ? 'shifted' : ''}`}>
              <Swiper
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
                slidesPerView={5}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="bannerSwiper"
              >
                {bannerData.map((banner) => (
                  <SwiperSlide className="bannerSwiper__slide" key={banner.id}>
                    {/* <img src={banner.icon} alt="" /> */}

                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={`home__inner__container__allnews__header ${activeId !== 0 ? 'shifted' : ''}`}>
              <div className={`home__inner__container__allnews__header__left`}>
                {
                  allNews?.map((e) => (
                    <>
                    <div className='flex'>
                      <div key={`${e.id}-1`}>
                        <img src={e.photo} alt="" />
                        <li>
                          <h4>{formatDate(e.updated_at)}</h4>
                          <h3>{e.title}</h3>
                          <p>{e.body}</p>
                        </li>
                      </div>
                      <div key={`${e.id}-2`}>
                        <img src={e.photo} alt="" />
                        <li>
                          <h4>{formatDate(e.updated_at)}</h4>
                          <h3>{e.title}</h3>
                          <p>{e.body}</p>
                        </li>
                      </div>
                    </div>
                    </>
                  ))
                }
                <button>ВСЕ новости</button>
                <a href="#"><img src={zal__slavi} alt="" /></a>
              </div>
              <div className="home__inner__container__allnews__header__right">
                {
                  Object.entries(
                    endMatchData.reduce((acc, match) => {
                      const day = new Date(match.updated_at).toISOString().split('T')[0];
                      if (!acc[day]) acc[day] = [];
                      acc[day].push(match);
                      return acc;
                    }, {})
                  )
                    .sort(([dayA], [dayB]) => dayA.localeCompare(dayB))
                    .map(([day, matches], dayIndex) => (
                      <div key={day} className={`day-group day-color-${dayIndex % 3}`}>
                        <h3 className="day-header">{formatDate(day, true)}</h3>
                        <ul>
                          {matches.map((match, i) => (
                            <li key={i}>
                              <h4>{match.time.slice(0, 5)}</h4>
                              <div>
                                <h5>
                                  {match.team1.name}
                                </h5>
                                <h6>{match.score.team1_score}</h6>
                                <h4> : </h4>
                                <h6>{match.score.team2_score}</h6>
                                <h5>{match.team2.name}</h5>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
