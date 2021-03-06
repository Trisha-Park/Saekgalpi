import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PaletteList from '../components/palette/PaletteList';
import RandomColorList from '../components/palette/RandomColorList';
import { BigSquareButton } from './Pages_styd';
import axios from 'axios';

import { LOADING_START, LOADING_END } from '../Router';

const Main = ({
    isLogin,
    favPalettes,
    currentPalettes,
    dispatch,
    userInfo,
}) => {
    const getPalettes = useCallback(async () => {
        dispatch({ type: LOADING_START });
        try {
            const favPalettesData = await axios.get(
                'http://54.180.156.40:5000/visitGet'
            );
            const currentPalettesData = await axios.get(
                'http://54.180.156.40:5000/updateGet'
            );

            if (!favPalettesData || !currentPalettesData) {
                dispatch({
                    type: LOADING_END,
                    favPalettes: [],
                    currentPalettes: [],
                });
            } else {
                dispatch({
                    type: LOADING_END,
                    favPalettes: favPalettesData.data,
                    currentPalettes: currentPalettesData.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getPalettes();
    }, [getPalettes]);

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
                <PaletteList
                    dispatch={dispatch}
                    palettes={favPalettes}
                    userInfo={userInfo}
                />
            </section>
            <section className='current-palettes__container'>
                <h3 className='current-palettes__title'>새로운 색갈피</h3>
                <PaletteList
                    dispatch={dispatch}
                    palettes={currentPalettes}
                    userInfo={userInfo}
                />
            </section>
            <section className='random-colors__container'>
                <h3 className='random-colors__title'>지금의 색</h3>
                <RandomColorList />
            </section>
        </main>
    );
};

export default Main;
