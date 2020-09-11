<template>
  <div class="container-fluid" style="background-color:#fff">
    <Header />
    <div class="container cont-content">
      <section style="margin-top:80px">
        <div class="container">
          <div class="row">
            <div class="col-md-6 text-center offset-md-3 mt-4">
              <h1 class="title-test">
                Judul Live Test 1 yang Akan Diikuti Peserta (Full Judul Live Test)
              </h1>
              <h1 class="title-penyelenggara">
                Penyelenggara Ujian
              </h1>
            </div>
            <div class="col-md-12 mt-3 div-left">
              <div class="row">
                <div class="col-md-4 offset-md-1 pt-3 text-center mt-2 div-left-2">
                  <img :src="imageData" class="card-img-top" alt="Card image" style="width:150px"><br>
                  <input ref="fileInput" @change="onFileChange" type="file" style="display:none">
                  <b-button @click="$refs.fileInput.click()" class="btn btn-block btn-primary mt-2">
                    Unggah Foto
                  </b-button>
                  <p>Format: .jpg, .jpeg, .png, (max 3MB).</p>
                </div>
                <div class="col-md-5">
                  <form @submit="checkForm" class="mt-3" method="POST">
                    <div class="form-group">
                      <label for="name">Nama lengkap</label>
                      <input id="name" v-model="name" name="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input id="email" v-model="email" name="email" type="email" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="no">No. HP</label>
                      <input id="no" v-model="no" name="no" type="number" class="form-control">
                    </div>
                    <input ref="formInput" @change="checkForm" type="submit" value="Submit" style="display:none">
                    <button @click="testAlert" class="btn btn-block btn-warning">
                      Lanjutkan ke Tes
                    </button>
                    <!-- <nuxt-link @click="$refs.formInput.click()" to="/biodata" class="btn btn-block btn-warning">
                      Lanjutkan ke Tes
                    </nuxt-link> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const Header = () => import('~/components/header/header')
export default {
  components: {
    Header
  },
  data () {
    return {
      text: '',
      name: '',
      email: '',
      no: null,
      imageData: 'https://bbpsdmp-medan.kominfo.go.id/wp-content/uploads/2019/04/Pas%20Foto%203x4.jpg'
    }
  },
  methods: {
    onFileChange (e) {
      const DataImg = e.target.files[0]
      this.imageData = URL.createObjectURL(DataImg)
    },
    checkForm (e) {
      if (this.text) {
        return true
      }
      alert('mulai')
      e.preventDefault()
    },
    testAlert () {
      alert('Mulai Test')
    }
  }
}
</script>
<style scoped>
html {
    scroll-behavior: smooth;
}

.card-bottom {
    width: 80%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto
}

.bg-text {
    color: rgba(30, 156, 215, 1);
    text-align: left;
    font-family: Elliot Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    color: rgba(30, 156, 215, 1);
}

.bg-primarys {
    padding: 6px;
    background-color: #1e9cd7;
    color: white;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
}

.text-black {
    color: black
}

.tabs>ul {
    background-color: 1e9cd7;
    color: white
}

p {
    color: black
}

.breadcrumb-item.active {
    color: white
}

hr {
    border: 0;
    margin-bottom: 1px;
    border-top: 10px solid rgba(0, 0, 0, 0.1);
}

.cont-content {
    background-color: #fff;
    border-radius: 5px
}

.title-test {
    font-size: 20px;
    color: #3f3f3f;
    font-family: ElliotSans-Bold
}

.title-penyelenggara {
    font-size: 17px;
    color: #808080;
    font-family: ElliotSans-Medium
}

.div-left {
    border-top: 2px solid #9f9f9f
}

.div-left-2 {
    border-right: 2px solid #9f9f9f
}

@media (max-width: 767.98px) {
    .div-left-2 {
        border: 0;
    }
}
</style>
