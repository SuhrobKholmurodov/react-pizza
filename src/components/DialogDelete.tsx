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

export const DialogDelete = ({
  open,
  onClose,
  onConfirm,
  title,
  message
}: DialogDeleteProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className='dark:bg-[#272730] dark:text-white'>
        {title}
      </DialogTitle>
      <DialogContent className='dark:bg-[#272730] dark:text-white'>
        <p>{message}</p>
      </DialogContent>
      <DialogActions className='dark:bg-[#272730]'>
        <Button
          onClick={onClose}
          sx={{ color: '#FF5722' }}
          className='dark:hover:bg-gray-700 dark:text-white'
        >
          Отменить
        </Button>
        <Button
          onClick={onConfirm}
          sx={{ backgroundColor: '#FF5722', color: 'white' }}
          variant='contained'
          autoFocus
          className='dark:bg-gray-800 dark:hover:bg-gray-700'
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
