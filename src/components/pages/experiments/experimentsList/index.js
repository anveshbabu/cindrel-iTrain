
import { NormalProgressbar } from '../../../common'
import { history } from '../../../../helpers'
import moment from 'moment';
import { useParams } from "react-router-dom";
import {ALL_BG_PLACEHOLDERS} from '../../../../services/constants'
import './experimentList.scss';

export const ExperimentsList = ({ experimentsList = [] ,isExperimentLoader=false}) => {
    const params = useParams();


    const handleDetailRoutingPage = () => {
        let modelName = params?.fromType;
        let modelId = params?.modelId;
        history.push(`/models/${modelId}/${modelName}/experiments/detail`)
    }


    return (
        <div className="card experiment-list-card shadow border-0">

            <div className="card-header">
                {experimentsList?.length} Experiments

            </div>
            <div className="card-body">
                <ul class="list-group list-group-flush">
                    {!isExperimentLoader && experimentsList?.map(({ code ,date_created}, ) =>
                        <li class="list-group-item" onClick={handleDetailRoutingPage}>
                            <div className='row'>
                                <div className='col-md-8 col-xs-12'>
                                    <h4 className='experiment-code mb-0'># {code}</h4>
                                    <span className='experiment-timeAndDate'>{moment(date_created).format('DD MMM YYYY')} | {moment(date_created).format('h:mm A')}</span>

                                </div>
                                <div className='col-md-4 col-xs-12'>
                                    <div className='row mb-2'>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>34</h4>
                                            <span className='experiment-timeAndDate'>Upload Images</span>
                                        </div>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>30</h4>
                                            <span className='experiment-timeAndDate'>Correct</span>
                                        </div>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>30</h4>
                                            <span className='experiment-timeAndDate'> Incorrect</span>

                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12 '>
                                            <NormalProgressbar value={85} className='progressbar-experiment rounded-pill' />

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </li>

                    )}

                    {isExperimentLoader && ALL_BG_PLACEHOLDERS?.map((bg) =>
                        <li class="list-group-item" >
                            <div className='row'>
                                <div className='col-md-8 col-xs-12'>
                                    <h5 class="card-title placeholder-glow">
                                        <span class={`placeholder col-3 ${bg}`}></span>
                                    </h5>
                                    <span class={`placeholder col-2 ${bg}`}></span>
                                </div>
                                <div className='col-md-4 col-xs-12'>
                                    {/* <div className='row mb-2'>
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
                                </div> */}
                                    {/* <div className='row mb-3'>
                                    <div className='col-md-12 '>
                                        <NormalProgressbar value={85} className='progressbar-experiment rounded-pill' />

                                    </div>
                                </div> */}
                                </div>
                            </div>

                        </li>
                    )}

                </ul>

            </div>

        </div>
    )
}