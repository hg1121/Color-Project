import BackGroundImg from './BackGround.svg';
import { blue } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

const styles = {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        //background by SVGbackgrounds
        backgroundColor: '#aa3333',
        backgroundImage: `url(${BackGroundImg})`,
        overflow: 'scroll',
        '& h1': {
            fontSize: '2rem',
        }
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
        // '@media (min-width: 768px)': {
        //     width: '70%',          
        // },
        '@media (min-width: 992px)': {
            width: '70%',          
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
        '@media (min-width: 576px)': {
            gridTemplateColumns: 'repeat(2, 47%)',          
        },
        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 30%)',          
        },
    },
    avatarBlue: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    avatarRed: {
        backgroundColor: red[100],
        color: red[600],
    },
}

export default styles;