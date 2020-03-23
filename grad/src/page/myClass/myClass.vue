<template>
  <div class="container">
		<div class="searchBox">
			<a-form :form="form" layout="inline" @submit="handleSubmit">
				<aRow type="flex">
					<aCol :span="8">
						<a-form-item label="课程学年">
							<aSelect
								style="width: 100px; display: inline-block;"
								v-decorator="['year', {
									initialValue: '2020'
								}]"
							>
								<aSelectOption value="2018">
									2018
								</aSelectOption>
								<aSelectOption value="2019">
									2019
								</aSelectOption>
								<aSelectOption value="2020">
									2020
								</aSelectOption>
							</aSelect>
							<aSelect
								style="width: 100px; display: inline-block; margin-left: 10px;"
								v-decorator="['season',{
									initialValue: ''
								}]"
							>
								<aSelectOption value="">
									全部
								</aSelectOption>
								<aSelectOption value="spring">
									春季学期
								</aSelectOption>
								<aSelectOption value="fall">
									秋季学期
								</aSelectOption>
							</aSelect>
						</a-form-item>
					</aCol>
					<aCol :span="5">
						<a-form-item label="开课状态">
							<aSelect v-decorator="['classStatus', {
            		initialValue: ''}]" 
								style="width: 120px" 
							>
								<aSelectOption value="">
									全部
								</aSelectOption>
								<aSelectOption value="open">
									开课中
								</aSelectOption>
								<aSelectOption value="finish">
									已结课
								</aSelectOption>
							</aSelect>
						</a-form-item>
					</aCol>
					<aCol :span="7">
						<a-form-item label="课程名称">
							<a-input
								v-decorator="['className']"
							/>
						</a-form-item>
					</aCol>
					<aCol :span="8">
						<a-form-item label="教师名称">
							<a-input
								style="width: 210px; display: inline-block;"
								v-decorator="['teacherName']"
							/>
						</a-form-item>
					</aCol>
					<aCol :span="4">
						<a-form-item style="width: 220px;">
							<a-button type="primary" html-type="submit">
								查询
							</a-button>
							<a-button type="default" @click="handleReset" style="marginLeft: 18px;">
								重置
							</a-button>
							<router-link to="/classOption" v-if="type === 2">
								<a-button type="primary" class="openBtn">
									开设课程
								</a-button>
       				</router-link>
						</a-form-item>
					</aCol>
				</aRow>
			</a-form>
		</div>
		<div class="classBox">
			<div class="item" v-for="(item) in classItem" :key="item.id">
				<div class="itemImg" :style='{backgroundImage: "url("+item.img+")"}'>
				</div>
				<div class="itemDetail">
					<p class="itemTitle">
						<span>{{item.name}}</span>
						<aTag color="green" class="tag" v-if="item.classStatus === 'open'">开课中</aTag>
						<aTag color="red" class="tag" v-if="item.classStatus === 'finish'">已结课</aTag>
					</p>
					<p class="itemId">课程ID: {{item.classId}}</p>
					<p class="itemTime">开课老师: {{item.teacherName}}</p>
					<p class="itemTime">开课时间: {{item.year}}{{item.season === 'spring' ? '春季学期' : '秋季学期'}}</p>
					<aButton class="itemButton" @click="goDetail(item.id)">
						进入课程
					</aButton>
				</div>
			</div>
		</div>
		<div class="pagination">
			<aPagination :pageSize="3" :total="total" @change="changePage" :hideOnSinglePage='true' />
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'myClass',
  data () {
    return {
      formLayout: 'horizontal',
			form: this.$form.createForm(this, { name: 'coordinated' }),
			classItem: [],
			total: 0
    }
	},
	mounted () {
		this.getUserClass(1, 3)
	},
	methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
					console.log('Received values of form: ', values)
					values.page = 1
					values.pageSize = 3
					this.$axios.getUserClass(values)
						.then(({ data }) => {
							this.classItem = data.res
							this.total = Number(data.total)
							if (data.code !== 200) {
								this.$message.error(data.mes)
							}
						})
        }
      })
		},
		handleReset () {
			this.form.resetFields()
			this.getUserClass(1, 3)
		},
		changePage (page, pageSize) {
			this.form.validateFields((err, values) => {
        if (!err) {
					console.log('Received values of form: ', values)
					values.page = page
					values.pageSize = pageSize
					this.$axios.getUserClass(values)
						.then(({ data }) => {
							this.classItem = data.res
							this.total = data.total
							if (data.code !== 200) {
								this.$message.error(data.mes)
							}
						})
        }
      })
		},
		getUserClass (page, pageSize) {
			const values = {}
			values.page = page
			values.pageSize = pageSize
			this.$axios.getUserClass(values)
				.then(({data}) => {
					if (data.code === 200) {
						this.classItem = data.res
						this.total = data.total
					} else {
						this.$message.error(data.mes)
					}
				})
		},
		goDetail (id) {
			this.$router.push({path: 'classDetail', query: { classId: id }})
		}
	},
	computed: mapState({
		type: 'userType'
	})
}
</script>
<style lang="less" scoped>
	.container {
		padding: 20px 0 80px 0;
		width: 100%;
		min-width: 1200px;
		height: auto;
		position: relative;
		.searchBox {
			width: 100%;
			height: 100px;
			padding-left: 80px;
			background: #f9f9f9;
			padding-top: 10px;
			text-align: center;
			position: relative;
			border-bottom: 1px solid #dedede;
			.openBtn {
				position: absolute;
				right: -320px;
				top: -7px;
			}
		}
		.classBox {
      padding-left: 110px;
			margin-top: 20px;
			.item {
				width: 78%;
				height: 225px;
				display: inline-block;
				padding: 15px 0 15px 15px;
				margin-left: 40px;
				margin-bottom: 20px;
				position: relative;
				box-shadow: 0 0 15px #efefef;
				background: #fff;
				border-radius: 5px;
				overflow: hidden;
				.itemImg {
					width: 290px;
					height: 170px;
					display: inline-block;
					background: url('../../assets/classImg.png');
					background-repeat: no-repeat;
					background-size: cover;
				}
				.itemDetail {
					display: inline-block;
					vertical-align: top;
					margin-left: 20px;
					.itemTitle {
						font-size: 20px;
						margin-bottom: 10px;
						.tag {
							vertical-align: text-top;
							margin-left: 20px;
						}
					}
					.itemId {
						color: #6C6C6C;
					}
					.itemTime {
						color: #6C6C6C;
					}
					.itemStatus {
						color: red;
					}
					.itemButton {
						position: absolute;
						right: 30px;
						bottom: 50px;
					}
				}
			}
		}
		.pagination {
			width: 100%;
			text-align: center;
		}
	}
</style>
