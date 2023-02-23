import Tabs from '../tabs/Tabs';
import ColorLibrary from '../colorLibrary/ColorLibrary';

import './sidebar.scss';

const Sidebar = () => {
  return (
      <div className="sidebar">
        <Tabs />
        <ColorLibrary />
      </div>
  )
}

export default Sidebar;