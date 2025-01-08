import { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { clearItems } from '../../redux/cart/slice'
import { DialogDelete } from '../DialogDelete'
export const CartHeader = () => {
  const dispatch = useDispatch()

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleConfirmDelete = () => {
    dispatch(clearItems())
    setOpenDialog(false)
  }
  return (
    <div>
      <div className='py-[20px] dark:bg-mainBgColor flex items-center justify-between fixed top-0 left-0 pl-[5%] pr-[5%] right-0 shadow-md bg-white z-50'>
        <div className='flex items-center dark:text-mainTextColor'>
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
          <p className='text-[30px] sm:text-[18px] font-[600]'>Корзина</p>
        </div>
        <div
          className='flex items-center dark:text-mainTextColor hover:text-[#696868] hover:cursor-pointer'
          onClick={handleOpenDialog}
        >
          <DeleteIcon sx={{ fontSize: '24px' }} />
          <span className='text-[20px] font-[600] sm:text-[18px]'>
            Очистить корзину
          </span>
        </div>
      </div>
      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title='Удалить всю корзину?'
        message='Вы уверены, что хотите удалить все товары из корзины? Это действие невозможно отменить'
      />
    </div>
  )
}

