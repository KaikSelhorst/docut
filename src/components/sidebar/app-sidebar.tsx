'use client'

import type * as React from 'react'
import { Link } from 'lucide-react'

import { NavMain } from '@/components/sidebar/nav-projects'
import { NavUser } from '@/components/sidebar/nav-user'
import { NavLink } from '@/components/sidebar/nav-link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

const data = {
  projects: [
    {
      name: 'Links',
      url: '#',
      icon: Link
    }
    // {
    //   name: 'Trash',
    //   url: '#',
    //   icon: Trash
    // }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLink />
      </SidebarHeader>
      <SidebarContent>
        <NavMain projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
