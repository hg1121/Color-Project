import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from'./seedColors.js';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* ...makes the props not an array but an object */}
        <Palette palette = { generatePalette(seedColors[4]) }/>
      </div>
    );
  }
}

export default App;
