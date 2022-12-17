import './userActivity.scss'

export const UserActivity = () => {

    return (
        <div className="card user-activity-card  dashboard-card mb-4">
            <div className="card-header text-primary">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='small fw-bold text-primary mb-1'>User Activity</h4>

                    </div>
                    <div className='col-md-6 text-end'>


                    </div>

                </div>


            </div>
            <div className="card-body p-0">
                <table class="table table-borderless">
                    <thead >
                        <tr className="table-primary">

                            <th scope="col"></th>
                            <th scope="col">Uploaded</th>
                            <th scope="col">Reviewed</th>
                            <th scope="col">Deleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>
                                <div class="d-flex user-activity">
                                    <div class="flex-shrink-0">
                                        <img src="https://sb-admin-pro-angular.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png" alt="..." />
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h4 className='mb-0'>Anvesh Balaji</h4>
                                        <span className='text-muted'>position</span>
                                    </div>
                                </div>
                            </td>
                            <td>1024</td>
                            <td>988</td>
                            <td>113</td>
                        </tr>
                        <tr>

                            <td>
                                <div class="d-flex user-activity">
                                    <div class="flex-shrink-0">
                                        <img src="https://sb-admin-pro-angular.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png" alt="..." />
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h4 className='mb-0'>Prabu</h4>
                                        <span className='text-muted'>position</span>
                                    </div>
                                </div>
                            </td>
                            <td>1024</td>
                            <td>988</td>
                            <td>113</td>
                        </tr>
                        <tr>

                            <td>
                                <div class="d-flex user-activity">
                                    <div class="flex-shrink-0">
                                        <img src="https://sb-admin-pro-angular.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png" alt="..." />
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h4 className='mb-0'>Robin</h4>
                                        <span className='text-muted'>position</span>
                                    </div>
                                </div>
                            </td>
                            <td>1024</td>
                            <td>988</td>
                            <td>113</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}