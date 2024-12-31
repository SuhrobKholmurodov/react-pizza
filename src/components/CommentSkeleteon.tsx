import ContentLoader from 'react-content-loader'

export const CommentSkeleteon = () => (
  <div className='flex flex-col items-center'>
    <ContentLoader height={1200} width={1060}>
      <rect x='103' y='12' rx='3' ry='3' width='123' height='7' />
      <rect x='102' y='152' rx='3' ry='3' width='171' height='6' />
      <circle cx='44' cy='42' r='38' />
      <circle cx='44' cy='147' r='38' />
      <circle cx='44' cy='251' r='38' />
      <rect x='105' y='117' rx='3' ry='3' width='123' height='7' />
      <rect x='104' y='222' rx='3' ry='3' width='123' height='7' />
      <rect x='105' y='48' rx='3' ry='3' width='171' height='6' />
      <rect x='104' y='257' rx='3' ry='3' width='171' height='6' />
    </ContentLoader>
  </div>
)
