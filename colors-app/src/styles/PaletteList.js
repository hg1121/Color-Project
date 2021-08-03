export default {
    root: {
        backgroundColor: 'lightgreen',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        '@media (max-width: 576px)': {
            width: '90%',          
        },
        '@media (min-width: 576px)': {
            width: '80%',          
        },
        '@media (min-width: 768px)': {
            width: '70%',          
        },
        '@media (min-width: 992px)': {
            width: '60%',          
        },
        '@media (min-width: 1200px)': {
            width: '50%',          
        },
    },
    nav: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a':{
            color: 'white',
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
        '@media (max-width: 576px)': {
            gridTemplateColumns: 'repeat(2, 47%)',          
        },
    }
}