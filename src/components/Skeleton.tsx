import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <div className='flex flex-col items-center'>
    <ContentLoader
      speed={2}
      width={280}
      height={500}
      viewBox='0 0 280 500'
      backgroundColor='currentColor'
      foregroundColor='currentColor'
      className='text-gray-200 dark:text-gray-700'
    >
      <circle cx='134' cy='136' r='125' />
      <rect x='0' y='279' rx='10' ry='10' width='280' height='23' />
      <rect x='0' y='326' rx='10' ry='10' width='280' height='88' />
      <rect x='0' y='427' rx='10' ry='10' width='280' height='45' />
    </ContentLoader>
  </div>
);
