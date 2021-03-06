import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    faHeart,
    faArrowDown,
    faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { SET_CLICKED_PALETTE } from '../../Router';

const PaletteColors = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(${(props) => props.number}, 2fr);
    width: 280px;
    height: 160px;
    cursor: pointer;
    border: 2px solid white;
    border-radius: 15px 15px 0 15px;
    background-color: white;
`;

const PaletteColor = styled.div`
    background-color: ${(props) => props.color};
    &:nth-child(1) {
        border-radius: 15px 0 0 15px;
    }
    &:nth-last-child(1) {
        border-radius: 0 15px 0 0;
    }
`;

const PaletteListEntry = ({ palette, dispatch, history }) => {
    const {
        id,
        userId,
        paletteName,
        description,
        colorCode01,
        colorCode02,
        colorCode03,
        colorCode04,
        colorCode05,
        colorCode06,
        colorCode07,
    } = palette;

    const colorCode = [
        colorCode01,
        colorCode02,
        colorCode03,
        colorCode04,
        colorCode05,
        colorCode06,
        colorCode07,
    ].filter((code) => code !== null);

    const paletteColors = useRef(null);

    const onClickPalette = (e) => {
        dispatch({
            type: SET_CLICKED_PALETTE,
            palette: {
                id,
                userId,
                paletteName,
                colorCode: [...colorCode],
                description,
            },
        });
        history.push(`/paletteDetail/${id}`);
    };

    const onClickDownload = async () => {
        try {
            const dataUrl = await domtoimage.toPng(paletteColors.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = '색갈피';
            link.click();
        } catch (error) {
            console.error('다운로드 과정에서 오류가 발생했습니다', error);
        }
    };

    return (
        <div className='palette__wrapper'>
            <PaletteColors
                className='palette__colors'
                number={colorCode.length}
                onClick={onClickPalette}
                ref={paletteColors}
            >
                {colorCode.map((color, idx) => (
                    <PaletteColor
                        className='palette__color'
                        color={color}
                        key={idx}
                    />
                ))}
            </PaletteColors>
            <div className='palette__info--hidden'>
                <span className='palette__title'>{paletteName}</span>
                <div className='palette__icons'>
                    <button className='palette__like'>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className='palette__save'>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            onClick={onClickDownload}
                        />
                    </button>
                    <CopyToClipboard text={`http://localhost:5000/${id}`}>
                        <button className='palette__share'>
                            <FontAwesomeIcon icon={faShareAlt} />
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
            <button className='palette__delete--hidden'>삭제</button>
        </div>
    );
};

export default withRouter(PaletteListEntry);
