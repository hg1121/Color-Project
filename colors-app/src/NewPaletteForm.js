import React, { useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

const drawerWidth = 360;
const maxColors = 20;
//theme is a default style library
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100vh'
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%'
  },
  button: {
    width: '50%'
  },
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
      width: '100%',
      padding: '1rem',
      marginTop: '1rem',
      fontSize: '1.5rem',
  },
  colorInput: {
      width: '100%',
      heigth: '70px',

  },
  chrome: {
      width: '100% !important'
  }
}));

//when you want to access props inside the function component
export default function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentColor,setCurrentColor] = React.useState('teal');
    const [colors, setColors] = React.useState(props.palettes[0].colors);
    const [newColorName, setNewColorName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');

    

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    }

    const addNewColor = () => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };
        setColors([...colors, newColor]);
        setNewColorName('');
    }

    useEffect( () => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            colors.every( ({ name }) => name.toLowerCase() !== value.toLowerCase() ));
        ValidatorForm.addValidationRule('isColorUnique', value => 
            colors.every( ({ color }) => color !== currentColor ) );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase() ) );    
    });


    const removeColor = (colorName) => {
        setColors( colors.filter(color => color.name !== colorName));
    }
    //make the position persist after box was dragged
    const onSortEnd = ({oldIndex, newIndex}) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
      };

    const addRandomColor = () => {
        // take all colors from all palettes and make them into one array use flat()
        const allColors = props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random()*allColors.length);
        const randomColor = allColors[rand];
        setColors(colors => [...colors, randomColor]);

    }

    return (
        <div className={classes.root}>
        <PaletteFormNav 
            classes={classes} 
            open={open} 
            colors={colors} 
            setOpen={setOpen}
            newPaletteName={newPaletteName}
            setNewPaletteName={setNewPaletteName}
            originalProps={props}/>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <Divider />

            <div className={classes.container}>
                <Typography variant='h4' gutterBottom>Create Palette</Typography>
                <div className={classes.buttons}>
                    <Button 
                            className={classes.button}
                            variant='contained' 
                            color='secondary' 
                            onClick={() => setColors([])}
                            disabled={colors.length == 0}
                            startIcon= {colors.length !== 0 && <DeleteIcon />}
                    >
                        {colors.length == 0 ? 'Palette is Empty' : 'Clear' }
                    </Button>
                    <Button 
                            className={classes.button}
                            variant='contained' 
                            color='primary'
                            onClick={addRandomColor}
                            disabled={colors.length >= maxColors}
                    >
                        {colors.length >= maxColors ? 'Palette is Full': 'Random Color' }
                    </Button>
                </div>

                <div className={classes.picker}>
                    <ChromePicker 
                        className={classes.chrome}
                        color={currentColor}
                        onChangeComplete={updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={addNewColor}>
                        <TextValidator
                            className={classes.colorInput}
                            value={newColorName}
                            name='newColorName'
                            variant='filled'
                            margin='normal'
                            placeholder='Enter A Unique Color Name'
                            onChange={e => setNewColorName(e.target.value)}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a Color Name', 'Color Name does exist', 'Color does exist']}
                        />
                        <Button
                            className={classes.addColor} 
                            variant='contained' 
                            color='primary'
                            style={{ backgroundColor: currentColor }}
                            type='submit'
                            disabled={colors.length >= maxColors}
                        >
                            {colors.length >= maxColors ? 'Palette is Full': 'Add Color'}
                        </Button>
                    </ValidatorForm>
                </div>
            </div>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <DraggableColorList 
                colors={colors} 
                removeColor={removeColor}
                axis='xy'
                onSortEnd={onSortEnd}
            />
        </main>
        </div>
    );
}
