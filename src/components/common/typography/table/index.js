import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Fragment } from 'react';
export const NormalTable = (props) => {

    let {
        columnData = [],
        rowData = [],
        className = '',
        isLoader = false,
        disabled,
        variant = 'contained',
        materialUi = true,
        pagination = {
            count: 0,
        }
    } = props;

    return (
        <Fragment>
            <table className={`table ${className}`}>
                <thead>
                    <tr>
                        {columnData.map(({ label }, i) =>
                            <th key={i}>{label}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {rowData.map((data) =>
                            columnData.map(({ field }, i) =>
                                <td key={i}>{data[field]}</td>
                            )

                        )}
                    </tr>
                </tbody>
            </table>
            {pagination?.count > 0 && <div className='text-right'>
                <Pagination className='text-' count={pagination?.count} />
            </div>}

        </Fragment>

    )
}
