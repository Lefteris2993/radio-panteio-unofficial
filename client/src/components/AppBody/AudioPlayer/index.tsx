import {
  Pause, PlayArrow, VolumeOff, VolumeUp,
} from '@mui/icons-material';
import {
  Button, Paper, Slider, Stack, IconButton,
} from '@mui/material';
import { LocalSettingsContext } from 'context/localSettings';
import React from 'react';
import configuration from 'utils/configuration';

let audio: HTMLAudioElement | null = null;

function AudioPlayer() {
  const { settings, setSettings } = React.useContext(LocalSettingsContext);
  const [playing, setPlaying] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (audio !== null) {
      audio.volume = settings.volume;
    }
  }, [settings.volume]);

  const handleVolume = (event: Event, newValue: number | number[]) => {
    const volume = (newValue as number) / 100;

    setSettings({
      ...settings,
      volume,
    });
  };

  const toggleMute = () => {
    if (settings.volume === 0) {
      setSettings({
        ...settings,
        volume: 0.33,
      });
    } else {
      setSettings({
        ...settings,
        volume: 0,
      });
    }
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      audio?.pause();
      audio = null;
    } else {
      setPlaying(true);
      audio = new Audio(configuration.audioUrl);
      audio.volume = settings.volume;
      audio.play();
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '1rem',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:780px)']: {
          width: '85vw',
        },
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Button onClick={togglePlay}>
          { playing ? (
            <>
              <Pause />
              Pause
            </>
          ) : (
            <>
              <PlayArrow />
              Play
            </>
          )}
        </Button>
        <IconButton onClick={toggleMute}>
          {settings.volume === 0 ? <VolumeOff color="action" /> : <VolumeUp color="primary" />}
        </IconButton>
        <Slider aria-label="Volume" value={Math.round(settings.volume * 100)} sx={{ minWidth: '10rem' }} onChange={handleVolume} />
      </Stack>
    </Paper>
  );
}

export default AudioPlayer;
