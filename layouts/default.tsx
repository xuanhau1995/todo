import { LayoutProps } from '@/types'
import { Box } from '@mui/material'

export function DefaultLayout({ children }: LayoutProps) {
  return (
    <Box>
      <Box>{children}</Box>
    </Box>
  )
}
