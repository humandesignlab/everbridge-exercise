import React, { ChangeEvent, useEffect, useState } from 'react';
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

function Timer() {
  const [time, setTime] = useState(['00', '00', '00']);

  useEffect(() => {
    console.log(time);
  }, [time]);

  function handleTimeInput(e: InputEvent['event']) {
    let timeChunk = e.target.value;
    let timeChunksArray: string[] = [];
    setTime(timeChunksArray);
    for (let i = 0, charsLength = timeChunk.length; i < charsLength; i += 2) {
      timeChunksArray.unshift(timeChunk.substring(i, i + 2 || i + 1));
    }
    //setTime(timeChunksArray);
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
              />
            </Box>
            <Box className="inputViewContainer">
              <Typography gutterBottom variant="h5" component="div">
                {`${time[0] || ''}h ${time[1] || ''}m ${time[2] || ''}s`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="medium">
            Start
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
