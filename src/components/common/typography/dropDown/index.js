import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export function NormalDropDown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let {
        className = '',
        id = Math.random(),
        label = '',
        errorMessage = '',
        materialUi = true,
        options = [],
        variant,
        onSelect = ''
    } = props;





    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        if(!!onSelect){
            onSelect(e)
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id={`${id}-fade-button`}
                aria-controls={open ? `${id}-fade-menu` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant={variant}
            >
                {label}
            </Button>
            <Menu
                id={`${id}-fade-menu`}
                MenuListProps={{
                    'aria-labelledby': `${id}-fade-button`,
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {options.map((item, i) =>
                    <MenuItem onClick={() => handleClose(item)} key={i}>{item}</MenuItem>
                )}
                {/*               
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </div>
    );
}
