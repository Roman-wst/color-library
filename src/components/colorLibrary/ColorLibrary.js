import React, { useState } from 'react';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
// import DraggableList from 'react-draggable-list';
// import ColorLibraryItem from '../colorLibraryItem/ColorLibraryItem';
// import CustomPicker from '../customPicker/CustomPicker';

import './colorLibrary.scss';

class ColorLibraryItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        displayColorPicker: false,
        color: '#99CE43',
      };
  }

  // const removeElement = (id) => {
  //   const newPickerList = pickerList.filter(
  //     (pickerList) => pickerList.id !== id
  //   );
  //   setPickerList(PickerList);
  // }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
    let input = document.querySelector('.color-library__list-item-input')
    // input.value = color.hex;
    // let label = (e.target.value !== this.state.color) ? e.target.value : this.state.color;
  };

  render() {
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

    return (
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
        <button className="color-library__list-item-remove icon-remove"></button>
      </div>
    )
  }
}


const ColorLibrary = () => {

  const [pickerList, setPickerList] = useState([]);

  const onAddBtnClick = event => {
    setPickerList(pickerList.concat(<ColorLibraryItem key={pickerList.length} />));
  };

  // const deleteItem = (id) => {
  //   this.setState(({data}) => {
  //     // const index = data.findIndex(elem => elem.id === id);
  //     // const before = data.slice(0, index);
  //     // const after = data.slice(index + 1);
  //     // const newArr = [...before, ...after];
  //     return {
  //       data: data.filter(item => item.id !== id)
  //     }
  //   })
  // }

  return (
      <div className="color-library">
        <div className="color-library__title">
          Color library
        </div>
        <div className="color-library__list">
          { pickerList }
          <button
            className="color-library__btn"
            onClick={onAddBtnClick}
          >
            <i className="icon-add"></i>
            <span>New color</span>
          </button>
        </div>
      </div>
  )
}

export default ColorLibrary;