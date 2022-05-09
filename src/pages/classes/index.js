

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalTabs } from '../../components/common';
import { AllClasssList,InputMonitor } from '../../components/pages';
// import { ModelsList, ModelIformation, ModalAddForm } from '../../../components/pages';
// import { getModelList } from '../../../redux/actions/model';
import './classes.scss'

export const ModuleClasses = () => {
  const params = useParams();



  return (
    <div className='classes-page'>
      <NormalTabs className='header-tab mb-0' data={[<i className="fa-solid fa-atom me-2 icon-tab-header" title="Dashboard"></i>, 'Input Monitor', 'Train Monitor', 'Trend Analysis', 'Version Management']} />
      <div className='row'>
        <div className='col-md-2 ps-0'>
          <AllClasssList />
        </div>
        <div className='col-md-10 ps-0'>
          <InputMonitor />
        </div>
      </div>


    </div>
  );




}
