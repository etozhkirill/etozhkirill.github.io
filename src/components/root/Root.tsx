import React from 'react';

import ThemeProvider from '@/components/ThemeProvider';
import GenericProps from '@/types/GenericProps';

// setup root providers here
export default function Root(props: GenericProps): React.ReactElement {
  return (
    <ThemeProvider>
      <div {...props} />
    </ThemeProvider>
  );
}
