import React from 'react';
import { Link } from 'react-router-dom';
import PaletteList from '../components/palette/PaletteList';
import RandomColorList from '../components/palette/RandomColorList';
import { BigSquareButton } from './Pages_styd';

const Main = ({ isLogin }) => {
    // TODO: 메인 페이지 들어오자마자 팔레트 정보 불러오기 GET 요청 (useEffect, axios
    return (
        <main className='main__main-content'>
            <BigSquareButton>
                {!isLogin ? (
                    <Link to='/signIn'>내 색갈피 만들기</Link>
                ) : (
                    <Link to='/makePalette'>내 색갈피 만들기</Link>
                )}
            </BigSquareButton>
            <section className='fav-palettes__container'>
                <h3 className='fav-palettes__title'>많이 찾은 색갈피</h3>
                <PaletteList />
            </section>
            <section className='current-palettes__container'>
                <h3 className='current-palettes__title'>새로운 색갈피</h3>
                <PaletteList />
            </section>
            <section className='random-colors__container'>
                <h3 className='random-colors__title'>지금의 색</h3>
                <RandomColorList />
            </section>
        </main>
    );
};

export default Main;
