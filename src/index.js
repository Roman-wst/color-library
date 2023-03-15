import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import _uniqueId from 'lodash/uniqueId';

import './index.scss';

let listColors = [];
listColors.push({index: 'id-0', value: "9FC0EE"});

class ColorLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.onAddColor = this.onAddColor.bind(this);
  }

  onAddColor(event) {
    event.preventDefault();
    const newColorValue = '9FC0EE';
    this.props.addColor({newColorValue});
  }

  render () {
    let colors = this.props.colors.map((item, index) => {
      return (
        <ColorLibraryItem key={index} item={item} index={index} removeColor={this.props.removeColor} />
      );
    });
    return (
      <div className="color-library">
        <div className="color-library__title">
          Color library
        </div>
        <div className="color-library__list">
          {colors}
          <button
            className="color-library__btn"
            onClick={ this.onAddColor }
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
      color: '#9FC0EE',
      listColors: listColors
    };
    this.onRemoveColor = this.onRemoveColor.bind(this);
  }

  onRemoveColor() {
    let index = parseInt(this.props.index);
    this.props.removeColor(index);
    this.setState({
      listColors: listColors
    })
  }

  handlePickerClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handlePickerClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handlePickerChange = (color) => {
    let index = parseInt(this.props.index);
    listColors[index].value = color.hex.substring(1);
    this.setState({ 
      color: color.hex,
      listColors: listColors
    })
  };

  render () {
    const styles = reactCSS({
      'default': {
        colorPallete: {
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
    return(
      <div className="color-library__list-item">
        <div className="color-library__list-item-drag icon-drag"></div>
        <div className="color-library__list-item-pallete">
          <div style={ styles.swatch } onClick={ this.handlePickerClick }>
            <div style={ styles.colorPallete } />
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
              <div style={ styles.cover } onClick={ this.handlePickerClose }/>
              <ChromePicker
                color={ this.state.color }
                disableAlpha = { true }
                onChange={ this.handlePickerChange }
              />
            </div> : null 
          }
        </div>
        <button
          className="color-library__list-item-remove icon-remove"
          onClick={this.onRemoveColor}
        >
        </button>
      </div>
    );
  }
}

class Tabs extends React.Component {
  render () {
    return(
      <div className="tabs">
        <ul className="tabs__list">
          <li className="tabs__list-item">
            <span className="tabs__list-icon icon-settings"></span>
          </li>
          <li className="tabs__list-item active">
            <span className="tabs__list-icon icon-pallete"></span>
          </li>
          <li className="tabs__list-item">
            <span className="tabs__list-icon icon-history"></span>
          </li>
          <li className="tabs__list-item">
            <span className="tabs__list-icon icon-layers"></span>
          </li>
        </ul>
      </div>
    );
  }
}
  
class App extends React.Component {
  constructor (props) {
    super(props);
    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.state = {listColors: listColors};
  }
  
  addColor (color) {
    listColors.push({
      // index: listColors.length + 1, 
      index: _uniqueId('id-'),
      value: color.newColorValue
    });
    this.setState({listColors: listColors});
  }

  removeColor (colorIndex) {
    console.log(colorIndex);
    // listColors.splice(colorIndex, 1);
    delete listColors[colorIndex];
    this.setState({listColors: listColors});
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <Tabs />
          <ColorLibrary colors={this.props.initColors} removeColor={this.removeColor} addColor={this.addColor} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App initColors={listColors}/>
  </React.StrictMode>, document.getElementById('app')
);