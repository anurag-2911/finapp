import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: -1,
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  loanCard: {
    maxWidth: 345,
  },
  loanButton: {
    margin: theme.spacing(2),
  },
  benefitsSection: {
    marginTop: theme.spacing(4),
  },
}));

export default useStyles;
