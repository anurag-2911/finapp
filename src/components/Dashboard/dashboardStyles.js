import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: theme.spacing(3),
  },
  welcomeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  applicationCard: {
    marginBottom: theme.spacing(2),
  },
  noApplicationsText: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  loanTypeList: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
