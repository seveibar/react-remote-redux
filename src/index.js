// @flow

import React, { Component, createContext } from 'react'
import { Provider } from 'react-redux'

export type Props = {
  classes?: any,
  endpoint: string,
  localReducer?: (state: any, action: any) => any,
  initialState?: Object,
  middlewares?: Array<Function>,
  children: (state => any) | any
}

type State = {
  store: any
}

const RemoteReduxContext = createContext()
export const RemoteReduxConsumer = RemoteReduxContext.Consumer

const makeRequest = async () => {
  const response = await fetch(this.props.endpoint, {
    method: 'POST',
    body: JSON.stringify({ state, action }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(response => response.json())
    .then(response => {
      this.setState({ newState: response.newState })
    })
}

class RemoteReduxProvider extends Component<Props, State> {
  constructor(props: Props) {
    super()
    this.state = {
      store: createStore({
        reducer: props.localReducer || (state => state),
        initialState: props.initialState || null,
        middlewares: props.middlewares || [],
        makeRequest
      })
    }
  }

  render = () => {
    const { endpoint, children } = this.props
    const { store } = this.state
    return (
      <RemoteReduxContext.Provider
        value={{ state: store.getState(), dispatch: store.dispatch }}
      >
        {typeof children === 'function' ? children(reduxState) : children}
      </RemoteReduxContext.Provider>
    )
  }
}

export default RemoteReduxProvider
