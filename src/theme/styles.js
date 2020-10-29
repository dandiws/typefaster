const styles = {
  Container: {
    p: 3,
    maxWidth: 1024,
  },
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
  h1: {
    variant: 'textStyles.display',
  },
  h2: {
    variant: 'textStyles.heading',
    fontSize: 5,
  },
  h3: {
    variant: 'textStyles.heading',
    fontSize: 4,
  },
  h4: {
    variant: 'textStyles.heading',
    fontSize: 3,
  },
  h5: {
    variant: 'textStyles.heading',
    fontSize: 2,
  },
  h6: {
    variant: 'textStyles.heading',
    fontSize: 1,
  },
  a: {
    color: 'primary',
    '&:hover': {
      color: 'secondary',
    },
  },
  pre: {
    variant: 'prism',
    fontFamily: 'monospace',
    fontSize: 1,
    p: 3,
    color: 'text',
    bg: 'muted',
    overflow: 'auto',
    code: {
      color: 'inherit',
    },
  },
  code: {
    fontFamily: 'monospace',
    color: 'secondary',
    fontSize: 1,
  },
  inlineCode: {
    fontFamily: 'monospace',
    color: 'secondary',
    bg: 'muted',
  },
  table: {
    width: '100%',
    my: 4,
    borderCollapse: 'separate',
    borderSpacing: 0,
    'th,td': {
      textAlign: 'left',
      py: '4px',
      pr: '4px',
      pl: 0,
      borderColor: 'muted',
      borderBottomStyle: 'solid',
    },
  },
  th: {
    verticalAlign: 'bottom',
    borderBottomWidth: '2px',
  },
  td: {
    verticalAlign: 'top',
    borderBottomWidth: '1px',
  },
  hr: {
    border: 0,
    borderBottom: '1px solid',
    borderColor: 'muted',
  },
  img: {
    maxWidth: '100%',
  },
}

export default styles
