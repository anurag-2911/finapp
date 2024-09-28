import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Updated to a richer blue
    },
    secondary: {
      main: '#ff6f61', // A soft contrasting color
    },
    background: {
      default: '#f4f6f8', // Light grey background for a modern look
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  spacing: 8,
});

export default theme;
