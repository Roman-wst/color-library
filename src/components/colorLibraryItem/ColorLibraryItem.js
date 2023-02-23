// import React from "react";
// import { CustomPicker } from "react-color";
// import {
//   EditableInput,
//   Hue,
//   Saturation
// } from "react-color/lib/components/common";


import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

import './colorLibraryItem.scss';

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '18px',
          height: '18px',
          borderRadius: '18px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
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
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
          { console.log(this.state.color) }
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default SketchExample

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