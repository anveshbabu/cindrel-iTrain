import ReactApexChart from "react-apexcharts";
import { NormalBreadcrumb, NormalButton, NormalProgressbar } from '../../../components/common';
import { ExperimentsDetail } from '../../../components/pages';
import './experimentDetails.scss'

export const ExperimentsDetailPage = () => {


    return (
        <div className='experiments-detail-page'>


            <NormalBreadcrumb className="mb-0" label={<div className='d-flex align-items-end'><i class="fa-solid fa-microchip  title-icon me-4" title="Production"></i> <span>Model Experiment - # 109276</span>  </div>} rightSideBtn={true} buttonLabel="Add new" onBtnClick={() => { }} />

            <div className='card light-blue  row rounded-0 border-0 experiments-detail-progressbar'>
                <div className='card-body'>
                    <div className="row justify-content-end">


                        <div className="col-md-3 col-sm-12 ">

                            <div className='row mb-2'>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>34</h4>
                                    <span className='experiment-timeAndDate'>Tested Images</span>
                                </div>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>30</h4>
                                    <span className='experiment-timeAndDate'>Correct Images</span>
                                </div>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>30</h4>
                                    <span className='experiment-timeAndDate'> Incorrect Images</span>

                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-12 '>
                                    <NormalProgressbar value={85} className='progressbar-experiment rounded-pill' />

                                </div>
                            </div>

                        </div>
                    </div>



                </div>


            </div>

            <div className='row mt-3'>
                <div className='col-md-12'>
                    <ExperimentsDetail />

                </div>

            </div>

        </div>
    )
}