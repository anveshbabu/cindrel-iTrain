

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getAllClasssList } from '../../../../redux/actions/classes'
import { NormalButton } from '../../../common'
import './allClassList.scss'

export const AllClasssList = () => {
    const params = useParams();
    const [classsList, setclasssList] = useState([])
    const [classsOverAllCount, setClasssOverAllCount] = useState(0)
    const [activeClassId, setActiveClassId] = useState('124')

    useEffect(() => {
        getAllClasssList().then(({ success, data: { classsList, count } }) => {
            if (success) {
                setclasssList(classsList);
                setClasssOverAllCount(count)
            }
        }).catch((error) => {

        })

    }, []);


    const handleShowClassDetail = (id) => {
        setActiveClassId(id)

    }

    return (
        <div className="card allClasssList-card shadow border-0">

            <div className="card-header">
                <a>Add New</a>
            </div>
            <div className="card-body">

                <ul className="list-group list-group-flush">

                    <li className="list-group-item"><label className='badge-class'></label>  All Classes
                        <span className="float-end">{classsOverAllCount}</span>
                    </li>
                    {classsList.map(({ className, count, balanceLevel = null, classId }) =>
                        <li className={`list-group-item ${classId === activeClassId ? 'active' : ""}`} onClick={() => handleShowClassDetail(classId)}><label className='badge-class' style={{ backgroundColor: balanceLevel !== 'Equal'? "#00CF46" :  "#CFA400" }}></label>  {className}
                            <span className="float-end">{count}</span>
                            {classId === activeClassId && <div className='row'>
                                <div className='col-md-12'>
                                    <div className='px-3 py-2 pe-0 sub-open-menu'>
                                        <label>Balance Level</label>
                                        <label className='float-end'>Equal</label>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='px-3 py-2 pe-0 sub-open-menu text-end'>
                                        <NormalButton materialUi={false} className='btn btn-sm' variant='text' label={<i class="fa-solid fa-trash text-danger" title='Delete'></i>} />
                                        <NormalButton materialUi={false} className='btn btn-sm' variant='text' label={<i class="fa-solid fa-arrow-down text-download" title='Download'></i>} />
                                        {/* <NormalButton materialUi={false} className='btn btn-sm' variant='text' label={<i class="fa-solid fa-eye text-view" title='View'></i>} /> */}
                                      
                                    </div>
                                </div>
                            </div>}




                        </li>
                    )}

                </ul>
            </div>
        </div>
    );




}
