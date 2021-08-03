import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteList';
import {CSSTransition, TransitionGroup,} from 'react-transition-group'; 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {open: false, deletingID: ''};
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    openDialog(id){
        this.setState({open: true, deletingID: id})
    }

    closeDialog(){
        this.setState({open: false, deletingID:''})
    }

    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }

    handleDelete(){
        //deletePalette is passing from app.js
        this.props.deletePalette(this.state.deletingID);
        this.closeDialog();
    }
    render() {
        const {palettes, classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map( palette => 
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette {...palette}    
                                handleClick = {() => this.goToPalette(palette.id)}
                                // handleDelete = {deletePalette}
                                openDialog = {this.openDialog}
                                key={palette.id}
                                id={palette.id}
                            /> 
                        </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog onClose={this.closeDialog} aria-labelledby="delete-dialog-title" open={this.state.open}>
                    <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                    <List>
                            <ListItem button onClick={this.handleDelete}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatarBlue}>
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Delete'/>
                            </ListItem>
                            <ListItem button onClick={this.closeDialog}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatarRed}>
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Cancle'/>
                            </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
