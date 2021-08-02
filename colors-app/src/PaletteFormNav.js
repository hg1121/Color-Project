import React, { useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import PaletteMetaForm from './PaletteMetaForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        alignItems: 'center', //control the vertical space
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
      navBtns: {
          marginRight: '1rem'
      },
      button: {
          margin: '0 0.5rem'
      }

}))

export default function PaletteFormNav(props) {
    const [pupOpen, setPupOpen] = React.useState(false);
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

    const handleOpen = () => {
        setPupOpen(true);
    }

    const handleClose = () => {
        setPupOpen(false);
    }

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
                    <Link to='/' style={{textDecoration: 'none'}}> 
                        <Button variant="contained"  color="secondary" className={classes.button}> Back </Button>  
                    </Link>
                    <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}> Save Palette</Button>
                </div>
                <Dialog open={pupOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Save</DialogTitle>
                    <ValidatorForm onSubmit={handleSubmit} >
                    <DialogContent>
                    <DialogContentText>
                        Please enter a unique name for your new palette!
                    </DialogContentText>
                    <TextValidator  
                        value={newPaletteName} 
                        name='newPaletteName' 
                        label='Palette Name' 
                        fullWidth
                        margin='normal'
                        onChange={e => setNewPaletteName(e.target.value)}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter PaletteName", "Name Already used!"]}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type='submit'> Save Palette </Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </AppBar>
            
        </div>
    )
}
