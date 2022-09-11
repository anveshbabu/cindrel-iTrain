
import './classPerformance.scss'
import ReactApexChart from "react-apexcharts";
import { useState } from 'react';
import { Normalselect } from '../../../common'

export const ClassPerformance = ({data=[]}) => {
    const [selectedMonth, setSelectedMOnth] = useState('1m')






    return (
        <div className="card month-prediction-card dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Classes Performance</h4>

                    </div>

                </div>


            </div>
            <div className="card-body">
                <div className='row'>
                    {data?.map(({ClassName='',corrected_percent=0,accuracy_percent,corrected=0,accuracy=0})=>
                        <div className='col-md-12 progress-bar-class mb-2'>
                        <h4 className='title-progress'>{ClassName}</h4>
                        <div class="progress mb-2">
                            <div class="progress-bar" role="progressbar" style={{ width: corrected_percent+'%' }}></div>
                            <div class="progress-bar" role="progressbar" style={{ width: accuracy_percent+'%' }}></div>

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