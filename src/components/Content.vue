<template>
    <div class="content">
        <div class="topAndNew">
            <div class="top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhuidingbu-"></use>
                </svg>
            </div>
            <div @click="dialogTableVisible = true" class="new">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xinjian"></use>
                </svg>
            </div>
        </div>

        <el-dialog
                class="dialog"
                title="添加新的便签"
                :visible.sync="dialogTableVisible">
            <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="text">
            </el-input>
            <div class="block">
                <span class="demonstration">需要星级：</span>
                <el-rate v-model="value"></el-rate>
            </div>
            <button class="button" @click="save">添加</button>
        </el-dialog>

        <div class="note" v-for="item in array" :key="item.id" v-if="item.showIt">
            <div class="time">{{item.date.year}}年{{item.date.month}}月{{item.date.date}}日</div>
            <div class="noteContent">{{item.text}}</div>
            <el-rate
                    :colors="['#15D1E8 ', '#15D1E8 ', '#15D1E8 ']"
                    disabled-void-color="#C0C4CC"
                    disabled
                    v-model="item.value"
            ></el-rate>
            <div class="button">
                <button v-if="!item.done" @click="item.done = true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-done"></use>
                    </svg>
                </button>
                <button v-else class="done">已完成</button>
            </div>
        </div>
    </div>
</template>

<script>
  import Bus from './event.js'

  export default {
    name: "Content",
    data() {
      return {
        dialogTableVisible: false,
        text: '一个三四',
        value: 1,
        array: [],
        id: 0,
        done: false,
        date: {},
        showIt: true
      }
    },
    created() {
      Bus.$on('done', this.doneIt)
      Bus.$on('sort', this.sortIt)
      Bus.$on('all', this.allShow)
    },
    methods: {
      allShow() {
        this.array.forEach((current) => {
          if (current.done === true) {
            current.showIt = true
          }
        })
      },
      doneIt() {
        this.array.forEach((current) => {
          if (current.done === true) {
            current.showIt = false
          }
        })
      }
      ,
      sortIt() {
        this.array.sort(function (a, b) {
          return b.value - a.value
        })
      }
      ,
      createTime: function () {
        let date = new Date()
        let time = {}
        time.year = date.getFullYear()
        time.month = date.getMonth() + 1
        time.date = date.getDate()
        return time
      }
      ,
      save: function () {
        if (!(this.text || this.value)) {
          this.$message('请输入内容');
        } else {
          let date = this.createTime()
          this.date = date
          let obj = {}
          obj.text = this.text
          obj.value = this.value
          obj.id = this.id
          obj.date = this.date
          obj.done = this.done
          obj.showIt = this.showIt
          this.id += 1
          this.array.push(obj)
          this.dialogTableVisible = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .content {
        padding-left: 220px;
        padding-right: 220px;
        /*display: flex;*/
        flex-wrap: nowrap;

        .topAndNew {
            .top, .new {
                width: 64px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                box-shadow: 0px 10px 30px 0px rgba(0, 211, 170, 0.3);
                position: fixed;

                svg {
                    width: 30px;
                    height: 30px;
                }
            }

            .top {
                background: #fff;
                right: 225px;
                bottom: 100px;
            }

            .new {
                background: #00D3AA;
                right: 225px;
                bottom: 30px;
            }
        }

        .dialog {
            .block {
                margin-top: 20px;

                .el-rate {
                    display: inline;
                }
            }

            .button {
                margin-top: 30px;
                margin-left: 50%;
                transform: translateX(-50%);
                border: none;
                border-radius: 100px;
                width: 150px;
                height: 45px;
                background: #00D3AA;
                color: #fff;
                outline: none;

                &:hover {
                    background: #00D3AA;
                }
            }
        }

        .note {
            width: 230px;
            margin: 20px;
            padding: 20px;
            background: #fff;
            display: inline-flex;
            flex-direction: column;

            .time {
                white-space: nowrap;
                width: 100px;
                height: 20px;
                font-size: 14px;
                color: #808080;
                padding-bottom: 10px;
            }

            .noteContent {
                padding: 10px;
                margin-top: 10px;
                border-top: 1px solid #E6E6E6;
                border-bottom: 1px solid #E6E6E6;
            }

            .el-rate {
                padding: 10px;
            }

            .button > button {
                margin-top: 30px;
                margin-left: 50%;
                transform: translateX(-50%);
                border: none;
                border-radius: 100px;
                width: 58px;
                height: 24px;
                background: #00D3AA;
                color: #fff;
                outline: none;

                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    background: #00D3AA;
                }

                svg {
                    width: 16px;
                    height: 13px;
                    background: #00D3AA;
                }

                &.done {
                    background: #15D1E8;
                    padding-left: 5px;
                    padding-right: 5px;
                }
            }
        }
    }


</style>