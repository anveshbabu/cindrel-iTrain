import './modelsList.scss'
import { history } from '../../../../helpers';
import { LazyLoadImage } from '../../../common';
import { letterAvatar } from '../../../../services/helperFunctions'
export const ModelsList = ({ modelData = [], fromType = '', modellogoUrl = '', isModelLoader,onDetailView='' }) => {


    return (

        <div className="row">
            {!isModelLoader && modelData.map(({ Logo, ModelName }, i) =>
                <div className="col-md-2  col-sm-3 p-0  modal-card" key={i}>
                    <div className="card" onClick={()=>onDetailView(modelData[i])} onDoubleClick={() => history.push(`/models/${fromType}/classes`)}>
                        <div className="card-body ">
                            <div className='ratio ratio-1x1'>
                                <LazyLoadImage defaultImage={letterAvatar(ModelName, 500, false)} alt={ModelName} className='card-img ' id="modal-card-img" src={`${!!Logo ? modellogoUrl + Logo : ""}`} />
                            </div>


                        </div>
                    </div>
                    <h4 className='modal-text'>{ModelName}</h4>

                </div>
            )}
            {isModelLoader && [1, 2, 3, 4, 5].map((data) =>

                <div className="col-md-2  col-sm-3 p-0  modal-placeholder-card" key={data}>
                    <div className="card placeholder-glow" aria-hidden="true">
                        <div className="card-body placeholder ">
                            <div className='ratio ratio-1x1'>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )




} 