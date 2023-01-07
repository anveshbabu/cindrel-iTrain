
import './classPerformance.scss'
import ReactApexChart from "react-apexcharts";
import { useState } from 'react';
import { Normalselect,NormalTagIt } from '../../../common'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
export const ClassPerformance = ({ data = [] }) => {
    const [selectedMonth, setSelectedMOnth] = useState('1m')

const classNameList=[
    { label:"Root"},
    { label:"Healthy"},
]




    return (
        <div className="card h-100 month-prediction-card dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Classes Performance</h4>

                    </div>

                </div>


            </div>
            <div className="card-header min-auto text-muted">
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <label><span className="badge-acc accuracyBadge"></span> Accuracy Prediction VS Prediction Altered <span className="badge-acc perBadge"></span></label>

                    </div>

                </div>


            </div>
            <div className="card-header min-auto text-muted">
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <div className="input-group mb-3 search-group" >
                            <span className="input-group-text bg-transparent  text-prog border-end-0" id="basic-addon1"><SearchRoundedIcon/></span>
                            <input type="text" className="form-control bg-transparent border-start-0" placeholder="Search ClassName" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <NormalTagIt data={classNameList}/>
                    </div>

                </div>


            </div>
            <div className="card-body">
                <div className='row'>
                    {data?.map(({ ClassName = '', corrected_percent = 0, accuracy_percent, corrected = 0, accuracy = 0 }) =>
                        <div className='col-md-12 progress-bar-class mb-2'>
                            <h4 className='title-progress'>{ClassName}</h4>
                            <div className="progress mb-2">
                                <div className="progress-bar" role="progressbar" style={{ width: corrected_percent + '%' }}></div>
                                <div className="progress-bar" role="progressbar" style={{ width: accuracy_percent + '%' }}></div>

                            </div>
                            <small className='text-prog mt-2'>{corrected} ({corrected_percent}%)</small>
                            <small className='text-prog mt-2 float-end'>{accuracy} ({accuracy_percent}%)</small>
                        </div>

                    )}

                </div>
            </div>
        </div>
    )

}