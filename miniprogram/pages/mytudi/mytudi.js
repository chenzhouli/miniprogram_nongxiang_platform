// pages/mytudi/mytudi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        landlist:[{}],
        haveGetland:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getmyland();
    },

    getmyland(){
      wx.cloud.callFunction({ 
        name: 'quickstartFunctions', 
        config: { 
          env: this.data.envId 
        }, 
        data: { 
          type: 'getcart', 
          index:'my_land'
        } 
      }).then((resp) => { 
        console.log('请求成功',resp) 
        this.setData({ 
          haveGetland: true, 
          landlist: resp.result.data 
        }); 
      }).catch(resp =>{ 
        console.log('请求失败',resp) 
      }); 
    },

    bind_detail:function(e){
      let tudi_id=e.currentTarget.dataset.tudi_id //获取点击产品时拿到的id，就是data-id传过来的值
      // wx.navigateTo跳转页面的方法
      wx.navigateTo({
        url: "../detail_tudi/detail_tudi?tudi_id="+tudi_id,
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
      this.onLoad();
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