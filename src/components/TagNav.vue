<template>
  <div class="hidden md:block">
    <span v-if="!notitle">Tags:</span>
    <div class="flex pb-4 flex-wrap items-start gap-2">
      <div
        class="badge mb-2"
        v-for="tag in $static.tags.edges"
        :key="tag.id"
        :class="`count-${tag.node.belongsTo.totalCount}`"
      >
        <g-link
          class="badge-link"
          :to="tag.node.path"
        >{{tag.node.id}} ({{tag.node.belongsTo.totalCount}})</g-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    notitle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<static-query>
query Tag {
  tags: allTag (sort:[{by:"title", order:ASC} ] ) {
    totalCount
  	edges {
      node {
        id
        path
        title
        belongsTo {
          totalCount
        }
      }
    }
  }
}
  </static-query>

  <<style lang="scss" scoped>
//   .count-2, .count-3 {
//     @apply text-lg
//   }
//   .count-4, .count-5 {
//     @apply text-xl
//   }
//   .count-6 , .count-7 {
//      @apply text-2xl
//   }
//   @for $i from 8 through 25 {

//   .count-#{$i} {
//     @apply text-3xl
//   }
// }

  </style>