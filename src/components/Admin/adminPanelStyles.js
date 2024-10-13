import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  adminContainer: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(-4),
    height: '80vh',
    overflow: 'auto',
  },
  adminTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
  },
  welcomeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    borderRadius: 4,
    boxShadow: theme.shadows[3],
    maxHeight: '60vh',
    maxWidth: '100%',
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': { backgroundColor: theme.palette.action.hover },
  },
  userCell: {
    fontWeight: 'bold',
  },
  statusCell: {
    display: 'inline',
    marginLeft: theme.spacing(1),
  },
  updateButton: {
    borderRadius: 2,
  },
}));

export default useStyles;
