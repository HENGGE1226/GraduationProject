<template>
  <div class="container">
    <div class="head">
      <div class="headImg">
      </div>
      <div class="headContent">
        <ul class="contentVal">
					<router-Link v-for="(item,$index) in barList" :to= item.target :key="item.target">
						<li :class="{activeLi: $index == isActive }" @click="changePage(item,$index)">
							{{item.name}}
						</li>
					</router-Link>
        </ul>
      </div>
			<div class="headUser" v-if="ifLogin">
				<div class="userAvatar">
					<img v-if="type === 1" src="../assets/学生.png" >
					<img v-if="type === 2 || type === 3" src="../assets/teacher.png">
				</div>
				<div 
					class="userInfo"
					@mouseover="mouseOver"
					@mouseleave="mouseLeave"
				>
					<p class="info Num">
						{{id}}
					</p>
					<p class="info Age">
						<span>{{name}}</span>
						<span>{{type == 1 ? '学生' : type == 2 ? '教师' : ''}}</span>
					</p>
				</div>
				<div 
					class="userConfirm" 
					:style="{ display: userConfirm }"
					@mouseover="mouseOver"
					@mouseleave="mouseLeave"
				>
					<div class="userPwd" @click="showPwdModal()">
						<img src="../assets/change.png" style="width:20px; height:20px;">
						<span>修改密码</span>
					</div>
					<div class="userExit" @click="logOut()">
						<img src="../assets/exit.png" style="width:15px; height:15px; margin-left:3px;">
						<span style="margin-left:2px;">退出登陆</span>
					</div>
				</div>
			</div>
			<div class="login" v-if="!ifLogin">
				<aButton class="loginBtn" @click="showModal">
					登陆
				</aButton>
			</div>
    </div>
		<a-modal 
			title="账号登陆" 
			v-model="visible" 
			:footer="null"
			class="loginModal"
		>
			<a-form 
				:form="form" 
				layout="inline" 
				@submit="handleOk"
				style="textAlign: center;"
			>
				<aRow>
					<aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
						<a-form-item label="学号">
							<a-input v-decorator="['Id', { rules: [{ required: true, message: '账号不能为空' }] }]" style="height: 35px; width: 200px;" />
						</a-form-item>
					</aCol>
				</aRow>
				<aRow style="marginTop: 20px;">
					<aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-form-item label="密码">
							<a-input type="password" v-decorator="['pwd', { rules: [{ required: true, message: '密码不能为空' }] }]" style="height: 35px; width: 200px;" />
						</a-form-item>
					</aCol>
				</aRow>
				<aRow style="marginTop: 30px;">
					<aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-form-item>
							<a-button type="primary" html-type="submit">
								登陆
							</a-button>
							<a-button type="default" html-type="reset" style="marginLeft: 18px;">
								重置
							</a-button>
						</a-form-item>
					</aCol>
				</aRow>			
			</a-form>
		
		
		</a-modal>
		  <a-modal
        title="修改密码"
        v-model="pwdVisible"
        @cancel="cancelPwdModal"
        :footer="null"
        class="pwdModal"
      >
        <div class="wrap">
          <span>请输入新的密码:</span>
          <a-input 
            v-model="newPwd" 
            type="password" 
            style="display: inline-block; width: 300px; margin-left: 10px;" 
          />
          <a-button 
            type="primary" 
            @click="updatePwd()"
            style="display: block;margin: 0 auto; margin-top: 40px;"
          >
            提交
          </a-button>
        </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'Nav',
	inject: ['reload'],
	data () {
		return {
			isActive: 0,
			barList: [
				{
					name: '首页',
					target: '/'
				}, {
					name: '全部课程',
					target: '/allClass'
				}
			],
			userConfirm: 'none',
			visible: false,
			pwdVisible: false, // 修改密码的窗口
			newPwd: '',
			userId: window.sessionStorage.getItem('userId') || '',
			formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'loginForm' })
		}
	},
	beforeMount () {
		switch (this.$route.path) {
			case '/allClass':
				this.isActive = 1
				break
			case '/myClass':
				this.isActive = 2
				break	
			case '/userAccount':
				this.isActive = 2
		}
	},
	mounted () {
		this.$axios.getAuth()
			.then(({ data }) => {
				if (data.code === 200) {
					this.pushBar(data.data)
					this.changeLoginStatus(true)
					this.getUserMessage()
				}
			})
	},
	methods: {
		// 获取账号信息
		getUserMessage () {
			if (this.$store.state.token) {
				this.$store.dispatch('GetUserInfo')
			}
		},

		// 改变导航栏
		pushBar (userType) {
			if (userType === 1 || userType === 2) {
				if (this.barList.length < 3) {
					this.barList.push({
						name: '我的课程',
						target: '/myClass'
					})
				}
			} else if (userType === 3) {
				if (this.barList.length < 3) {
					this.barList.push({
						name: '账号管理',
						target: '/userAccount'
					})
				}				
			}
		},

		// 改变state中的登陆状态
		changeLoginStatus (bool) {
			this.$store.dispatch('ChangeIfLogin', bool)
		},

		// 切换导航栏的时候改变样式
		changePage (item, index) {
			this.isActive = index
		},

		// 动态弹出退出框
		mouseOver () {
			this.userConfirm = 'block'
		},

		mouseLeave () {
			this.userConfirm = 'none'
		},

		showModal () {
			this.visible = true
		},
		
		handleOk (e) {
			e.preventDefault()
			this.form.validateFields((err, values) => {
        if (!err) {
					this.$store.dispatch('UserLogin', values)
						.then((mes) => {
							this.$message.success(mes)
							this.visible = false
							this.getUserMessage()
							this.pushBar()
							this.reload()
						}).catch((mes) => {
							this.$message.error(mes)
						})
				}
			})
		},

		// 注销
		logOut () {
			this.$store.dispatch('LogOut')
			this.barList.pop()
		},

    // 展示修改密码窗口
    showPwdModal () {
      this.pwdVisible = true
		},
		
		// 隐藏窗口
		cancelPwdModal () {
      this.newPwd = ''
      this.pwdVisible = false
    },

		// 修改密码
		updatePwd () {
      if (this.userId) {
        this.$axios.updatePassword({ userId: this.userId, password: this.newPwd })
          .then(({data}) => {
            if (data.code === 200) {
              this.pwdVisible = false
              this.$message.success('修改成功')
              this.newPwd = ''
            } else {
              this.$message.success('修改失败')
            }
          })
      }
    }
	},
	computed: mapState({
		id: 'userId',
		type: 'userType',
		name: 'userName',
		ifLogin: state => state.ifLogin
	})
}
</script>

<style scoped lang="less">
  .container {
		width: 100%;
		min-width: 1200px;
		background: white;
		position: relative;
		border-bottom: 1px solid #dedede;
    .head {
			width: 80%;
			height: 64px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
      .headImg {
				width: 210px;
				height: 100%;
				margin-left: -13px;
				background: url('../assets/gdufe.png');
				background-repeat: no-repeat;
				background-size: cover;
				display: inline-block;
				vertical-align: top;
      }
      .headContent {
				box-sizing: border-box;
				display: inline-block;
				margin-left: -400px;
        .contentVal {
          overflow: hidden;
          li {
						color: #000;
						float: left;
						list-style: none;
						font-size: 16px;
						line-height: 60px;
						margin-left: 50px;
					}
					.activeLi {
						color: #1496dd;
						border-bottom: 2px solid #1496dd;
					}
        }
			}
			.headUser {
				height: 100%;
				float: right;
				display: flex;
				position: relative;
				.userAvatar {
					font-size: 14px;
					padding-top: 15px;	
					vertical-align: top;
					margin-right: 10px;			
					img {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						border: 1px solid #ccc;
						display: inline-block;
						vertical-align: top;
					}
				}
				.userInfo {
					float: right;
					line-height: 15px;
					padding-top: 15px;
					p {
						margin: 0;
					}
					.Age {
						margin-left: 2px;
						margin-top: 5px;
					}
				}
				.userConfirm {
					position: absolute;
					min-width: 120px;
					height: 60px;
					z-index: 999;	
					background: white;
					border: 1px solid rgba(0,0,0,.15);
					box-shadow: 0 6px 12px rgba(0,0,0,.175);
					top: 60px;
					left: 40px;
					font-size: 14px;
					border-radius: 5px;
					cursor: pointer;
					.userPwd {
						height: 30px;
						line-height: 30px;
						border-bottom: 1px solid #ccc;
					}
					.userExit {
						height: 30px;
						line-height: 30px;
						z-index: 100
					}
				}
			}
			.login {
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
		.loginModal {
			width: 500px;
			height: 500px;
		}
  }
</style>
