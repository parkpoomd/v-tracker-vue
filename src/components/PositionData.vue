<template>
  <div class="position-data">
    <content-placeholders v-if="fetchingReports">
      <content-placeholders-img class="position-data__placeholder"></content-placeholders-img>
    </content-placeholders>
    <AccordionWrapper
      v-else
      :showOnInit="true"
    >
      <BaseBadge
        slot="header"
        title="Position"
        icon="IconPosition"
        color="red"
      />

      <div
        slot="body"
        class="position-info__body"
      >
        <BaseList
          class="position-info__list"
          :items="positionData"
          size="big"
        />
      </div>
    </AccordionWrapper>
  </div>
</template>

<script>
  import { decimalToDMS } from '../utils/coordinates-utils'
  import AccordionWrapper from './AccordionWrapper.vue'
  import BaseBadge from './BaseBadge.vue'
  import BaseList from './BaseList.vue'

  const NOT_PROVIDED = 'not provided'

  export default {
    components: {
      AccordionWrapper,
      BaseBadge,
      BaseList
    },

    props: {
      report: {
        type: Object
      },
      fetchingReports: {
        type: Boolean
      }
    },

    computed: {
      positionData () {
        let lat = 0
        let lng = 0

        if (this.report !== null) {
          lat = this.report.lat
          lng = this.report.lng
        }

        return [
          {
            title: 'Latitude',
            value: lat ? decimalToDMS(lat) : NOT_PROVIDED
          }, {
            title: 'Longitude',
            value: lng ? decimalToDMS(lng, false) : NOT_PROVIDED
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .position-data {
    margin-top: 0;

    &__placeholder {
      height: 210px;
    }

    .position-info {
      &__body {
        display: flex;
        justify-content: space-around;
        text-align: left;
        min-height: 150px;
      }

      &__list {
        padding: 0 20px;
      }
    }
  }
</style>
