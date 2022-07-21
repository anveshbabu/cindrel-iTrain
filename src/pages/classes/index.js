

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalTabs } from '../../components/common';
import { AllClasssList, InputMonitor } from '../../components/pages';
// import { ModelsList, ModelIformation, ModalAddForm } from '../../../components/pages';
// import { getModelList } from '../../../redux/actions/model';
import { getAllClasssList } from '../../redux/actions/classes'
import { getStorage, removeDuplicateArray} from '../../services/helperFunctions'
import { EXIST_LOCAL_STORAGE } from '../../services/constants'
import './classes.scss'

export const ModuleClasses = () => {
  const params = useParams();
  const [classsList, setclasssList] = useState([])
  const [classsOverAllCount, setClasssOverAllCount] = useState(0);
  const [isClassLoader, setIsClassLoader] = useState(false)
  const [activeclassId, setActiveclassId] = useState('')
  const [userDetail, setUserDetail] = useState(null)
  const [selectedClassObj, setSelectedClassObj] = useState('')


  useEffect(() => {
    let userDetail = getStorage(EXIST_LOCAL_STORAGE.USER_DETAIL)
    setUserDetail(JSON.parse(userDetail));
    console.log('userDetail------->',userDetail)
    let reqObj = {
      model_id:  params?.modelId,
    }
    setIsClassLoader(true)
    getAllClasssList(reqObj).then(({ count, results }) => {
      setIsClassLoader(false)
      if (results.length > 0) {
        let { ClassId } = results[0];
        setSelectedClassObj(results[0])
        setActiveclassId(ClassId)
        setclasssList(results);
        setClasssOverAllCount(count)
      }
    }).catch((error) => {
      setIsClassLoader(false)
    })

  }, []);

  const handleSaveClassSuccess = (data) => {
    setclasssList(removeDuplicateArray( [...classsList, ...data], 'ClassId'));
    setClasssOverAllCount(classsOverAllCount + 1)
  }

  const handleModalDelete = (classDelteIndex) => {

    if (classDelteIndex != -1) {
      classsList.splice(classDelteIndex, 1);
      setclasssList([...classsList]);
      setClasssOverAllCount(classsOverAllCount - 1)
    } else {

    }
  }

  const handleSlectedClass=(d)=>{
    setSelectedClassObj(d)
  }
  // [<i className="fa-solid fa-atom me-2 icon-tab-header" title="Dashboard"></i>, 'Input Monitor', 'Train Monitor', 'Trend Analysis', 'Version Management']
  return (
    <div className='classes-page'>
      <NormalTabs className='header-tab mb-0' data={[<i className="fa-solid fa-atom me-2 icon-tab-header" title="Dashboard"></i>, 'Input Monitor']} />
      <div className='row'>
        <div className='col-md-2 ps-0'>
          <AllClasssList userDetail={userDetail} sendSelectedClassData={handleSlectedClass} onDeleteSucess={handleModalDelete} onlodeActiveclassId={activeclassId} isClassLoader={isClassLoader} classsList={classsList} onSaveSuccess={handleSaveClassSuccess} classsOverAllCount={classsOverAllCount} />
        </div>
        <div className='col-md-10 ps-0'>
          <InputMonitor userDetail={userDetail}  selectedClassObj={selectedClassObj}/>
        </div>
      </div>


    </div>
  );




}
