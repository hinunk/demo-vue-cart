Vue.filter("money", (value, type) => {
  return "￥" + value.toFixed(2) + type;
});

var vm = new Vue({
  el: "#app",
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false,
    delFlag: false,
    curProduct:'',
  },
  filters: {
    formatMoney: (value) => {
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
          console.log(response);
          console.log(this.productList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeMoney: function(product, change) {
      if (change > 0) {
        product.productQuantity++;
      } else {
        product.productQuantity--;
        if (product.productQuantity < 1) {
          product.productQuantity = 1;
        }
      }
      this.caleTotalPrice();
    },
    selectedProduct: function(item) {
      if (typeof item.checked === "undefined") {
        //Vue.set(item, "checked", true);
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
      this.caleTotalPrice();
    },
    checkAll: function(flag) {
      this.checkAllFlag = flag;
      this.productList.forEach((item, index) => {
        if (typeof item.checked === "undefined") {
          this.$set(item, "checked", this.checkAllFlag);
        } else {
          item.checked = this.checkAllFlag;
        }
      });
      this.caleTotalPrice();
    },
    caleTotalPrice: function() {
      this.totalMoney = 0;
      this.productList.forEach((item, index) => {
        if (item.checked) {
          this.totalMoney += item.productPrice * item.productQuantity;
        }
      });
    },
    delConfirm: function(item){
      this.delFlag = true
      this.curProduct = item
    },
    delProduct:function(){
      let index = this.productList.indexOf(this.curProduct)
      this.productList.splice(index,1)
      this.delFlag = false
    }
  }
});

