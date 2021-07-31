import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        width: '20%',
        height:'25%',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
    },
    
}

//childFunc need to take the props as input when taking props frpm parent function
function DraggableColorBox({color, classes}) {

        return (
            <div 
                className={classes.root}
                style={{backgroundColor: color, display: 'inline-block'}}>
                {color}
            </div>
        )
    
}

export default withStyles(styles)(DraggableColorBox);