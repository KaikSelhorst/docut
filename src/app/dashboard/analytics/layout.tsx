import {
  DashboardNavbar,
  DashboardNavbarLink
} from '@/components/dashboard-navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <DashboardNavbar>
        <DashboardNavbarLink href="/dashboard">Overview</DashboardNavbarLink>
        <DashboardNavbarLink href="/dashboard/analytics">
          Analytics
        </DashboardNavbarLink>
      </DashboardNavbar>
      {children}
    </>
  )
}
