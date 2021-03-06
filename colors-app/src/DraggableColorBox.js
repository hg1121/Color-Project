import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js';

const styles = {
    root: {
        width: '20%',
        height:'25%',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        },
        '@media (max-width: 576px)': {
            width: '100%',   
            height: '5%',           
        },
        '@media (min-width: 576px)': {
            width: '50%',   
            height: '10%',           
        },
        '@media (min-width: 768px)': {
            width: '25%',   
            height: '20%',           
        },
        '@media (min-width: 992px)': {
            width: '20%',   
            height: '25%',           
        },
    },
    boxcontent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: props => chroma(props.color).luminance() <= 0.20 ? 'white' : 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 576px)': {
            padding: '2px 10px',           
        },
    },
    deleteIcon: {
        color: 'rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out',
        
    }
    
}

//childFunc need to take the props as input when taking props frpm parent function
const DraggableColorBox = SortableElement( ({color, classes, name, handleDelete}) => {
        return (
            <div 
                className={classes.root}
                style={{backgroundColor: color, display: 'inline-block'}}
            >
                <div className={classes.boxcontent}>
                    <span>{name}</span>
                    <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
                </div>
                
            </div>
        )
    
})

export default withStyles(styles)(DraggableColorBox);