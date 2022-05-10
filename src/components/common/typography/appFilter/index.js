import { Fragment, useState } from 'react';
import './appFilter.scss';
import { NormalTagIt, NormalCheckbox } from '../../index'
import { MoreFilterCard } from './more-filter'
export const AppFilter = (props) => {
    const [filterOpenIndex, setFilterOpenIndex] = useState(-1)
    const [isMoreFilter, setIsMoreFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState([])
    let {
        label = '',
        className = '',
        rightSideBtn = false,
        buttonLabel = '',
        toggle = '',
        filterData = []
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




    const handleOncloseMoreFilter = () => {
        setIsMoreFilter(!isMoreFilter)

    };

    const handleChangeCheckBox = (e, i, data) => {
        let target = e.target;
        let checked = target.checked;
        let obj = {
            moduleText:filterData[i]?.label,
            ...data
        }
        if (checked) {
            selectedFilter.push(obj)
        } else {
            let index = selectedFilter.findIndex(({ value }) => value === data?.value);
            if(index !==-1){
                selectedFilter.splice(index, 1);
            }
        }
        setSelectedFilter([...selectedFilter])
        console.log(e.target.checked)
    }


    const handleRenderCheckBoxUi = (i, label, data) => {

        return (
            <Fragment>
                {i === filterOpenIndex && isMoreFilter && <MoreFilterCard data={data} onClose={handleOncloseMoreFilter} />}
                <li className="list-group-item px-0" onClick={() => handleToggleFilter(i)}>{label}
                    <i id={`filterDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i >
                </li>
                {i === filterOpenIndex && <div className='' id={`filterData${i}`}>
                    {data.slice(0, 10).map(({ label, value }, j) => <div className='d-flex'><NormalCheckbox key={j} label={label} size="small" onChange={(e) => handleChangeCheckBox(e, i, data[j])} className='filter-check-box' /></div>)}
                    <div className='more-content'>
                        <span onClick={handleOncloseMoreFilter}>{data.length - 10} More</span>
                    </div>
                </div>
                }
            </Fragment>

        )

    }


    const handleRenderDateUi = (i, label, data) => {

        return (
            <Fragment>

                <li className="list-group-item px-0" onClick={() => handleToggleFilter(i)}>{label}

                </li>

            </Fragment>

        )

    }

    return (
        <div className={`card app-filter ${className}`}>
            <div className="card-header mb-3">
                Filters
                <span className='float-end clear-text' onClick={toggle}>CLEAR ALL</span>
            </div>
            <div className='card-body'>
                {/* <div className='row'> */}
            {selectedFilter.length> 0 &&    <div className='list-group list-group-flush'>
                    <div className='list-item pt-0'>
                        <NormalTagIt data={selectedFilter}/>
                    </div>


                </div>}

                {/* </div> */}


                <ul className="list-group list-group-flush">
                    {filterData.map(({ label, data = [], filterType = '' }, i) =>
                        <div className='list-item pt-0' key={i}>
                            {filterType === 'checkBox' && handleRenderCheckBoxUi(i, label, data)}
                            {filterType === 'date' && handleRenderDateUi(i, label, data)}

                        </div>
                    )}


                </ul>

            </div>
        </div>
    )
}
