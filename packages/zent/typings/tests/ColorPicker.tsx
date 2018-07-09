import * as React from 'react';
import { ColorPicker } from '../';

const ColorBoard = ColorPicker.ColorBoard;

class App extends React.Component {
  state = {
    color: '#5197FF'
  }

  handleChange = (color) => {
    this.setState({
      color
    });
  }

  render() {
    const { color } = this.state;
    return (
      <div>
        <ColorPicker color={color} onChange={this.handleChange} type="simple" showAlpha />
        <div style={{ color, marginTop: 5 }}>当前颜色：{color}</div>
        <ColorBoard color={color} onChange={this.handleChange} showAlpha />
      </div>
    )
  }
}

export default App
