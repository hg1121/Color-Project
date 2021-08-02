import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {open: false, newPaletteName: ''}
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClickOpen() {
        this.setState({open: true});
      };
    
    handleClose () {
        this.setState({open: false});
      };

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit() {
        const newname = this.state.newPaletteName;
        const newPalette = {
            paletteName: newname, 
            id: newname.toLocaleLowerCase().replace( / /g, "-"),
            colors: this.props.colors};
            this.props.savePalette(newPalette);
            this.props.history.push('/');
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase() ) );
    }
    render() {
        const {open, newPaletteName} = this.state;
        return <h1>lllalla</h1>;
    }
}
