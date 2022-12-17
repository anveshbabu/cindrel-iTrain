
import './ClassTobeFocus.scss';
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from 'react';
import { Normalselect } from '../../../common'
import { getAllClasssList } from '../../../../redux/actions/classes'
import moment from 'moment';


export const ClassTobeFocus = ({ data = [] }) => {
    const params = useParams();
    const [selectedMonth, setSelectedMOnth] = useState('1m')
    const [classsList, setclasssList] = useState([])
    const [classsFocusOpp, SetclasssFocusOpp] = useState({
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
        colors: ['#00b2ff', '#de000a'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 0.8
        },
    })
    const [series, setSeries] = useState([
        {
            name: 'From Class',

            // [toCount,fromCount,changeCount]
            data: [[7, 13, 1], [7, 14, 1]]
        },

    ])


    useEffect(() => {
        let serData = data.map(({ monthNumber, classNumber = 0, count = 0 }) => ([Number(monthNumber), classNumber, count]))
        setSeries([{ ...series[0], data: serData }])
    }, [data])

    useEffect(() => {


        const options = {
            ...classsFocusOpp,
            tooltip: {
                yaxis: {
                    formatter: function (val) {
                        return val + '$'
                    },
                    //   title: 'Discount'
                }
            },
            xaxis: {
                labels: {
                    show: true,
                    formatter: (ClassId) => {
                        let month = moment().set({ 'month': ClassId });
                        console.log(moment(month).format('MMM'))
                        return moment(month).format('MMM');

                    },
                },
            },
        }
        SetclasssFocusOpp(options)
    },[series])
    useEffect(() => {



        let reqObj = {
            model_id: params?.modelId,
        }
        getAllClasssList(reqObj).then(({ count, results }) => {
            // setIsClassLoader(false)
            if (results.length > 0) {
                var classListOrg = results.map(({ ClassId, ClassName }) => ({ value: ClassId, label: ClassName }));
                setclasssList(classListOrg);






            }
        }).catch((error) => {
            // setIsClassLoader(false)
        })

    }, [])




    // const 





    return (
        <div className="card month-prediction-card dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>Classes to be focus</h4>

                    </div>
                    <div className='col-md-6 text-end'>

                        <Normalselect options={classsList} size="small" label='Class' className='mb-0' />
                    </div>

                </div>


            </div>
            <div className="card-body">
                <ReactApexChart options={classsFocusOpp} series={series} height='300' type="bubble" />
            </div>
        </div>
    )

}