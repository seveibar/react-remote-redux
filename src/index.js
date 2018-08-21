// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'remote-redux'

export type Props = {
  classes?: any,
  endpoint: string,
  localReducer?: (state: any, action: any) => any,
  initialState?: Object,
  middlewares?: Array<Function>,
  children: any
}

type State = {
  store: any
}

const handleRequest = endpoint => async (
  state: any,
  action: any,
  callback: Function
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ state, action }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(response => response.json())
    .then(response => {
      callback(response.newState)
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
        makeRequest: handleRequest(props.endpoint)
      })
    }
  }

  render = () => {
    const { endpoint, children } = this.props
    const { store } = this.state
    return <Provider store={store}>{children}</Provider>
  }
}

export default RemoteReduxProvider
