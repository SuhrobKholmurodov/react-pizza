import { useLocalization } from '../../hooks';
import { EmptyContent } from '../EmptyContent';
import { CartHeader } from './CartHeader';

export const CartEmpty = () => {
  const { t } = useLocalization();
  return (
    <div>
      <CartHeader />
      <div className='h-[100vh]'>
        <EmptyContent
          title={t('cartEmpty.emptyTitle')}
          subtitle={t('cartEmpty.emptySubTitle')}
          showButton={true}
        />
      </div>
    </div>
  );
};