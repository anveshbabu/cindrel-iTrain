import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './seasonality.scss'
import { NormalTagIt, NormalCheckbox, Normalselect, NormalDropDown } from '../../../../components/common'
import ReactApexChart from "react-apexcharts";
import { getseasonalityreport } from '../../../../redux/actions/report'
import moment from 'moment';
import { handleNumberRound } from '../../../../services/helperFunctions';

export const Seasonality = () => {
    const params = useParams();
    const [series, setSeries] = useState([]);
    const [options, setoptions] = useState({

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
            categories: [],
        },
        fill: {
            opacity: 1
        },

    });
    // {
    //     name: 'Net Profit',
    //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    // }, {
    //     name: 'Revenue',
    //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    // }, {
    //     name: 'Free Cash Flow',
    //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    // }




    useEffect(() => {
        let req = {
            start_date: "Jun-2022",
            end_date: "Jul-2022"
        }
        handleSeasonalityreport(req)
    }, []);


    const handleSeasonalityreport = (req) => {
        req = {
            model_id: 9,
            ...req
        }
        setSeries([])
        getseasonalityreport(req).then(({ results = [] }) => {
            try {
                let chartSeries = []
                if (results?.length > 0) {
                    results.forEach(({ data, month }) => {
                        data.forEach((classObj) => {

                            let index = chartSeries?.findIndex(({ name }) => name === classObj?.ClassName);
                            if (index === -1) {
                                chartSeries.push({
                                    name: classObj?.ClassName,
                                    data: [classObj?.ImageCount],
                                });
                            } else {
                                chartSeries[index].data.push(classObj?.ImageCount)
                            }
                        });
                        let xAxisMonth = moment(month, 'MMM-YYYY').format('MMM')


                        options.xaxis.categories.push(xAxisMonth)
                    });

                    options.xaxis.categories = [...new Set(options.xaxis.categories)];
                    setoptions(options);
                    setSeries([...chartSeries]);
                }
            } catch (e) {
                console.log('-------------e--------->', e)
            }


        }).catch((r) => {

        })
    }

    const handleChnageRange = (e) => {
        let start_date = ''
        let end_date = ''
        if (e?.target?.value == 0) {
            start_date = moment().subtract(3, 'month').format('MMM-YYYY')
            end_date = moment().format('MMM-YYYY');


        } else if (e?.target?.value == 1) {
            start_date = moment().subtract(6, 'month').format('MMM-YYYY')
            end_date = moment().format('MMM-YYYY');
        } else if (e?.target?.value == 2) {
            start_date = moment().format('MMM-YYYY')
            end_date = moment().format('MMM-YYYY');
        }
        let req = {
            start_date, end_date
        }

        handleSeasonalityreport(req)
    }


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
                            onChange={handleChnageRange}
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