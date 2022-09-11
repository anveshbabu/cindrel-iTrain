
import './overAllModalPredication.scss'
import ReactApexChart from "react-apexcharts";
import { useState } from 'react';

export const OverAllModalPredication = ({ title = '', OverAllCount = 0, icon = '', classNameName = 'primary' }) => {
    const [selectedMonth, setSelectedMOnth] = useState('1m')

    const series = [20, 80]
    const options = {
        chart: {
            type: 'donut',

        },

        colors: ['#de000a', '#00b2ff'],
        labels: ['Correct', 'InCorrect'],
        legend: {
            position: 'bottom',
            markers: {
                width: 20,
                height: 20,
                radius: 4,
                offsetX: 0,
                offsetY: 5
            },
            horizontalAlign:"left"
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
               
            }
        }]
    }





    return (
        <div className="card month-prediction-card  dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Overall Modal Prediction</h4>

                    </div>
                    <div className='col-md-6 text-end'>


                    </div>

                </div>


            </div>
            <div className="card-body">
                <ReactApexChart options={options} series={series} height='300' type="donut" />
            </div>
        </div>
    )

}