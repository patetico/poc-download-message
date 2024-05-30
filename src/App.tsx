import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";

import {CopyAll, Download} from "@mui/icons-material";

import {MouseEventHandler, useCallback, useState} from "react";
import {Chip} from "@mui/material";

interface BasicCardParams {
  onDownload?: MouseEventHandler<HTMLButtonElement>;
}

function BasicCard(props: BasicCardParams) {
  const theme = useTheme();
  const btns = [
    <Button variant="outlined" startIcon={<Download />} onClick={props.onDownload}>
      Baixar boleto
    </Button>,
    <Button variant="outlined" startIcon={<CopyAll />}>
      Copiar linha digitável
    </Button>
  ]

  return (
    <Card sx={{display: 'flex'}}>
      <Box
        sx={{
          backgroundColor: theme.palette.success.light,
          width: 151,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 1
        }}
      >
        <Typography align={'center'}>
          3ª Parcela
          <Divider sx={{m: 1}} />
          Aberto
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', p: 1}}>
        <CardContent sx={{flex: '1 0 auto'}}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Valor da Parcela
          </Typography>
          <Typography component="div" variant="h5">
            R$ 1.234,56
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" component="div" sx={{mt: 1}}>
            Vencimento
          </Typography>
          <Typography component="div" variant="h6">
            11/04/2017
          </Typography>


          <ButtonGroup orientation="vertical" sx={{mt: 2}}>
            {btns}
          </ButtonGroup>
        </CardContent>
      </Box>
    </Card>
  );
}

const senha = '123456'.split('').map((ch) => (<Chip label={ch} size="small" variant="outlined" />))

type DownloadModalParams = {
  open?: boolean;
  onClose?(): void;
};

function DownloadModal({onClose, open}: DownloadModalParams) {
  const handleClose = useCallback(() => {
    if (onClose) onClose()
  }, [onClose])

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
  const [modalOpen, setModalOpen] = useState(false)

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
        <Container component="main" sx={{my: 6}} maxWidth="sm">
          <BasicCard onDownload={() => setModalOpen(true)} />
          <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Container>
      </Box>
    </>
  );
}


// ===============================================================================================================
