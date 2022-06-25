
import './uploadFilesList.scss'


export const UploadFilesList = ({ fileList = [] }) => {



    return (
        <ul class="list-group upload-files">
            {fileList.map(({ name ,upload},i) =>
                <li class="list-group-item" key={i}>
                    <i class="fa-solid fa-image me-2"></i> {name}
                   {upload?<div class="float-end spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>:"done"}
                </li>)}
        </ul>
    )

}