import { Pagination, Stack } from '@mui/material'

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
}

export const CustomPagination = ({
  currentPage,
  onChangePage
}: PaginationProps) => (
  <Stack spacing={1}>
    <Pagination
      count={3}
      page={currentPage}
      onChange={(_, page) => onChangePage(page)}
      siblingCount={1}
      boundaryCount={1}
      sx={{
        '& .MuiPaginationItem-root': {
          color: '#F97316',
          borderColor: '#F97316'
        },
        '& .MuiPaginationItem-root:hover': {
          backgroundColor: 'rgba(249, 115, 22, 0.1)'
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor: '#F97316',
          color: '#fff'
        },
        '& .MuiPaginationItem-root.Mui-selected:hover': {
          backgroundColor: '#ea6b0e'
        }
      }}
    />
  </Stack>
)
