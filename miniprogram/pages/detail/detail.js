// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",
        goods_img:"",//匹配的数据
        goods_title:"",
        goods_xiaoliang:"",
        goods_price:"",
        detailImg:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // options.id 就是首页传过来的id，接下来循环找到id所匹配的数据就可以进行渲染啦！
      // wx.showLoading({
      // title: '数据加载中...'
      // });

      //console.log(options.goods_id);
      this.setData({
        id:options.goods_id
      })

      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'selectgoods',
          id: options.goods_id
        }
      }).then((resp) => {
        console.log('请求成功',resp);
        //console.log(resp.result.data[0]);

        this.setData({
          goods_img:resp.result.data[0].image,
          goods_title:resp.result.data[0].name,
          goods_price:resp.result.data[0].price,
          goods_xiaoliang:resp.result.data[0].sale
        });
        console.log('成功了吗',goods_img,goods_title,goods_price,goods_xiaoliang);
        wx.hideLoading();
      }).catch(resp =>{
        console.log('请求失败',resp)
      });
    },
    //加入购物车

    // 跳到购物车
    binbuycar() {
    wx.navigateTo({
      url: '../buy_car/buy_car',
    })
  },
  //立即购买
  immeBuy() {
      wx.navigateTo({
        url: '../pay/pay',
      })
  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})