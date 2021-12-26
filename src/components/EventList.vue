<template>
  <div>
    <!-- Day Filters -->
    <div class="flex gap-2 mb-4 mt-4 flex-wrap">
      <div
        v-for="filter in dayFilters"
        :key="`filter-day-${filter.value}`"
        class="relative"
      >
        <input
          type="radio"
          :value="filter.value"
          :id="`filter-${filter.value}`"
          v-model="day"
          name="event-day"
          class="appearance-none absolute"
        >
        <label
          class=" block btn-radio border-2 border-accent-600 p-2  cursor-pointer hover:bg-accent-600"
          :for="`filter-${filter.value}`"
        >
          {{filter.label}}
        </label>
      </div>
    </div>
    <!-- End Filters -->

    <!-- Event List -->
    <transition-group
      class="grid grid-cols-1 md:grid-cols-5 m gap-8 mt-4"
      name="list"
      tag="dl"
    >
      <template v-for="(event, index) in filteredEvents">
        <dt
          class="bg-black-900 text-white col-span-2 lg:col-span-1 list-item"
          :key="`time${index}`"
        >
          <strong class="text-s block">{{ event.node.date | formatDate('dddd, Do MMM') }}</strong>
          <span
            class="text-3xl leading-5"
            v-html="$options.filters.formatTime(event.node.start_time, false, true)"
          ></span>
        </dt>
        <dd
          class="col-span-2 lg:col-span-4"
          :key="index"
        >
          <div class="flex justify-between flex-col">
            <div class="flex justify-between">
              <g-link
                v-if="event.node.hasContent"
                :to="event.node.path"
              >
                <h3 class="mb-1 text-2xl">{{ event.node.title }}</h3>
              </g-link>
              <h3
                v-else
                class="mb-1 text-2xl"
              >{{ event.node.title }}
              </h3>
              <!-- CTA Links -->
              <div class="flex">
                <template v-for="tag in event.node.tags">
                  <g-link
                    v-if='tag.title=="Talk"'
                    :key="`nav-${tag.id}`"
                    class="text-sm text-gray-400"
                    to="https://tv.bonfire.link/"
                    title="Watch the stream"
                  >
                    <svg
                      width="24"
                      height="19"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1280.000000 1066.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,1066.000000) scale(0.100000,-0.100000)"
                        fill="currentColor"
                        stroke="none"
                      >
                        <path d="M8423 10646 c-23 -8 -62 -25 -85 -39 -24 -14 -623 -606 -1333 -1316
l-1290 -1291 -855 853 c-911 910 -875 877 -969 877 -69 0 -145 -51 -182 -122
-23 -45 -25 -125 -4 -176 11 -26 254 -275 808 -830 l792 -792 -2215 0 c-1431
0 -2244 -4 -2296 -10 -115 -15 -187 -35 -282 -80 -101 -48 -155 -85 -236 -161
-114 -106 -200 -251 -248 -415 l-23 -79 -3 -3120 c-2 -3432 -6 -3207 58 -3373
48 -124 98 -200 200 -303 103 -104 188 -161 314 -210 165 -64 -304 -59 5826
-59 6130 0 5661 -5 5826 59 122 48 212 107 310 205 98 98 157 188 205 310 63
162 59 -54 59 3335 -1 2535 -3 3099 -14 3161 -62 345 -310 613 -655 709 l-96
26 -2960 3 -2960 2 1247 1248 c1025 1025 1251 1257 1274 1302 37 72 41 182 8
226 -50 67 -131 89 -221 60z m577 -3740 c258 -42 485 -178 646 -388 95 -123
172 -306 194 -463 8 -57 10 -678 8 -2200 l-3 -2120 -23 -85 c-13 -47 -44 -130
-71 -185 -132 -276 -360 -464 -662 -547 l-84 -23 -3640 0 -3640 0 -82 22
c-189 50 -325 127 -458 258 -189 185 -281 383 -305 650 -13 149 -13 4012 0
4161 42 470 374 836 833 919 110 20 7165 21 7287 1z m2349 -1711 c205 -49 384
-229 431 -434 17 -71 17 -192 1 -261 -49 -209 -218 -382 -426 -435 -76 -19
-214 -19 -289 0 -152 40 -302 159 -369 295 -138 275 -52 594 204 760 56 36
149 73 209 83 59 10 180 6 239 -8z m-17 -1446 c162 -33 329 -162 400 -309 47
-97 62 -164 60 -275 -1 -160 -62 -295 -184 -411 -113 -107 -246 -157 -409
-156 -371 4 -642 362 -549 726 40 157 139 284 288 369 102 57 271 81 394 56z" />
                      </g>
                    </svg>
                  </g-link>
                  <g-link
                    v-if='tag.title=="Convo"'
                    :key="`nav-${tag.id}`"
                    class="text-sm text-gray-400 flex"
                    title="Join the Conversation"
                    to="https://discord.gg/5gQJxfX7"
                  >
                    <svg
                      width="20"
                      height="25"
                      viewBox="0 0 71 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="ml-2"
                    >
                      <g clip-path="url(#clip0)">
                        <path
                          d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect
                            width="71"
                            height="55"
                            fill="white"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </g-link>
                  <g-link
                    v-if='tag.title=="Art"'
                    :key="`nav-${tag.id}`"
                    class="text-lg text-gray-400 ml-2"
                    to="https://tv.bonfire.link/"
                    title="Watch the stream"
                  >
                    🔥
                  </g-link>
                </template>
              </div>
              <!-- END CTA Links -->
            </div>
          </div>

          <p
            class="mb-1 flex-1"
            v-html="event.node.excerpt"
          />
          <div class="flex mb-1 flex-wrap">
            <div
              v-if="event.node.day"
              class="badge mb-1"
            > Day {{event.node.day}}
            </div>
            <template v-if="event.node.tags">
              <div
                class="badge badge-light mb-1"
                v-for="tag in event.node.tags"
                :key="tag.id"
              >
                <g-link
                  class="badge-link"
                  :to="tag.path"
                >{{tag.id}}</g-link>
              </div>
            </template>
          </div>
        </dd>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      required: true,
    },
  },
  data() {
    return {
      dayFilters: [
        { value: "0", label: "Full Program" },
        { value: "1", label: "Day 1: Monday" },
        { value: "2", label: "Day 2: Tuesday" },
        { value: "3", label: "Day 3: Wednesday" },
        { value: "4", label: "Day 4: Thursday" },
      ],
      day: 0,
    };
  },
  computed: {
    filteredEvents() {
      if (this.day == 0) {
        return this.events.edges;
      }
      return this.events.edges.filter((event) => {
        return this.day.includes(event.node.day);
      });
    },
  },
  mounted() {
    let urlDay = this.$route.query.day;
    if ((urlDay && urlDay == 1) || urlDay == 2 || urlDay == 3 || urlDay == 4) {
      this.day = urlDay;
    }
  },
  methods: {
    editLink(path) {
      return `https://github.com/hack-along/EquinoxUnconf/tree/master/content/events/${path}`;
    },
  },
};
</script>
