import React from 'react'
import { Text } from '@radix-ui/themes'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <Text as="h2">Something went wrong.</Text>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 