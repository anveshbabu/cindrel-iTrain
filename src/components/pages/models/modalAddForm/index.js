import './modalAddForm.scss';
import { NormalInput, NormalDropDown,NormalButton } from '../../../common'

export const ModalAddForm = ({ className = '' }) => {
    const modalUpload = ['Upload Photo', 'Remove Photo']

    return (

        <div className="row">
            <div className='col-md-12 col-sm-12'>
                <div className='row'>
                    <div className='col-md-12'>
                        <NormalInput label="Model Name" />

                    </div>
                    {/* <div className='col-md-12'> */}
                    <div className="col-md-5  col-sm-3 p-0  modal-card upload-modal-img">
                        <div className="card add-new">
                            <div className="card-body ">
                                <div class="card-img-overlay">
                                    {/* <h5 class="upload-icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></h5> */}
                                    {/* */}
                                    <NormalDropDown options={modalUpload} label={<label><i class="fa-solid fa-arrow-up-from-bracket"></i> Add Model Logo</label>} />
                                </div>
                                <div className='ratio ratio-1x1'>
                                    <img className='card-img ' id="modal-card-img" src={require(`../../../../assets/images/logo-placeholder.png`)} />
                                </div>


                            </div>
                        </div>
                        {/* <h4 className='modal-text'>{modelName}</h4> */}

                    </div>
                    <div className='col-md-12 text-end'>
                        <NormalButton label="Cancel" color="secondary"  className="me-2 btn-secondary"/>
                        <NormalButton label="Add Modal" />

                    </div>
                </div>
            </div>

            {/* </div> */}

        </div>
    )


} 