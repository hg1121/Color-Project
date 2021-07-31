import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId) ;
        this.changeFormat = this.changeFormat.bind(this);
        this.state = {format: 'hex'};
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;  //{50:[], 100:[], 200:[] ...}
        for( let key in allColors){
            shades = shades.concat(
                // allColors[50] = [...]
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({format: val})
    }

    render() {
        console.log(this.props);
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color =>
            <ColorBox 
                key={color.name}
                id={color.id} 
                name={color.name}
                background={color[format]} 
                showLink={false}
            />)
        return (
            <div className='SingleColorPalette Palette'>
                <Navbar handleChange={this.changeFormat} showSlideBar={false}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='go-back ColorBox'>
                        <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}

export default SingleColorPalette;

