<template>
  <LayoutCurtains>
    <template slot="hero">

      <hero-curtains :bg="heroBG"></hero-curtains>

    </template>
    <!-- intro section using grapQL -->
    <div
      id="assembly"
      class="my-20"
    >
      <h1>{{page.intro.title}}</h1>
      <span class="subtitle">{{page.intro.subtitle}}</span>
      <article
        class="prose prose-lg max-w-full"
        v-html="page.intro.content"
      ></article>
    </div>

    <!-- program -->
    <div id="program">
      <event-container
        :title="'Program'"
      />
    </div>

    <!-- self-organize -->
    <div
      id="self-organize"
      class="my-20"
    >
      <h2>{{page.selforganize.title}}</h2>
      <span class="subtitle">{{page.selforganize.subtitle}}</span>
      <article
        class="prose prose-lg max-w-full text-left"
        v-html="page.selforganize.content"
      ></article>

      <!-- Signals -->
      <h3 class="mt-6">{{page.signals.title}}</h3>
      <span class="subtitle">{{page.signals.subtitle}}</span>
      <article
        v-if="page.signals.content"
        class="prose prose-lg max-w-full"
        v-html="page.signals.content"
      ></article>

      <!-- Animated sprites -->
      <div class="card-grid-3 mt-4 mb-10">
        <sprite
          v-if="page.signal.feel"
          v-bind="page.signal.feel"
        ></sprite>
        <sprite
          v-if="page.signal.gotit"
          v-bind="page.signal.gotit"
        ></sprite>
        <sprite
          v-if="page.signal.move"
          v-bind="page.signal.move"
        ></sprite>
      </div>
    </div>

    <!-- Event details -->
    <div
      id="FAQ"
      class="my-10"
    >
      <div>
        <h2>{{page.faq.title}}</h2>
        <span class="subtitle">{{page.faq.subtitle}}</span>
        <article
          v-if="page.faq.content"
          class="prose max-w-full text-left"
          v-html="page.faq.content"
        ></article>
      </div>
    </div>
  </LayoutCurtains>
</template>

<static-query>
query Blocks {
  data: allBlocks {
    edges {
      node {
          title
          subtitle
          img
          content
          link
          emoji
          extraClass
          tags
          extraClassImg
          extraClassHeader
          fileName
      }
    }
  },
    metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>


<script>
export default {
  metaInfo() {
    return {
      meta: [
        // twitter-card: https://cards-dev.twitter.com/validator
        { name: "twitter:title", content: this.$static.metadata.siteName },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:description",
          content: this.$static.metadata.siteDescription,
        },
        { name: "twitter:image", content: this.getCoverImage },
        { property: "og:title", content: this.$static.metadata.siteName },
        { property: "og:url", content: this.getUrl },
        { property: "og:image", content: this.getCoverImage },
        {
          property: "og:description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
  data() {
    return {
      heroBG: "bg.png",
    };
  },
  methods: {
    splitString(string, node) {
      let name = string.split("_");
      let resultString = {};
      let count = name.length;
      if (count > 1) {
        resultString = {};
        for (var i = 1; i < count; i++) {
          resultString[name[i]] = node;
        }
      } else {
        resultString = node;
      }
      return [name[0], resultString];
    },
  },
  computed: {
    getCoverImage() {
      // @TODO: ADD A CARD FALLBACK IMG
      return this.$static.metadata.siteUrl + "card.jpg";
    },
    getUrl() {
      return this.$static.metadata.siteUrl;
    },
    page() {
      let cleanData = {};
      this.$static.data.edges.map((elem) => {
        let prop = elem.node.fileName;
        let object = this.splitString(prop, elem.node);
        if (cleanData.hasOwnProperty(object[0])) {
          Object.assign(cleanData[object[0]], object[1]);
        } else {
          cleanData[object[0]] = object[1];
        }
      });
      return cleanData;
    },
  },
};
</script>
