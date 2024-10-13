import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: 240,
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '104px',
        boxSizing: 'border-box',
    },
    listItemIcon: {
        color: 'white',
    },
}));

export default useStyles;
