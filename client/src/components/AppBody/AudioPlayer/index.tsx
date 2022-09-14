import {
  Pause, PlayArrow, VolumeOff, VolumeUp,
} from '@mui/icons-material';
import {
  Paper, Slider, Stack, IconButton, useMediaQuery,
} from '@mui/material';
import { LocalSettingsContext } from 'context/localSettings';
import React from 'react';
import configuration from 'utils/configuration';

let audio: HTMLAudioElement | null = null;

function AudioPlayer() {
  const { settings, setSettings } = React.useContext(LocalSettingsContext);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const matches = useMediaQuery('(max-width:780px)');

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
        width: matches ? '85vw' : '80%',
        maxWidth: matches ? 'none' : '20rem',
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <IconButton onClick={togglePlay}>
          {playing ? (
            <Pause fontSize="large" color="primary" />
          ) : (
            <PlayArrow fontSize="large" color="primary" />
          )}
        </IconButton>
        <IconButton onClick={toggleMute}>
          {settings.volume === 0 ? <VolumeOff fontSize="large" color="action" /> : <VolumeUp fontSize="large" color="primary" />}
        </IconButton>
        <Slider
          aria-label="Volume"
          value={Math.round(settings.volume * 100)}
          onChange={handleVolume}
          color={settings.volume === 0 ? 'secondary' : 'primary'}
        />
      </Stack>
    </Paper>
  );
}

export default AudioPlayer;
