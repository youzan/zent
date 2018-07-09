import * as React from 'react';
import { DateRangeQuickPicker } from '../';

interface State {
  value: string;
  chooseDays: string;
  value1: string;
  chooseDays1: string;
}

class App extends React.PureComponent<null, State> {
  state = {
    value: '',
    chooseDays: '',
    value1: '',
    chooseDays1: '', 
  };

  handleChange = (value, chooseDays) => {
    console.log(JSON.stringify({ value, chooseDays }));
    this.setState({
      value,
      chooseDays
    });
  };

  handleChange1 = (value, chooseDays) => {
    console.log(JSON.stringify({ value, chooseDays }));
    this.setState({
      value1: value,
      chooseDays1: chooseDays
    });
  }

  render() {
    const { value, chooseDays, value1, chooseDays1 } = this.state;

    return (
      <div>
        <DateRangeQuickPicker
          onChange={this.handleChange}
          value={value}
          format="YYYY-MM-DD HH:mm:ss"
          valueType="number"
          chooseDays={chooseDays}
        />
        <br />
        <DateRangeQuickPicker
          onChange={this.handleChange1}
          value={value1}
          format="YYYY-MM-DD HH:mm:ss"
          chooseDays={chooseDays1}
          preset={[{
            text: '今',
            value: 0
          }, {
            text: '昨',
            value: 1
          }, {
            text: '近7天',
            value: 7
          }, {
            text: '近30天',
            value: 30
          }]}
        />
      </div>
    );
  }
}

export default App;
