import { EmptyContent } from '../EmptyContent';
import { useLocalization } from '../../hooks/useLocalization';

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