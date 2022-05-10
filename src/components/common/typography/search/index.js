import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
export function NormalSearch(props) {

    let {
        label = '',
        className = '',
        isLoader = false,
        disabled,
        variant = 'outlined',
        materialUi = true,
        position = "end",
        id = Math.random(),
    } = props;


    return (
        <FormControl variant={variant} className={className}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                {...props}
                // placeholder={label}
                id={id}
                endAdornment={
                    <InputAdornment position={position}>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
}
