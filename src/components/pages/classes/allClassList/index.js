

import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import { NormalButton, NormalInput, NormalAlert } from '../../../common'
import './allClassList.scss';
import SimpleReactValidator from 'simple-react-validator';
import { createClass, deleteclass, updateClass } from '../../../../redux/actions/classes'

export const AllClasssList = ({ userDetail = {}, onDeleteSucess, classsList = [], sendSelectedClassData, onlodeActiveclassId, classsOverAllCount = 0, onSaveSuccess = '', isClassLoader = false }) => {
    const params = useParams();
    const [isFormLoader, setIsFormLoader] = useState(false)
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [activeClassId, setActiveClassId] = useState()
    const [isAddClassInput, setIsAddClassInput] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [classDelteIndex, setClassDelteIndex] = useState(-1)

    const [classObject, setClassObject] = useState({
        class_name: "",
        user_id: userDetail?.UserId,
        model_id: params?.modelId
    });


    useEffect(() => {
        setActiveClassId(onlodeActiveclassId)
    }, [onlodeActiveclassId])


    const handleShowClassDetail = (id,i) => {
        setActiveClassId(id);
        sendSelectedClassData(classsList[i])

    }

    const handleAddClassInput = () => {
        setIsAddClassInput(!isAddClassInput)
    }
    const handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setClassObject({ ...classObject, [name]: value })
    }


    const handleCreateClasss = () => {
        const formValid = simpleValidator.current.allValid();
        if (formValid) {
            simpleValidator.current.hideMessages();
            setIsFormLoader(true);
            let reqObj = {
                ...classObject,
                user_id: userDetail?.UserId,
            }
            let apiCall = reqObj.hasOwnProperty('class_id') ? updateClass(reqObj) : createClass(reqObj)
            apiCall.then(({ results, count, logo_url }) => {
                setIsFormLoader(false)
                if (results.length > 0) {
                    // onSaveSuccess(results);
                    setClassObject({
                        class_name: "",
                        user_id: userDetail?.UserId,
                        model_id: params?.modelId
                    });
                    onSaveSuccess(results)
                }

            }).catch((error) => {
                setIsFormLoader(false)
            });

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    }



    const handleDeleteModal = (value) => {
        if (value && classDelteIndex !== -1) {
            let { ClassId } = classsList[classDelteIndex];
            let reqObj = {
                class_id: ClassId
            };
            setIsFormLoader(true)
            deleteclass(reqObj).then((data) => {
                setIsFormLoader(false)
                setIsDeleteModal(false)
                onDeleteSucess(classDelteIndex)

            }).catch((error) => {
                setIsFormLoader(false)
            })
        } else {
            handleDeleteOpenModal()
        }
    }

    const handleDeleteOpenModal = (index = -1) => {
        console.log(index)
        setClassDelteIndex(index)
        setIsDeleteModal(!isDeleteModal)
    }

    const handleEditClass = (i) => {
        let { ClassName, ClassId } = classsList[i];
        setClassObject({
            class_id: ClassId,
            class_name: ClassName,
            model_id: params?.modelId,
            user_id: userDetail?.UserId,
        });
        setIsAddClassInput(true)
    }




    return (
        <div className="card allClasssList-card shadow border-0">

            <div className="card-header">
                <a className='add-text' onClick={handleAddClassInput}>Add New</a>
                {isAddClassInput && <div className='row mt-3'>
                    <div className='col-md-12'>
                        <NormalInput size="small" label="Class Name" variant="filled"
                            value={classObject?.class_name} name={'class_name'} onChange={handleFormChange}
                            errorMessage={simpleValidator.current.message("Class Name", classObject?.class_name, "required")} />
                    </div>
                    <div className='col-md-12'>
                        <NormalButton size="small" isLoader={isFormLoader} label={classObject.hasOwnProperty('class_id') ? "Update" : "Submit"} onClick={handleCreateClasss} />
                    </div>
                </div>}
            </div>
            <div className="card-body">

                {!isClassLoader && <ul className="list-group list-group-flush">

                    <li className="list-group-item"><label className='badge-class'></label>  All Classes
                        <span className="float-end">{classsOverAllCount}</span>
                    </li>
                    {classsList.map(({ ClassName, ImageCount, balanceLevel = null, ClassId }, i) =>
                        <li className={`list-group-item ${ClassId === activeClassId ? 'active' : ""}`} key={ClassId} onClick={() => handleShowClassDetail(ClassId,i)}><label className='badge-class' style={{ backgroundColor: balanceLevel !== 'Equal' ? "#00CF46" : "#CFA400" }}></label>  {ClassName}
                            <span className="float-end">{ImageCount}</span>
                            {ClassId === activeClassId && <div className='row'>
                                <div className='col-md-12'>
                                    <div className='px-3 py-2 pe-0 sub-open-menu'>
                                        <label>Balance Level</label>
                                        <label className='float-end'>Equal</label>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='px-3 py-2 pe-0 sub-open-menu text-end'>
                                        <NormalButton materialUi={false} className='btn btn-sm' variant='text' onClick={() => handleEditClass(i)} label={<i class="fa-solid fa-pen  text-success" title='Edit'></i>} />
                                        <NormalButton materialUi={false} className='btn btn-sm' variant='text' onClick={() => handleDeleteOpenModal(i)} label={<i className="fa-solid fa-trash text-danger" title='Delete'></i>} />
                                        <NormalButton materialUi={false} className='btn btn-sm' variant='text' label={<i className="fa-solid fa-arrow-down text-download" title='Download'></i>} />


                                    </div>
                                </div>
                            </div>}
                        </li>
                    )}
                </ul>}


                {isClassLoader && <ul className="list-group list-group-flush placeholder-glow" >
                    <li className={`list-group-item`}>
                        <span class="placeholder col-12 bg-primary"></span>
                        <span class="placeholder col-12 bg-secondary"></span>
                        <span class="placeholder col-12 bg-success"></span>
                        <span class="placeholder col-12 bg-danger"></span>
                        <span class="placeholder col-12 bg-warning"></span>
                        <span class="placeholder col-12 bg-info"></span>
                        <span class="placeholder col-12 bg-light"></span>
                        <span class="placeholder col-12 bg-dark"></span>
                    </li>
                </ul>}
            </div>
            <NormalAlert isLoader={isFormLoader} isShow={isDeleteModal} toggle={() => handleDeleteOpenModal(-1)} onClick={handleDeleteModal} title="Are You Sure want Delete this Model?" />
        </div>
    );




}
