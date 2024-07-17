import { Box } from 'theme-ui'

const Hotkey = ({ children }) => {
  return (
    <Box
      as="span"
      sx={{
        borderRadius: 5,
        px: 2,
        py: 1,
        lineHeight: '15px',
        bg: 'text',
        color: 'background',
        fontFamily: 'monospace',
        fontSize: 15,
        mx: 2,
      }}
    >
      {children}
    </Box>
  )
}

export default Hotkey
