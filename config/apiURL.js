let ipURL = 'http://127.0.0.1:7001/default/'

let servicePath = {
    // 主页
    getArticleList  : ipURL + 'getArticleList',
    // 详细页面
    getArticleById  : ipURL + 'getArticleById/',
    // 获取文章类别
    getTypeInfo     : ipURL + 'getTypeInfo',
    // 根据类别ID获得文章列表
    getListById     : ipURL + 'getListById/',
}

export default servicePath