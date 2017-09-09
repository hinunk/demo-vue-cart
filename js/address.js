new Vue({
  el: ".container",
  data: {
    addressList: [],
    limitNum: 3,
    currentIndex: 0
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function () {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddressList: function () {
      axios
        .get("data/address.json")
        .then(response => {
          let res = response.data;
          this.addressList = res.result;
          console.log(this.addressList);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setDefault: function (addressId) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId === addressId) {
          address.isDefault = true
        } else {
          address.isDefault = false
        }
      });
    }
  }
});
