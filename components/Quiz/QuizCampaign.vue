<template>
  <div>
    <h4 class="h4 text-left bg-text" style="margin-top:20px;">
      Rekomendasi Test lainnya
    </h4>
    <br>
    <div v-if="showDatas" class="row">
      <div class="col-12">
        <carousel-3d :controls-visible="true" :height="398" :width="260" :space="250">
          <slide v-for="(item ,i ) in items " :key="item._id" :index="i" style="border-radius: 12px">
            <router-link :to="{ path :'/quiz/'+ item.quiz_slug , query: { id:item._id }}" target="_blank" rel="noopener noreferrer">
              <div class="card">
                <div class="card-body">
                  <div class="text-center" style="margin-bottom: 10px">
                    <img v-if="item.quiz_banner" v-lazy.container="pathBanner + item.quiz_banner" :alt="item.quiz_banner" class="img-fluid">
                    <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
                  </div>
                  <p class="card-title title-book">
                    {{ item.judul_quiz }}
                  </p>
                  <div v-if="item.is_private">
                    <i class="fa fa-lock" />
                    <span class="badge badge-pill badge-primary"> Quiz </span>
                  </div>
                  <div v-else>
                    <i v-if="item.is_private" class="fa fa-users " />
                    <span class="badge badge-pill badge-primary"> Quiz </span>
                  </div>
                  <p class="card-text title-penyelenggara">
                    {{ item.penyelenggara }}
                  </p>
                  <div style="align-self-center">
                    <p class="text-center title-date">
                      <i class="fa fa-calendar-o" />
                      {{ _formatDate(item.start_date) }}
                      <span class="text-date">({{ item.times }}-{{ item.end_times }})</span>
                    </p>
                  </div>
                  <div class="text-center" />
                </div>
              </div>
            </router-link>
          </slide>
        </carousel-3d>
      </div>
    </div>
    <div v-else class="row mt-4 pt-3">
      <div v-for="i in v" :key="i" class="col-md-3">
        <content-loader
          :height="475"
          :width="400"
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
        >
          <rect
            x="12"
            y="210"
            rx="4"
            ry="4"
            width="269"
            height="13"
          />
          <rect
            x="-51"
            y="-223"
            rx="5"
            ry="5"
            width="416"
            height="416"
          />
          <rect
            x="37.56"
            y="317.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="11"
            y="237"
            rx="4"
            ry="4"
            width="269"
            height="13"
          />
          <rect
            x="37.56"
            y="335.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="38.56"
            y="356.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="37.56"
            y="376.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
        </content-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'QuizCampaign',
  components: {
    ContentLoader, Carousel3d, Slide
  },
  data () {
    return {
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      v: 8,
      swiperOption: {
        slidesPerView: 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4
          },
          768: {
            slidesPerView: 4.6
          },
          640: {
            slidesPerView: 1.6
          },
          320: {
            slidesPerView: 1.6
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      items: state => state.quiz.quizs,
      showDatas: state => state.quiz.showDatas
    })
  },
  mounted () {
    this.$store.dispatch('quiz/getQuiz')
  },
  methods: {
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    },
    onAfterSlideChange (index) {
      // eslint-disable-next-line no-console
      console.log('@onAfterSlideChange Callback Triggered', 'Slide Index ' + index)
    },
    onBeforeSlideChange (index) {
      // eslint-disable-next-line no-console
      console.log('@onBeforeSlideChange Callback Triggered', 'Slide Index ' + index)
    },
    onLastSlide (index) {
      // eslint-disable-next-line no-console
      console.log('@onLastSlide Callback Triggered', 'Slide Index ' + index)
    }
  }
}
</script>
<style scoped>
.card{
  min-height:376px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
}
.img-fluid {
  max-height: 218px;
  border-radius: 12px;
  min-height: 218px;
}
.title-book {
  font-size: 13px;
  color:#404040;
  font-family:ElliotSans-Medium;
}
.title-penyelenggara {
  font-size:12px;
  color:#808080;
  font-family:ElliotSans-Medium
}
.title-date {
  color:#557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  font-family: ElliotSans-Medium;
  padding: 5px;
  border-radius:8px
}
.button-detail {
  background-color:#557cbf;
  max-width: 97px;
  height: 30px;
  border-radius: 8px;
}
.button-detail:hover {
  background-color: #0069d9;
}
.title-button-detail {
  font-size:10px;
  color:#fff;
  font-family:ElliotSans-Medium
}
@media (max-width: 575.98px) {
  .title-date {
    margin-top: -10px;
  }
  .button-detail {
    height: 20px;
  }
  .title-button-detail {
    margin-top: -3px;
  }
  .title-date {
    color:#557cbf;
    font-size:11px;
    padding: 3px;
  }
}
 @media (max-width: 375.98px) {
  .title-date {
    margin-top: -10px;
  }
  .title-book {
    height: 35px;
  }
}
@media (max-width: 767.98px) {
  .card{
    min-height: 100%;
    margin-bottom: 5px;
  }
  .img-fluid {
    max-height: 100px;
  }
  .title-penyelenggara {
    min-height: 30px;
  }
  .title-date {
    min-height: 0px !important;
  }
  .text-date {
    display: inline !important;
  }
}
@media (min-width: 768px) {
  .card{
    min-height: 100%;
    margin-bottom: 5px;
  }
  .img-fluid {
    max-height: 100px;
  }
  .title-book {
    min-height: 40px;
  }
  .title-date {
    min-height: 0px !important;
  }
  .text-date {
    display: inline !important;
  }
}
@media (max-width: 330.98px) {
  .title-button-detail {
    margin-top: -5px;
  }
  .button-detail {
    height: 30px;
  }
  .title-book {
    height: 70px;
  }
}
@media (max-width: 1199.98px) {
  .title-date {
    min-height: 40px;
  }
  .text-date {
    display: flex;
    flex-direction: column;
  }
}
img[lazy=loading] {
  /*your style here*/
  background-color: rgb(165, 157, 157);
}
img[lazy=error] {
  /*your style here*/
  background-color: rgb(144, 105, 105)
}
</style>
