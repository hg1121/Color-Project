import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from'./seedColors.js';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]));
    return (
      <div className="App">
        {/* ...makes the props not an array but an object */}
        <Palette {...seedColors[4]}/>
      </div>
    );
  }
}

export default App;
