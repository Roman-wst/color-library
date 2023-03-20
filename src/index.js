import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import _uniqueId from 'lodash/uniqueId';

import './index.scss';

let listColors = [];
listColors.push({index: 'id-00', value: "2F7FEF", label: "", clicked: false});
listColors.push({index: 'id-01', value: "99CE43", label: "", clicked: false});
listColors.push({index: 'id-02', value: "F8AB4B", label: "", clicked: false});
listColors.push({index: 'id-03', value: "EA5E5E", label: "", clicked: false});
listColors.push({index: 'id-04', value: "EB60BC", label: "", clicked: false});
listColors.push({index: 'id-05', value: "AA5EEA", label: "Violet", clicked: true});

class ColorLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.onAddColor = this.onAddColor.bind(this);
  }

  onAddColor(event) {
    event.preventDefault();
    const newColorValue = '000000';
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
      color: `#${listColors[parseInt(this.props.index)].value}`,
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

  handleInputChange = (e) => {
    // let valueInput = e.target.value;
    // console.log(e.target.name, valueInput);
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    this.props.item.label = e.target.value;
  };

  handleInputClick = (e) => {
    
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


    let classListItem = "color-library__list-item";

    // let label = this.props.item.label ? this.props.item.label : "";

    if (this.props.item.clicked) {
      classListItem += " clicked";
    }

    return(
      <div className={classListItem}>
        <div className="color-library__list-item-drag icon-drag"></div>
        <div className="color-library__list-item-pallete">
          <div style={ styles.swatch } onClick={ this.handlePickerClick }>
            <div style={ styles.colorPallete } />
          </div>
          <div className="color-library__list-item-text">
            <span
              className="color-library__list-item-label"
            >
              { this.state.color.substring(1) }
            </span>
            <input
                name={ 'name-' + this.state.color.substring(1) }
                className="color-library__list-item-input"
                value={ this.props.item.label }
                onChange={ this.handleInputChange }
                onClick={ this.handleInputClick }
            />
          </div>
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
      value: color.newColorValue,
      label: '',
      clicked: false
    });
    this.setState({listColors: listColors});
  }

  removeColor (colorIndex) {
    // listColors.splice(colorIndex, 1);
    delete listColors[colorIndex];
    // .splice(colorIndex, 1);
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