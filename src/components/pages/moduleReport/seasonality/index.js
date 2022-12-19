import { useEffect, useState } from 'react';
import './seasonality.scss'
import { NormalTagIt, NormalCheckbox, Normalselect, NormalDropDown } from '../../../../components/common'
import ReactApexChart from "react-apexcharts";

export const Seasonality = () => {
    const series = [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }];
    const options = {
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        // yaxis: {
        //     title: {
        //         text: '$ (thousands)'
        //     }
        // },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };


    return (
        <div className="card user-activity-card   mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-8'>
                        <h4 className='small fw-bold text-primary mb-1'>Seasonality</h4>

                    </div>
                    <div className='col-md-4'>
                        <Normalselect
                        className="mb-0"
                        label='range'
                        size="small"
                            options={[{
                                label: "Last 3 Month",
                                value: "0"
                            }, {
                                label: "Last 6 Month",
                                value: "1"
                            }, {
                                label: "Current Year",
                                value: "0"
                            }]}
                        />

                    </div>

                </div>


            </div>
            <div className="card-body p-0">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    )

}