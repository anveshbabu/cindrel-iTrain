

import { useEffect, useState, useRef } from 'react'
import TablePagination from '@mui/material/TablePagination';
import FormData from 'form-data';

import { useParams } from "react-router-dom";
import { NormalButton, NormalDropDown, NormalModal, AppFilter, NoDataWrape, UploadFilesList, NormalCheckbox } from '../../../../common'
import { ImageDetails } from './imageDetails'
import { CONFIG, ALL_BG_PLACEHOLDERS } from '../../../../../services/constants'
import countriesData from '../../../../../assets/data/countries.json';
import { imageCompressor } from '../../../../../services/imageCompressor';
import { uploadImageModuleOrClass, getImageImageModuleOrClass, verifyModuleImage ,deleteMultyModuleImage} from '../../../../../redux/actions/images';
import { getModelUserList } from '../../../../../redux/actions/model';
import { trainModelList } from '../../../../../redux/actions/model';

import './inputMonitor.scss'

export const InputMonitor = ({ userDetail = {}, selectedClassObj = '', classsList }) => {
    const filterShowData = countriesData.map(({ name, code }) => ({ value: code, label: name }));
    const [moduleUserList, setModuleUserList] = useState({})
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
    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(1);
    const [verSelectImg, setVerSelectImg] = useState([]);

    const opctionsMore = [
        <span className='text-success'><i class="fa-regular fa-circle-check me-2"></i>  Verify Selected ({verSelectImg.length}) Images </span>,
        <span className='text-danger'><i class="fa-solid fa-trash  me-2"></i> Delete Selected ({verSelectImg.length}) Images</span>,
        // <span className='text-primary'><i class="fa-solid fa-list  me-2"></i> Select All Images & Verify  </span>
    ]

    const [imageApiReqObj, setImageApiReqObj] = useState({
        limit: 20,
        offset,
        date_from: "",
        date_to: ""
    });
    const imageInput = useRef();
    const [filterData, setFilterDate] = useState([{
        title: "User",
        filterType: "checkBox",
        data: moduleUserList
    },
    // {
    //     title: "Tags",
    //     filterType: "checkBox",
    //     data: filterShowData
    // }, 

    {
        title: "Date",
        filterType: "date",
        data: filterShowData
    }])


    useEffect(() => {
        if (!!selectedClassObj) {
            handleGetImageList()
        }
        handleGetModuleUserList()

    }, []);

    useEffect(() => {
        setImageOverAllList([]);
        setImageOverAllCount(0)
        handleGetImageList()
    }, [selectedClassObj]);




    const handleGetModuleUserList = () => {

        try {
            let reqObj = {
                model_id: Number(params?.modelId,)
            }
            getModelUserList(reqObj).then(({ count = 0, users = [] }) => {
                setIsImageLoader(false)
                if (users?.length > 0) {
                    setFilterDate([{
                        title: "User",
                        filterType: "checkBox",
                        data: users.map(({ firstname, lastname, UserId }) => ({ value: UserId, label: `${firstname} ${lastname}` }))
                    }, {
                        title: "Date",
                        filterType: "date",
                        data: filterShowData
                    }])
                }
            }).catch((e) => {

            })
        } catch (e) {

        }


    }


    const handleGetImageList = (imgApiReq) => {
        let reqObj = {
            model_id: params?.modelId,
            class_id: selectedClassObj?.ClassId,
        }
        if (imgApiReq) {
            reqObj = {
                // user_id: userDetail?.UserId,
                ...reqObj,
                ...imgApiReq
            }
        } else {
            reqObj = {
                ...reqObj,
                ...imageApiReqObj
            }
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
        const target = event.target;
        const files = target.files;
        let compressedImages = []

        imageCompressor(files).then((data) => {
            compressedImages = data.map(({ compressed }) => ({ file: compressed?.file, name: compressed?.name, type: compressed?.type, upload: "" }));
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
            if (results?.length > 0) {
                setImageOverAllList(results);
                setImageOverAllCount(count)
                setPageCount(0)
                imageList[i].upload = 'done';
                setImageUploadList([...imageList]);
                let imgApiReq = {
                    limit: 20,
                    offset: 1,
                    date_from: '',
                    date_to: '',
                    user_id: ''
                }

                setImageApiReqObj(imgApiReq);
                handleGetImageList(imgApiReq);

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
    };


    const handlePageChange = (e, count) => {
        console.log(pageCount > count)

        if (pageCount > count) {
            console.log('addd')
            let offsetNew = offset - 20;
            setOffset(offsetNew);
            let imgApiReq = {
                limit: 20,
                offset: offsetNew,
                date_from: "",
                date_to: ""
            }
            setImageApiReqObj(imgApiReq);

            handleGetImageList(imgApiReq)


        } else {
            console.log('min')
            let offsetNew = offset + 20;
            setOffset(offsetNew);
            let imgApiReq = {
                limit: 20,
                offset: offsetNew,
                date_from: "",
                date_to: ""
            }
            setImageApiReqObj(imgApiReq);

            handleGetImageList(imgApiReq)

        }
        setPageCount(count)

    }

    const handleGetAplyFilter = (data) => {

        let imgApiReq = {
            limit: 20,
            offset: 1,
            date_from: data?.startDate,
            date_to: data?.endDate,
            user_id: data?.user_id
        }
        console.log('----------', imgApiReq)
        setImageApiReqObj(imgApiReq);
        handleGetImageList(imgApiReq)

    }

    const handleAddVerList = (id) => {
        let index = verSelectImg.findIndex((data) => data === id)
        if (index === -1) {
            setVerSelectImg([...verSelectImg, id])

        } else {
            let imgIs = verSelectImg.filter((data) => data !== id);
            setVerSelectImg([...imgIs])
        }


    }

    const handleMoreOppClick = (index) => {
        if (index === 0) {
            handleVerifyImg(verSelectImg);
        } else if (index === 1) {
            handleDeleteImg(verSelectImg)
        }
    };


    const handleVerifyImg = (imageIds) => {
        let body = {
            image_ids: imageIds,
            user_id: userDetail?.UserId,
        }
        verifyModuleImage(body).then((data) => {
            setVerSelectImg([]) 

        }).catch((e) => {
            console.log('err----------->', e)
        });
    };

    const handleDeleteImg = (imageIds) => {
        let body = {
            image_ids: imageIds,

        }
        deleteMultyModuleImage(body).then((data) => {
            setVerSelectImg([]);
            if (!!selectedClassObj) {
                handleGetImageList()
            }

        }).catch((e) => {
            console.log('err----------->', e)
        });
    };

    const handleSelectAllVerImage=()=>{
        let imageIds=  imageOverAllList.map(({ImageId})=>ImageId);
        if(verSelectImg.length !== imageOverAllList.length ){
            setVerSelectImg([...imageIds]) 
        }else{
            setVerSelectImg([]) 
        }
          
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
                                    <NormalButton label='Train' disabled={!(imageOverAllList?.length >= 20 && classsList?.length >= 3)} isLoader={isTrainLoader} onClick={handleModalTrain} />
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
                                {verSelectImg?.length == 0 &&      <TablePagination
                                        className='image-overView-component-pagination'
                                        component="div"
                                        count={imageOverAllCount}
                                        page={pageCount}
                                        onPageChange={handlePageChange}
                                        rowsPerPage={20}
                                    // onRowsPerPageChange={console.l}
                                    />}
                                   {verSelectImg?.length == 0 &&  <NormalButton materialUi={false} className='btn' variant='text' label={<i className="fa-solid fa-arrow-rotate-right refresh-icon" title='Refresh'></i>} />}
                                    {verSelectImg?.length > 0 &&  <NormalCheckbox onChange={handleSelectAllVerImage} label='Select All Images' className='text-gray' />}
                                    {verSelectImg?.length == 0 &&  <NormalButton materialUi={false} className='btn' onClick={handleFilterModal} variant='text' label={<i className="fa-solid fa-filter refresh-icon" title='Filter'></i>} />}
                                    {verSelectImg?.length > 0 && <NormalDropDown materialUi={false} className='btn' options={opctionsMore} onSelect={(e, index) => handleMoreOppClick(index)} label={<i class="fa-solid fa-ellipsis-vertical refresh-icon"></i>} />}
                                    {/* {verSelectImg?.length > 0 &&  <NormalButton label='Verify'  onClick={handleModalTrain} />} */}
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className='row gx-2'>
                                {imageOverAllList.map(({ ImageUrl, ImageName, IsMasterImage, ImageId }, i) =>
                                    IsMasterImage && <div className='col-md-3 col-sm-6 mb-3' key={i} onDoubleClick={() => handleDetailModal(ImageId, i)}>
                                        <div className="ratio ratio-1x1">
                                            <div className={`card ${verSelectImg?.find((id) => id === ImageId) ? 'bg-dark' : ""}  text-white img-hover`}>
                                                <img className="card-img" src={`${CONFIG.API_URL}${ImageUrl}${ImageName}`} />
                                                <div className={`card-img-overlay  hide-img ${verSelectImg.length > 0 ? 'd-block' : ""}`}>
                                                    <NormalCheckbox checked={!!verSelectImg.find((id)=>id == ImageId)} onChange={() => handleAddVerList(ImageId)} />

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                )}
                                {isImageLoader && ALL_BG_PLACEHOLDERS.map((bg) =>
                                    <div className='col-md-3 col-sm-6'>
                                        <div className="ratio ratio-1x1 placeholder-glow">
                                            <div className={`card placeholder ${bg} disabled`} aria-hidden="true">

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
                <AppFilter className='bg-transparent border-0' filterData={filterData} toggle={handleFilterModal} onApply={handleGetAplyFilter} />
            </NormalModal>

            {/* <NormalModal  title={`Uploading ${imageUploadList?.length} files`} toggle={handleCloseUploadeModal} className='modal-dialog-bottom-right modal-xl filter-modal' isShow={isUploadStatus}> */}
            {isUploadStatus && <UploadFilesList toggle={handleCloseUploadeModal} fileList={imageUploadList} />}
            {/* </NormalModal> */}
        </div>
    );




}
