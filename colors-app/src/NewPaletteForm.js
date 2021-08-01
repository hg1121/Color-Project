import React, { Component , useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 320;
//theme is a default style library
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
}));

//when you want to access props inside the function component
export default function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentColor,setCurrentColor] = React.useState('teal');
    const [colors, setColors] = React.useState([]);
    const [newColorName, setNewColorName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

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

    // const handleChange = (evt) =>{
        
    // }

    useEffect( () => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            colors.every( ({ name }) => name.toLowerCase() !== value.toLowerCase() ));
        ValidatorForm.addValidationRule('isColorUnique', value => 
            colors.every( ({ color }) => color !== currentColor ) );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase() ) );    
    });

    //no need to pass props again inside this function
    const handleSubmit = () => {
        const newname = newPaletteName;
        const newPalette = {
            paletteName: newname, 
            id: newname.toLocaleLowerCase().replace( / /g, "-"),
            colors: colors};
        props.savePalette(newPalette);
        props.history.push('/');
    }

    const removeColor = (colorName) => {
        setColors( colors.filter(color => color.name !== colorName));
    }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator  
                    value={newPaletteName} 
                    name='newPaletteName' 
                    label='Palette Name' 
                    onChange={e => setNewPaletteName(e.target.value)}
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["Enter PaletteName", "Name Already used!"]}
                />
                <Button variant="contained"  color="secondary" type='submit'> Save Palette </Button>
            </ValidatorForm>
            </Toolbar>
        </AppBar>
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
            <Typography variant='h4'>Make your own palette</Typography>
            <div>
                <Button variant='contained' color='secondary' startIcon={<DeleteIcon />}>Clear </Button>
                <Button variant='contained' color='primary'>Random Color </Button>
            </div>
            <ChromePicker 
                color={currentColor}
                onChangeComplete={updateCurrentColor}
            />

            <ValidatorForm onSubmit={addNewColor}>
                <TextValidator
                    value={newColorName}
                    name='newColorName'
                    onChange={e => setNewColorName(e.target.value)}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a Color Name', 'Color Name does exist', 'Color does exist']}
                />
                <Button 
                    variant='contained' 
                    color='primary'
                    style={{ backgroundColor: currentColor }}
                    type='submit'
                >Add Color</Button>
            </ValidatorForm>

            
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            {colors.map( color => 
                <DraggableColorBox 
                    key={color.name}
                    color={color.color} 
                    classes={classes} 
                    name={color.name} 
                    handleDelete={ () => removeColor(color.name)}/>
            )}
        </main>
        </div>
    );
}
