import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'auto',
    },
    welcomeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
    optionCard: {
        position: 'relative',
    },
    checkboxControl: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    optionTitle: {
        fontWeight: 'bold',
    },
    optionDetails: {
        marginTop: theme.spacing(1),
    },
}));

export default useStyles;
