
import './overAllCount.scss'


export const OverAllCountCard = ({title='',OverAllCount=0,icon='', className='primary'}) => {


    return (
        <div className={`card border-top-0 border-end-0 border-bottom-0 border border-3 shadow   over-all-count-card border-${className}`}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <div className={`small fw-bold text-${className} mb-1`}>{title}</div>
                        <div className="h5 text-count">{OverAllCount}</div>
                        {/* <div className="text-xs fw-bold text-success d-inline-flex align-items-center">
                            12%
                        </div> */}
                    </div>
                    <div className="ms-2">
                        <h2><i class={`fa-solid text-${className} ${icon}`}></i></h2>
                    </div>
                </div>
            </div>
        </div>
    )

}