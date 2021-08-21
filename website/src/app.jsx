import { useState } from 'react';

import { JBX, HeaderH1, Text, Space, Container, Range, Box, A, CodeSnippet } from 'jbx';

import Blur from 'react-blur';

const exampleCode = `
// npm install react-blur
import Blur from 'react-blur'
[...]
<Blur blurRadius={5} img={'path.jpg'} />
`.trim();

function App() {
  const [blurSrc, blurSet] = useState(16);

  const blur = Math.max(blurSrc - 5, 0);

  return (
    <Container>
      <JBX accent={'#fdcb6e'} />
      <HeaderH1
        style={{
          fontWeight: 900,
          display: 'inline-block',
          width: 'auto',
          padding: '6px',
          backgroundColor: 'var(--accent-color)'
        }}
      >
        react blur
      </HeaderH1>
      <Space h={1} />
      <Text>React component for creating blurred backgrounds using canvas.</Text>
      <Space h={2} />
      <Blur
        img="/example-kyoto.jpg"
        blurRadius={blur}
        enableStyles
        style={{
          height: 'min(calc(100vmin - 48px), 500px)',
          width: 'min(calc(100vmin - 48px), 500px)'
        }}
      />
      <Box flex={1} padding={[1, 0]} style={{ maxWidth: 400 }}>
        <Text>
          Amount of blur <span style={{ color: '#666' }}>{blur}px</span>
        </Text>
        <Space h={1} />
        <Range
          aria-label="Animation Speed"
          type="range"
          value={blurSrc}
          onChange={(e) => blurSet(Number(e.target.value))}
          step={1}
          min={0}
          max={64}
        />
      </Box>
      <Space h={1} />
      <Text>How to use:</Text>
      <Space h={1} />
      <CodeSnippet>{exampleCode}</CodeSnippet>
      <Space h={2} />
      <Text>
        For more information see the{' '}
        <A href="https://github.com/javierbyte/react-blur">github repo</A>.
      </Text>
      <Space h={2} />
      <Text>
        Made by <A href="https://javier.xyz">javierbyte</A>.
      </Text>
    </Container>
  );
}

export default App;
