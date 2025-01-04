import React, { useState, useEffect } from 'react'
import { Modal, Box, Button, TextField, Typography } from '@mui/material'
import InputMask from 'react-input-mask'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  handleSubmit: () => void
}
const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  handleSubmit
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('+992 ')

  useEffect(() => {
    if (!open) {
      setPhoneNumber('+992 ')
    }
  }, [open])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: 24,
          width: '400px'
        }}
        className='dark:bg-[#2e2e34] bg-white'
      >
        <Typography
          variant='h6'
          mb={2}
          textAlign='center'
          className='dark:text-white'
        >
          Введите данные для оплаты
        </Typography>

        <InputMask
          mask='+992 999 999 999'
          value={phoneNumber}
          onChange={handlePhoneChange}
        >
          {(inputProps: number[]) => (
            <TextField
              {...inputProps}
              label='Номер телефона'
              variant='outlined'
              fullWidth
              margin='normal'
              className='dark:bg-[#1b1b1f] dark:text-white'
            />
          )}
        </InputMask>

        <TextField
          label='Владелец карты'
          variant='outlined'
          fullWidth
          margin='normal'
          className='dark:bg-[#1b1b1f] dark:text-white'
        />

        <div className='flex justify-center mt-4'>
          <Button
            variant='contained'
            fullWidth
            sx={{ backgroundColor: '#FF8F00' }}
            onClick={() => {
              onClose()
              handleSubmit()
            }}
            className='dark:bg-[#FF6F00] dark:hover:bg-[#FF8F00] hover:bg-orange-600'
          >
            Заказать доставку
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default PaymentModal
