import { Fragment, useState } from 'react'
import './appFilter.scss';
import { NormalButton, NormalCheckbox } from '../../index'
import {MoreFilterCard} from './more-filter'
export const AppFilter = (props) => {
    const [filterOpenIndex, setFilterOpenIndex] = useState(-1)
    const [isMoreFilter, setIsMoreFilter] = useState(false)
    let {
        label = '',
        className = '',
        rightSideBtn = false,
        buttonLabel = '',
        toggle = '',
    } = props;

    const handleToggleFilter = (i) => {
        let subMenuIcon = document.getElementById(`filterDropIcon${i}`);
        if (subMenuIcon.style.transform == `rotate(180deg)`) {
            setFilterOpenIndex(-1)
            subMenuIcon.style.transform = ''
        } else {
            setFilterOpenIndex(i)
            subMenuIcon.style.transform = `rotate(180deg)`
        }
    }

const handleOncloseMoreFilter=()=>{
    setIsMoreFilter(!isMoreFilter)

}

    return (
        <div className={`card app-filter ${className}`}>
            <div className="card-header mb-3">
                Filters
                <span className='float-end clear-text' onClick={toggle}>CLEAR ALL</span>
            </div>
            <div className='card-body'>
                <ul className="list-group list-group-flush">
                    {['User', 'Tags', 'Date'].map((data, i) =>
                        <div className='list-item pt-0'>
                            {i === filterOpenIndex && isMoreFilter && <MoreFilterCard onClose={handleOncloseMoreFilter}/>}
                            <li className="list-group-item px-0" onClick={() => handleToggleFilter(i)}>{data}
                                <i id={`filterDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i >
                            </li>


                            {i === filterOpenIndex && <div className='' id={`filterData${i}`}>
                                {['Anvesh', 'Prabu Raj', 'Mirsha', 'Murali', 'Mani'].map((data) => <div className='d-flex'><NormalCheckbox label={data} size="small" className='filter-check-box' /></div>)}
                                <div className='more-content'>
                                    <span onClick={handleOncloseMoreFilter}>64 More</span>
                                </div>


                            </div>}


                        </div>
                    )}


                </ul>

            </div>
        </div>
    )
}
