

import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { NormalInput, Normalselect, NormalButton } from '../../../common';
import { USER_TYPE } from '../../../../services/constants';
import { createUser } from '../../../../redux/actions/user';
import './userForm.scss'

export const UsersFrom = ({ toggle }) => {
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [isFormLoader, setIsFormLoader] = useState(false)
    const [userFormObj, setUserFormOb] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        emailid: "",
        mobile: "",
        user_type: null,
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUserFormOb({
            ...userFormObj,
            [name]: value
        })


    }


    const handleFormSubmit = () => {
        const formValid = simpleValidator.current.allValid();

        if (formValid) {

            try {
                setIsFormLoader(true)

                createUser(userFormObj).then(({ results, count, logo_url }) => {
                    setIsFormLoader(false)

                    handleCloseModal();
                }).catch((error) => {
                    setIsFormLoader(false)
                });

            } catch (e) {
                setIsFormLoader(false)
            }

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    }

    const handleCloseModal = () => {
        toggle();
        setUserFormOb({
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            emailid: "",
            mobile: "",
            user_type: null,
        })
    }

    return (
        <div className='row'>


            <div className='col-md-12'>
                <div class="row profile-img">
                    <div class="col-md-12 text-center">
                        {/* <div class="circle">
                            <img class="profile-pic" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/>
                            <div class="p-image">
                            <i class="fa fa-camera upload-button"></i>
                            <input class="file-upload" type="file" accept="image/*" />
                        </div>
                        </div> */}
                        <div class="profile-container">
                            <img class="profile-pic" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                       
                            <div class="bottom-right"> <i class="fa fa-camera upload-button"></i>
                            <input class="file-upload" type="file" accept="image/*" /></div>
                        </div>

                    </div>
                </div>

            </div>

            <div className='col-md-6 mt-3'>
                <NormalInput label='First Name' value={userFormObj?.first_name} name='first_name' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("First Name", userFormObj?.first_name, "required")}
                />
            </div>
            <div className='col-md-6 mt-3'>
                <NormalInput label='Last Name' value={userFormObj?.last_name} name='last_name' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Last Name", userFormObj?.last_name, "required")}
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='DOB' value={userFormObj?.dob} name='dob' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("dob", userFormObj?.dob, "required")}
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='Email' value={userFormObj?.emailid} name='emailid' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Email", userFormObj?.emailid, "required|email")}
                />
            </div>

            <div className='col-md-6'>
                <NormalInput label='Phone' value={userFormObj?.mobile} name='mobile' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Phone", userFormObj?.mobile, "required|phone")}
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='Second Phone' value={userFormObj?.smobile} name='mobile' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("SecondPhone", userFormObj?.smobile, "required|phone")}
                />
            </div>
            <div className='col-md-12'>
                <NormalInput label='Address' value={userFormObj?.address} name='address' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Address", userFormObj?.address, "required")}
                />
            </div>
            <div className='col-md-6'>
                <Normalselect label='Country' value={userFormObj?.country} name='country' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Country", userFormObj?.country, "required")}
                />
            </div>
            <div className='col-md-6'>
                <Normalselect label='State' value={userFormObj?.state} name='state' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("state", userFormObj?.state, "required")}
                />
            </div>
            <div className='col-md-6'>
                <Normalselect label='City' value={userFormObj?.city} name='city' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("city", userFormObj?.city, "required")}
                />
            </div>
            <div className='col-md-6'>
                <Normalselect label='User Type' options={USER_TYPE} value={userFormObj?.user_type} name='user_type' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("User Type", userFormObj?.user_type, "required")}
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='User name' value={userFormObj?.username} name='username' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("User Name", userFormObj?.username, "required")}
                />
            </div>
            <div className='col-md-6'>
                <NormalInput type='password' label='Password' value={userFormObj?.password} name='password' onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message("Password", userFormObj?.password, "required")}
                />
            </div>
            <div className='col-md-12'>
                <NormalButton label='Cancel' onClick={handleCloseModal} disabled={isFormLoader} color="error" className='me-2' />
                <NormalButton label='Save' isLoader={isFormLoader} onClick={handleFormSubmit} />
            </div>
        </div>
    );




}
