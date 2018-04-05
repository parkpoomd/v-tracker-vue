<template>
  <div
    class="vessel-dashboard"
    :class="{ 'vessel-dashboard--full-width': !sidebarVisible }"
  >
    <h1 class="vessel-dashboard__header">Report details</h1>

    <affix
      relative-element-selector=".vessel-dashboard"
      :offset="{ top: -70, bottom: 0 }"
      @affix="shrinkReportSelect()"
      @affixtop="expandReportSelect()"
    >
      <ReportSelector
        class="vessel-dashboard__report-selector"
        :class="{ 'vessel-dashboard__report-selector--shrunk': shrinkReportSelector }"
        :reports="reversedReports"
      ></ReportSelector>
    </affix>

    <div
      class="vessel-dashboard__row"
    >
      <GoogleMap
        class="vessel-dashboard__row__item"
        :report="report"
        :fetchingReports="fetchingReports"
      ></GoogleMap>

      <div class="vessel-dashboard__row__item">
        <PositionData
          class="vessel-dashboard__row__item"
          :report="report"
          :fetchingReports="fetchingReports"
        ></PositionData>

        <NavigationData
          class="vessel-dashboard__row__item"
          :report="report"
          :fetchingReports="fetchingReports"
        ></NavigationData>
      </div>
    </div>

    <WeatherData
      class="vessel-dashboard__row__item"
      :report="report"
      :fetchingReports="fetchingReports"
    ></WeatherData>

    <RemainingOnBoard
      class="vessel-dashboard__item"
      v-if="!fetchingReports"
      :report="report"
      :previousReport="previousReport"
      :fetchingReports="fetchingReports"
    ></RemainingOnBoard>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GoogleMap from './GoogleMap.vue'
  import WeatherData from './WeatherData.vue'
  import PositionData from './PositionData.vue'
  import NavigationData from './NavigationData.vue'
  import RemainingOnBoard from './RemainingOnBoard.vue'
  import ReportSelector from './ReportSelector'

  export default {
    components: {
      GoogleMap,
      RemainingOnBoard,
      WeatherData,
      PositionData,
      NavigationData,
      ReportSelector
    },

    props: {
      componentProps: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        shrinkReportSelector: false
      }
    },

    computed: {
      ...mapGetters([
        'fetchingReports',
        'selectedReport',
        'sidebarVisible'
      ]),

      reports () {
        return this.componentProps.reports
      },

      reversedReports () {
        return [...this.componentProps.reports.reverse()]
      },

      report () {
        return this.selectedReport
      },

      previousReport () {
        const indexOfSelectedReport = this.reports.indexOf(this.report)
        return this.reports[indexOfSelectedReport + 1]
      }
    },

    methods: {
      shrinkReportSelect () {
        this.shrinkReportSelector = true
      },

      expandReportSelect () {
        this.shrinkReportSelector = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .vessel-dashboard {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .vue-affix.affix {
      transition: left 600ms;
      box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.5);
      background-color: $color-whitey;
      z-index: 100;
      left: 300px;
      right: 0;
    }

    &--full-width {
      .vue-affix.affix {
        left: 0px;
      }
    }

    &__report-selector {
      transition: all 600ms ease-in-out;
      &--shrunk {
        height: 140px;
        transform: scale(0.7);
      }
    }

    &__header {
      padding-top: 50px;
      text-align: center;
    }

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;

      &__item {
        margin-top: 40px;
        min-width: 49%;
      }
    }

    &__item {
      margin-top: 40px;
    }
  }
</style>