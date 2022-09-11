import React from "react";
import { NormalBreadcrumb } from '../../components/common'
import { OverAllCountCard, MonthlyModalPrediction, OverAllModalPredication ,ClassTobeFocus,ClassPerformance} from '../../components/pages'


export function ModuleReport() {

    return (
        <div>
            <NormalBreadcrumb label='Dashboard' />

            <div className="row mt-4">
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard title="Total Images (monthly)" OverAllCount='4,390' icon="fa-image " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="warning" title="Experiment" OverAllCount='235' icon="fa-flask " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="danger" title="Accuracy" OverAllCount='235' icon="fa-flask " />
                </div>
                <div className="col-md-3 col-sm-12">
                    <OverAllCountCard className="info" title="Image Used Experiments" OverAllCount='2535' icon="fa-photo-film " />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-8 col-sm-12">


                    <div className="row ">
                        <div className="col-md-12">
                            <MonthlyModalPrediction title="Total Images (monthly)" OverAllCount='4,390' icon="fa-image " />
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <OverAllModalPredication title="Total Images (monthly)" OverAllCount='4,390' icon="fa-image " />
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <ClassTobeFocus title="Total Images (monthly)" OverAllCount='4,390' icon="fa-image " />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <ClassPerformance/>
                </div>



            </div>




        </div>
    );

}
