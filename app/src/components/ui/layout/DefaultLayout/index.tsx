import { Stack, Title } from '@mantine/core';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

export function DefaultLayout(props: Props) {
  return (
    <main style={{padding: '2rem', maxWidth: 1000, margin: '0px auto'}}>
      <Stack>
       <Title order={1} className='heading2'>Contact Management App</Title>
        {props.children}
        </Stack>
    </main>
  )
}