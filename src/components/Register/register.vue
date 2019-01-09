<template>
    <div class="rigster">
        <label>用户名</label>
        <el-input v-model="username" autofocus placeholder="用户名"></el-input>
        <label>密码</label>
        <el-input v-model="password" type="password" placeholder="密码"></el-input>

        <el-button @click="onRegister">立即注册</el-button>
        <p>已有账号？<span><router-link to="/login">立即登录</router-link></span></p>
    </div>
</template>

<script>
  import helper from '../../helper/helper'
  import eventBus from '../../helper/eventBus.js'

  export default {
    name: "register",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      check() {
        if (this.username === '' || this.password === '' || (this.password.length < 6)) {
          return false
        } else {
          return true
        }
      },
      onRegister() {
        let check = this.check()
        if (!check) {
          this.$message({
            type: 'error',
            message: '请检查输入格式'
          })
        } else {
          helper.registerAuth(this.username, this.password).then(
            (res) => {
              if (res.data.status === 0) {
                this.$message({
                  type: 'success',
                  message: '注册成功'
                })
                window.localStorage.setItem('username', this.username)
                window.localStorage.setItem('isLogin', 'login')
                eventBus.$emit('login')
                this.$router.push('/')
                window.location.reload()
              }else{
                this.$message({
                  type: 'error',
                  message: '已存在'
                })
              }
            }
          )
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .rigster {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        margin-left: 30%;
        margin-right: 30%;

        .el-input {
            margin-top: 10px;
            margin-bottom: 30px;
        }

        .el-button {
            align-self: flex-start;
            color: #009933;
        }

        p {
            margin-top: 40px;
            margin-bottom: 40px;
            text-align: center;

            span {
                color: #009933;
            }
        }
    }
</style>