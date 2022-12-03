<template>
  <Layout>
    <div class="container my-12">
      <h1>Past Editions</h1>
      <div id="program">
      <event-container
        :title="'#01 Intersect - 2021'"
        :archive="true"
        :year="'2021'"
      />
    </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "2021 edition",
  },
};
</script>


