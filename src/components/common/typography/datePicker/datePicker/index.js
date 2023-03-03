import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function NormalDatePicker(props) {
    // const [value, setValue] = React.useState(null);

    let {
        onChange = () => { },
        value = dayjs('2014-08-18T21:11:54'),
        name = ""
    } = props;



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                className='w-100'
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                    let event = {
                        target: {
                            type: "date",
                            value: newValue.$d,
                            name
                        }

                    }
                    onChange(event)
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        // <h4>jhjhfjh</h4>
    );
}