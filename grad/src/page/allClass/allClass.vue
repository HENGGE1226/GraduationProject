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
						</a-form-item>
					</aCol>
				</aRow>
			</a-form>
		</div>
		<div class="classBox">
			<div class="item" v-for="(item) in classItem" :key="item.id">
				<div class="itemBg" :style='{backgroundImage: "url("+item.img+")"}'>
				</div>
				<div class="itemDetail">
					<div class="itemTitle">
						<span>{{item.name}}</span>
						<span style="float: right; font-size: 14px;">{{item.year}}{{item.season === 'spring' ? '春季' : '秋季'}}</span>
					</div>
					<p>
						<span class="itemStatus">{{item.classStatus === 'open' ? '开课中' : '已结课'}} |</span>
						<span class="itemTeacher">{{item.teacherName}}</span>
					</p>
				</div>
				<p class="classIntro" @click="handleGo(item.id)">课程详情</p>
			</div>
		</div>
		<div class="pagination">
			<aPagination :pageSize="8" :total="total" @change="changePage" :hideOnSinglePage='true' />
		</div>
  </div>
</template>

<script>
export default {
	name: 'allClass',
  data () {
    return {
      formLayout: 'horizontal',
			form: this.$form.createForm(this, { name: 'coordinated' }),
			classItem: [],
			total: 1
    }
	},
	mounted () {
		this.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				values.page = 1
				values.pageSize = 8
				this.$axios.queryClass(values)
					.then(({ data }) => {
						if (data.code === 200) {
							this.classItem = data.res
							this.total = data.total
							console.log(data.res)
						} else {
							this.$message.error('获取数据失败')
						}
					})
			}
		})
	},
	methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
					console.log('Received values of form: ', values)
					values.page = 1
					values.pageSize = 8
					this.$axios.queryClass(values)
						.then(({ data }) => {
							if (data.code === 200) {
								this.classItem = data.res
								this.total = data.total
								console.log(data.res)
							} else {
								this.$message.error('获取数据失败')
							}
						})
        }
      })
		},
		handleReset () {
			this.form.resetFields()
      this.form.validateFields((err, values) => {
        if (!err) {
					console.log('Received values of form: ', values)
					values.page = 1
					values.pageSize = 8
					this.$axios.queryClass(values)
						.then(({ data }) => {
							if (data.code === 200) {
								this.classItem = data.res
								this.total = data.total
								console.log(data.res)
							} else {
								this.$message.error('获取数据失败')
							}
						})
        }
      })
		},
		changePage (page, pageSize) {
			this.form.validateFields((err, values) => {
        if (!err) {
					values.page = page
					values.pageSize = 8
					this.$axios.queryClass(values)
						.then(({ data }) => {
							if (data.code === 200) {
								this.classItem = data.res
								this.total = data.total
								console.log(data.res)
							} else {
								this.$message.error('获取数据失败')
							}
						})
        }
      })
		},
		handleGo (id) {
			this.$router.push({path: 'classIntro', query: { classId: id }})
		}
	},
	components: {
	}
}
</script>

<style lang="less" scoped>
	.container {
		padding: 0;
		width: 100%;
		min-width: 1200px;
		height: 92vh;
		min-height: 700px;
		background: #f1f7f9;
		position: relative;
		.searchBox {
			width: 100%;
			height: 100px;
			padding-left: 80px;
			background: #f9f9f9;
			padding-top: 10px;
			text-align: center;
			border-bottom: 1px solid #dedede;
		}
		.classBox {
			padding: 0 100px 0 120px;
			margin-top: 20px;
			.item {
				width: 270px;
				height: 245px;
				display: inline-block;
				position: relative;
				margin-left: 20px;
				margin-bottom: 20px;
				box-shadow: 0 0 15px #efefef;
				background: #fff;
				border-radius: 5px;
				overflow: hidden;
				.itemBg {
					width: 270px;
					height: 150px;
					background: url('../../assets/classBg.png');
					background-repeat: no-repeat;
					background-size: cover;
				}
				.itemDetail {
					width: 100%;
					padding: 0 10px;
					.itemTitle {
						font-size: 16px;
						overflow: hidden;
						text-overflow: ellipsis;
						margin: 10px 0;
					}
					.itemStatus {
						font-size: 14px;
						color: #ccc;
					}
				}
				.classIntro {
					position: absolute;
					bottom: 15px;
					right: 15px;
					color: rgb(127, 127, 209);
					cursor: pointer;
				}
			}
		}
		.pagination {
			width: 100%;
			text-align: center;
		}
	}
</style>
