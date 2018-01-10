import _ from 'lodash'
import { PAGE_REGISTERED, PAGE_REQUESTED, PAGE_LOADED } from '../actions'

const selectSlice = state => _.get(state, 'pages')

export const selectPages = state => selectSlice(state)

const defaultState = {}

const defaultPage = (name, href) => ({
  name,
  href,
  registered: null,
  requested: null,
  loaded: null,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case PAGE_REGISTERED: {
      return {
        ...state,
        [action.name]: {
          ...defaultPage(action.name, action.href),
          registered: action.time,
        },
      }
    }

    case PAGE_REQUESTED: {
      return _.merge({}, state, { [action.name]: { requested: action.time } })
    }

    case PAGE_LOADED: {
      return _.merge({}, state, { [action.name]: { loaded: action.time } })
    }

    default:
  }
  return state
}
