<template>
    <div class="header">
        <div class="title"><span>Daskys</span>在线便签</div>
        <ul class="nav">
            <li class="active" @click="all">全部</li>
            <li @click="funcDone">未完成</li>
            <li @click="funcSort">排序</li>
        </ul>
        <div class="login">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github"></use>
            </svg>
            Github登录
        </div>
    </div>
</template>

<script>
  import Bus from './event.js'

  export default {
    name: "Header",
    data() {
      return {}
    },
    methods: {
      all(e){
        Bus.$emit('all')
        this.style(e)
      },
      funcDone(e) {
        Bus.$emit('done')
        this.style(e)
      },
      funcSort(e){
        Bus.$emit('sort')
        this.style(e)
      },
      style(e){
        e.target.parentNode.childNodes.forEach((current)=>{
          current.classList.remove('active')
        })
        e.target.classList.add('active')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        min-width: 1024px;
        height: 85px;
        background: white;
        border-radius: 4px;
        padding-left: 220px;
        padding-right: 220px;
        white-space: nowrap;

        .title {
            font-size: 24px;
            color: #00D3AA;
        }

        .title > span {
            font-size: 32px;
            font-height: 36px;
            font-weight: bold;
        }

        > ul {
            display: flex;
            align-items: center;
            margin-left: 140px;
            font-size: 18px;
        }

        ul > li {
            margin-right: 100px;
        }

        .login {
            display: flex;
            align-items: center;
            margin-left: auto;
            font-size: 18px;
            padding: 13px;
            border-radius: 100px;
            background: #00D3AA;
            color: #fff;

            img {
                width: 28px;
                height: 28px;
                fill: white;
            }
        }

        .active {
            font-size: 24px;
            color: #00D3AA;
            font-weight: bold;
        }
    }
</style>