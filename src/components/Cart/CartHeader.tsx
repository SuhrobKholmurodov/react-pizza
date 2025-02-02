import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/redux/cart/selectors';
import { useLocalization } from '@/hooks';
import { clearItems } from '@/redux/cart/slice';
import { DialogDelete } from '../DialogDelete';

export const CartHeader = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useLocalization(); 

  const handleOpenDialog = () => {
    if (items.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    dispatch(clearItems());
    setOpenDialog(false);
  };

  return (
    <div>
      <div className='py-[20px] dark:bg-mainBgColor flex items-center justify-between fixed top-0 left-0 pl-[5%] pr-[5%] right-0 shadow-md bg-white z-50'>
        <div className='flex items-center dark:text-mainTextColor'>
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
          <p className='text-[30px] sm:text-[18px] font-[600]'>
            {t('cartHeader.cart')} 
          </p>
        </div>
        <div
          className={`flex items-center dark:text-mainTextColor ${
            items.length === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:text-[#696868] hover:cursor-pointer'
          }`}
          onClick={handleOpenDialog}
        >
          <DeleteIcon sx={{ fontSize: '24px' }} />
          <span className='text-[20px] font-[600] sm:text-[18px]'>
            {t('cartHeader.clearCart')} 
          </span>
        </div>
      </div>
      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title={t('cartHeader.dialogTitle')} 
        message={t('cartHeader.dialogMsg')} 
      />
    </div>
  );
};