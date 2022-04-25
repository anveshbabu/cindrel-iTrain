import React, { Fragment } from "react";
import './sidebar.scss'
import { MENU } from '../../../services/constants';
import { Link } from 'react-router-dom'
export const Sidebar = () => {



  const handleSubmenuToggle = (id, subMenuIconId) => {
    let isSubMenu = document.getElementById(id);
    let subMenuIcon = document.getElementById(subMenuIconId);
    if (isSubMenu.style.display === "none") {
      isSubMenu.style.display = "block";
      subMenuIcon.style.transform = `rotate(180deg)`
    } else {
      isSubMenu.style.display = "none";
      subMenuIcon.style.transform = ''
    }
  }

  return (
    // <!-- /#sidebar-wrapper -->
    <div className="bg-light border-right" id="sidebar-wrapper">

      <ul className="list-group main-menu list-group-flush">
        {MENU.map(({ menuItems = [], title = '' }, m) =>
          <Fragment>
            {title && <div className="sidebar-heading" key={m}>{title}</div>}
            {menuItems.map(({ icon, text, subMenu = [] }, i) =>
              <li className="list-group-item list-group-item-action bg-light border-0" key={i}>
                {subMenu.length === 0 ? <Link to="/"> <i className={`${icon} me-2`} />  {text}</Link> : <a onClick={() => handleSubmenuToggle(`isSubMenu${i}`, `subMenuDropIcon${i}`)}> <i className={`${icon} me-2`}  /> {text}  <i id={`subMenuDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i></a>}
                {subMenu.length > 0 && <ul className="list-group list-group-flush my-3 ms-2 sub-menu" style={{ display: "none" }} id={`isSubMenu${i}`}>
                  {subMenu?.map(({ icon, text, subMenu = [] }, s) =>
                    <li href="#" className="list-group-item border-0 list-group-item-action bg-transparent" key={s}>
                      <Link to="/"> {icon && <i className={icon} />} {text}</Link>
                    </li>
                  )}
                </ul>}

              </li>
            )}

          </Fragment>
        )}

      </ul>
    </div>

  )


}