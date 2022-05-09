

import { useEffect, useState } from 'react'
import { NormalButton } from '../../../../../common'

import './imageDetails.scss'

export const ImageDetails = ({ onClose = '' }) => {


    return (
        <div className="inputMonitor-continer border-0">

            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='image-text-over-lap'>
                        <NormalButton materialUi={false} className='btn btn-sm top-right close-btn-icon' onClick={onClose} variant='text' label={<i class="fa-solid fa-xmark" title='Close'></i>} />
                        <img src="https://specials-images.forbesimg.com/imageserve/5d370543f1176b00089761ce/2020-Porsche-Taycan/960x0.jpg?cropX1=329&cropX2=2970&cropY1=337&cropY2=1822" className="img-thumbnail img-fluid class-uploded-images" />
                    </div>
                </div>
                <div className='col-md-12 col-sm-12'>
                    <hr />
                </div>
            </div>
            <div className='row gx-2'>
                <div className='col-md-6 col-sm-12' >
                    <img src="https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37033a95e0230008f64eb2/2020-Aston-Martin-Rapide-E/960x0.jpg?cropX1=0&cropX2=3000&cropY1=157&cropY2=1844" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37038495e0230008f64ec1/2020-Cadillac-CT4-V/960x0.jpg?cropX1=569&cropX2=5130&cropY1=347&cropY2=2912" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d3703b3090f4300070d570d/2020-Cadillac-CT5/960x0.jpg?cropX1=288&cropX2=5130&cropY1=538&cropY2=3261" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37041095e0230008f64ed8/2020-Electra-Meccanica-Solo/960x0.jpg?cropX1=24&cropX2=2031&cropY1=204&cropY2=1333" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37046395e0230008f64edf/2020-Ford-Mustang-Shelby-GT500/960x0.jpg?cropX1=299&cropX2=2851&cropY1=201&cropY2=1638" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37049295e0230008f64eeb/2020-Kia-Soul-EV/960x0.jpg?cropX1=547&cropX2=4924&cropY1=592&cropY2=3055" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d35eb15f1176b0008974b5c/2020-McLaren-GT/960x0.jpg?cropX1=512&cropX2=5312&cropY1=602&cropY2=3303" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d3704d0f1176b00089761ae/2020-Mini-Cooper-SE/960x0.jpg?cropX1=474&cropX2=5315&cropY1=297&cropY2=3020" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d3704fb090f4300070d573d/2020-Polestar-1/960x0.jpg?cropX1=48&cropX2=2848&cropY1=361&cropY2=1937" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d37051e95e0230008f64f17/2020-Polestar-2/960x0.jpg?cropX1=678&cropX2=3478&cropY1=1045&cropY2=2620" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
                <div className='col-md-6 col-sm-12'>
                    <img src="https://specials-images.forbesimg.com/imageserve/5d370543f1176b00089761ce/2020-Porsche-Taycan/960x0.jpg?cropX1=329&cropX2=2970&cropY1=337&cropY2=1822" className="img-thumbnail img-fluid class-uploded-images" />
                </div>
            </div>
        </div>
    );




}
