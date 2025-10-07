interface State<T> {
  state: T[]
}

enum actions {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

interface MemoryConfig<T> {
  removeCondition: (data: T, removeData: T) => boolean
}

type Action<T> =
  | { type: actions.ADD; data: T }
  | { type: actions.REMOVE; data?: T }

export class MemoryState<T> {
  db: State<T> = { state: [] }
  listeners: Array<(state: State<T>) => void> = []
  actions = actions
  constructor(private readonly config: MemoryConfig<T>) {}

  reducer(state: State<T>, action: Action<T>) {
    switch (action.type) {
      case actions.ADD:
        return { state: [...state.state, action.data] }
      case actions.REMOVE:
        if (action.data === undefined) {
          return { state: [] }
        }

        return {
          state: state.state.filter(
            (s) => !this.config.removeCondition(s, action.data!)
          )
        }
    }
  }

  dispatch(action: Action<T>) {
    this.db = this.reducer(this.db, action)

    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i]
      listener(this.db)
    }
  }
}
