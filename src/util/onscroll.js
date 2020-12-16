export function getScroll() {
  // 滚动条在Y轴上的滚动距离
  function getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0
    if (document.body) {
      bodyScrollTop = document.body.scrollTop
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
    return scrollTop
  }

  //文档的总高度

  function getScrollHeight() {
    var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight
    return scrollHeight
  }

  //浏览器视口的高度

  function getWindowHeight() {
    var windowHeight = 0
    if (document.compatMode == 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight
    } else {
      windowHeight = document.body.clientHeight
    }
    return windowHeight
  }

  //事件函数
  function showTop() {
    if (getScrollHeight() - getScrollTop() - getWindowHeight() < 100) {
      document.cookie = 'getNewData=1'
    } else {
      if (localStorage.getItem('getNewData')) {
        localStorage.removeItem('getNewData')
      }
    }
  }

  //防抖
  function debounce(fn, delayTime) {
    let timer = null
    return function() {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delayTime) //延时器
    }
  }
  window.onscroll = debounce(showTop, 200)
}

export function getScrollTop() {
  //取窗口滚动条高度
  function getScrollTop() {
    var scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    console.log(scrollTop)
  }
}
