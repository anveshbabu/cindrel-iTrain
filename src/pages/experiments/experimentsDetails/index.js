import { useEffect, useState } from 'react';
import { NormalBreadcrumb, NormalButton, NormalProgressbar } from '../../../components/common';
import { ExperimentsDetail } from '../../../components/pages';
import { getStorage ,setStorage} from '../../../services/helperFunctions';
import { EXIST_LOCAL_STORAGE, CONFIG } from '../../../services/constants';
import './experimentDetails.scss'

export const ExperimentsDetailPage = () => {
    const [experimentsDetail, setExperimentsDetail] = useState({});



    useEffect(() => {
        let userDetail = getStorage(EXIST_LOCAL_STORAGE.USER_DETAIL);
        let experimentsDetail = getStorage(EXIST_LOCAL_STORAGE.EXPERIMENT_DETAIL);
        ;
        setExperimentsDetail(JSON.parse(experimentsDetail));


        return()=>{
            setStorage(EXIST_LOCAL_STORAGE.EXPERIMENT_DETAIL,'')
        }

    }, [])
    return (
        <div className='experiments-detail-page'>


            <NormalBreadcrumb className="mb-0" label={<div className='d-flex align-items-end'><i class="fa-solid fa-microchip  title-icon me-4" title="Production"></i> <span>Model Experiment - # {experimentsDetail?.code}</span>  </div>} rightSideBtn={true} buttonLabel="Add new" onBtnClick={() => { }} />

            <div className='card light-blue  row rounded-0 border-0 experiments-detail-progressbar'>
                <div className='card-body'>
                    <div className="row justify-content-end">


                        <div className="col-md-3 col-sm-12 ">

                            <div className='row mb-2'>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>{experimentsDetail?.uploaded}</h4>
                                    <span className='experiment-timeAndDate'>Upload Images</span>
                                </div>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>{experimentsDetail?.correct}</h4>
                                    <span className='experiment-timeAndDate'>Correct Images</span>
                                </div>
                                <div className='col-md-4 text-center'>
                                    <h4 className='experiment-count mb-0'>{experimentsDetail?.incorrect}</h4>
                                    <span className='experiment-timeAndDate'> Incorrect Images</span>

                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-12 '>
                                    <NormalProgressbar value={experimentsDetail?.reviewed_percent} className='progressbar-experiment rounded-pill' />

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