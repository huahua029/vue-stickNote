<template>
    <div class="content">
        <div class="topAndNew">
            <div class="top" @click="scrollTop">
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
                    row="6"
                    placeholder="请输入内容"
                    v-model="text">
            </el-input>
            <div class="block">
                <span class="demonstration">需要星级：</span>
                <el-rate v-model="value"></el-rate>
            </div>
            <button class="button" @click="create">添加</button>
        </el-dialog>

        <div class="note" v-for="item in array" :key="item._id" :ref="item._id">
            <div class="time">
                {{ item.createdAt | formatDate}}
                <div @click="deleteNote($event,item._id)">
                    <svg class="icon" aria-hidden="true" @click.prevent>
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 8}"
                    @blur="textChange(item._id,item.text)"
                    v-model="item.text">
                {{item.text}}
            </el-input>
            <el-rate
                    :colors="['#15D1E8 ', '#15D1E8 ', '#15D1E8 ']"
                    disabled-void-color="#C0C4CC"
                    disabled
                    v-model="item.value"
            ></el-rate>
            <div class="button">
                <button v-if="!item.finish" @click="finishChange(item)">
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
  import note from './helper/note'

  export default {
    name: "Content",
    data() {
      return {
        dialogTableVisible: false,
        text: '一个三四',
        value: 1,
        array: [],
      }
    },
    filters: {
      formatDate: (value) => {
        if (!value) return ''
        let date = new Date(value)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let data = date.getDate()
        return year + '年' + month + '月' + data + '日'
      }
    },
    created() {
      Bus.$on('done', this.doneIt)
      Bus.$on('sort', this.sortIt)
      Bus.$on('all', this.allShow)

      note.getNoteList().then(
        x => {
          this.array = x.data.notes
        }
      )
    },
    methods: {
      finishChange(item) {
        item.finish = true;
        note.finishNote(item._id).then(
          x => {
            this.$message({
              type: 'success',
              message: '完成～'
            })
          }
        )
      },
      textChange(id, text) {
        console.log(id);
        console.log(text);
        note.textChange(id, text).then(
          x => {
            // console.log(this.array)
          }
        )
      },
      deleteNote(e, id) {
        note.deleteNote(id).then(
          () => {
            this.$refs[id][0].remove()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        )
      },
      //....
      allShow() {
        note.getNoteList().then(
          x => {
            this.array = x.data.notes
          }
        )
      },
      doneIt() {
        note.getNoteList().then(
          x => {
            let self = []
            this.array = x.data.notes
            this.array.map((current, index) => {
              if(!current.finish){
                self.push(current)
              }
            })
            this.array = self
            // console.log(this.array)
          }
        )
      }
      ,
      sortIt() {
        this.array.sort(function (a, b) {
          return b.value - a.value
        })
      },
      create() {
        note.createNote({text: this.text, value: this.value}).then(
          (x) => {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.dialogTableVisible = false
          }
        ).then(
          () => {
            note.getNoteList().then((x) => {
              this.array = x.data.notes
              console.log(this.array)
            })
          }
        )
      },
      scrollTop(){
        scroll(0,0)
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
            position: relative;

            .time {
                white-space: nowrap;
                font-size: 14px;
                color: #808080;
                padding-bottom: 10px;

                div {
                    position: absolute;
                    width: 20px;
                    height: 20px;

                    right: 1em;
                    top: 1em;

                    svg {
                        fill: #D8D8D8;
                    }
                }

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