

import { useEffect, useState } from 'react'
import TablePagination from '@mui/material/TablePagination';

import { useParams } from "react-router-dom";
import { NormalButton, NormalModal, AppFilter, NoDataWrape } from '../../../../common'
import { ImageDetails } from './imageDetails'
import { CONFIG, ALL_BG_PLACEHOLDERS } from '../../../../../services/constants'
import countriesData from '../../../../../assets/data/countries.json';
import { imageCompressor } from '../../../../../services/imageCompressor';
import { uploadImageModuleOrClass, getImageImageModuleOrClass } from '../../../../../redux/actions/images'
import './inputMonitor.scss'

export const InputMonitor = ({ userDetail = {}, selectedClassObj = '' }) => {
    const filterShowData = countriesData.map(({ name, code }) => ({ value: code, label: name }))
    const params = useParams();
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isFilterModal, setisFilterModal] = useState(false);
    const [uploadImageObject, setUploadImageObject] = useState('');
    const [imageOverAllList, setImageOverAllList] = useState([])
    const [imageOverAllCount, setImageOverAllCount] = useState(0);
    const [argumentImagesList, setArgumentImagesList] = useState([]);
    const [isImageLoader, setIsImageLoader] = useState(false);
    const [filterData, setFilterDate] = useState([{
        title: "User",
        filterType: "checkBox",
        data: filterShowData
    }, {
        title: "Tags",
        filterType: "checkBox",
        data: filterShowData
    }, , {
        title: "Date",
        filterType: "date",
        data: filterShowData
    }])


    useEffect(() => {
        if (!!selectedClassObj) {
            handleGetImageList()
        }

    }, []);

    useEffect(() => {
        setImageOverAllList([]);
        setImageOverAllCount(0)
        handleGetImageList()
    }, [selectedClassObj]);


    const handleGetImageList = () => {
        let reqObj = {
            user_id: userDetail?.UserId,
            model_id: 0,
            class_id: selectedClassObj?.ClassId
        }
        setIsImageLoader(true)
        getImageImageModuleOrClass(reqObj).then(({ count = 0, results = [] }) => {
            setIsImageLoader(false)
            if (results?.length > 0) {
                setImageOverAllList(results);
                setImageOverAllCount(count)
            }
        }).catch((e) => {
            setIsImageLoader(false)
        })
    }

    const handleDetailModal = (id, i) => {
        if (!isDetailModal) {
            let res = imageOverAllList.filter(({ ImageMasterId }) => ImageMasterId === id)
            setArgumentImagesList([...res, imageOverAllList[i]])
        } else {
            setArgumentImagesList([])
        }
        setIsDetailModal(!isDetailModal)

    }
    const handleFilterModal = () => {
        setisFilterModal(!isFilterModal)
    }



    const handleChnage = (e) => {

        let photo = []
        imageCompressor(e).then((data) => {

            photo.push(data?.compressed?.file)
            setUploadImageObject(
                {
                    user_id: userDetail?.UserId,
                    model_id: params?.modelId,
                    class_id: selectedClassObj?.ClassId,
                    photo
                }
            );
            handleUploadImages({
                user_id: userDetail?.UserId,
                model_id: params?.modelId,
                class_id: selectedClassObj?.ClassId,
                photo
            })
        }).catch((e) => {

        });



    }


    const handleUploadImages = (d) => {
        uploadImageModuleOrClass(d).then((data) => {


        }).catch((e) => {

        })

    }
    return (
        <div className="inputMonitor-continer border-0">
            <div className='row'>
                <div className='col-md-12 col-sm-12 mb-5'>
                    <div className="card mt-2 card-header-title">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-6 col-sm-6'>
                                    <h4 className='title'>{selectedClassObj?.ClassName} </h4>
                                </div>
                                <div className='col-md-6 col-sm-6 text-end'>
                                    <NormalButton label={<span><i className="fa-solid fa-arrow-up-from-bracket"></i> Upload</span>} variant="text" className='me-3' />
                                    <NormalButton label='Train' />
                                    {/* <ImageCompressor
                                    scale={ 100 }
                                    quality={ 75 }
                                    onDone={handlegetFile} 
                                    /> */}
                                    {/* <input
                                        id={'12356'}
                                        // className={className ? className : null}
                                        type="file"
                                        onChange={handleChnage} /> */}
                                    {/* <input on={_handleFileCompChange} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img src={compImg?.compressed?.base64} width='200' className="img-thumbnail img-fluid class-uploded-images" />
                <img src={compImg?.original?.base64} width='200' className="img-thumbnail img-fluid class-uploded-images" /> */}
                <div className='col-md-12 col-sm-12'>
                    <div className="card mt-2 over-all-image-list">
                        <div className="card-header">
                            <div className='row'>
                                <div className='col-md-6 col-sm-6'>
                                    <h4 className='card-title'><i className="fa-solid fa-circle-info"></i> Overall {imageOverAllCount} Images </h4>
                                </div>
                                <div className='col-md-6 col-sm-6 text-end d-flex justify-content-end align-items-center'>
                                    <TablePagination
                                        className='image-overView-component-pagination'
                                        component="div"
                                        count={imageOverAllCount}
                                        page={0}
                                        onPageChange={() => { }}
                                        rowsPerPage={10}
                                        onRowsPerPageChange={() => { }}
                                    />
                                    <NormalButton materialUi={false} className='btn' variant='text' label={<i className="fa-solid fa-arrow-rotate-right refresh-icon" title='Refresh'></i>} />
                                    <NormalButton materialUi={false} className='btn' onClick={handleFilterModal} variant='text' label={<i className="fa-solid fa-filter refresh-icon" title='Filter'></i>} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className='row gx-2'>
                                {imageOverAllList.map(({ ImageUrl, ImageName, IsMasterImage, ImageId }, i) =>

                                    IsMasterImage && <div className='col-md-3 col-sm-6' key={i} onClick={() => handleDetailModal(ImageId, i)}>
                                        <div class="ratio ratio-1x1">
                                            <img src={`${CONFIG.API_URL}${ImageUrl}${ImageName}`} />
                                        </div>

                                    </div>
                                )}
                                {isImageLoader && ALL_BG_PLACEHOLDERS.map((bg) =>
                                    <div className='col-md-3 col-sm-6'>
                                        <div class="ratio ratio-1x1 placeholder-glow">
                                            <div class={`card placeholder ${bg} disabled`} aria-hidden="true">

                                            </div>
                                        </div>

                                    </div>
                                )}
                              {!isImageLoader &&  imageOverAllList.length ===0 &&  <div className='col-12 nodataWrap-height d-flex justify-content-center align-items-center'>

                                    <NoDataWrape msgText={<span>Currently no image has been added,<br/> Please add image to explore.</span> }  btnLabel={<span><i className="fa-solid fa-arrow-up-from-bracket"></i> Upload</span>}/> 
                                </div>}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <NormalModal toggle={handleDetailModal} className='modal-dialog-right modal-xl' isShow={isDetailModal}>
                <ImageDetails argumentImagesList={argumentImagesList} onClose={handleDetailModal} />
            </NormalModal>
            <NormalModal toggle={handleFilterModal} className='modal-dialog-right modal-xl filter-modal' isShow={isFilterModal}>
                <AppFilter className='bg-transparent border-0' filterData={filterData} toggle={handleFilterModal} />
            </NormalModal>
        </div>
    );




}
