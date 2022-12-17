
import './monthlyModalPrediction.scss'
import ReactApexChart from "react-apexcharts";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { isEmpty,handleNumberRound } from '../../../../services/helperFunctions';

export const MonthlyModalPrediction = ({ data = [] }) => {
    const [selectedMonth, setSelectedMOnth] = useState('1m')
    const [series, setseries] = useState(
        [
            {
                name: "Correct",
                data: []
            },
            {
                name: "In Correct",
                data: []
            }
        ]
    );

    var options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        colors: ['#2eb85c','#3497fa'],
        dataLabels: {
            enabled: false
        },


        stroke: {
            curve: 'straight',
            width: 2,
        },

        grid: {
            show: false,      // you can either change hear to disable all grids

        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            text: 'undefined',
        },
        yaxis: {
            labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: (value) => { return `${value} %` },
            },
        },
        //   title: {
        //     text: 'Anvesh ss',
        //     rotate: 500,
        //     offsetX: 0,
        //     offsetY: 150,
        //     style: {
        //         color: undefined,
        //         fontSize: '12px',
        //         fontFamily: 'Helvetica, Arial, sans-serif',
        //         fontWeight: 600,
        //         cssClass: 'apexcharts-yaxis-title',
        //     },
        // }
    }




    useEffect(() => {
        let currentYear = moment().set({ 'month': 0 });
        let lineDateCorrect = {
            name: "Correct",
            data: []
        };
        let lineDateInCorrect = {
            name: "In Correct",
            data: []
        };
        for (let i = 0; i < 12; i++) {
            // console.log('data-------->',,currentYear?.format('MM-YYYY'))

            const isAvilable = data.find(({ month }) => month === currentYear?.format('MM-YYYY'));

            if (!!isAvilable && !isEmpty(isAvilable)) {
                lineDateCorrect?.data?.push(handleNumberRound( isAvilable?.accuracy_percent));
                lineDateInCorrect?.data?.push(handleNumberRound(isAvilable?.corrected_percent));

            }else{
                lineDateCorrect?.data?.push(0)
                lineDateInCorrect?.data?.push(0)
            }


            setseries([...[lineDateCorrect,lineDateInCorrect]])



            currentYear = moment().set({ 'month': i + 1 });
        }



    }, [data])


    const handleMonthChange = (m) => {
        setSelectedMOnth(m)
    }



    return (
        <div className="card month-prediction-card dashboard-card mb-4" >
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Monthly wise Module Prediction</h4>

                    </div>
                    <div className='col-md-6 text-end'>
                        <div>
                            <input type="radio" className="btn-check " checked={selectedMonth === '1m'} onClick={() => handleMonthChange('1m')} id="1m" autocomplete="off" />
                            <label className="btn btn-outline-primary btn-sm rounded-0" rounded-0 for="1m">1M</label>

                            <input type="radio" className="btn-check rounded-0" checked={selectedMonth === '2m'} onClick={() => handleMonthChange('2m')} id="2m" autocomplete="off" />
                            <label className="btn btn-outline-primary btn-sm  rounded-0" for="2m">2M</label>

                            <input type="radio" className="btn-check  rounded-0" checked={selectedMonth === '3m'} onClick={() => handleMonthChange('3m')} id="3m" autocomplete="off" />
                            <label className="btn btn-outline-primary btn-sm  rounded-0" for="3m">3M</label>
                            <input type="radio" className="btn-check  rounded-0" checked={selectedMonth === '6m'} onClick={() => handleMonthChange('6m')} id="6m" autocomplete="off" />
                            <label className="btn btn-outline-primary btn-sm  rounded-0" for="6m">6M</label>

                        </div>

                    </div>

                </div>


            </div>
            <div className="card-body">
                <ReactApexChart options={options} series={series} height={350} />
            </div>
        </div>
    )

}