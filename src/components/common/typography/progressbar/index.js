import './progressbar.scss'

export const NormalProgressbar = ({ className = [] }) => {


    return (

        <div className={`progress app-progress  ${className}`}>
            <div className="progress-bar" style={{ width: '25%' }} role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )




} 