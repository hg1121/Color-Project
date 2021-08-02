export default {
    root : {
        backgroundColor: 'white',
        border: '1px solid',
        borderRadius: '10px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1
        },

    },
    colors : {
        backgroundColor: '#dae1e4',
        height: '100px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        color: 'black',
        paddingTop: '0.3rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        position: 'relative'
    },
    emoji : {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        width: "20%",
        height: '25%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px',
    },
    delete: {

    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '0',
        top: '0',
        padding: '5px',
        zIndex: 5,
        opacity: 0,
    }

}