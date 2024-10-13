import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(1),
    },
}));

export default useStyles;
