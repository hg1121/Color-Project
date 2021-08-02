import React, { useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px'
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

}))

export default function PaletteFormNav(props) {
    const {open, setOpen, colors, newPaletteName, setNewPaletteName, originalProps} = props;
    const classes = useStyles();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    //no need to pass props again inside this function
    const handleSubmit = () => {
        const newname = newPaletteName;
        const newPalette = {
            paletteName: newname, 
            id: newname.toLocaleLowerCase().replace( / /g, "-"),
            colors: colors};
            originalProps.savePalette(newPalette);
            originalProps.history.push('/');
    }
    useEffect( () => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase() ) );    
    });
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color='default'
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
                <Typography variant="h6" color='inherit' noWrap>
                    Create New Palette
                </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <ValidatorForm onSubmit={handleSubmit} >
                        <TextValidator  
                            value={newPaletteName} 
                            name='newPaletteName' 
                            label='Palette Name' 
                            onChange={e => setNewPaletteName(e.target.value)}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter PaletteName", "Name Already used!"]}
                        />
                        <Button variant="contained" color="primary" type='submit'> Save Palette </Button>
                    </ValidatorForm>
                    <Link to='/' style={{textDecoration: 'none'}}> 
                            <Button variant="contained"  color="secondary" > Back </Button>  
                    </Link>
                </div>
            </AppBar>
            
        </div>
    )
}
