import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

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
        }
    },
    boxcontent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        color: 'rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out'
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