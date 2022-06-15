import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { NormalProgressbar } from '../../../common'
import { history } from '../../../../helpers'
import './experimentDetail.scss';
import { useParams } from "react-router-dom";

export const ExperimentsDetail = () => {
    const params = useParams();



    return (
        <div className='experiment-detail'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="card  filter-card border-0">

                        <div className="card-body">
                            <div>
                                <input type="checkbox" class="btn-check " id="correct" autocomplete="off" />
                                <label class="btn btn-outline-primary  rounded-0"  rounded-0 for="correct">Correct</label>
                                <input type="checkbox" class="btn-check rounded-0" id="in_correct" autocomplete="off" />
                                <label class="btn btn-outline-primary  rounded-0" for="in_correct">In Correct</label>
                                <input type="checkbox" class="btn-check  rounded-0" id="irrelevant" autocomplete="off" />
                                <label class="btn btn-outline-primary  rounded-0" for="irrelevant">Irrelevant</label>
                                <input type="checkbox" class="btn-check  rounded-0" id="error" autocomplete="off" />
                                <label class="btn btn-outline-primary  rounded-0" for="error">error</label>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>


    )
}