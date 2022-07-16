import { useEffect, useState, useRef } from 'react'
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { NormalBreadcrumb,UploadFilesList} from '../../../components/common';
import { ExperimentsList } from '../../../components/pages';
import { uploadImageModule } from '../../../redux/actions/experiments';
import { imageCompressor } from '../../../services/imageCompressor';
import './experiments.scss'

export const ExperimentsListPage = () => {
    const params = useParams();
    const imageInput = useRef();
    const [imageUploadList, setImageUploadList] = useState([]);
    const [isUploadStatus, setIsUploadStatus] = useState(false);

    let series = [{
        name: "STOCK ABC",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
    let options = {
        toolbar: { show:false },
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },

        title: {
            text: 'Experiment Trend',
            align: 'left',
            style: {
                cssClass: 'experiment-xaxis-title',
            },
        },

        labels: [30, 40, 45, 50, 49, 60, 70, 91],
        xaxis: {
            type: 'datetime',
            labels: {
                show: false
            }

        },
        yaxis: {
            opposite: true,
            labels: {
                show: false
            }

        },

    }



    const handleChnage = (event) => {
        // console.log('data----------->', event.target.files)
        const target = event.target;
        const files = target.files;
        let compressedImages = []

        imageCompressor(files).then((data) => {
            compressedImages = data.map(({ compressed }) => ({ file: compressed?.file, name: compressed?.name, type: compressed?.type, upload: "" }));
            console.log('compressedImages----------------->', compressedImages)
            setImageUploadList(searches => [...searches, ...compressedImages])
            setIsUploadStatus(true)
            compressedImages.map((data, i) => {
                handleUploadImages(data?.file, i, compressedImages)
            })

        }).catch((e) => {
            console.log('err----------->', e)
        });



    }
    const handleUploadImages = (body, i, imageList) => {
        const form = new FormData();
        form.append("photo", body);
        form.append("model", Number(params?.modelId));
        // form.append("class_id", selectedClassObj?.ClassId);
        // form.append("user_id", userDetail?.UserId);
        uploadImageModule(form).then(({ count = 0, results = [] }) => {
            console.log('results----------->', results)
            imageList[i].upload = 'done';
            setImageUploadList([...imageList]);

        }).catch((e) => {
            imageList[i].upload = 'error';
            setImageUploadList([...imageList])
        });
        // setImageUploadList([...imageUploadList])
    }


    const handleCloseUploadeModal = () => {
        setIsUploadStatus(false);
        setImageUploadList([]);
    }


    return (
        <div className='experiments-list-page'>





            <NormalBreadcrumb className="mb-0" label={<div className='d-flex align-items-end'><i class="fa-solid fa-microchip  title-icon me-4" title="Production"></i> <span>Model Experiments</span>  </div>} rightSideBtn={true} buttonLabel="Add new" onBtnClick={() =>  imageInput.current.click()} />
            <input
                                        className='d-none'
                                        type="file"
                                        multiple
                                        name='photo[]'
                                        ref={imageInput}
                                        onChange={handleChnage} />
            <div className='card light-blue row rounded-0 border-0'>
                <div className='card-body'>
                    <div className="row justify-content-end">


                        <div className="col-md-3 col-sm-12 ">
                            <ReactApexChart className='shadow' options={options} series={series} type="area" height={200} />
                        </div>
                    </div>



                </div>


            </div>

            <div className='row mt-3'>
                <div className='col-md-12'>
                    <ExperimentsList />

                </div>

            </div>
            {isUploadStatus && <UploadFilesList toggle={handleCloseUploadeModal} fileList={imageUploadList} />}
        </div>
    )
}