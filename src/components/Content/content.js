import eventBus from '../../helper/eventBus.js'
import note from '../../helper/helper'

export default {
  name: "Content",
  data() {
    return {
      dialogTableVisible: false,
      text: 'Daskys在线便签',
      value: 3,
      array: [{_id:1,text:'huahua',value: 4},{_id:2,text:'huahua',value: 4}],
      itemText: ''
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
    eventBus.$on('done', this.dealNote)
    eventBus.$on('sort', this.sortNote)
    eventBus.$on('all', this.allShow)

    note.getNoteList().then(
      // res => {
      //   if(this.array.length > 0){
      //     this.array = res.data.notes
      //   }
      // }
      res=>{
        this.array = res.data.notes
      }
    )
  },
  methods: {
    finishChange(item) {
      item.finish = true;
      note.finishNote(item._id).then(
        () => {
          this.$message({
            type: 'success',
            message: '完成任务',
            duration: 2000,
            center: true
          })
        }
      )
    },
    textChange(item) {
      note.textChange(item._id, item.text)
    },
    deleteNote(e, id) {
      note.deleteNote(id).then(
        () => {
          this.$refs[id][0].remove()
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 2000,
            center: true
          })
        }
      )
    },
    allShow() {
      note.getNoteList().then(
        res => {
          this.array = res.data.notes
        }
      )
    },
    dealNote() {
      note.getNoteList().then(
        req => {
          if(this.array.length > 0){
            let self = []
            this.array = req.data.notes
            this.array.map((current) => {
              if (!current.finish) {
                self.push(current)
              }
            })
            this.array = self
          }
        }
      )
    }
    ,
    sortNote() {
      this.array.sort(function (a, b) {
        return b.value - a.value
      })
    },
    createNote() {
      console.log('1');
      note.createNote({text: this.text, value: this.value}).then(
        () => {
          this.$message({
            type: 'success',
            message: '创建成功',
            duration: 2000,
            center: true
          })
          this.dialogTableVisible = false
        }
      ).then(
        () => {
          note.getNoteList().then((res) => {
            this.array = res.data.notes
          })
        }
      )
    },
    scrollTop() {
      scroll(0, 0)
    }
  }
}