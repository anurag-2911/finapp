import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    welcomeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    checkboxLabel: {
        display: 'block',
    },
    totalMaxAmount: {
        marginTop: theme.spacing(2),
    },
    textField: {
        margin: theme.spacing(1, 0),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
    successMessage: {
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
