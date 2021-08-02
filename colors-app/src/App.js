import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from'./seedColors.js';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    //if there is savedPalettes then display savedPalettes, else display seedColors
    this.state = { palettes: savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.synclocalStorage = this.synclocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id){
    return this.state.palettes.find( function(palette) {
        return palette.id === id;
    });
  }

  savePalette(newPalette){
    //make sure call the synclocalStorage function after setState is done
    this.setState(
      { palettes: [...this.state.palettes, newPalette]},
       this.synclocalStorage);
  }

  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.synclocalStorage
    )
  }

  synclocalStorage(){
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes) )
  }

  render() {
    return (
      <Switch>
           <Route
            exact path='/palette/new' 
            render={(routeProps) =>
               <NewPaletteForm savePalette={this.savePalette} 
                               palettes={this.state.palettes}
                               {...routeProps}/>}
          />
            
          <Route 
            exact path='/' 
            render={ (routeProps)=>
              <PaletteList palettes = {this.state.palettes} deletePalette = {this.deletePalette} {...routeProps}/> }
          />
 
          <Route 
            exact path='/palette/:id' 
            render={ routeProps => 
                <Palette palette = { generatePalette(this.findPalette(routeProps.match.params.id)) }/> }
          />
        
          <Route
              exact path='/palette/:paletteId/:colorId'
              render={ (routeProps)=> 
                <SingleColorPalette 
                  colorId = {routeProps.match.params.colorId}
                  palette = { generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                /> }
          />

      </Switch>
    );
  }
}

export default App;
