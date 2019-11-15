<template>
  <div id="app">
    <router-view />
  </div>
</template>
1278098654
<script>
export default {
  name: 'App',
  mounted(){
      const script = document.createElement('script');
      script.src = 'https://s65.cnzz.com/z_stat.php?id=1278098654&web_id=1278098654';//友盟中的代码
      script.language = 'JavaScript';
      document.body.appendChild(script);
 
    },
    watch: {
      '$route' () {
        if (window._czc) {
          // window._czc.push(["_setAutoPageview", false]);
          let location = window.location;//路由变化
          let contentUrl = location.hash;//自定义当前url，可带上路由以此区分每个页面
          // console.log(contentUrl);
          let refererUrl = '/';
          window._czc.push(["_setAutoPageview", false]);
          window._czc.push(["_trackPageview", contentUrl, refererUrl])
 
        }
 
      }
    }
}
</script>
