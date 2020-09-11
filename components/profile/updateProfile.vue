<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="title-konten text-center">
          Edit Profile
        </h2>
      </div>
      <div class="col-md-3">
        <div class="text-center">
          <img v-if="photo" :src="photo" class="m-x-auto img-fluid rounded-circle mb-1" alt="avatar" style="width: 70%">
          <img v-else src="~/assets/img/edu-wink.gif" class="m-x-auto img-fluid rounded-circle mb-1" alt="avatar" style="width: 70%">
          <div class="form-group">
            <label class="custom-file">
              <input type="file" class="custom-file-input" hidden>
              <h6>Upload a different photo</h6> <br>
              <span class="custom-file-control">Choose file</span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-9" style="border-left: 1px solid #e2e2e2">
        <ValidationObserver ref="form">
          <form @submit.prevent="_actionUpdate">
            <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="email"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  type="text"
                  disabled
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Nama" rules="required">
              <div class="form-group">
                <label for="nama">Nama Lengkap</label>
                <input
                  id="nama"
                  v-model="Form.user"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  type="text"
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Jenis Kelamin" rules="required">
              <div class="form-group">
                <label for="jenis_kelamin">Jenis Kelamin</label>
                <select v-model="Form.jenis_kelamin" :class="{'req-validate': errors.length > 0, 'form-control': true}">
                  <option value="">
                    Pilih Jenis Kelamin
                  </option>
                  <option value="LAKI-LAKI">
                    LAKI-LAKI
                  </option>
                  <option value="PEREMPUAN">
                    PEREMPUAN
                  </option>
                </select>
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Alamat" rules="min:3">
              <div class="form-group">
                <label for="address">Alamat</label>
                <input
                  id="address"
                  v-model="Form.address"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  type="text"
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <!-- Provinsi & Kota -->
            <div class="form-group row">
              <div class="col-md-6">
                <label for="provinsi">Provinsi</label>
                <ValidationProvider v-slot="{ errors }" name="Provinsi" rules="required">
                  <select
                    @change="_onChangeProv($event)"
                    v-model="Form.province_id"
                    @click="_actionGetProvince(Form.province_id)"
                    :class="{'req-validate': errors.length > 0, 'form-control': true}"
                    name="provinsi"
                  >
                    <option value="">
                      Pilih Provinsi
                    </option>
                    <option v-for="province in provinces" :key="province.id" :value="province.id">
                      {{ province.name }}
                    </option>
                  </select>
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <label for="kota" class="mt-2 mt-md-0 mt-lg-0">Kota</label>
                <ValidationProvider v-slot="{ errors }" name="Kota" rules="required">
                  <select
                    @change="_onChangeCity($event)"
                    v-model="Form.city_id"
                    :class="{'req-validate': errors.length > 0, 'form-control': true}"
                    name="city"
                  >
                    <option value="">
                      Pilih Kota
                    </option>
                    <option v-for=" city in cities" :key="city.id" :value="city.id">
                      {{ city.name }}
                    </option>
                  </select>
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-9">
                <label for="wilayah">Wilayah</label>
                <ValidationProvider v-slot="{ errors }" name="Wilayah" rules="required">
                  <select
                    @change="_onChangeDistrict($event)"
                    v-model="Form.district_id"
                    :class="{'req-validate': errors.length > 0, 'form-control': true}"
                    name="region"
                  >
                    <option value="">
                      Pilih Wilayah
                    </option>
                    <option v-for="district in districts" :key="district.id" :value="district.id">
                      {{ district.name }}
                    </option>
                  </select>
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-3">
                <label for="kode_pos" class="mt-2 mt-md-0 mt-lg-0">Kode Pos</label>
                <ValidationProvider v-slot="{ errors }" name="Zipcode" rules="">
                  <input v-model="Form.zip_code" class="form-control" type="text" placeholder="Kode Pos">
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <!-- End Code Provinsi & Kota -->
            <div class="form-group row">
              <div class="col-md-12">
                <label for="tempat_tgl-lahir">Tempat & Tanggal Lahir</label>
              </div>
              <div class="col-md-4">
                <ValidationProvider v-slot="{ errors }" name="Tahun" rules="required">
                  <select
                    v-model="Form.tahun_lahir"
                    :class="{'req-validate': errors.length > 0, 'form-control': true, 'mb-2 mb-md-0 mb-lg-0': true}"
                    @change="_onChangeYear($event)"
                    name="year"
                  >
                    <option value="">
                      Pilih Tahun
                    </option>
                    <option v-for="(year, index) in dataTahun" :key="index" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </ValidationProvider>
              </div>
              <div class="col-md-5">
                <ValidationProvider v-slot="{ errors }" name="Bulan" rules="required">
                  <select
                    v-model="Form.bulan_lahir"
                    @change="_onChangeMonth($event)"
                    :class="{'req-validate': errors.length > 0, 'form-control': true, 'mb-2 mb-md-0 mb-lg-0': true}"
                    name="month"
                  >
                    <option value="">
                      Pilih Bulan
                    </option>
                    <option v-for="(month, index) in dataBulan" :key="index" :value="month">
                      {{ month }}
                    </option>
                  </select>
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-3">
                <ValidationProvider v-slot="{ errors }" name="Tanggal" rules="required">
                  <select
                    v-model="Form.tanggal_lahir"
                    :class="{'req-validate': errors.length > 0, 'form-control': true}"
                    name="date"
                  >
                    <option value="">
                      Pilih Tanggal
                    </option>
                    <option v-for="(date, index) in dataTanggal" :key="index" :value="date">
                      {{ date }}
                    </option>
                  </select>
                  <span class="merah">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <ValidationProvider v-slot="{ errors }" name="Status">
              <div class="form-group">
                <label for="status">Status</label>
                <input
                  v-model="Form.status"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  class="form-control"
                  type="text"
                  placeholder="Pelajar, Umum, etc."
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Kelas">
              <div class="form-group">
                <label for="kelas">Kelas</label>
                <input
                  v-model="Form.kelas"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  class="form-control"
                  type="text"
                  value="Jane"
                  placeholder="1,2,3...9,10,11"
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Nama Sekolah" rules="min:3">
              <div class="form-group">
                <label for="nama_sekolah">Nama Sekolah</label>
                <input
                  v-model="Form.nama_sekolah"
                  :class="{'req-validate': errors.length > 0, 'form-control': true}"
                  class="form-control"
                  type="text"
                  placeholder=""
                >
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Nama Orang Tua" rules="min:3">
              <div class="form-group">
                <label label="nama_ortu">Nama Orang Tua</label>
                <input v-model="Form.nama_orangtua" class="form-control" type="text" value="Jane" placeholder="">
                <span class="merah">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <div class="form-group row text-center">
              <div class="col-md-12">
                <button class="btn btn-primary btn-block">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </validationobserver>
        <!-- Modal Submit -->
        <b-modal
          v-model="modalLoading"
          size="md"
          centered
          hide-footer
          hide-header
          body-bg-variant="default"
        >
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <div class="text-center">
                <img src="~/assets/img/edu-wink.gif" class="img-fluid" alt="~/assets/img/edu-wink.gif" style="width: 100px">
              </div>
              <h3 class="text-center">
                Loading ...
              </h3>
            </div>
          </div>
        </b-modal>
        <b-modal
          v-model="modalSubmit"
          size="md"
          centered
          hide-footer
          hide-header
          body-bg-variant="default"
        >
          <div class="row justify-content-center">
            <div v-if="responseSuccess === true" class="col-md-12 text-center">
              <i class="fa fa-check-circle" style="font-size: 120px; color: #5cb85c" />
              <h3 class="text-center">
                Berhasil Menyimpan!
              </h3>
            </div>
            <div v-else class="col-md-12 text-center">
              <i class="fa fa-times-circle" style="font-size: 120px; color: #d9534f" />
              <h3 class="text-center">
                Gagal Update Profile!
              </h3>
            </div>
          </div>
        </b-modal>
        <!-- End Modal Submit -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
export default {
  name: 'UpdateProfile',
  data () {
    return {
      user: null,
      uid: null,
      token: null,
      photo: '',
      Form: {},
      email: '',
      provinces: [],
      cities: [],
      districts: [],
      dataTahun: [],
      dataBulan: [],
      dataTanggal: [],
      intMonth: null,
      modalLoading: false,
      modalSubmit: false,
      responseSuccess: false
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email
        this.user = user.displayName
        this.Form.user = this.user
        this.photo = user.photoURL
        this.uid = user.uid
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetProfile(this.uid)
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      } else {
        this.$router.push('/login')
      }
    })
  },
  methods: {
    _actionGetProfile (id) {
      this.$axios.get(`https://api.edutore.com/api/v1/profile/${id}`, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const dataProfile = response.data
          if (response.data.success === 'true') {
            this.Form = dataProfile.data
            if (this.Form === null) {
              this.Form = {}
            }
            // eslint-disable-next-line no-console
            console.log(this.Form)
            this._actionGetProvince(this.Form.province_id)
            this._actionGetDistrict(this.Form.city_id)
            this._actionGetTglMoment()
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    },
    _actionGetProvince (id) {
      this.$axios.get('https://api.edutore.com/api/v1/province')
        .then((response) => {
          const dataProvince = response.data
          if (response.data.success === 'true') {
            this.provinces = dataProvince.data.rows
            this._actionGetCity(id)
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    },
    _actionGetCity (id) {
      this.$axios.get(`https://api.edutore.com/api/v1/city/` + id)
        .then((response) => {
          const dataCity = response.data
          if (response.data.success === 'true') {
            this.cities = dataCity.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    },
    _actionGetDistrict (id) {
      this.$axios.get(`https://api.edutore.com/api/v1/district/` + id)
        .then((response) => {
          const dataDistrict = response.data
          if (response.data.success === 'true') {
            this.districts = dataDistrict.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    },
    _onChangeProv (event) {
      const id = parseInt(event.target.value)
      const name = event.target.options[event.target.options.selectedIndex].text
      this.Form.province_id = id
      this.Form.province.name = name
    },
    _onChangeCity (event) {
      const id = parseInt(event.target.value)
      const name = event.target.options[event.target.options.selectedIndex].text
      this.Form.city_id = id
      this.Form.city.name = name
      this._actionGetDistrict(this.Form.city_id)
    },
    _onChangeDistrict (event) {
      const id = parseInt(event.target.value)
      const name = event.target.options[event.target.options.selectedIndex].text
      this.Form.district_id = id
      this.Form.district.name = name
    },
    async _actionGetTglMoment () {
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ]
      const totalTahun = 31
      let currentYear = new Date().getFullYear()
      // buat looping lalu tampung datanya di state
      for (let i = 0; i < totalTahun; i++) {
        this.dataTahun.push(currentYear--)
      }
      // buat looping untuk mendapatkan output bulan, yg mana didapat dari array nama bulan
      for (let m = 0; m < 12; m++) {
        const monthNum = new Date(currentYear, m).getMonth()
        const month = monthNames[monthNum]
        this.dataBulan.push(month)
      }
      await this._actionGetDate()
    },
    _actionGetDate () {
      const year = this.Form.tahun_lahir
      const month = this.Form.bulan_lahir
      this.dataTanggal = []
      if (month === 'Januari') {
        this.intMonth = 1
      } else if (month === 'Februari') {
        this.intMonth = 2
      } else if (month === 'Maret') {
        this.intMonth = 3
      } else if (month === 'April') {
        this.intMonth = 4
      } else if (month === 'Mei') {
        this.intMonth = 5
      } else if (month === 'Juni') {
        this.intMonth = 6
      } else if (month === 'Juli') {
        this.intMonth = 7
      } else if (month === 'Agustus') {
        this.intMonth = 8
      } else if (month === 'September') {
        this.intMonth = 9
      } else if (month === 'Oktober') {
        this.intMonth = 10
      } else if (month === 'November') {
        this.intMonth = 11
      } else {
        this.intMonth = 12
      }
      const days = new Date(year, this.intMonth, 0).getDate()
      for (let d = 1; d <= days; d++) {
        this.dataTanggal.push(d)
      }
    },
    _onChangeYear (event) {
      this.Form.tahun_lahir = parseInt(event.target.value)
      this.Form.tanggal_lahir = 1
      this._actionGetDate()
    },
    _onChangeMonth (event) {
      this.Form.bulan_lahir = event.target.value
      this._actionGetDate()
    },
    _actionUpdate () {
      this.modalLoading = true
      const data = this.Form
      // eslint-disable-next-line no-console
      console.log(data)
      this.$axios.post('https://api.edutore.com/api/v1/profile', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.modalSubmit = true
            this.responseSuccess = true
            setTimeout(() => {
              this.modalSubmit = false
              this.modalLoading = false
            }, 2000)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.modalSubmit = true
          setTimeout(() => {
            this.modalSubmit = false
            this.modalLoading = false
          }, 1500)
        })
    }
  }
}
</script>

<style scoped>
div {
  font-family: ElliotSans-Medium;
}
.profile-edit {
  min-height: 560px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
  padding-bottom: 10px;
}
h2 {
  font-family: ElliotSans-Bold;
}
.title-konten {
    padding: 30px 30px 0;
    font-weight: bold;
    color: #1e9cd7;
}
</style>
