import React, { Component } from 'react';
import './ColorBox.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

const style ={
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.55 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.20 ? 'white' : 'black'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.55 ? 'rgba(0,0,0,0.5)' : 'white',
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        bottom: '0',
        right: '0',
        border: 'none',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px'
    }
}

 class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(){
        this.setState({copied: true}, () => {
            setTimeout(()=> this.setState({ copied: false }), 1500)
        });
    }
    render() {
        const {name, background, paletteId, id, showLink, classes} = this.props;
        const {copied} = this.state;
         //get how dark the backgroundColor is. value from 0 to 1
        const  isLightColor = chroma(background).luminance() >= 0.55;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background }}>
                    <div className={ `copy-overlay ${copied && 'show'}` } 
                         style={{ background }}/>
                    <div className={ `copy-msg ${copied && 'show'}`}>
                        <h1>copied</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-container'>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
                    </div>
                    {showLink &&
                        <Link to={`/palette/${paletteId}/${id}`} onClick={ e => e.stopPropagation() }> 
                            <span className={classes.seeMore}>MORE</span>
                        </Link> 
                    }
                    
                </div>
            </CopyToClipboard>   
        )
    }
}

export default withStyles(style)(ColorBox);