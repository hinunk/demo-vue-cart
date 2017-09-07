var vm = new Vue({
  el: "#app",
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false
  },
  filters: {
    formatMoney: value => {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    });
  },
  methods: {
    cartView: function() {
      //let _this = this;
      axios
        .get("data/cartData.json")
        .then(response => {
          this.productList = response.data.result.list;
          this.totalMoney = response.data.result.list;
          console.log(response);
          console.log(this.productList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeMoney: (product, change) => {
      if (change > 0) {
        product.productQuantity++;
      } else {
        product.productQuantity--;
        if (product.productQuantity < 1) {
          product.productQuantity = 1;
        }
      }
    },
    selectedProduct: function(item) {
      if (typeof item.checked === "undefined") {
        //Vue.set(item, "checked", true);
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
    },
    checkAll: function() {
      this.checkAllFlag = !this.checkAllFlag;
      if (this.checkAllFlag) {
        this.productList.forEach((item, index) => {
          if (typeof item.checked === "undefined") {
            this.$set(item, "checked", this.checkAllFlag);
            item.checked = this.checkAllFlag;
          } else {
            item.checked = false;
          }
        });
      }
    }
  }
});

Vue.filter("money", (value, type) => {
  return "￥" + value.toFixed(2) + type;
});
