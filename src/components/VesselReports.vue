<template>
  <VesselReportsList
    :reports="sortedReports"
    class="vessel-details-reports-list">
  </VesselReportsList>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VesselReportsList from './VesselReportsList.vue'

  export default {
    components: {
      VesselReportsList
    },

    computed: {
      ...mapGetters([
        'sortedReports',
      ])
    }
  }
</script>

<style scoped lang="scss">
  .vessel-details-reports-list {
    max-width: 1440px;
    margin: 0 auto;
  }
</style>
