import SketchExample from '../colorLibraryItem/ColorLibraryItem';

import './colorLibrary.scss';

const ColorLibrary = () => {
  return (
      <div className="color-library">
        <div className="color-library__title">
          Color library
        </div>
        <div className="color-library__list">
          <SketchExample />
        </div>
      </div>
  )
}

export default ColorLibrary;