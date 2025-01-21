import { useLocalization } from '../../hooks';
import { EmptyContent } from '../EmptyContent';

export const FavoritesEmpty = () => {
  const { t } = useLocalization();

  return (
    <EmptyContent
      title={t('favoritesEmpty.emptyTitle')}
      subtitle={t('favoritesEmpty.emptySubTitle')}
      showButton={true}
    />
  );
};