import './modelsList.scss'
import {history} from '../../../../helpers'
export const ModelsList = ({ modelData = [],fromType='' }) => {

    
    return (

        <div className="row">
            {modelData.map(({ image, modelName }, i) =>
                <div className="col-md-2  col-sm-3 p-0  modal-card" key={i}>
                    <div className="card " onClick={()=> history.push(`/models/${fromType}/classes`)}>
                        <div className="card-body ">
                            <div className='ratio ratio-1x1'>
                            <img className='card-img ' id="modal-card-img"  src={require(`../../../../assets/images/${image}`)} />
                                </div>
                          

                        </div>
                    </div>
                    <h4 className='modal-text'>{modelName}</h4>

                </div>
            )}

        </div>
    )




} 