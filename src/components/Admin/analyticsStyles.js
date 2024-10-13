import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    analyticsContainer: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(-4),
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
        maxHeight: 400,
        overflow: 'auto',
    },
}));

export default useStyles;
