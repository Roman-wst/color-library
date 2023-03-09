import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

import './colorLibraryItem.scss';

class ColorLibraryItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        displayColorPicker: false,
        color: '#99CE43',
      };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
    // let input = document.querySelector('.color-library__list-item-input')
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
        <div className="color-library__list-item-remove icon-remove"></div>
      </div>
    )
  }
}

export default ColorLibraryItem

// export const MyPicker = ({ hex, hsl, hsv, onChange }) => {
//   const styles = {
//     hue: {
//       height: 10,
//       position: "relative",
//       marginBottom: 10
//     },
//     saturation: {
//       width: 100,
//       height: 100,
//       position: "relative"
//     },
//     input: {
//       height: 34,
//       border: `1px solid ${hex}`,
//       paddingLeft: 10
//     },
//     swatch: {
//       width: 54,
//       height: 38,
//       background: hex
//     }
//   };
//   return (
//     <div>
//       <div style={styles.hue}>
//         <Hue hsl={hsl} onChange={onChange} />
//       </div>

//       <div style={styles.saturation}>
//         <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
//       </div>

//       <div style={{ display: "flex" }}>
//         <EditableInput
//           style={{ input: styles.input }}
//           value={hex}
//           onChange={onChange}
//         />
//         <div style={styles.swatch} />
//       </div>
//     </div>
//   );
// };

// export default CustomPicker(MyPicker);