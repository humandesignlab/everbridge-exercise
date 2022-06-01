import React, {
  ChangeEvent,
  useEffect,
  useState,
  createRef,
  useRef,
} from 'react';
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

const defaultTimeDigits = [''];
const defaultTimeView = '00h 00m 00s';
const defaultTimeUnits = [0, 0, 0];
// ToDo: Implement coutdown functionality
function Timer() {
  const [timeDigits, setTimeDigits] = useState(defaultTimeDigits);
  const [timeView, setTimeView] = useState(defaultTimeView);
  const [timeUnits, setTimeUnits] = useState(defaultTimeUnits);
  const [ctaStartStop, setCtaStartStop] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const inputRef: any = createRef();

  useEffect(() => {
    console.log(timeDigits);
    console.log('timeUnits ', timeUnits);
    console.dir(inputRef.current.value);
  }, [timeDigits, timeUnits, inputRef]);

  useEffect(() => {
    let cleanup = inputRef.current;
    if (timeDigits.length === 1) {
      setTimeView(`00h 00m ${timeDigits[0] || '00'}s`);
    } else if (timeDigits.length === 2) {
      setTimeView(`00h 00m ${timeDigits[0]}${timeDigits[1]}s`);
    } else if (timeDigits.length === 3) {
      setTimeView(`00h 0${timeDigits[0]}m ${timeDigits[1]}${timeDigits[2]}s`);
    } else if (timeDigits.length === 4) {
      setTimeView(
        `00h ${timeDigits[0]}${timeDigits[1]}m ${timeDigits[2]}${timeDigits[3]}s`,
      );
    } else if (timeDigits.length === 5) {
      setTimeView(
        `0${timeDigits[0]}h ${timeDigits[1]}${timeDigits[2]}m ${timeDigits[3]}${timeDigits[4]}s`,
      );
    } else if (timeDigits.length === 6) {
      setTimeView(
        `${timeDigits[0]}${timeDigits[1]}h ${timeDigits[2]}${timeDigits[3]}m ${timeDigits[4]}${timeDigits[5]}s`,
      );
    } else {
      setTimeView(defaultTimeView);
    }
    return () => {
      if (!hasFocus) cleanup.value = '';
    };
  }, [timeView, timeDigits, inputRef, hasFocus]);

  // useEffect(() => {
  //   setInterval(() => {}, 100);
  // });

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

  function renderTimer() {
    return `${timeUnits[0] || '00'}h ${timeUnits[1] || '00'}m ${
      timeUnits[2] || '00'
    }s`;
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

  function handleReset() {
    setTimeDigits(defaultTimeDigits);
    setTimeView(defaultTimeView);
    setTimeUnits(defaultTimeUnits);
  }

  function handleInputBlur() {
    handleTimeCalculation();
    setHasFocus(false);
  }

  function handleInputFocus() {
    handleReset();
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
                inputProps={{ maxLength: 6, ref: inputRef }}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
              />
            </Box>
            <Box className="inputViewContainer">
              <Typography gutterBottom variant="h5" component="div">
                {hasFocus ? timeView : renderTimer()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="medium" onClick={handleStartStop}>
            {!ctaStartStop ? 'Start' : 'Stop'}
          </Button>
          <Button variant="contained" size="medium" onClick={handleReset}>
            Reset
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Timer;
