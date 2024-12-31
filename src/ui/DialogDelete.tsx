import * as React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material'

type DialogDeleteProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const DialogDelete: React.FC<DialogDeleteProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#FF5722' }}>
          Отменить
        </Button>
        <Button
          onClick={onConfirm}
          sx={{ backgroundColor: '#FF5722', color: 'white' }}
          variant='contained'
          autoFocus
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDelete
