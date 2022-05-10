import { Fragment, useState } from 'react'
import './moreFilter.scss';
import { NormalButton, NormalCheckbox, NormalSearch } from '../../../index'
import { alphabeticallyGrouping } from '../../../../../services/helperFunctions'

export const MoreFilterCard = ({ onClose,data }) => {


    return (
        <div className="card more-filter-card">
            <div className="card-header">
                <button type="button" className="btn-close close-btn float-end" onClick={onClose} ></button>
                <NormalSearch label="Search" size="small" />
            </div>
            <div className="card-body">
                <div className='filter-check-box-continer'>
                    {alphabeticallyGrouping(data, 'label')?.map(({ alphabet, record = [] }) =>
                        <>
                            <h4 className='first-letter-title value-text'>{alphabet}</h4>
                            {record.map((({ value, label }) =>

                                <div className='d-flex'><NormalCheckbox label={label} size="small" className='filter-check-box' /></div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div class="card-footer text-end">
               <NormalButton label="Close" variant="text" onClick={onClose} className='me-2'/>
               <NormalButton label="Apply" onClick={onClose}/>
            </div>
        </div>
    )
}
