import React from 'react'
import { Tooltip, ClickAwayListener, Grid } from '@mui/material'
import { Info } from 'lucide-react'

const spicyLevels = [
  'Не остро',
  'Слабо остро',
  'Умеренно остро',
  'Остро',
  'Очень остро'
]

type ProductInfoDialogProps = {
  open: boolean
  onClose: () => void
  pizza: {
    spicyLevel: number
    deliveryTime: number
    preparationTime: number
    calories: number
  }
}

const ProductInfoDialog = ({ onClose, pizza }: ProductInfoDialogProps) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setTooltipOpen(false)
    onClose()
  }

  const handleTooltipOpen = () => {
    setTooltipOpen(true)
  }

  return (
    <Grid
      container
      sx={{ justifyContent: 'center', width: '40px', marginTop: '6px' }}
    >
      <Grid item>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div className='space-y-3'>
                <p>
                  <strong>Спайс-уровень:</strong>{' '}
                  {spicyLevels[pizza.spicyLevel - 1]}
                </p>
                <p>
                  <strong>Время подготовки:</strong> {pizza.preparationTime}{' '}
                  минут
                </p>
                <p>
                  <strong>Время доставки:</strong> {pizza.deliveryTime} минут
                </p>
                <p>
                  <strong>Калории:</strong> {pizza.calories}
                </p>
              </div>
            }
          >
            <div
              onClick={handleTooltipOpen}
              className='hover:cursor-pointer w-[20px] h-[20px] hover:text-[gray]'
            >
              <Info />
            </div>
          </Tooltip>
        </ClickAwayListener>
      </Grid>
    </Grid>
  )
}

export default ProductInfoDialog
