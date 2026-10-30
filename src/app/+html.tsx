import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { Colors } from '@/constants/theme';

const globalStyles = `
html, body, #root {
  background-color: ${Colors.background};
  color: ${Colors.text};
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
::selection {
  background-color: ${Colors.primarySubtle};
}
[role="button"] {
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease, box-shadow 150ms ease;
}
input {
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
:focus {
  outline: none;
}
[role="button"]:focus-visible {
  outline: 2px solid ${Colors.focusRing};
  outline-offset: 2px;
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Write down and manage your personal goals." />
        <meta name="theme-color" content={Colors.background} />
        <meta name="color-scheme" content="dark" />
        <title>Goal Tracker</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
