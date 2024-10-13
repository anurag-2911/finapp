import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    analyticsContainer: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(-4),
        maxHeight: '100vh', 
        overflow: 'hidden', 
    },
    welcomeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    metricsCard: {
        boxShadow: theme.shadows[3],
    },
    iconContainer: {
        fontSize: 40,
        marginRight: theme.spacing(2),
    },
    tableContainer: {
        maxHeight: 100,  
        overflowY: 'auto',  
        marginBottom: theme.spacing(4),  
    },
}));

export default useStyles;
