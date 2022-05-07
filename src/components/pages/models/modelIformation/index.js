import './modelIformation.scss';
import { NormalProgressbar } from '../../../common'

export const ModelIformation = ({ modelData = [] }) => {


    return (

        <div className="row modelIformation-content">
            <div className='col-md-12 col-sm-12'>
                <h4 className='title-page'>AFP Insurance</h4>

            </div>
            <div className='col-md-4 col-sm-12'>
                <table class="table table-borderless deatils-info">
                    <tbody>
                        <tr>
                            <td>Total Classes:</td>
                            <td>13</td>
                        </tr>
                        <tr>
                            <td>No. of Images:</td>
                            <td>2,200</td>
                        </tr>
                        <tr>
                            <td>Size on Disk:</td>
                            <td>2.32 GB</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div className='col-md-4 col-sm-12'>
                <table class="table table-borderless deatils-info">
                    <tbody>
                        <tr>
                            <td>Experiments Completed:</td>
                            <td>13</td>
                        </tr>
                        <tr>
                            <td>Images used for Experiment:</td>
                            <td>2,200</td>
                        </tr>
                        <tr>
                            <td>Avg. Execution Time:</td>
                            <td>2.32 GB</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className='col-md-4 col-sm-12'>
                <table class="table table-borderless deatils-info">
                    <tbody>
                        <tr>
                            <td>First Created:</td>
                            <td>12 Jan 2022</td>
                        </tr>
                        <tr>
                            <td>Last Active:</td>
                            <td>20 Apr 2022</td>
                        </tr>
                        <tr>
                            <td>Created By:</td>
                            <td>Robin D</td>
                        </tr>
                        <tr>
                            <td>Last Modified By:</td>
                            <td>Robin D</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className='col-md-12 col-sm-12'>
                {/* <h4 className='title-page'>AFP Insurance</h4> */}
                <div className='row '>
                    <div className='col-md-4'>
                        <label className='progress-bar-label'>Last Experiment <span>83% Correct</span></label>
                        <NormalProgressbar className='model-progress mb-3' />
                    </div>
                    <div className='col-md-4'>
                        <label className='progress-bar-label'>Avg. Prediction <span>79% Correct</span></label>
                        <NormalProgressbar className='model-progress mb-3' />
                    </div>
                </div>


            </div>
        </div >
    )




} 