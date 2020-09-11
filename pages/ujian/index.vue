<template>
  <div class="container mt-5 pt-2">
    <div class="row">
      <div class="col-md-12">
        <AllUjian />
      </div>
    </div>
  </div>
</template>

<script>
const AllUjian = () => import('~/components/ujian/ujian')
export default {
  name: 'Ujian',
  components: { AllUjian }
}
</script>
