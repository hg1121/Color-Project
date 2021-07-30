import React, { Component } from 'react';

export default function PaletteFooter(props) {
    const {paletteName, emoji} = props; //function does not need this.props
        return (
            <footer className='Palette-footer'>               
                {paletteName}
                <span className='emoji'>{emoji}</span>
            </footer>
        )
}
