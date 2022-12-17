

import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { NormalButton } from '../../../../../common';
import { CONFIG } from '../../../../../../services/constants';
import { deleteImageImageModuleOrClass } from '../../../../../../redux/actions/images'

import './imageDetails.scss'

export const ImageDetails = ({ onClose = '', argumentImagesList }) => {
    const [orgImage, setOrgImage] = useState('');
    const [isFormLoader, setIsFormLoader] = useState(false);

    useEffect(() => {
        handleSetOrgImage()
    }, [argumentImagesList]);

    useEffect(() => {
        handleSetOrgImage()
    }, []);

    const handleSetOrgImage = () => {
        let res = argumentImagesList.find(({ IsMasterImage }) => IsMasterImage === true);
        setOrgImage(res)

    }

    const handleOnDelete = () => {
        console.log('orgImage----------->', orgImage?.ImageId)
        let reqBody = {
            "image_id": orgImage?.ImageId
        }
        setIsFormLoader(true)
        deleteImageImageModuleOrClass(reqBody).then((data) => {
            setIsFormLoader(false)
            onClose()

        }).catch((error) => {
            setIsFormLoader(false)
        })

    }

    return (
        <div className="inputMonitor-continer border-0">
            <div class="modal-header custom-heade">

                {!isFormLoader ? <IconButton aria-label="delete" color="error" onClick={handleOnDelete}>
                    <DeleteIcon />
                </IconButton> : <div class="spinner-border text-danger spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>}
                <IconButton aria-label="delete" color="success" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='image-text-over-lap'>
                        {/* <NormalButton materialUi={false} className='btn btn-sm top-right close-btn-icon' onClick={onClose} variant='text' label={<i className="fa-solid fa-xmark" title='Close'></i>} /> */}
                        <img className='img-fluid'  src={`${CONFIG.API_URL}${orgImage?.ImageUrl}${orgImage?.ImageName}`} />
                    </div>
                </div>
                <div className='col-md-12 col-sm-12'>
                    <hr />
                </div>
            </div>
            <div className='row gx-2'>
                {argumentImagesList?.map(({ ImageUrl, ImageName, IsMasterImage, ImageMasterId }, i) =>

                    !IsMasterImage && <div className='col-md-6 col-sm-12 mb-3'  key={i}>
                        <div className="ratio ratio-1x1">
                            <h4>{ImageMasterId}</h4>
                            <img src={`${CONFIG.API_URL}${ImageUrl}${ImageName}`} />
                        </div>

                    </div>
                )}

            </div>
        </div>
    );




}
