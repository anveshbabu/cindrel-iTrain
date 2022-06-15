import ReactApexChart from "react-apexcharts";
import { NormalBreadcrumb} from '../../../components/common';
import { ExperimentsList } from '../../../components/pages';
import './experiments.scss'

export const ExperimentsListPage = () => {

    let series = [{
        name: "STOCK ABC",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
    let options = {
        toolbar: { show:false },
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },

        title: {
            text: 'Experiment Trend',
            align: 'left',
            style: {
                cssClass: 'experiment-xaxis-title',
            },
        },

        labels: [30, 40, 45, 50, 49, 60, 70, 91],
        xaxis: {
            type: 'datetime',
            labels: {
                show: false
            }

        },
        yaxis: {
            opposite: true,
            labels: {
                show: false
            }

        },

    }

    return (
        <div className='experiments-list-page'>


            <NormalBreadcrumb className="mb-0" label={<div className='d-flex align-items-end'><i class="fa-solid fa-microchip  title-icon me-4" title="Production"></i> <span>Model Experiments</span>  </div>} rightSideBtn={true} buttonLabel="Add new" onBtnClick={() => { }} />

            <div className='card light-blue row rounded-0 border-0'>
                <div className='card-body'>
                    <div className="row justify-content-end">


                        <div className="col-md-3 col-sm-12 ">
                            <ReactApexChart className='shadow' options={options} series={series} type="area" height={200} />
                        </div>
                    </div>



                </div>


            </div>

            <div className='row mt-3'>
                <div className='col-md-12'>
                    <ExperimentsList />

                </div>

            </div>

        </div>
    )
}