import React from "react";
import './header.scss'

export  const Header = () => {



    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow custom-header">
          <div class="container-fluid">

          
        {/* <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}
        <a class="navbar-brand ms-2 mb-2" href="#">
      <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24"/>
    </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#"><i class="fa-solid fa-bell mt-2"/></a>
            </li>
            <li className="nav-item">
              <a className="nav-link profile-icon" href="#">Anvesh Balaji <img className="ms-2" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"/></a>
            </li>
            
          </ul>
        </div>
        </div>
      </nav>


    )


}