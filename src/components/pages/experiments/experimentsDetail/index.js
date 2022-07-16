import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { CheckCircle, CloseOutlined } from '@mui/icons-material';
import { Normalselect, NormalRadioButtion, NormalButton } from '../../../common'
import { history } from '../../../../helpers'
import './experimentDetail.scss';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getExperimentsImageList, changeClassForetestImage } from '../../../../redux/actions/experiments';
import { getAllClasssList } from '../../../../redux/actions/classes';
import { getStorage, isEmpty } from '../../../../services/helperFunctions'
import { EXIST_LOCAL_STORAGE, CONFIG } from '../../../../services/constants';
import moment from 'moment';

export const ExperimentsDetail = () => {
    const params = useParams();
    const [userDetail, setUserDetail] = useState(null)
    const [imagesList, setImagesList] = useState([]);
    const [filterImagesList, setFilterImagesList] = useState([]);
    const [isImageLoader, setIsImageLoader] = useState(false);
    const [classificationDetail, setClassificationDetail] = useState({});
    const [classsList, setclasssList] = useState([]);
    const [isClassCorrect, setIsClassCorrect] = useState('Yes');
    const [correctedClassId, setCorrectedClassId] = useState('Yes');
    const [filterSelectedVal, setFilterSelectedVal] = useState('');


    useEffect(() => {
        let userDetail = getStorage(EXIST_LOCAL_STORAGE.USER_DETAIL);
        let reqObj = {
            model_id: params?.modelId,
        }
        setUserDetail(JSON.parse(userDetail));
        getAllClasssList(reqObj).then(({ count, results }) => {
            // setIsClassLoader(false)
            if (results.length > 0) {
                var classList = results.map(({ ClassId, ClassName }) => ({ value: ClassId, label: ClassName }));
                setclasssList(classList);
            }
        }).catch((error) => {
            // setIsClassLoader(false)
        })
        handleGetExperimentImages();
    }, [])


    const handleGetExperimentImages = () => {
        let { UserId } = JSON.parse(getStorage(EXIST_LOCAL_STORAGE.USER_DETAIL));
        let body = {
            user_id: UserId,
            model_id: Number(params?.modelId)
        }
        setImagesList([])
        setIsImageLoader(true)
        getExperimentsImageList(body).then(({ status, tests }) => {
            setIsImageLoader(false)
            if (tests?.length > 0) {
                if (!isEmpty(classificationDetail)) {
                    let res = tests.find(({ id }) => id === classificationDetail?.id)
                    setClassificationDetail(res)
                   
                }
                setImagesList(tests)
                setFilterImagesList(tests)

            }


        }).catch((error) => {
            setIsImageLoader(false)
        })

    }

    const handleDetailTestImage = (data) => {
        setClassificationDetail(data)
        setCorrectedClassId(data?.corrected_class_id)
    }



    const handleClassChangeTestImage = (e) => {
        setCorrectedClassId(e?.target?.value)

    }

    const updateTestCorectedClass = () => {

        let req = {
            test_images: [

                {
                    corrected_class_id: correctedClassId,
                    test_id: classificationDetail?.id
                }

            ],
            model_id: params?.modelId,
        };
        console.log('req------------->', req)
        changeClassForetestImage(req).then(({ count, results }) => {
            // setIsClassLoader(false)
            handleGetExperimentImages();
        }).catch((error) => {
            // setIsClassLoader(false)
        })

    }

    const handleFilterChange = (val) => {
        console.log(val);
        setFilterSelectedVal(val);
        let res = [];
        if ('correct' === val) {
            res = filterImagesList.filter(({ Reviewed, correct }) => !!correct)
        } else if ('in_correct' === val) {

            res = filterImagesList.filter(({ Reviewed, correct }) => !correct)
        } else if ('reviewed' === val) {
            res = filterImagesList.filter(({ Reviewed, correct }) => Reviewed === true)

        } else if ('not_reviewed' === val) {
            res = filterImagesList.filter(({ Reviewed, correct }) => Reviewed === false)

        }
        console.log('res------------>',res,filterImagesList)
        setImagesList(res)

    }




    return (
        <div className='experiment-detail'>
            <div className='row mb-3'>
                <div className='col-md-12'>
                    <div className="card  filter-card border-0">

                        <div className="card-body">
                            <div>
                                <input type="radio" className="btn-check " checked={filterSelectedVal === 'correct'} onClick={() => handleFilterChange('correct')} id="correct" autocomplete="off" />
                                <label className="btn btn-outline-primary  rounded-0" rounded-0 for="correct">Correct</label>
                                <input type="radio" className="btn-check rounded-0" checked={filterSelectedVal === 'in_correct'} onClick={() => handleFilterChange('in_correct')} id="in_correct" autocomplete="off" />
                                <label className="btn btn-outline-primary  rounded-0" for="in_correct">In Correct</label>
                                {/* <input type="radio" className="btn-check  rounded-0" checked={filterSelectedVal === 'user'} onClick={() => handleFilterChange('user')} id="user" autocomplete="off" />
                                <label className="btn btn-outline-primary  rounded-0" for="user">User</label> */}
                                <input type="radio" className="btn-check  rounded-0" checked={filterSelectedVal === 'reviewed'} onClick={() => handleFilterChange('reviewed')} id="reviewed" autocomplete="off" />
                                <label className="btn btn-outline-primary  rounded-0" for="reviewed">Reviewed</label>
                                <input type="radio" className="btn-check  rounded-0" checked={filterSelectedVal === 'not_reviewed'} onClick={() => handleFilterChange('not_reviewed')} id="not_reviewed" autocomplete="off" />
                                <label className="btn btn-outline-primary  rounded-0" for="not_reviewed">Not Reviewed</label>
                                <label className="btn btn-clear rounded-0" for="2222" onClick={handleGetExperimentImages}>Clear All Filters</label>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
            <div className='row'>
                <div className={!isEmpty(classificationDetail) ? 'col-md-7' : "col-md-12"}>
                    <div className='row'>
                        {imagesList.map(({ image_path }, i) =>

                            <div className='col-md-3 mb-3' key={i}>
                                <div className="ratio ratio-1x1">
                                    <img className="img-fluid" onClick={() => handleDetailTestImage(imagesList[i])} src={CONFIG.API_URL + image_path} />
                                </div>
                            </div>
                        )}


                    </div>
                </div>
                {!isEmpty(classificationDetail) && <div className='col-md-5'>
                    <div className="card border-0">

                        <div className="card-body">
                            <div className='row mb-4'>
                                <div className='col-md-12'>
                                    <div className="ratio ratio-1x1">
                                        <img className="img-fluid" src={CONFIG.API_URL + classificationDetail?.image_path} />
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <hr className='border-hr' />
                                <div className='col-md-12 log-iamge mb-3'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <NormalRadioButtion value={isClassCorrect} options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'no' }]}

                                                onChange={(e) => setIsClassCorrect(e?.target?.value)}
                                                className='col-form-label-val' label='Select Age' />
                                        </div>
                                        <div className='col-md-6'>

                                            <Normalselect label='Class' disabled={isClassCorrect === 'Yes'} value={correctedClassId } onChange={handleClassChangeTestImage} options={classsList} size="small" />
                                        </div>
                                        <div className='col-md-12 text-end'>
                                            <NormalButton label='Save' size="small" disabled={isClassCorrect === 'Yes'} onClick={updateTestCorectedClass} />
                                            <NormalButton className='ms-2 btn-danger' color='error' label='Clear' size="small" />
                                        </div>
                                    </div>

                                </div>
                                <hr className='border-hr' />
                                <div className='col-md-12 log-iamge mb-3'>
                                    {classificationDetail?.correct ? <CheckCircle color="success" className='float-end' /> : <CloseOutlined color="error" className='float-end' />}

                                    <h4 className='title-text'>Machine Detected </h4>
                                    <div className="form-group row">
                                        <label for="staticEmail" className="col-sm-3 col-form-label">Class</label>
                                        <div className="col-sm-9">
                                            <label for="staticEmail" className="col-form-label col-form-label-val">{classificationDetail?.ClassificationName}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="staticEmail" className="col-sm-3 col-form-label">Score </label>
                                        <div className="col-sm-9">
                                            <label for="staticEmail" className=" col-form-label col-form-label-val">{classificationDetail?.score * 100} %</label>
                                        </div>
                                    </div>


                                </div>


                                <div className='col-md-12 log-iamge'>
                                    <h4 className='title-text mb-0 float-left'>User Actions</h4>
                                    <CheckCircle color="success" className='float-end' />
                                </div>
                                {classificationDetail?.corrections?.map(({ firstname, lastname, ClassificationName, corected_class_name, date_modified }) =>
                                    <div className='col-md-12 log-iamge mb-3'>
                                        {/* <IconButton color="primary" aria-label="upload picture" component="span"> */}
                                        {/* <CheckCircle color="success" className='float-end' /> */}
                                        {/* </IconButton> */}
                                        <hr className='border-hr' />
                                        <div className="form-group row">
                                            <label for="staticEmail" className="col-sm-12 col-form-label">{firstname} {lastname} modified the input from class <span className='active-class'>{ClassificationName}</span> to class <span className='active-class'>{corected_class_name}</span> on  {moment(date_modified).format('DD MM YYYY, h:mm:ss a')}</label>
                                            {/* <label for="staticEmail" className="col-sm-3 col-form-label">User Name</label>
                                            <div className="col-sm-9">
                                                <label for="staticEmail" className="col-form-label col-form-label-val">{firstname} {lastname}</label>
                                            </div> */}
                                        </div>
                                        {/* <div className="form-group row">
                                          
                                            <label for="staticEmail" className="col-sm-3 col-form-label">Prev Class</label>
                                            <div className="col-sm-9">
                                                <label for="staticEmail" className="col-form-label col-form-label-val">{ClassificationName}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="staticEmail" className="col-sm-3 col-form-label">Updated Class</label>
                                            <div className="col-sm-9">
                                                <label for="staticEmail" className="col-form-label col-form-label-val">45 %</label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="staticEmail" className="col-sm-3 col-form-label">Modified On</label>
                                            <div className="col-sm-9">
                                                <label for="staticEmail" className="col-form-label col-form-label-val">{moment(date_modified).format('DD/MM/YYYY, h:mm:ss a') }</label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="staticEmail" className="col-sm-3 col-form-label">Status </label>
                                            <div className="col-sm-9">
                                                <label for="staticEmail" className=" col-form-label col-form-label-val">Altered</label>
                                            </div>
                                        </div> */}

                                    </div>

                                )}

                            </div>

                        </div>


                    </div>
                </div>}

            </div>
        </div>


    )
}