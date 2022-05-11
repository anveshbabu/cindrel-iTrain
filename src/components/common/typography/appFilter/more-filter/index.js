import { Fragment, useState,useEffect } from 'react'
import './moreFilter.scss';
import { NormalButton, NormalCheckbox, NormalSearch } from '../../../index'
import { alphabeticallyGrouping } from '../../../../../services/helperFunctions'

export const MoreFilterCard = ({ onClose,filterData,title,onApply,selectedFilterData=[] }) => {
    const [selectedFilter, setSelectedFilter] = useState([]);


    useEffect(()=>{
        setSelectedFilter([...selectedFilterData])
    },[selectedFilterData])

    const handleChangeCheckBox = (e, data) => {
        let target = e.target;
        let checked = target.checked;
        let obj = {
            moduleText: title,
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
    };

// const handleApplyFilter=>


    return (
        <div className="card more-filter-card">
            <div className="card-header">
                <button type="button" className="btn-close close-btn float-end" onClick={onClose} ></button>
                <NormalSearch label="Search" size="small" />
            </div>
            <div className="card-body">
                <div className='filter-check-box-continer'>
                    {alphabeticallyGrouping(filterData, 'label')?.map(({ alphabet, record = [] }) =>
                        <>
                            <h4 className='first-letter-title value-text'>{alphabet}</h4>
                            {record.map((({ value, label },i) =>

                                <div className='d-flex' key={i}><NormalCheckbox label={label} size="small"  checked={!!selectedFilter.find((data) => data.value === value)} onChange={(e) => handleChangeCheckBox(e, record[i])} className='filter-check-box' /></div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div class="card-footer text-end">
               <NormalButton label="Close" variant="text" onClick={onClose} className='me-2'/>
               <NormalButton label="Apply" onClick={()=>onApply(selectedFilter)}/>
            </div>
        </div>
    )
}
