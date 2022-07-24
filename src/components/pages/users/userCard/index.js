

import { useEffect, useState } from 'react'
import {LazyLoadImage} from '../../../common'
import {letterAvatar} from '../../../../services/helperFunctions'
import './userCard.scss'

export const UsersCard = ({data:{firstname,lastname,emailid='-',mobile='-',is_active=null}}) => {




    return (
        <div className="card user-card">
            <div className="card-body">
                <div className="d-flex align-items-start">
                {/* <LetterAvatars name={`${firstname} ${lastname}`} sx={{ width: 100, height: 100 }}/> */}
                <LazyLoadImage defaultImage={letterAvatar(firstname, 100)} alt={firstname} className="me-3 user-image" />
                    <div className="media-body">
                        {/* <h5 className="mt-0">Media heading</h5> */}
                        <table className="table table-borderless user-detail-table">

                            <tbody>
                                <tr>

                                    <td>Name</td>
                                    <td className="d-inline-block text-truncate" title={`${firstname} ${lastname}`}>{firstname} {lastname}</td>
                                </tr>
                                <tr>

                                    <td>Email</td>
                                    <td className="d-inline-block text-truncate" title={emailid}>{emailid?emailid:"-"}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td className="d-inline-block text-truncate" itle={mobile}>{mobile?mobile:"-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td className={is_active === 1?'text-success':"text-danger"}>{is_active === 1?"Active":"De-active"}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );




}
