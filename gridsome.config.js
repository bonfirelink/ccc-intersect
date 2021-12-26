// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const postcssPlugins = [
  tailwind(),
]

if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js')))

module.exports = {
  siteName: 'INTERSECT | An intentional assembly at CCC',
  siteDescription: "An intentional assembly, an ancient tradition, a crossroads where humans stop and gather to reflect before continuing their journey in life.",
  siteUrl: "https://intersect.bonfire.link/",
  titleTemplate: 'INTERSECT | An intentional assembly at CCC',
  templates: {
    Tag: [{
      path: '/event/tag/:title',
      component: './src/templates/Tag.vue'
    }]
  },
  plugins: [{
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Event', // Required
        baseDir: './content/events', // Where .md files are located
        pathPrefix: '/events', // Add route prefix. Optional
        template: './src/templates/Event.vue', // Optional
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'MdPage', // Required
        baseDir: './content/page', // Where .md files are located
        pathPrefix: '/', // Add route prefix. Optional
        template: './src/templates/Page.vue', // Optional
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blocks',
        baseDir: './content/blocks',
        pathPrefix: '/blocks',
        path: '*.md',
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
    }
  },
  chainWebpack: config => {
    config.plugin('MomentLocalesPlugin').use(MomentLocalesPlugin())
    config.resolve.alias.set('@images', '@/assets/img')
    config.externals(  (context, request, callback) => {
      if (/xlsx|canvg|pdfmake/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    })

  }
}
