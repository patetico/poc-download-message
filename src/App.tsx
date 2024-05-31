import { CopyAll, Download } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { MouseEventHandler, useCallback, useState } from 'react';


interface BasicCardParams {
  onDownload?: MouseEventHandler<HTMLButtonElement>;
}


const download = (() => {
  const anchor = document.createElement('a');
  anchor.href = './teste-protected.pdf';
  return () => anchor.click();
})();

function BasicCard(props: BasicCardParams) {
  const theme = useTheme();
  const btns = [
    <Button variant="outlined" startIcon={<Download />} onClick={props.onDownload}>
      Baixar boleto
    </Button>,
    <Button variant="outlined" startIcon={<CopyAll />}>
      Copiar linha digitável
    </Button>,
  ];

  return (
    <Card sx={{ display: 'flex' }}>
      <Box
        sx={{
          backgroundColor: theme.palette.success.light,
          width: 151,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 1,
        }}
      >
        <Typography align={'center'}>
          3ª Parcela
          <Divider sx={{ m: 1 }} />
          Aberto
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Valor da Parcela
          </Typography>
          <Typography component="div" variant="h5">
            R$ 1.234,56
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ mt: 1 }}>
            Vencimento
          </Typography>
          <Typography component="div" variant="h6">
            11/04/2017
          </Typography>
          <ButtonGroup orientation="vertical" sx={{ mt: 2 }}>
            {btns}
          </ButtonGroup>
        </CardContent>
      </Box>
    </Card>
  );
}

const senha = '123456'.split('').map((ch) => (<Chip label={ch} size="small" variant="outlined" />));

type DownloadModalParams = {
  open?: boolean;
  onClose?(): void;
  showSpinner?: boolean;
};

function DownloadModal({ onClose, open, showSpinner }: DownloadModalParams) {
  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  return (
    <>
      <Dialog open={!!open} onClose={handleClose}>
        <DialogTitle>
          Senha do PDF
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para abrir o arquivo, utilize a senha abaixo
            <Typography>{senha}</Typography>
            {showSpinner && <CircularProgress sx={{ mx: 'auto', mt: 2 }} />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Entendi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [useSpinner, setUseSpinner] = useState(true);
  const [delay, setDelay] = useState(2500);
  const [isWaiting, setIsWaiting] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();

  const changeDelay = useCallback((_ev: Event, newVal: number | number[]) => {
    setDelay(newVal as number);
  }, [setDelay]);

  const delaySlider = (
    <Slider
      valueLabelDisplay="off"
      value={delay}
      onChange={changeDelay}
      step={100}
      min={0}
      max={10000}
    />
  );

  const spinnerCheckbox = (
    <Checkbox
      value={useSpinner}
      onChange={(_ev, newVal) => setUseSpinner(newVal)}
    />
  );

  const openModal = () => {
    setIsWaiting(true);
    setTimeoutId(setTimeout(
      () => {
        setIsWaiting(false);
        download();
      },
      delay,
    ));
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsWaiting(false);
    clearTimeout(timeoutId);
    setModalOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
        }}
      >
        <Container component="main" sx={{ my: 6 }} maxWidth="sm">
          <BasicCard onDownload={openModal} />
          <DownloadModal
            open={modalOpen}
            onClose={closeModal}
            showSpinner={useSpinner && isWaiting}
          />
          <FormGroup>
            <FormControlLabel control={spinnerCheckbox} label="Adicionar spinner" />
            <Typography variant="body1">
              Delay: {(delay / 1000).toFixed(1)}s
            </Typography>
            {delaySlider}
          </FormGroup>
        </Container>
      </Box>
    </>
  );
}


// ===============================================================================================================
