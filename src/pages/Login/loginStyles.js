import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  submitButton: {
    width: '100%',
  },
}));

export default useStyles;
