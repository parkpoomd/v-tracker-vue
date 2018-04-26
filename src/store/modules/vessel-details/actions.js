import * as types from '../../mutation-types'

export default {
  toggleSidebar ({ commit }) {
    commit(types.SIDEBAR_VISIBLE)
  },

  selectVesselDetailsComponent ({ commit }, componentName) {
    commit(types.SELECTED_VESSEL_DETAILS_COMPONENT, componentName)
  }
}
