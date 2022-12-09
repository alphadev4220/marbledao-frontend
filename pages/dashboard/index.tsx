import type { NextPage } from 'next'
import { AppLayout } from 'components/Layout/AppLayout'
import Dashboard from 'features/dashboard'
import { styled } from 'components/theme'

const DashboardPage: NextPage = () => {
  return (
    <AppLayout>
      <Container className="middle mauto">
        <Dashboard />
      </Container>
    </AppLayout>
  )
}

export default DashboardPage
const Container = styled('div', {})
