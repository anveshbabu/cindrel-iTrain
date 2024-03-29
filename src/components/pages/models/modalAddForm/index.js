import './modalAddForm.scss';
import { useEffect, useRef, useState } from 'react'
import { NormalInput, NormalDropDown, NormalButton, LazyLoadImage } from '../../../common'
import defaultLogo from '../../../../assets/images/logo-placeholder.png';
import SimpleReactValidator from 'simple-react-validator';
import { createModelList, updateModelList } from '../../../../redux/actions/model';
import { isEmpty, getBase64FromUrl } from '../../../.././services/helperFunctions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export const ModalAddForm = ({ className = '', toggle, onSaveSuccess, modelEditData, logoUrl, modalAddFormOpenType }) => {
    const [modalLogoOption, setModalLogoOption] = useState([])
    const [isFormLoader, setIsFormLoader] = useState(false)
    const logoInput = useRef();
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [moduleObj, setModuleObj] = useState({
        model_name: "",
        user_id: 2,
        logo: defaultLogo,
        IsAugumented :0

    });

    useEffect(() => {
        console.log('modalAddFormOpenType--->', modalAddFormOpenType)
        if (!isEmpty(modelEditData) && !modalAddFormOpenType) {
            let { Logo = '', ModelId = '', ModelName = '', UserId = '' } = modelEditData
            setModuleObj({
                model_id: ModelId,
                model_name: ModelName,
                user_id: UserId,
                logo: (logoUrl + Logo)

            });
            handleLogoTxtHandle()
        } else {
            setModuleObj({
                model_name: "",
                user_id: 2,
                logo: defaultLogo,
                IsAugumented :0

            })
        }

        handleLogoTxtHandle();

        return () => {
            setModuleObj({
                model_name: "",
                user_id: 2,
                logo: defaultLogo,
                IsAugumented :0

            })
        }
    }, []);


    useEffect(() => {
        handleLogoTxtHandle()
    }, [moduleObj]);

    const handleLogoTxtHandle = () => {
        if (moduleObj.logo === defaultLogo) {
            setModalLogoOption([])
        } else {
            setModalLogoOption(['Change Logo', 'Remove Logo'])
        }
    }


    const readSingleFile = (e) => {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var logo = e.target.result;
            console.log('----------->', logo)
            setModuleObj({ ...moduleObj, logo })
        };
        reader.readAsDataURL(file);
    }


    const handleLogoSelectChange = (value) => {
        console.log(value)
        if (!!value) {
            if (['Upload Photo', 'Change Logo'].includes(value)) {
                logoInput.current.click()
            } else if (value === 'Remove Logo') {
                setModuleObj({ ...moduleObj, logo: defaultLogo })
            }
        }


    }


    const handleFormSubmit = () => {
        const formValid = simpleValidator.current.allValid();

        if (formValid) {
            let reqObj = { ...moduleObj }
            setIsFormLoader(true);
            console.log('--------------')
            if (reqObj?.logo === defaultLogo) {
                reqObj.logo = ''
            }
            if (reqObj?.logo?.includes('base64')) {
                reqObj.logo = reqObj.logo.split(';base64,')[1];
            } else {
                reqObj.logo = getBase64FromUrl(reqObj?.logo);
                console.log(reqObj.logo, '-========')

                // reqObj.logo =reqObj?.logo.split(';base64,')[1];
            }
            console.log('!modalAddFormOpenType ------------>', !modalAddFormOpenType)
            let apiCall = !modalAddFormOpenType ? updateModelList(reqObj) : createModelList(reqObj);
            apiCall.then(({ results, count, logo_url }) => {
                setIsFormLoader(false)
                if (results.length > 0) {
                    onSaveSuccess(results);
                    setModuleObj({
                        model_name: "",
                        user_id: 2,
                        logo: defaultLogo,
                        IsAugumented :0

                    })
                }

            }).catch((error) => {
                console.log('--------------')
                setIsFormLoader(false)
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    }

    const handleFormChange = (event) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
       
        const name = target.name;
        if(name ==='IsAugumented'){
            value =value?1:0
        }
        setModuleObj({ ...moduleObj, [name]: value })
    }


    const handleCloseModal = () => {
        setModuleObj({
            model_name: "",
            user_id: 2,
            logo: defaultLogo,
            IsAugumented :0
        });
        toggle()
    }
    return (

        <div className="row">
            <div className='col-md-12 col-sm-12'>
                <div className='row'>
                    <div className='col-md-12'>
                        <NormalInput label="Model Name" value={moduleObj?.model_name} name={'model_name'} onChange={handleFormChange} errorMessage={simpleValidator.current.message("Model Name", moduleObj.model_name, "required")} />
                    </div>
                    {/* <div className='col-md-12'> */}
                    <div className="col-md-5  col-sm-3 p-0  modal-card upload-modal-img">
                        <div className="card add-new">
                            <div className="card-body ">
                                <div className="card-img-overlay" onClick={() => modalLogoOption.length === 0 ? handleLogoSelectChange('Upload Photo') : ""}>
                                    {modalLogoOption.length > 0 && <NormalDropDown options={modalLogoOption} onSelect={handleLogoSelectChange} label={<label><i className="fa-solid fa-arrow-up-from-bracket"></i> Change Model Logo</label>} />}
                                    {modalLogoOption.length === 0 && <label><i className="fa-solid fa-arrow-up-from-bracket"></i> Add Model Logo</label>}

                                </div>
                                <div className='ratio ratio-1x1'>
                                    {!!modalAddFormOpenType && <img className='card-img ' id="modal-card-img" src={moduleObj.logo} />}
                                    {!modalAddFormOpenType && <LazyLoadImage defaultImage={defaultLogo} alt={moduleObj?.model_name} className='card-img ' id="modal-card-img" src={moduleObj.logo} />}
                                </div>


                            </div>
                        </div>

                    </div>
                    <div className='col-md-12'>
                        <FormControlLabel
                            className='module-type-change'
                            control={
                                <Checkbox   checked={moduleObj?.IsAugumented} name="IsAugumented" onChange={handleFormChange} />
                            }
                            label="Augmentation"
                        />
                    </div>
                    <div className='col-md-12 text-end'>
                        <NormalButton disabled={isFormLoader} label="Cancel" color="error" onClick={handleCloseModal} className="me-2 btn-secondary" />
                        <NormalButton isLoader={isFormLoader} label={`${!modalAddFormOpenType ? 'Update' : "Add"} Modal`} onClick={handleFormSubmit} />

                    </div>
                </div>
            </div>
            <input type="file" ref={logoInput} onChange={readSingleFile} className='d-none' id="file-input" />
            {/* </div> */}

        </div>
    )


} 