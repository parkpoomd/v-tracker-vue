import * as types from '../../mutation-types'
import Vue from 'vue'
import { mapReportForStore } from './helpers'

export default {
  [types.STORE_REPORTS] (state, reports) {
    state.reports = reports
  },

  [types.FETCHING_REPORTS] (state, value) {
    state.fetchingReports = value
  },

  [types.ADD_REPORT] (state, report) {
    mapReportForStore(report)
    state.reports.push(report)
  },

  [types.DELETE_REPORT] (state, reportId) {
    const report = state.reports.filter(report => report.id === reportId)
    const reportIndex = state.reports.indexOf(report[0])
    state.reports.splice(reportIndex, 1)
  },

  [types.UPDATE_REPORT] (state, reportData) {
    mapReportForStore(reportData)
    const report = state.reports.filter(report => report.id === reportData.id)
    const reportIndex = state.reports.indexOf(report[0])
    Vue.set(state.reports, reportIndex, reportData)
  },

  [types.SELECT_REPORT] (state, report) {
    state.selectedReport = report
  }
}