// pages/buy/buy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topImgs:[],
        goods_info_price:[{}],
        goods_info_sale:[{}],
        haveGetRecord:false, //是否有>=1个商品
        /**  * 页面配置  */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getTopImgs();
        this.getgoods_info();
    },
        //获取顶部轮播图
    getTopImgs(){
            wx.cloud.database().collection("buy_toppic").get()
              .then(res =>{
                  console.log('请求成功',res)
                  this.setData({
                      topImgs:res.data
                  })
              })
              .catch(res =>{
                console.log('请求失败',res)
            });
            var that = this;
            /* 获取系统信息 */
            wx.getSystemInfo({
              success: function (res) {
                that.setData({
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
                });
              }
            })
    },

    //获取商品
    getgoods_info(){
      wx.showLoading({
        title: '数据加载中...'
        });
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'selectAllgoods',
          index:'price'
        }
      }).then((resp) => {
        console.log('请求成功',resp)
        this.setData({
          haveGetRecord: true,
          goods_info_price: resp.result.data
        });
       wx.hideLoading();
     }).catch(resp =>{
      console.log('请求失败',resp)
     });

     wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectAllgoods',
        index:'sale'
      }
    }).then((resp) => {
      console.log('请求成功',resp)
      this.setData({
        haveGetRecord: true,
        goods_info_sale: resp.result.data
      });
     wx.hideLoading();
   }).catch(resp =>{
    console.log('请求失败',resp)
   });
    },

    bind_tuijian(){
        wx.navigateTo({
            url: "../../pages/detail_mune/detail_mune?id="+0,
          })
    },
    //跳转订单
    bind_cart(){
        wx.navigateTo({
            url: '../../pages/dingdan/dingdan'
          })
    },
    //跳转分类
        bind_class(){
            wx.navigateTo({
                url: '../../pages/classification/classification'
              })
        },
    bindChange: function (e) {
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
      /**  * 点击tab切换  */
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
          return false;
        } else {
          that.setData({
            currentTab: e.target.dataset.current
          })
        }
    },

    bind_detail:function(e){
        let goods_id=e.currentTarget.dataset.goods_id //获取点击产品时拿到的id，就是data-id传过来的值
        // wx.navigateTo跳转页面的方法
        //URL是传递的是详情页的路径，把id拼接传过去就可以啦
        wx.navigateTo({
            url: "../detail/detail?goods_id="+goods_id,
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