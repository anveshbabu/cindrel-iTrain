
import './classPerformance.scss'
import ReactApexChart from "react-apexcharts";
import { useState } from 'react';
import { Normalselect } from '../../../common'

export const ClassPerformance = () => {
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
                    {[1,2,3,4,5,6,7].map((data)=>
                        <div className='col-md-12 progress-bar-class mb-2'>
                        <h4 className='title-progress'>Black Rot</h4>
                        <div class="progress mb-2">
                            <div class="progress-bar" role="progressbar" style={{ width: '70%' }}></div>
                            <div class="progress-bar" role="progressbar" style={{ width: '30%' }}></div>

                        </div>
                        <small className='text-prog mt-2'>293 (70%)</small>
                        <small className='text-prog mt-2 float-end'>128 (30%)</small>
                    </div>
                    
                    )}
                
                </div>
            </div>
        </div>
    )

}