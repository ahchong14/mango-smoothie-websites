import React from 'react'
import { Theme, Button, Card, Text } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

export default function Home() {
  return (
    <Theme>
      <div style={{ padding: '20px' }}>
        <Card style={{ maxWidth: '300px' }}>
          <Text size="6" weight="bold">Welcome to Mango Smoothie</Text>
          <Text as="p">Your healthy drink destination</Text>
          <Button>Learn More</Button>
        </Card>
      </div>
    </Theme>
  )
}
