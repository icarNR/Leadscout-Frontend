import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

//styleOverrides
const theme = createTheme({
  typography: {
    fontSize: 12, // Adjust as needed
  },
  palette: {
    primary: {
      main: '#00695c',
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    }
  }
});
const BorderLinearProgress = styled(LinearProgress)(({ theme, colorr}) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#e0e0e0',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? colorr: "#ff0000"
  },
}));

export default function CustomizedProgressBars({ progress, color }) {
  const [currentProgress, setCurrentProgress] = React.useState(progress);

  // Update progress when the prop changes
  React.useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

 return (
  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    <ThemeProvider theme={theme}>
      <BorderLinearProgress variant="determinate" value={currentProgress} colorr={color} sx={{ flex: 1 }} />
    </ThemeProvider>
    <Typography className='text-xs' variant="body3" sx={{ pl: 1, lineHeight: '1rem', margin: 0 }}>
      {`${currentProgress}%`}
    </Typography>
  </Box>
);

}
