

import { useEffect, useState, useRef } from 'react'
import TablePagination from '@mui/material/TablePagination';
import FormData from 'form-data';

import { useParams } from "react-router-dom";
import { NormalButton, NormalModal, AppFilter, NoDataWrape, UploadFilesList } from '../../../../common'
import { ImageDetails } from './imageDetails'
import { CONFIG, ALL_BG_PLACEHOLDERS } from '../../../../../services/constants'
import countriesData from '../../../../../assets/data/countries.json';
import { imageCompressor } from '../../../../../services/imageCompressor';
import { uploadImageModuleOrClass, getImageImageModuleOrClass } from '../../../../../redux/actions/images';
import { trainModelList } from '../../../../../redux/actions/model';

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
    const [imageUploadList, setImageUploadList] = useState([]);
    const [imageUploadListNew, setImageUploadListNew] = useState([]);
    const [isUploadStatus, setIsUploadStatus] = useState(false);
    const [isTrainLoader, setIsTrainLoader] = useState(false);
    const imageInput = useRef();
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



    const handleChnage = (event) => {
        // console.log('data----------->', event.target.files)
        const target = event.target;
        const files = target.files;
        let compressedImages = []

        imageCompressor(files).then((data) => {
            compressedImages = data.map(({ compressed }) => ({ file: compressed?.file, name: compressed?.name, type: compressed?.type, upload: "" }));
            console.log('compressedImages----------------->', compressedImages)
            setImageUploadList(searches => [...searches, ...compressedImages])
            setIsUploadStatus(true)
            compressedImages.map((data, i) => {
                handleUploadImages(data?.file, i, compressedImages)
            })

        }).catch((e) => {
            console.log('err----------->', e)
        });



    }



    const handleUploadImages = (body, i, imageList) => {
        const form = new FormData();
        form.append("photo[]", body);
        form.append("model_id", params?.modelId);
        form.append("class_id", selectedClassObj?.ClassId);
        form.append("user_id", userDetail?.UserId);
        uploadImageModuleOrClass(form).then(({ count = 0, results = [] }) => {
            console.log('results----------->', results)
            if (results?.length > 0) {
                setImageOverAllList(results);
                setImageOverAllCount(count)
                imageList[i].upload = 'done';
                setImageUploadList([...imageList]);
                handleGetImageList()
            }

        }).catch((e) => {
            imageList[i].upload = 'error';
            setImageUploadList([...imageList])
        });
        // setImageUploadList([...imageUploadList])
    }


    const handleCloseUploadeModal = () => {
        setIsUploadStatus(false);
        setImageUploadList([]);
    }

    const handleModalTrain = () => {
        let body = {
            model_id: params?.modelId
        };
        setIsTrainLoader(true);
        trainModelList(body).then((data) => {
            setIsTrainLoader(false)
        }).catch((e) => {
            setIsTrainLoader(false)
        });
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
                                    <NormalButton onClick={() => imageInput.current.click()} label={<span><i className="fa-solid fa-arrow-up-from-bracket"></i> Upload</span>} variant="text" className='me-3' />
                                    <NormalButton label='Train' isLoader={isTrainLoader}  onClick={handleModalTrain}/>
                                    {/* <ImageCompressor
                                    scale={ 100 }
                                    quality={ 75 }
                                    onDone={handlegetFile} 
                                    /> */}

                                    <input
                                        className='d-none'
                                        type="file"
                                        multiple
                                        name='photo[]'
                                        ref={imageInput}
                                        onChange={handleChnage} />

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
                                {!isImageLoader && imageOverAllList.length === 0 && <div className='col-12 nodataWrap-height d-flex justify-content-center align-items-center'>

                                    <NoDataWrape onClick={() => imageInput.current.click()} msgText={<span>Currently no image has been added,<br /> Please add image to explore.</span>} btnLabel={<span><i className="fa-solid fa-arrow-up-from-bracket"></i> Upload</span>} />
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

            {/* <NormalModal  title={`Uploading ${imageUploadList?.length} files`} toggle={handleCloseUploadeModal} className='modal-dialog-bottom-right modal-xl filter-modal' isShow={isUploadStatus}> */}
            {isUploadStatus && <UploadFilesList toggle={handleCloseUploadeModal} fileList={imageUploadList} />}
            {/* </NormalModal> */}
        </div>
    );




}
