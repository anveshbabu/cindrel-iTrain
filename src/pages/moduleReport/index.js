import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NormalBreadcrumb } from '../../components/common'
import { OverAllCountCard, MonthlyModalPrediction, Seasonality, OverAllModalPredication, ClassTobeFocus, ClassPerformance, UserActivity } from '../../components/pages'
import { getReportDetails } from '../../redux/actions/report'

export function ModuleReport() {

    const params = useParams();

    const [reportData, setReportDate] = useState({
        overall: [
            {
                accuracy_percent: 0,
                corrected_percent: 0
            }
        ]
    });




    useEffect(() => {
        let req = {
            model_id: Number(params?.modelId),
        }
        getReportDetails(req).then(({ result }) => {
            console.log('result-------------->', result)
            setReportDate(result)


        }).catch((e) => {
            console.error(e)

        });



    }, [])





    return (
        <div>
            <NormalBreadcrumb label='Dashboard' />

            <div className="row mt-4">
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard title="Total Images (monthly)" OverAllCount={reportData?.summary?.Images} icon="fa-image " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="warning" title="Experiment" OverAllCount={reportData?.summary?.experiments} icon="fa-flask " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="danger" title="Accuracy" OverAllCount={reportData?.summary?.accuracy} icon="fa-flask " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="info" title="Image Used Experiments" OverAllCount={0} icon="fa-photo-film " />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-8 col-sm-12">


                    <div className="row ">
                        <div className="col-md-12">
                            <MonthlyModalPrediction data={reportData?.monthwise} />
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <OverAllModalPredication data={reportData?.overall} icon="fa-image " />
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <ClassTobeFocus data={reportData?.class_focus} />
                        </div>
                    </div>
                    {/* <div className="row ">
                        <div className="col-md-12">
                            <UserActivity data={reportData?.monthwise}/>
                        </div>
                      
                       
                    </div> */}
                </div>
                <div className="col-md-4 col-sm-12">
                    <ClassPerformance data={reportData?.class_wise} />
                </div>



            </div>


            <div className="row mt-0">
                <div className="col-md-6 col-sm-12">


                    <UserActivity data={reportData?.monthwise} />


                </div>


                <div className="col-md-6 col-sm-12">


                    <Seasonality data={reportData?.monthwise} />


                </div>

            </div>


        </div>
    );

}
