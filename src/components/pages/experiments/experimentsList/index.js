
import { NormalProgressbar } from '../../../common'
import { history } from '../../../../helpers'
import moment from 'moment';
import { useParams } from "react-router-dom";
import {ALL_BG_PLACEHOLDERS,EXIST_LOCAL_STORAGE} from '../../../../services/constants'
import {setStorage} from '../../../../services/helperFunctions'
import './experimentList.scss';

export const ExperimentsList = ({ experimentsList = [] ,isExperimentLoader=false}) => {
    const params = useParams();


    const handleDetailRoutingPage = (id,i) => {
        let modelName = params?.fromType;
        let modelId = params?.modelId;
        history.push(`/models/${modelId}/${modelName}/experiments/${id}/detail`);
        setStorage(EXIST_LOCAL_STORAGE?.EXPERIMENT_DETAIL,JSON.stringify(experimentsList[i]))

    }


    return (
        <div className="card experiment-list-card shadow border-0">

            <div className="card-header">
                {experimentsList?.length} Experiments

            </div>
            <div className="card-body">
                <ul class="list-group list-group-flush">
                    {!isExperimentLoader && experimentsList?.map(({ code ,date_created,correct=0,incorrect=0,uploaded=0,reviewed_percent=0,id}, i) =>
                        <li class="list-group-item" onClick={()=>handleDetailRoutingPage(id,i)}>
                            <div className='row'>
                                <div className='col-md-8 col-xs-12'>
                                    <h4 className='experiment-code mb-0'># {code}</h4>
                                    <span className='experiment-timeAndDate'>{moment(date_created).format('DD MMM YYYY')} | {moment(date_created).format('h:mm A')}</span>

                                </div>
                                <div className='col-md-4 col-xs-12'>
                                    <div className='row mb-2'>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>{uploaded}</h4>
                                            <span className='experiment-timeAndDate'>Upload Images</span>
                                        </div>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>{correct}</h4>
                                            <span className='experiment-timeAndDate'>Correct</span>
                                        </div>
                                        <div className='col-md-4 text-center'>
                                            <h4 className='experiment-count mb-0'>{incorrect}</h4>
                                            <span className='experiment-timeAndDate'> Incorrect</span>

                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12 '>
                                            <NormalProgressbar value={reviewed_percent} className='progressbar-experiment rounded-pill' />

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
                                   
                                </div>
                            </div>

                        </li>
                    )}

                </ul>

            </div>

        </div>
    )
}