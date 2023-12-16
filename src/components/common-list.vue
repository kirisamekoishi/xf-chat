<template>
    <div class="pullDown" ref="pullDown">
      <div class="pullDownTop"><span v-show="showRefresh">刷新中...</span></div>
      <div>
        <slot></slot>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  
  import {ref, onMounted, watch, onUnmounted} from "vue";
  
  const props = defineProps({
    loading: Boolean,//异步加载数据后标识是否加载完成
    noMore: Boolean//标识是否还有更多数据需要加载
  })
  //refresh事件标识刷新列表
  //loadMore事件标识加载更多数据内容
  const emits = defineEmits(['refresh', 'loadMore'])
  onMounted(() => {
    getPullDown().ontouchstart = FnStart;//初始化下拉刷新
    initScroll()//初始化上滑加载
  });
  onUnmounted(() => {
  //退出时销毁上滑加载监听的滚动事件
    window.removeEventListener('scroll', scrollListener)
  })
  //加载结束,隐藏UI
  watch(() => props.loading, () => {
    setTimeout(() => {
      showRefresh.value = false
      y.value = 0;
      getChild(0).style.height = y.value + "px";
    }, 1000);
  })
  //没有更多需要加载了
  watch(() => props.noMore, () => {
    if (props.noMore) {
    //销毁上滑加载监听的滚动事件
      window.removeEventListener('scroll', scrollListener)
    }
  })
  //标识加载提示是否显示
  const showRefresh = ref(false);
  //ref容器
  const pullDown = ref(null);
  let disY = ref<number>(0);
  let y = ref<number>(0);
  const getPullDown = () => {
    return pullDown.value as unknown as HTMLDivElement;
  };
  const getChild = (n: number) => {
    return getPullDown().children[n] as HTMLDivElement;
  };
  const FnStart = function (ev: TouchEvent) {
  //监听滑动开始点
    getChild(0).style.transition = `null`
    disY.value = ev.changedTouches[0].pageY - y.value;
    getChild(1).ontouchmove = FnMove;
    getChild(1).ontouchend = FnEnd;
  };
  const FnMove = function (ev: TouchEvent) {
  //监听滑动中,动态设置高度,实现下拉动效
    y.value = ev.changedTouches[0].pageY - disY.value;
    getChild(0).style.height = y.value / 3 + "px";
  };
  const FnEnd = function (ev: TouchEvent) {
  //监听滑动结束点,判断是否需要触发刷新事件
    getChild(0).style.transition = `0.4s ease height`
    console.log(y.value);
    //下拉距离超过80则刷新
    if (y.value > 80) {
      //下拉
      showRefresh.value = true
      y.value = 80;
      console.log('刷新列表...')
      emits('refresh')
    } else {
      //下拉不足80或者是上滑,不触发刷新,并且隐藏提示
      showRefresh.value = false
      y.value = 0;
    }
    getChild(0).style.height = y.value + "px";
    getChild(1).ontouchmove = () => false;
    getChild(1).ontouchend = () => false;
  }
  
  
  const loadMore = () => {
    if (!props.noMore) {
      console.log('加载更多...')
      //触发加载更多事件
      emits('loadMore')
    }
  }
  //防抖函数,默认100ms
  const debounce = (() => {
    let timer = 0
    return (callback: any, ms: any = 100) => {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  })()
  const container = ref(null)
  const initScroll = () => {
  //初始化滑动事件监听器
    window.addEventListener('scroll', scrollListener)
  }
  const scrollListener = () => {
    // screen.availHeight表示屏幕高度
    // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
    // document.compatMode用来判断当前浏览器采用的渲染方式,CSS1Compat表示标准兼容模式开启
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop // 滚动条在Y轴上的滚动距离
    const vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight // 页面的可视高度（能看见的）
    const allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) // 页面的总高度（所有的）
    // console.log('scrollY',scrollY + vh)
    // console.log('allHeight',allHeight - 300)
    if (scrollY + vh >= (allHeight - 300)) { // 当滚动条滑到页面底部
      debounce(loadMore)
    }
  }
  </script>
  <style lang="scss" scoped>
  .pullDown {
    .pullDownTop {
      width: 100vw;
      height: 0px;
      //background-color: skyblue;
      text-align: center;
    }
  
    .pullDownBottom {
      width: 100vw;
      height: 100vh;
      background-color: pink;
    }
  }
  </style>