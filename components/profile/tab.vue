<template>
  <div class="col-md-12">
    <div class="tile-1 tile">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs nav-justified" role="tablist">
        <li id="profile" class="nav-item">
          <nuxt-link
            id="profile-tab"
            to="/user/profile"
            class="nav-link"
            data-toggle="tab"
            role="tab"
            aria-controls="profile"
            aria-selected="true"
          >
            <i class="fa fa-edit" style="font-size: 16px;" /> Profile
          </nuxt-link>
        </li>
        <li id="histori" class="nav-item">
          <nuxt-link
            id="histori-tab"
            to="/user/histori"
            class="nav-link"
            data-toggle="tab"
            role="tab"
            aria-controls="histori"
            aria-selected="false"
          >
            <i class="fa fa-history" style="font-size: 16px;" /> Histori Saya
          </nuxt-link>
        </li>
        <li id="koleksi" class="nav-item">
          <nuxt-link
            id="koleksi-tab"
            to="/user/koleksi"
            class="nav-link"
            data-toggle="tab"
            role="tab"
            aria-controls="koleksi"
            aria-selected="false"
          >
            <i class="fa fa-book" style="font-size: 16px;" /> Koleksi Saya
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabComponent',
  props: {
    active: { type: String, required: true, default: '1' }
  },
  mounted () {
    if (this.active === '1') {
      this._actionUpdateClassProfile()
    } else if (this.active === '2') {
      this._actionUpdateClassHistori()
    } else if (this.active === '3') {
      this._actionUpdateClassKoleksi()
    }
  },
  methods: {
    _actionUpdateClassProfile () {
      document.getElementById('profile-tab').classList.add('active')
      document.getElementById('profile').classList.add('active-li')
    },
    _actionUpdateClassHistori () {
      document.getElementById('histori-tab').classList.add('active')
      document.getElementById('histori').classList.add('active-li')
    },
    _actionUpdateClassKoleksi () {
      document.getElementById('koleksi-tab').classList.add('active')
      document.getElementById('koleksi').classList.add('active-li')
    }
  }
}
</script>

<style>
  .tile {
    width:100%;
    margin:10px auto;
  }
  .tile-1 .nav-tabs {
    background-color:#fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    border-radius:6px;
  }
  .tile-1 .nav-tabs li {
    border: 0.4px solid #1e9cd7;
    border-radius:6px;
  }
  .tile-1 .nav-tabs li:hover {
    border: 1.5px solid #fec810 !important;
    border-bottom: 5px solid #fec810 !important;
    border-radius:6px;
  }
  .active-li {
    border: 1.5px solid #1e9cd7 !important;
    border-bottom: 5px solid #1e9cd7 !important;
    border-radius:6px !important;
  }
  .tile-1 .nav-tabs li a {
    position:relative;
    margin-right:0px!important;
    font-size:16px;
    color:#1e9cd7;
  }
  .tile-1 .nav-tabs a:hover {
    color: #fec810 !important;
  }
  .tile-1 .nav-tabs .active {
    color:#1e9cd7!important;
  }
</style>
