import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer ( ({colors, removeColor, classes}) => {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            {colors.map( (color, i) => 
                <DraggableColorBox 
                    index = {i}
                    key={color.name}
                    color={color.color} 
                    classes={classes} 
                    name={color.name} 
                    handleDelete={ () => removeColor(color.name)}/>
            )}
        </div>
    )
})

export default DraggableColorList;