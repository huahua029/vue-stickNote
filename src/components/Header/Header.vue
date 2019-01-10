<template>
    <el-header height="68px" class="header">
        <div class="title"><span>Daskys</span>在线便签</div>
        <ul class="nav">
            <li class="active" @click="all">全部</li>
            <li @click="funcDone">未完成</li>
            <li @click="funcSort">排序</li>
        </ul>
    </el-header>
</template>

<script>
  import helper from '../../helper/helper.js'
  import eventBus from '../../helper/eventBus.js'

  export default {
    name: "Header",
    methods: {
      all(e) {
        eventBus.$emit('all')
        this.style(e)
      },
      funcDone(e) {
        eventBus.$emit('done')
        this.style(e)
      },
      funcSort(e) {
        eventBus.$emit('sort')
        this.style(e)
      },
      style(e) {
        e.target.parentNode.childNodes.forEach((current) => {
          current.classList.remove('active')
        })
        e.target.classList.add('active')
      },
    }
  }
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        min-width: 1024px;
        background: white;
        border-radius: 4px;
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
            cursor: pointer;
        }

        .loginWrapper {
            display: flex;
            align-items: center;
            margin-left: auto;
            font-size: 18px;
            padding: 13px;
            border-radius: 100px;
            background: #00D3AA;
            cursor: pointer;

            > a {
                color: #fff;
                text-decoration: none;
            }

            .register, .login {
                padding-left: 5px;
                padding-right: 5px;
            }

            .register {
                border-right: 1px solid #fff;
            }

            .login {
                border-left: 1px solid #fff;
            }

        }

        .active {
            font-size: 24px;
            color: #00D3AA;
            font-weight: bold;
        }
    }
</style>