import { Fragment, useState } from 'react';
import './appFilter.scss';
import { NormalTagIt, NormalCheckbox, NormalDateRangePicker, NormalButton } from '../../index'
import { MoreFilterCard } from './more-filter';
import { removeDuplicateArray } from '../../../../services/helperFunctions';
import moment from 'moment';


export const AppFilter = (props) => {
    const [filterOpenIndex, setFilterOpenIndex] = useState(-1)
    const [isMoreFilter, setIsMoreFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [imageDateRange, setImageDateRange] = useState({startDate:moment(),endDate:moment()});
    let {
        label = '',
        className = '',
        rightSideBtn = false,
        buttonLabel = '',
        toggle = '',
        filterData = [],
        onApply=()=>{}
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
            moduleText: filterData[i]?.title,
            ...data
        }
        if (checked) {
            selectedFilter.push(obj)
        } else {
            let index = selectedFilter.findIndex(({ value }) => value === data?.value);
            if (index !== -1) {
                selectedFilter.splice(index, 1);
            }
        }
        setSelectedFilter([...selectedFilter]);
    }


    const handleMoreApplyFilter = (data) => {
        let newSetDat = removeDuplicateArray([...data], 'value');
        setSelectedFilter([...newSetDat]);
        setIsMoreFilter(!isMoreFilter)

    };


    const handleClearAllFilter = () => {
        setSelectedFilter([]);
        toggle()
    }

    const handleChangeDateRange = (startDate, endDate) => {
        setImageDateRange({ startDate, endDate })

    }

    const handleApplyFilter=()=>{
       let user_id= selectedFilter?.map(({moduleText,value})=>moduleText === "User"?value:"")
        let filter={
            user_id:user_id.toString(),
            startDate:imageDateRange?.startDate?.format('YYYY-MM-DD'),
            endDate:imageDateRange?.endDate?.format('YYYY-MM-DD')
        };
        console.log(filter)
        onApply(filter)

    }



    const handleRenderCheckBoxUi = (i, title, data=[]) => {

        return (
            <Fragment>
                {i === filterOpenIndex && isMoreFilter && <MoreFilterCard selectedFilterData={selectedFilter} filterData={data} title={title} onClose={handleOncloseMoreFilter} onApply={handleMoreApplyFilter} />}
                <li className="list-group-item px-0" onClick={() => handleToggleFilter(i)}>{title}
                    <i id={`filterDropIcon${i}`} className={`fa-solid float-end fa-angle-down sub-menuDropIcon`}></i >
                </li>
                {i === filterOpenIndex && <div className='' id={`filterData${i}`}>
                    { Array.isArray(data) && data?.slice(0, 10).map(({ label, value }, j) => <div className='d-flex'><NormalCheckbox key={j} label={label} size="small" checked={!!selectedFilter.find((data) => data.value === value)} onChange={(e) => handleChangeCheckBox(e, i, data[j])} className='filter-check-box' /></div>)}
                    <div className='more-content'>
                        {data.length > 10 && <span onClick={handleOncloseMoreFilter}>{data?.length - 10} More</span>}
                    </div>
                </div>
                }
            </Fragment>

        )

    }


    const handleRenderDateUi = (i, title, data) => {

        return (
            <Fragment>

                <li className="list-group-item px-0">{title}

                    <div className='d-flex mt-3'>
                        <NormalDateRangePicker startDate={imageDateRange?.startDate} endDate={imageDateRange?.startDate}
                            onApply={handleChangeDateRange}
                            className='w-100' variant="filled" size="small" label="Start and From"
                            value={`${moment(imageDateRange?.startDate).format("DD/MM/YYYY")} to ${moment(imageDateRange?.endDate).format("DD/MM/YYYY")}`}
                        />
                    </div>

                </li>

            </Fragment>

        )

    }

    const handleRemoveTagItDelete = (i) => {
        let { moduleText, value } = selectedFilter[i];
        if (i !== -1) {
            selectedFilter.splice(i, 1);
        }
        setSelectedFilter([...selectedFilter])
    };
    return (
        <div className={`card app-filter ${className}`}>
            <div className="card-header mb-3">
                Filters
                {/* <span className='float-end clear-text' onClick={handleClearAllFilter}>CLEAR ALL</span> */}
                <button type="button" class="btn-close float-end " aria-label="Close" onClick={handleClearAllFilter}></button>
            </div>
            <div className='card-body'>
                {/* <div className='row'> */}
                {selectedFilter.length > 0 && <div className='list-group list-group-flush'>
                    <div className='list-item pt-0'>
                        <NormalTagIt data={selectedFilter} onDelete={handleRemoveTagItDelete} />
                    </div>


                </div>}

                {/* </div> */}


                <ul className="list-group list-group-flush">
                    {filterData.map(({ title, data = [], filterType = '' }, i) =>
                        <div className='list-item pt-0' key={i}>
                            {filterType === 'checkBox' && handleRenderCheckBoxUi(i, title, data)}
                            {filterType === 'date' && handleRenderDateUi(i, title, data)}

                        </div>
                    )}


                </ul>
                <div className='row'>
                    <div className='col-12 px-4 text-end'>
                    <NormalButton onClick={handleClearAllFilter} label='Close' color='error' className='me-3 mt-3' />
                <NormalButton onClick={handleApplyFilter} label='Apply' className='me-3 mt-3' />
                    </div>
                </div>

               

            </div>
        </div>
    )
}
