<template>
  <div>
    <nuxt />
  </div>
</template>

<style scoped>
 .img-fluid {
    max-width: 40%;
    height: auto;
  }
  .bg-blues {
    background-color: white;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  .btn-block {
    border-radius: 8px;
    width: 120px
  }
  .detail-profile:hover {
    background-color: #007BFF;
  }
  .text-dropdown {
    color: #FFFFFF;
    margin: 10px ;
  }
  .navbar-brand {
    width: 200px
  }
  @media (max-width: 768px) {
  .mobile {
    float: left;
    width: 50%;
  }
  .login {
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
  }
  .register {
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
    margin-left: 10px;
  }
  }
  .desktop {
    float: left;
  }
  .textLogin {
    color: #FFFFFF;
  }
</style>
