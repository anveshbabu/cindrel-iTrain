import { useEffect, useState } from 'react'
import './uploadFilesList.scss'


export const UploadFilesList = ({ fileList = [],toggle }) => {
    const [isMinimize, setIsMinimize] = useState(true);
    const [isTaskDone, setIsTaskDone] = useState(false);

    useEffect(() => {
        let result = fileList?.filter(({ upload }) => ['done', 'error'].includes(upload))
        if (result.length === fileList.length && fileList.length > 0) {
            setIsTaskDone(true)
        }
    }, [fileList]);


    return (
        <div className="toast-container upload-files-container position-fixed bottom-0 end-0 p-3">
            <div className="toast fade show border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header py-0">
                    {/* <img src="..." className="rounded me-2" alt="..."> */}
                    <strong className="me-auto">{!isTaskDone ? `Uploading ${fileList?.length} files` : `${fileList?.length} uploads complete`}</strong>
                    {/* <small>11 mins ago</small> */}
                    <button type="button" className="btn btn-sm max-min-btn p-0 user-select-none" onClick={() => setIsMinimize(!isMinimize)}><i class={`fa-solid ${isMinimize ? 'fa-angle-down' : "fa-angle-up"} `}></i></button>
                    <button type="button" onClick={toggle} className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body px-0 pt-0">
                    <ul className="list-group upload-files">
                        {isMinimize && fileList.map(({ name, upload }, i) =>
                            <li className="list-group-item" key={i}>
                                <i className="fa-solid fa-image me-2 text-danger"></i> {name}
                                {!upload ? <div className="float-end spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : <i class={`fa-solid ${upload === 'done' ? 'fa-circle-check text-success' : ' fa-circle-xmark text-danger'}  float-end `}></i>}
                            </li>)}
                    </ul>
                </div>
            </div>
        </div>

    )

}