<template>
  <div style="background-color: #FAFAFA" class="container">
    <div class="tabsContainer">
      <div class="row">
        <div d-flex class="col-12">
          <b-nav justified>
            <b-nav-item>
              <button
                @click="_actionListerTab('live-quiz')"
                class="btn btn-block btn-primary live"
              >
                <i class="fa fa-map-pin" /> Sedang Berlangsung
              </button>
              <nuxt />
            </b-nav-item>
            <b-nav-item>
              <button
                @click="_actionListerTab('Semua-quiz')"
                class="btn btn-block btn-primary quiz"
              >
                <i class="fa fa-book" />
                Quiz
              </button>
            </b-nav-item>
            <b-nav-item>
              <button
                @click="_actionListerTab('Semua-ujian')"
                class="btn btn-block btn-primary ujian-bersama"
              >
                <i class="fa fa-book" />
                Ujian
              </button>
            </b-nav-item>
            <b-nav-item>
              <button
                @click="_actionListerTab('Ujian-mandiri')"
                class="btn btn-block btn-primary ujian-mandiri"
              >
                <i class="fa fa-leanpub" /> Ujian Mandiri
              </button>
            </b-nav-item>
          </b-nav>
        </div>
      </div>
      <nuxt-child />
    </div>
    <div class="row">
      <div v-if="tabIndex ==='live-quiz'" class="col-md-12">
        <h3 class="h4 pt-1 pl-2 ml-1">
          Live  Quiz
        </h3>
        <LiveQuiz />
        <hr>
        <h3 class="h4 pt-1 pl-2 ml-1">
          Live  Ujian
        </h3>
        <LiveUjian />
      </div>
      <div v-else-if="tabIndex =='Semua-quiz'" class="col-md-12">
        <h3 class="h4 pt-1 pl-2 ml-1">
          <nuxt-link to="/quiz">
            Semua Quiz
          </nuxt-link>
        </h3>
        <QuizContent />
      </div>
      <div v-else-if="tabIndex ==='Semua-ujian'" class="col-md-12">
        <h3 class="h4 pt-1 pl-2 ml-1">
          <nuxt-link to="/ujian">
            Semua Ujian
          </nuxt-link>
        </h3>
        <Ujian />
      </div>

      <div v-else-if="tabIndex ==='Ujian-mandiri'">
        <h3 class="h4 pt-1 pl-2 ml-1">
          Ujian Mandiri
        </h3>
      </div>
      <div v-else>
        <h3 class="h4 pt-1 pl-2 ml-1">
          Live Ujian / Quiz
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
const Ujian = () => import('~/components/ujian/ujian')
const QuizContent = () => import('~/components/Quiz/Quiz')
const LiveQuiz = () => import('~/components/live-quiz/live-quiz')
const LiveUjian = () => import('~/components/live-ujian/live-ujian')

export default {
  name: 'HomePage',
  components: { QuizContent, Ujian, LiveQuiz, LiveUjian },
  data () {
    return {
      items: [],
      loading: false,
      tabIndex: null,
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      show: false,
      title: 'Home Page Tes Edutore Live Ujian | Quiz '
    }
  },
  watch: {
    $route (to, from) {
      this.tabIndex = to.query.content
      const title = 'Tryout Edutore' + ' ' + to.query.content
      this.title = title
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial scale=1' },
        { hid: 'description', name: 'description', content: 'Test Edutore Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning' },
        { hid: 'description', property: 'og:title', content: 'Tes Edutore.com' },
        { name: 'keywords', content: 'Ujian SBMPTN , Ujian Pisikotes Ujian CPNS' },
        { hid: 'property', property: 'og:type', content: 'website' },
        { hid: 'description', property: 'og:type', content: 'video.movie' },
        { hid: 'description', property: 'og:url', content: 'http://www.imdb.com/title/tt0117500/' },
        { hid: 'description', property: 'og:image', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@Tes Edutore.com' },
        { name: 'twitter:title', content: 'Tes Edutore Twitter Card' },
        { name: 'twitter:description', content: 'Test Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning.' },
        { name: 'twitter:image', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' },
        { name: 'twitter:image:alt', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://tryout.edutore.net' }
      ],
      metaInfo: {
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        bodyAttrs: {
          class: ['dark-mode', 'mobile']
        }
      }
    }
  },
  mounted () {
    const tabIndex = this.$route.query.content
    if (tabIndex) {
      this.tabIndex = tabIndex
    } else {
      this.tabIndex = 'live-quiz'
      this.title += 'Home'
    }

    this.$ga.page({
      page: '/',
      title: 'Home page Tes Edutore',
      location: window.location.href
    })
  },
  methods: {
    _actionListerTab (tabIndex) {
      this.$router.push({
        query: { content: tabIndex }
      })
    }
  }
}
</script>

<style scoped>
.tabsContainer {
  padding-top: 65px;
  margin-top: 20px;
}
@media (max-width: 991.98px) {
  .quiz, .ujian-bersama, .ujian-mandiri {
    height: 62px;
  }
}
@media (max-width: 575.98px) {
  .nav-link {
    padding: 0.5rem 0.12rem;
  }
}
@media (max-width: 359.98px) {
  .nav-link {
    padding: 0.5rem 1rem;
  }
}
.tabs{
  font-weight: bold;
  align-content: center;
}
.content{
  margin-top: 24px;
}
.card{
    min-height:376px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
  }
  .img-fluid {
    min-height: 218px;
    width: 100%;
    border-radius: 12px 12px 0 0;
  }
  .bg-text {
    color: rgba(30,156,215,1)
  }
  .bg-primarys {
    padding: 7px;
    background-color: #1e9cd7;
    color: #FFFFFF;
    font-size: 20px;
    text-align: center;
    font-weight: 300
  }
  .text-button-nav {
    font-family:ElliotSans-Bold;
    color:#FFFFFF;
    text-decoration: none
  }
  .text-button-nav:hover {
    border-bottom: 2px solid #fec810
  }
  .title-book {
    font-size:13px;
    color:#404040;
    font-family:ElliotSans-Medium
  }
  .title-penyelenggara {
    font-size:12px;
    color:#808080;
    font-family:ElliotSans-Medium
  }
  .title-date {
    color:#557cbf;
    font-size:11px;
    border:1px solid #557cbf;
    font-family: ElliotSans-Medium;
    padding:5px;
    border-radius:8px
  }
  .button-detail {
    background-color:#557cbf;
    width:97px;
    height:20px;
    border-radius: 8px;
    padding-bottom:20px
  }
  .title-button-detail {
    font-size:10px;
    color:#fff;
    font-family:ElliotSans-Medium
  }
</style>
