import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/app/app';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

// import './colorLibraryItem/colorLibraryItem.scss';

import './index.scss';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let listColors = [];
listColors.push({index: 1, value: "9FC0EE", done: false});
listColors.push({index: 2, value: "333333", done: true});
listColors.push({index: 3, value: "444444", done: true});

class ColorLibrary extends React.Component {

  onAddBtnClick(event) {
    this.props.addItem('444');
  }

  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <ColorLibraryItem key={index} item={item} index={index} removeItem={this.props.removeItem} />
      );
    });
    return (
      <div className="color-library">
        <div className="color-library__title">
          Color library
        </div>
        <div className="color-library__list">
          {items}
          <button
            className="color-library__btn"
            onClick={ this.onAddBtnClick }
          >
            <i className="icon-add"></i>
            <span>New color</span>
          </button>
        </div>
      </div>
    );
  }
}

class ColorLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: '#e59308',
    };
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
  };

  render () {
    const styles = reactCSS({
      'default': {
        color: {
          width: '18px',
          height: '18px',
          borderRadius: '18px',
          background: `${ this.state.color }`,
        },
        swatch: {
          display: 'inline-block',
          cursor: 'pointer',
          marginRight: '12px',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: 'calc(100% - 8px)',
          left: '30px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    // var todoClass = this.props.item.done ? 
    //     "done" : "undone";
    return(
      // <li className="list-group-item ">
      //   <div className={todoClass}>
      //     <span className="glyphicon glyphicon-ok icon" aria-hidden="true" ></span>
      //     {this.props.item.value}
      //     <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
      //   </div>
      // </li>
      <div className="color-library__list-item">
      <div className="color-library__list-item-drag icon-drag"></div>
      <div className="color-library__list-item-pallete">
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        <label
          htmlFor={ this.state.color }
          className="color-library__list-item-label"
        >
          { this.state.color.substring(1) }
          {/* <input
            id={ this.state.color.substring(1) }
            className="color-library__list-item-input"
            value=""
            onChange={ this.handleChange }
          /> */}
        </label>
        { 
        this.state.displayColorPicker ? 
          <div style={ styles.popover } className="color-library__list-item-popover">
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <ChromePicker
              color={ this.state.color }
              disableAlpha = { true }
              onChange={ this.handleChange }
            />
          </div> : null 
        }
      </div>
      <button
        className="color-library__list-item-remove icon-remove"
        onClick={this.onClickClose}
      >
      </button>
    </div>

    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const newItemValue = '9FC0EE';
    this.props.addItem({newItemValue});
  }

  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>Todo list</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {listColors: listColors};
  }

  addItem(color) {
    listColors.unshift({
      index: listColors.length + 1, 
      value: color.newItemValue,
      done: false
    });
    this.setState({listColors: listColors});
  }

  removeItem(itemIndex) {
    listColors.splice(itemIndex, 1);
    this.setState({listColors: listColors});
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <ColorLibrary items={this.props.initItems} removeItem={this.removeItem} />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={listColors}/>, document.getElementById('app'));