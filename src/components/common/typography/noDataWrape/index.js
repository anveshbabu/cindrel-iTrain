import './noDataWrape.scss';
import {NormalButton} from '../../index'
import nodateImg from '../../../../assets/images/noData.svg'
export const NoDataWrape = (props) => {

    let {
        msgText = '',
        btnLabel=''
    } = props;

    return (
        <div className='nodata-wrap text-center'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <img src={nodateImg} />
                </div>
                <div className='col-12 mb-4'>
                    <span className='msg-text'>{msgText}</span>
                </div>
                <div className='col-12'>
                <NormalButton label={btnLabel} />
                </div>
            </div>



        </div>
    )
}

