# React Remote Redux

Remote Redux bindings for React with reasonable defaults.

## Example Usage

ReactRemoteRedux provides a [redux](https://github.com/reactjs/redux) store via [react-redux](https://github.com/reactjs/redux).
It uses [remote redux](https://github.com/seveibar/remote-redux) behind the scenes to compute the next state.

```
<ReactRemoteRedux endpoint="/api/reduce">
  <App />
</ReactRemoteRedux>
```

By default, the endpoint `/api/reduce` will be called with a POST request whenever an action matches the
condition `action.remote || action.type.startsWith('REMOTE_')`. The POST request will contain two parameters
`state` and `action`. The `state` is the complete redux store state on the client ([see this note on efficiency](#efficiency)). The POST request should return a JSON object with a key `newState` in it's body containing the next state of the application.

## Props

| Prop | Description | Example |
| ---- | ----------- | ------- |
| endpoint | Server endpoint to send POST request to. | "/api/reduce" |
| localReducer | `Optional` A reducer reducer of the form `(state, action) => state` | |
| initialState | `Optional` The default redux store state | `null` |
| initialAction | `Optional` An initial action to be executed, e.g. to perform the initial page load | `{ type: 'REMOTE_LOAD_PAGE', page: window.location.pathname }` |
| detectRemoteAction | `Optional` Method used to detect if the action should be sent to the server (remote reducer) | `action => action.remote || action.type.startsWith('REMOTE_')` |
| makeRequest | `Optional` Method to perform request to server of type `(state,action,newStateCallback) => any` | |
| applyResponse | `Optional` Method to apply the response from the server to create the new state | `(response) => response.newState` |

## Efficiency

If you're dealing with enough state (e.g. your state is hundreds of KB), you should intelligently
encode it before sending it to the server. There are a lot of ways to do this, you can have the server
remember the state of the client and have the client send up only mutations on the state, you can configure
actions to only send necessary state, and/or you can have the server only return the mutations of the
state rather than the entire state. To do these, look at overriding the `applyResponse` and `makeRequest`
props.


