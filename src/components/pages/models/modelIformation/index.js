import './modelIformation.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { NormalProgressbar, NormalButton, NormalAlert } from '../../../common'
import { deleteModelList } from '../../../../redux/actions/model'
import { useState } from 'react';

export const ModelIformation = ({ modelData = {}, onEditForm = '', onDeleteSucess }) => {
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [isFormLoader, setIsFormLoader] = useState(false)


    const handleDeleteOpenModal = () => {
        setIsDeleteModal(!isDeleteModal)
    }

    const handleDeleteModal = (value) => {
        console.log(value)
        if (value) {
            let { ModelId } = modelData;
            let reqObj = {
                model_id: ModelId
            };
            setIsFormLoader(true)
            deleteModelList(reqObj).then((data) => {
                setIsFormLoader(false)
                setIsDeleteModal(false)
                onDeleteSucess(modelData)

            }).catch((error) => {
                setIsFormLoader(false)
            })
        } else {
            handleDeleteOpenModal()
        }


    }

    return (

        <div className="row modelIformation-content">
            <div className='col-md-12 col-sm-12'>
                <div className='row mb-4'>
                    <div className='col-md-6 col-xs-12'>
                        <h4 className='title-page'>{modelData?.ModelName}</h4>
                    </div>
                    <div className='col-md-6 col-xs-12 text-end'>
                        {/* <IconButton  label='Edit' size="small"  endIcon={<DeleteIcon />}/> */}

                        <IconButton aria-label="delete" color="success" onClick={onEditForm}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={handleDeleteOpenModal}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>



            </div>
            <div className='col-md-4 col-sm-12'>
                <table className="table table-borderless deatils-info">
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
                <table className="table table-borderless deatils-info">
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
                <table className="table table-borderless deatils-info">
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
            <NormalAlert isLoader={isFormLoader} isShow={isDeleteModal} toggle={handleDeleteOpenModal} onClick={handleDeleteModal} title="Are You Sure want Delete this Model?" />
        </div >
    )




} 