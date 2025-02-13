import { getUnverifiedHealthcareProviders } from '@/server/data/provider'
import React from 'react'

const AdminPage = () => {
  const unverifiedProviders = getUnverifiedHealthcareProviders()

  return (
    <div>Admin Dashboard</div>
  )
}

export default AdminPage