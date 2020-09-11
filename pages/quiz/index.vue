<template>
  <div class="container mt-5 pt-2">
    <div class="row">
      <div class="col-md-12">
        <QuizContent />
      </div>
    </div>
  </div>
</template>

<script>
const QuizContent = () => import('~/components/Quiz/Quiz')
export default {
  name: 'Quiz',
  components: { QuizContent }
}
</script>
