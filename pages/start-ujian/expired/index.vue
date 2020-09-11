<template>
  <div class="container">
    <div class="text-center" style="margin-top: 100px">
      <h1>Waktu Ujian Telah Selesai</h1>
    </div>
    <div class="col-12 ml-3">
      <h4 class="h4 bg-text">
        Rekomendasi Tes Lainnya
      </h4>
    </div>
    <div class="col-12">
      <h5 class="h4 text-left bg-text pl-3">
        Ujian Bersama
      </h5>
      <Content />
      <h5 class="h4 text-left bg-text pl-3" style="margin-bottom: -10px">
        Quiz
      </h5>
      <QuizContent />
    </div>
  </div>
</template>

<script>
const Content = () => import('~/components/content/homepage')
const QuizContent = () => import('~/components/Quiz/Quiz')

export default {
  components: {
    Content,
    QuizContent
  }
}
</script>

<style scoped>
.brand {
    height: 40px;
    width: auto;
  }
</style>
