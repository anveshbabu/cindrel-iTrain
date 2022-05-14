

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalBreadcrumb, NormalButton, NormalModal } from '../../../components/common';
import { ModelsList, ModelIformation, ModalAddForm } from '../../../components/pages';
import { getModelList } from '../../../redux/actions/model';
import { isEmpty, removeDuplicateArray } from '../../../services/helperFunctions'
import './models.scss'

export const ProductionModels = () => {
  const params = useParams();

  const [modelsList, setModelsList] = useState([])
  const [modellogoUrl, setModellogoUrl] = useState('')
  const [modelsCount, setModelsCount] = useState(0)
  const [isAddModal, setIsAddModal] = useState(false)
  const [isModelLoader, setIsModelLoader] = useState(false)
  const [modalDetailObj, setModalDetailObj] = useState('')

  useEffect(() => {
    let reqObj = {
      user_id: 2,
      user_type: 1,
    }
    handleGetModuleDate(reqObj)



  }, []);

  const handleModalAdd = () => {
    setIsAddModal(!isAddModal)
    setModalDetailObj('')
 
  }

  const handleModalEditOpen=()=>{
    setIsAddModal(true)
  }

  const handleSaveModelSuccess = (data) => {
    setModelsList(removeDuplicateArray([...modelsList, ...data], 'ModelId'));
    setIsAddModal(!isAddModal)
  }

  const handleGetModuleDate = (reqObj) => {
    setIsModelLoader(true)
    getModelList(reqObj).then(({ results, count, logo_url }) => {
      setIsModelLoader(false)
      if (results.length > 0) {
        setModelsList(results);
        setModelsCount(count);
        setModellogoUrl(logo_url)
      }
    }).catch((error) => {
      setIsModelLoader(false)
    })

  }

  const handleGetDetailView = (data) => {
    setModalDetailObj(data)
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
              <ModelsList onDetailView={handleGetDetailView} isModelLoader={isModelLoader} modellogoUrl={modellogoUrl} modelData={modelsList} fromType={params?.fromType} />
            </div>
          </div>



        </div>


      </div>

      {!isEmpty(modalDetailObj) && <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <ModelIformation logoUrl={modellogoUrl} modelData={{...modalDetailObj}} onEditForm={handleModalEditOpen} />
        </div>

      </div>}
      <NormalModal backdrop={'static'} toggle={()=> setIsAddModal(!isAddModal)} className='modal-dialog-centered modal-md' title="Add New Model" isShow={isAddModal}>
        {isAddModal && <ModalAddForm logoUrl={modellogoUrl} modelEditData={modalDetailObj} toggle={()=> setIsAddModal(!isAddModal)} onSaveSuccess={handleSaveModelSuccess} />}
      </NormalModal>
    </div>
  );




}
