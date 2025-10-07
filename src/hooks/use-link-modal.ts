import { useEffect, useState } from 'react'
import { MemoryState } from '@/helpers/create-memory-state'

interface Link {
  id: string
  shortedUrl: string
  originalUrl: string
}

const genID = (state: Array<any>) => state.length.toString()

const memory = new MemoryState<Link>({
  removeCondition: (l, r) => l.id === r.id
})

interface CreateLinkModalProps {
  originalUrl: string
  shortedUrl: string
}

function createLinkModal(data: CreateLinkModalProps) {
  const id = genID(memory.db.state)

  memory.dispatch({
    type: memory.actions.ADD,
    data: {
      id,
      ...data
    }
  })

  return { id }
}

function useLinkModal() {
  const [state, setState] = useState(memory.db)

  useEffect(() => {
    memory.listeners.push((state) => setState(state))
    return () => {
      const index = memory.listeners.indexOf(setState)
      if (index > -1) {
        memory.listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    createLinkModal,
    ...state
  }
}

export { createLinkModal, useLinkModal }
