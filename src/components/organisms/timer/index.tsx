import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './styles.css';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Input,
  Typography,
} from '@mui/material';
import AvTimerIcon from '@mui/icons-material/AvTimerOutlined';

type InputEvent = {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};
// ToDo: Implement coutdown functionality
function Timer() {
  const [timeDigits, setTimeDigits] = useState(['']);
  const [timeUnits, setTimeUnits] = useState([0, 0, 0]);
  const [ctaStartStop, setCtaStartStop] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    console.log(timeDigits);
    console.log('timeUnits ', timeUnits);
  }, [timeDigits, timeUnits]);

  function handleTimeInput(e: InputEvent['event']) {
    let timeChunk = e.target.value;
    let timeChunksArray: string[] = [];
    setTimeDigits(timeChunksArray);
    for (let i = 0, charsLength = timeChunk.length; i < charsLength; i++) {
      timeChunksArray.push(timeChunk.substring(i, i + 1));
    }
  }

  function handleStartStop() {
    ctaStartStop ? setCtaStartStop(false) : setCtaStartStop(true);
  }

  function renderTimeView(): ReactNode {
    if (timeDigits.length === 1) {
      return `00h 00m ${timeDigits[0] || '00'}s`;
    } else if (timeDigits.length === 2) {
      return `00h 00m ${timeDigits[0]}${timeDigits[1]}s`;
    } else if (timeDigits.length === 3) {
      return `00h 0${timeDigits[0]}m ${timeDigits[1]}${timeDigits[2]}s`;
    } else if (timeDigits.length === 4) {
      return `00h ${timeDigits[0]}${timeDigits[1]}m ${timeDigits[2]}${timeDigits[3]}s`;
    } else if (timeDigits.length === 5) {
      return `0${timeDigits[0]}h ${timeDigits[1]}${timeDigits[2]}m ${timeDigits[3]}${timeDigits[4]}s`;
    } else if (timeDigits.length === 6) {
      return `${timeDigits[0]}${timeDigits[1]}h ${timeDigits[2]}${timeDigits[3]}m ${timeDigits[4]}${timeDigits[5]}s`;
    } else {
      return `00h 00m 00s`;
    }
  }

  function renderTimer() {
    return `${timeUnits[0]}h ${timeUnits[1]}m ${timeUnits[2]}s`;
  }

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function handleTimeCalculation() {
    let rawHms: string[] = [];
    for (let i = timeDigits.length - 1; i >= 0; i -= 2) {
      rawHms.unshift(
        i === 0 ? timeDigits[i] : timeDigits[i - 1] + timeDigits[i],
      );
    }
    const hmsNumbers = rawHms.map(Number);

    const hoursToSeconds = hmsNumbers[0] * 3600;
    const minutesToSeconds = hmsNumbers[1] * 60;
    const totalSeconds = hoursToSeconds + minutesToSeconds + hmsNumbers[2];
    const totalMiliseconds = totalSeconds * 1000;
    let seconds = Math.floor(totalMiliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    setTimeUnits([hours, minutes, seconds]);
    return `${padTo2Digits(timeUnits[0])}h ${padTo2Digits(
      timeUnits[1],
    )}m ${padTo2Digits(timeUnits[2])}s `;
  }

  function handleInputBlur() {
    handleTimeCalculation();
    setHasFocus(false);
  }

  function handleInputFocus() {
    setHasFocus(true);
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Card>
        <CardHeader
          className="timerCardHeader"
          title="Timer"
          avatar={
            <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">
              <AvTimerIcon />
            </Avatar>
          }
        />
        <CardContent>
          <Box className="inputContainer">
            <Box className="inputDataContainer">
              <Input
                className="inputDataText"
                onChange={(e) => handleTimeInput(e)}
                inputProps={{ maxLength: 6 }}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
              />
            </Box>
            <Box className="inputViewContainer">
              <Typography gutterBottom variant="h5" component="div">
                {hasFocus ? renderTimeView() : renderTimer()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="medium" onClick={handleStartStop}>
            {!ctaStartStop ? 'Start' : 'Stop'}
          </Button>
          <Button variant="contained" size="medium">
            Reset
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Timer;
