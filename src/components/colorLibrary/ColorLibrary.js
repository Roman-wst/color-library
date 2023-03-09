import { useState } from 'react';
import DraggableList from 'react-draggable-list';
import ColorLibraryItem from '../colorLibraryItem/ColorLibraryItem';
// import CustomPicker from '../customPicker/CustomPicker';

import './colorLibrary.scss';

const ColorLibrary = () => {

  const [pickerList, setPickerList] = useState([]);

  const onAddBtnClick = event => {
    setPickerList(pickerList.concat(<ColorLibraryItem key={pickerList.length} />));
  };

  return (
      <div className="color-library">
        <div className="color-library__title">
          Color library
        </div>
        <div className="color-library__list">
          {/* <DraggableList
            template={<SketchExample />}
            list={this.state.list}
          > */
          }
            {/* <ColorLibraryItem />
            <ColorLibraryItem />
            <ColorLibraryItem /> */}
            {/* <CustomPicker  color="#424242" /> */}
          {/* </DraggableList> */}
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