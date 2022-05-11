

import { useEffect, useState } from 'react'
import TablePagination from '@mui/material/TablePagination';


import { NormalButton, NormalModal, AppFilter } from '../../../../common'
import { ImageDetails } from './imageDetails'
import countriesData from '../../../../../assets/data/countries.json';

import './inputMonitor.scss'

export const InputMonitor = () => {
    const filterShowData = countriesData.map(({ name, code }) => ({ value: code, label: name }))

    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isFilterModal, setisFilterModal] = useState(false);
    const [filterData, setFilterDate] = useState([{
        title: "User",
        filterType: "checkBox",
        data: filterShowData
    }, {
        title: "Tags",
        filterType: "checkBox",
        data: filterShowData
    }, , {
        title: "Date",
        filterType: "date",
        data: filterShowData
    }])



    const handleDetailModal = () => {
        setIsDetailModal(!isDetailModal)
    }
    const handleFilterModal = () => {
        setisFilterModal(!isFilterModal)
    }


    return (
        <div className="inputMonitor-continer border-0">
            <div className='row'>
                <div className='col-md-12 col-sm-12 mb-5'>
                    <div className="card mt-2 card-header-title">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-6 col-sm-6'>
                                    <h4 className='title'>Basic Class </h4>
                                </div>
                                <div className='col-md-6 col-sm-6 text-end'>
                                    <NormalButton label={<span><i className="fa-solid fa-arrow-up-from-bracket"></i> Upload</span>} variant="text" className='me-3' />
                                    <NormalButton label='Train' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 col-sm-12'>
                    <div className="card mt-2 over-all-image-list">
                        <div className="card-header">
                            <div className='row'>
                                <div className='col-md-6 col-sm-6'>
                                    <h4 className='card-title'><i className="fa-solid fa-circle-info"></i> Overall 760 Images </h4>
                                </div>
                                <div className='col-md-6 col-sm-6 text-end d-flex justify-content-end align-items-center'>
                                    <TablePagination
                                        className='image-overView-component-pagination'
                                        component="div"
                                        count={100}
                                        page={2}
                                        onPageChange={() => { }}
                                        rowsPerPage={10}
                                        onRowsPerPageChange={() => { }}
                                    />
                                    <NormalButton materialUi={false} className='btn' variant='text' label={<i className="fa-solid fa-arrow-rotate-right refresh-icon" title='Refresh'></i>} />
                                    <NormalButton materialUi={false} className='btn' onClick={handleFilterModal} variant='text' label={<i className="fa-solid fa-filter refresh-icon" title='Filter'></i>} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className='row gx-2'>
                                <div className='col-md-3 col-sm-6' onClick={handleDetailModal}>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37033a95e0230008f64eb2/2020-Aston-Martin-Rapide-E/960x0.jpg?cropX1=0&cropX2=3000&cropY1=157&cropY2=1844" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37038495e0230008f64ec1/2020-Cadillac-CT4-V/960x0.jpg?cropX1=569&cropX2=5130&cropY1=347&cropY2=2912" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d3703b3090f4300070d570d/2020-Cadillac-CT5/960x0.jpg?cropX1=288&cropX2=5130&cropY1=538&cropY2=3261" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37041095e0230008f64ed8/2020-Electra-Meccanica-Solo/960x0.jpg?cropX1=24&cropX2=2031&cropY1=204&cropY2=1333" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37046395e0230008f64edf/2020-Ford-Mustang-Shelby-GT500/960x0.jpg?cropX1=299&cropX2=2851&cropY1=201&cropY2=1638" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37049295e0230008f64eeb/2020-Kia-Soul-EV/960x0.jpg?cropX1=547&cropX2=4924&cropY1=592&cropY2=3055" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d35eb15f1176b0008974b5c/2020-McLaren-GT/960x0.jpg?cropX1=512&cropX2=5312&cropY1=602&cropY2=3303" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d3704d0f1176b00089761ae/2020-Mini-Cooper-SE/960x0.jpg?cropX1=474&cropX2=5315&cropY1=297&cropY2=3020" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d3704fb090f4300070d573d/2020-Polestar-1/960x0.jpg?cropX1=48&cropX2=2848&cropY1=361&cropY2=1937" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d37051e95e0230008f64f17/2020-Polestar-2/960x0.jpg?cropX1=678&cropX2=3478&cropY1=1045&cropY2=2620" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <img src="https://specials-images.forbesimg.com/imageserve/5d370543f1176b00089761ce/2020-Porsche-Taycan/960x0.jpg?cropX1=329&cropX2=2970&cropY1=337&cropY2=1822" className="img-thumbnail img-fluid class-uploded-images" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <NormalModal toggle={handleDetailModal} className='modal-dialog-right modal-xl' isShow={isDetailModal}>
                <ImageDetails onClose={handleDetailModal} />
            </NormalModal>
            <NormalModal toggle={handleFilterModal} className='modal-dialog-right modal-xl filter-modal' isShow={isFilterModal}>
                <AppFilter className='bg-transparent border-0' filterData={filterData} toggle={handleFilterModal} />
            </NormalModal>
        </div>
    );




}
