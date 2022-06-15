

import { useEffect, useState } from 'react'
import { NormalButton } from '../../../../../common';
import { CONFIG } from '../../../../../../services/constants'

import './imageDetails.scss'

export const ImageDetails = ({ onClose = '', argumentImagesList }) => {
    const [orgImage, setOrgImage] = useState('');

    useEffect(() => {
        handleSetOrgImage()
    }, [argumentImagesList]);

    useEffect(() => {
        handleSetOrgImage()
    }, []);

    const handleSetOrgImage=()=>{
        let res = argumentImagesList.find(({ IsMasterImage }) => IsMasterImage === true);
        setOrgImage(res)

    }

    return (
        <div className="inputMonitor-continer border-0">

            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='image-text-over-lap'>
                        <NormalButton materialUi={false} className='btn btn-sm top-right close-btn-icon' onClick={onClose} variant='text' label={<i className="fa-solid fa-xmark" title='Close'></i>} />
                        <img src={`${CONFIG.API_URL}${orgImage?.ImageUrl}${orgImage?.ImageName}`} />
                    </div>
                </div>
                <div className='col-md-12 col-sm-12'>
                    <hr />
                </div>
            </div>
            <div className='row gx-2'>
                {argumentImagesList?.map(({ ImageUrl, ImageName, IsMasterImage, ImageMasterId }, i) =>

                    !IsMasterImage && <div className='col-md-6 col-sm-12' key={i}>
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
