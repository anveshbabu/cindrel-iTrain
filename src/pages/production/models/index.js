

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalBreadcrumb, NormalButton, NormalModal } from '../../../components/common';
import { ModelsList, ModelIformation, ModalAddForm } from '../../../components/pages';
import { getModelList } from '../../../redux/actions/model';
import './models.scss'

export const ProductionModels = () => {
  const params = useParams();

  const [modelsList, setModelsList] = useState([])
  const [modelsCount, setModelsCount] = useState(0)
  const [isAddModal, setIsAddModal] = useState(false)

  useEffect(() => {
    getModelList().then(({ success, data: { modelsList, count } }) => {
      if (success) {
        setModelsList(modelsList);
        setModelsCount(count)
      }
    }).catch((error) => {

    })

  }, []);

  const handleModalAdd = () => {
    console.log('---')
    setIsAddModal(!isAddModal)
  }



  return (
    <div className='modal-page'>

      <NormalBreadcrumb className="mb-0" label={params?.fromType} rightSideBtn={true} buttonLabel="Add new" onBtnClick={handleModalAdd} />

      <div className='card light-blue row rounded-0 border-0'>
        <div className='card-body'>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h4 className="sub-page-titel mb-4">{modelsCount} Models</h4>
            </div>
       
            <div className="col-md-12 col-sm-12 mb-5 px-5">
              <ModelsList modelData={modelsList} fromType={params?.fromType} />
            </div>
          </div>



        </div>


      </div>

      <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <ModelIformation />
        </div>

      </div>
      <NormalModal toggle={handleModalAdd} className='modal-dialog-centered modal-md' title="Add New Model" isShow={isAddModal}>
        <ModalAddForm />
      </NormalModal>
    </div>
  );




}
