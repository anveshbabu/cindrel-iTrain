import React, { Fragment } from "react";
import '../admin/primary.scss';
import { Header } from '../admin/header'
import { Sidebar } from '../admin/sideBar'
import {Outlet } from "react-router-dom";



export const Modulelayout = ({ children }) => {



    return (
        <Fragment>
            <Header />
            <div className="d-flex" id="wrapper">
                <Sidebar isOnlyIcon={true}/>
                <div id="page-content-wrapper">

                    <section className="container-fluid mt-4">
                        <Outlet />

                    </section>

                </div>
            </div>
        </Fragment>

    )


}