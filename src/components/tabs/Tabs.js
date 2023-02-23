import './tabs.scss';

const Tabs = () => {
  return (
      <div className="tabs">
        <ul className="tabs__list">
          <li className="tabs__item">
            <span className="tabs__icon icon-settings"></span>
          </li>
          <li className="tabs__item">
            <span className="tabs__icon icon-pallete"></span>
          </li>
          <li className="tabs__item">
            <span className="tabs__icon icon-history"></span>
          </li>
          <li className="tabs__item">
            <span className="tabs__icon icon-layers"></span>
          </li>
        </ul>
      </div>
  )
}

export default Tabs;