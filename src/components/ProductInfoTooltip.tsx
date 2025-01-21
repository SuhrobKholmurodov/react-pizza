import React from 'react'
import { Tooltip, ClickAwayListener, Grid } from '@mui/material'
import { Info } from 'lucide-react'
import { useLocalization } from '../hooks/useLocalization'

type ProductInfoTooltipProps = {
  open: boolean
  onClose: () => void
  pizza: {
    spicyLevel: number
    deliveryTime: number
    preparationTime: number
    calories: number
  }
}

export const ProductInfoTooltip = ({
  onClose,
  pizza
}: ProductInfoTooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false)
  const { t } = useLocalization()
  const spicyLevels = [
    t('productInfoTooltip.notSpicy'),
    t('productInfoTooltip.mildlySpicy'),
    t('productInfoTooltip.moderatelySpicy'),
    t('productInfoTooltip.spicy'),
    t('productInfoTooltip.verySpicy')
  ]

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
                  <strong>{t('productInfoTooltip.spiceLevel')}:</strong>{' '}
                  {spicyLevels[pizza.spicyLevel - 1]}
                </p>
                <p>
                  <strong>{t('productInfoTooltip.prepTime')}:</strong>{' '}
                  {pizza.preparationTime} {t('productInfoTooltip.minutes')}
                </p>
                <p>
                  <strong>{t('productInfoTooltip.deliveryTime')}:</strong>{' '}
                  {pizza.deliveryTime} {t('productInfoTooltip.minutes')}
                </p>
                <p>
                  <strong>{t('productInfoTooltip.calories')}:</strong>{' '}
                  {pizza.calories}
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
