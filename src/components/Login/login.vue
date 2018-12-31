<template>
    <div class="login">
        <label>用户名</label>
        <el-input v-model="username" autofocus placeholder="用户名"></el-input>
        <label>密码</label>
        <el-input v-model="password" type="password" placeholder="密码"></el-input>

        <el-button @click="onLogin">立即登录</el-button>
        <p>没有账号？<span><router-link to="/login">立即注册</router-link></span></p>
    </div>
</template>

<script>
  import helper from '../../helper/helper'

  export default {
    name: "register",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      onLogin() {
        helper.loginAuth(this.username, this.password).then(
          (res) => {
            if(res.status === 0){
              this.$message({
                type: 'success',
                message: '登录成功'
              })
            }else{
              this.$message({
                type: 'error',
                message: '未注册'
              })
            }

          },
          () => {
            this.$message({
              type: 'error',
              message: '登录失败'
            })
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
    .login {
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