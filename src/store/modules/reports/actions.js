import * as types from '../../mutation-types'
import globalAxios from 'axios'
import { mapReportForStore, getLastReport } from './helpers'

export default {
  async createNewReport ({ getters, commit }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      const { data } = await globalAxios.post(`/reports.json?auth=${getters.idToken}`, reportData)
      const vesselId = reportData.vessel
      const reportId = data.name
      reportData = { ...reportData, id: reportId }
      await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: true })
      commit(types.ADD_REPORT, reportData)
    } catch (error) { throw error }
  },

  async updateReport ({ getters, commit }, reportData) {
    if (!getters.idToken) {
      return
    }
    try {
      Object.keys(reportData).map(objectKey => {
        return reportData[objectKey].toString()
      })

      await globalAxios.patch(`/reports/${reportData.id}.json?auth=${getters.idToken}`, reportData)
      commit(types.UPDATE_REPORT, reportData)
    } catch (error) { throw error }
  },

  async fetchReports ({ commit, dispatch }, vesselId) {
    dispatch('setFetchingReports', true)
    try {
      const { data } = await globalAxios.get(`/reports.json?orderBy="vessel"&equalTo="${vesselId}"`)
      const reports = []
      for (let key in data) { // add id to the report
        const report = data[key]
        report.id = key
        mapReportForStore(report)
        reports.push(report)
      }
      dispatch('storeReports', reports)
      dispatch('setFetchingReports', false)
      dispatch('selectReport', getLastReport(reports))
    } catch (error) { throw(error) }
  },

  storeReports ({ commit }, reports) {
    commit(types.STORE_REPORTS, reports)
  },

  setFetchingReports ({ commit }, value) {
    commit(types.FETCHING_REPORTS, value)
  },

  selectReport ({ commit }, report) {
    commit(types.SELECT_REPORT, report)
  },

  async deleteReport ({ getters, commit }, payload) {
    const { reportId, vesselId } = payload

    try {
      await globalAxios.delete(`/reports/${reportId}.json?auth=${getters.idToken}`)
      try {
        await globalAxios.patch(`vessels/${vesselId}/reports.json?auth=${getters.idToken}`, { [reportId]: null })
        commit(types.DELETE_REPORT, reportId)
      } catch (error) { throw(error) }
    } catch (error) { throw(error) }
  }
}
