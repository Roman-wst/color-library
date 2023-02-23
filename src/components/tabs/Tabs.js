import './tabs.scss';

const Tabs = () => {
  return (
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
  )
}

export default Tabs;