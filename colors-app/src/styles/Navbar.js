export default {
    Navbar : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    logo : {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto sans-serif',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black',
        }
    },
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-rail': {  
            height: '8px',
        },
        '& .rc-slider-track': {
            // backgroundColor: 'transparent',
            height: '8px',
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover ': {
            backgroundColor: 'green',
            outline:' none',
            boxShadow: 'green',
            border: 'none',
            width:' 11px',
            height:' 11px',
            marginLeft: '3px',
            marginTop:' -2px',
        },
        '& .rc-slider-dot': {
            bottom: '-5px',
            marginLeft: '-1px'
        }


    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem',
    }
}
