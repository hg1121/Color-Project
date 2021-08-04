import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './styles/MiniPalette';
import DeleteIcon from '@material-ui/icons/Delete';

//React.memo can be used to prevent all palettes been rendered after one specific palette has been deleted
const MiniPalette = React.memo(function MiniPalette(props){
    
    const {classes, paletteName, emoji, colors, handleClick, openDialog, id} = props;
    const miniColorBoxes = colors.map( color => (
        <div className={classes.miniColor}
             style = {{backgroundColor: color.color }}
             key = {color.name}
        >

        </div>
    ));

    const deletePalette = (e) => {
        e.stopPropagation();
        openDialog(id);
    }
    
    return (  
        <div className={classes.root} onClick={() => handleClick(id)}>    
        <DeleteIcon 
            className={classes.deleteIcon} 
            style={{transition: 'all 0.3s ease-in-out'}} 
            onClick={deletePalette}
        />
        <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <div className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </div>
            
        </div>
    )
});

export default withStyles(styles)(MiniPalette);