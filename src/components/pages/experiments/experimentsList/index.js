
import {NormalProgressbar} from '../../../common'

import './experimentList.scss';

export const ExperimentsList = () => {



    return (
        <div className="card experiment-list-card shadow border-0">

            <div className="card-header">
                12 Experiments

            </div>
            <div className="card-body">
                <ul class="list-group list-group-flush">
                    {[1,2,3,4,5,6,7].map((data)=>
                     <li class="list-group-item">
                     <div className='row'>
                         <div className='col-md-8 col-xs-12'>
                             <h4 className='experiment-code mb-0'># 1090{data}</h4>
                             <span className='experiment-timeAndDate'>Today | 12:34 PM</span>

                         </div>
                         <div className='col-md-4 col-xs-12'>
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

                 </li>
                    
                    )}
                   
                  
                </ul>

            </div>

        </div>
    )
}