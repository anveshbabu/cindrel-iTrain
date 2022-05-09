import { Fragment, useState } from 'react'
import './appFilter.scss';
import { NormalButton, NormalCheckbox } from '../../index'
export const AppFilter = (props) => {
    const [filterOpenIndex, setFilterOpenIndex] = useState(-1)
    let {
        label = '',
        className = '',
        rightSideBtn = false,
        buttonLabel = '',
        toggle='',
    } = props;

    const handleToggleFilter = (i) => {
        // let isSubMenu = document.getElementById(id);
        let subMenuIcon = document.getElementById(`filterDropIcon${i}`);

        if (subMenuIcon.style.transform == `rotate(180deg)`) {
            setFilterOpenIndex(-1)
            subMenuIcon.style.transform = ''

        } else {
            setFilterOpenIndex(i)
            subMenuIcon.style.transform = `rotate(180deg)`
        }
    }
    return (
        <div className={`card app-filter ${className}`}>
            <div className="card-header mb-3">
                Filters
                <span className='float-end clear-text' onClick={toggle}>CLEAR ALL</span>
            </div>
            <div className='card-body'>
                <ul class="list-group list-group-flush">
                    {['User', 'Tags', 'Date'].map((data, i) =>

                        <div className='list-item py-0'>
                            <li class="list-group-item px-0" onClick={() => handleToggleFilter(i)}>{data}
                                <i id={`filterDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i >


                            </li>
                            {i === filterOpenIndex && <div className='' id={`filterData${i}`}>
                              {['Anvesh','Prabu Raj','Mirsha','Murali','Mani'].map((data)=> <div className='d-flex'><NormalCheckbox label={data} className='filter-check-box'/></div>)} 
                            </div>}
                        </div>
                    )}


                </ul>
            </div>
        </div>
    )
}
