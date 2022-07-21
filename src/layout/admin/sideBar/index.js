import React, { Fragment,useEffect, useState } from "react";
import { NavLink ,Link} from 'react-router-dom'
import './sidebar.scss'
import { MENU, MODULE_MENU,EXIST_LOCAL_STORAGE } from '../../../services/constants';
import { getStorage ,letterAvatar} from '../../../services/helperFunctions';
import { LazyLoadImage} from '../../../components/common';
import { useParams } from "react-router-dom";
export const Sidebar = ({ isOnlyIcon = false }) => {
  const params = useParams();
  const [moduleDetail,setModuleDetail]=useState()


  useEffect(()=>{
    setModuleDetail(JSON.parse( getStorage(EXIST_LOCAL_STORAGE?.MODULE_DETAIL)))

  },[])




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
    <div className={`border-right shadow ${isOnlyIcon ? 'showIconOnly' : ""}`} id="sidebar-wrapper">

      <ul className="list-group main-menu list-group-flush">
        {!isOnlyIcon && MENU.map(({ menuItems = [], title = '' }, m) =>
          <Fragment key={m}>
            {title && <div className="sidebar-heading">{title}</div>}
            {menuItems.map(({ icon, text, url = '/', subMenu = [] }, i) =>
              <li className={`list-group-item list-group-item-action  border-0 ${url=='/' && 'menu-diseable' }`} key={i}>
                {subMenu.length === 0 ? <NavLink to={url}> <i className={`${icon} me-2`} />  {text}</NavLink> : <NavLink to={url} onClick={() => handleSubmenuToggle(`isSubMenu${i}`, `subMenuDropIcon${i}`)}> <i className={`${icon} me-2`} /> {text}  <i id={`subMenuDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i></NavLink>}
                {subMenu.length > 0 && <ul className="list-group list-group-flush my-3 ms-2 sub-menu" style={{ display: "none" }} id={`isSubMenu${i}`}>
                  {subMenu?.map(({ icon, text, subMenu = [] }, s) =>
                    <li href="#" className="list-group-item border-0 list-group-item-action bg-transparent" key={s}>
                      <NavLink to={url} > {icon && <i className={icon} />} {text}</NavLink>
                    </li>
                  )}
                </ul>}

              </li>
            )}

          </Fragment>
        )}
        {isOnlyIcon && <li className="list-group-item list-group-item-action  border-0 image-model" title='Back to module'  >
          {/* <img src={require('../../../assets/images/afpInsurance.png')} /> */}
          <Link to='/models/Production'>
          <LazyLoadImage defaultImage={letterAvatar(moduleDetail?.ModelName, 500, false)} alt={moduleDetail?.ModelName} src={`${!!moduleDetail?.Logo ? moduleDetail?.modellogoUrl + moduleDetail?.Logo : ""}`} />
          </Link>
         
        </li>}

        {isOnlyIcon && MODULE_MENU.map(({ menuItems = [], title = '' }, m) =>
          <Fragment key={m}>
            {/* {title && <div className="sidebar-heading">{title}</div>} */}

            {menuItems.map(({ icon, text, url = '/', subMenu = [] }, i) =>
              <li className={`list-group-item list-group-item-action  border-0  ${url=='/' && 'menu-diseable' }`} key={i}>
                {subMenu.length === 0 ? <NavLink to={`${ url != '/' ?  `/models/${params?.modelId}/${params?.fromType}${url}`:"yyyy"}`}> <i className={`${icon} me-2`} title={text} />  </NavLink> :

                  <NavLink to={`${ url != '/' ?  `/models/${params?.modelId}/${params?.fromType}${url}`:""}`} onClick={() => handleSubmenuToggle(`isSubMenu${i}`, `subMenuDropIcon${i}`)} title={text} > <i className={`${icon} me-2`} />
                    {/* //<i id={`subMenuDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i >  */}
                  </NavLink>}
                {subMenu.length > 0 && <ul className="list-group list-group-flush my-3 ms-2 sub-menu" style={{ display: "none" }} id={`isSubMenu${i}`}>
                  {subMenu?.map(({ icon, text, subMenu = [] }, s) =>
                    <li href="#" className="list-group-item border-0 list-group-item-action bg-transparent" key={s}>
                      <NavLink to={`${ url != '/' ?  `/models/${params?.modelId}/${params?.fromType}${url}`:""}`} title={text} > {icon && <i className={icon} />} </NavLink>
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