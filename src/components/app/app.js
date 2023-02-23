import { Component, React } from 'react';
import Sidebar from '../sidebar/Sidebar';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: '800', increase: false, like: true, id: 1},
        {name: 'Alex A.', salary: '2000', increase: true, like: false, id: 2},
        {name: 'Sam S.', salary: '4000', increase: false, like: false, id: 3},
      ],
      term: '',
      filter: 'like'
    }
    this.maxId = 4;
  }

  render() {
    return (
      <div className="app">
        <Sidebar />
      </div>
   )
  }
}

export default App;
