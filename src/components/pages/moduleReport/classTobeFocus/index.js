
import './ClassTobeFocus.scss'
import ReactApexChart from "react-apexcharts";
import { useState } from 'react';
import { Normalselect } from '../../../common'

export const ClassTobeFocus = ({ data = [] }) => {
    const [selectedMonth, setSelectedMOnth] = useState('1m')
    const generateData = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            // baseval += 86400000;
            i++;
        }
        console.log('series--------->', count, series)
        return series;
    }
    const series = [
        {
            name: 'From Class',

            // [toCount,fromCount,changeCount]
            data: [[30, 20, 10], [50, 20, 8], [26, 20, 7], [42, 20, 7]]
        },
        {
            // [fromCount,toCount,changeCount]
            name: 'To Class',
            data: [[20, 30, 12], [20, 15, 8], [20, 18, 7], [20, 36, 7]]
        }
    ]
    const options = {
        chart: {
            height: 350,
            type: 'bubble',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        colors: ['#00b2ff','#de000a'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 0.8
        },
        yaxis: {
            labels: {
                show: true,
                // formatter: (value) => { return `${value}` },
            },
        },


    }





    return (
        <div className="card month-prediction-card dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Classes to be focus</h4>

                    </div>
                    <div className='col-md-6 text-end'>

                        <Normalselect size="small" label='Class' className='mb-0' />
                    </div>

                </div>


            </div>
            <div className="card-body">
                <ReactApexChart options={options} series={series} height='300' type="bubble" />
            </div>
        </div>
    )

}