

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalBreadcrumb, NormalButton, NormalModal,NoDataWrape } from '../../../components/common';
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
  const [modalAddFormOpenType, setModalAddFormOpenType] = useState('')

  useEffect(() => {
    let reqObj = {
      user_id: 2,
      // user_type: 1,
    }
    handleGetModuleDate(reqObj)



  }, []);

  const handleModalAdd = () => {
    setIsAddModal(!isAddModal)
    setModalAddFormOpenType('Add')

  }

  const handleModalEditOpen = () => {
    setIsAddModal(true);
    setModalAddFormOpenType('')
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

  const handleModalDelete = (data) => {
    let index = modelsList.findIndex(({ model_id }) => model_id === data.model_id);
    if(index !=-1){
      modelsList.splice(index, 1);
      setModelsList([...modelsList]);
      setModelsCount(modelsCount-1);
    }else {

    }
  }


  return (
    <div className='modal-page'>

      <NormalBreadcrumb className="mb-0" label={params?.fromType} rightSideBtn={params?.fromType === 'sandbox'} buttonLabel="Add new" onBtnClick={handleModalAdd} />

      <div className='card light-blue row rounded-0 border-0'>
        <div className={`card-body  ${!isEmpty(modalDetailObj) && 'modal-body-scroll' } `}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h4 className="sub-page-titel mb-4">{params?.fromType === 'sandbox'?modelsCount:0} Models</h4>
            </div>

            <div className="col-md-12 col-sm-12 mb-5 px-5">
          {params?.fromType === 'sandbox' ? <ModelsList onDetailView={handleGetDetailView} isModelLoader={isModelLoader} modellogoUrl={modellogoUrl} modelData={modelsList} fromType={params?.fromType} />:<NoDataWrape msgText="No Module found"/>}
           
           
            </div>
          </div>



        </div>


      </div>

      {!isEmpty(modalDetailObj) && params?.fromType === 'sandbox'  && <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <ModelIformation onDeleteSucess={handleModalDelete} logoUrl={modellogoUrl} modelData={{ ...modalDetailObj }} onEditForm={handleModalEditOpen} />
        </div>

      </div>}
      <NormalModal backdrop={'static'} toggle={() => setIsAddModal(!isAddModal)} className='modal-dialog-centered modal-md' title="Add New Model" isShow={isAddModal}>
        {isAddModal && <ModalAddForm modalAddFormOpenType={modalAddFormOpenType} logoUrl={modellogoUrl} modelEditData={modalDetailObj} toggle={() => setIsAddModal(!isAddModal)} onSaveSuccess={handleSaveModelSuccess} />}
      </NormalModal>
    </div>
  );




}
