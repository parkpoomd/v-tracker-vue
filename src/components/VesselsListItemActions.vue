<template>
  <div class="vessels-list-item-actions">
    <router-link
      :to="editLink"
      class="edit-icon"
    >
      <BaseIcon
        width="40"
        height="40"
      >
        <IconPencil/>
      </BaseIcon>
    </router-link>
    <span
      data-test-vessels-list-item-actions-delete
      class="delete-icon"
      @click.prevent.stop="deleteVesselTask.run()"
    >
      <BaseIcon
        width="40"
        height="40"
      >
        <IconTrash/>
      </BaseIcon>
    </span>
  </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import IconPencil from './Icons/IconPencil.vue'
import IconTrash from './Icons/IconTrash.vue'

export default {
  components: {
    BaseIcon,
    IconPencil,
    IconTrash
  },

  props: {
    vesselId: {
      type: String,
      required: true
    },
    deleteVesselTask: {
      type: Object,
      required: true
    }
  },

  computed: {
    editLink () {
      return `/dashboard/vessels/${this.vesselId}/edit`
    }
  }
}
</script>

<style scoped lang="scss">
  .vessels-list-item-actions {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;

    .edit-icon, .delete-icon {
      color: $color-light-grey;
      transition: color 600ms;
    }

    .edit-icon:hover {
      color: $color-green;
    }

    .delete-icon:hover {
      color: $color-tomato;
    }
  }
</style>
