<template>
  <div class="container">
		<div class="homeBg">
		</div>
		<div class="homeTitle">
			<p class="title">广东财经大学网络教学平台</p>
		</div>
		<div class="detailBox">
			<div class="leftBox">
				<p class="boxTitle">使用规范</p>
				<p class="boxValue">
					详细使用教程请参考
					<a href="http://www.gdufe.edu.cn/2020/0131/c3182a117299/page.htm">>>></a>
				</p>
			</div>
			<div class="rightBox">
				<p class="boxTitle">校园动态</p>
				<p class="boxValue">
					疫情就是命令 防控就是责任
					<a href="http://www.gdufe.edu.cn/2020/0131/c3182a117299/page.htm">>>></a>
				</p>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="less">
  .container {
		padding: 0;
		width: 100%;
		height: 100vh;
		background: #f9f9f9;
		position: relative;
		.homeBg {
			width: 80%;
			height: 300px;
			margin: 0 auto;
			background: url('../../assets/bg.png');
			background-repeat: no-repeat;
			background-size: cover;
		}
		.homeTitle {
			width: 100%;
			height: 60px;
			text-align: center;
			margin-top: 30px;
			.title {
				font-size: 20px;
			}
		}
		.detailBox {
			width: 100%;
			display: flex;
			justify-content: center;
			.leftBox {
				width: 540px;
				height: 150px;
				display: inline-block;
				margin-right: 10px;
				padding: 25px 10px;
				border: 1px solid #1496dd;
				border-radius: 10px;
				.boxTitle {
					position: relative;
					margin-left: 27px;
				}
				.boxValue {
					font-size: 13px;
					margin-left: 18px;
					margin-top: 15px;
					a {
						text-decoration: none;
					}
					
				}
			}
			.leftBox .boxTitle:before {
				content: "";
				width: 3px;
				height: 16px;
				position: absolute;
				left: -10px;
				top: 2.5px;
				background: #009bff;
			}
			.rightBox {
				width: 540px;
				height: 150px;
				display: inline-block;
				margin-left: 10px;
				padding: 25px 10px;
				border: 1px solid #1496dd;
				border-radius: 10px;
				.boxTitle {
					position: relative;
					margin-left: 27px;
				}
				.boxValue {
					font-size: 13px;
					margin-left: 18px;
					margin-top: 15px;
					a {
						text-decoration: none;
					}
					
				}
			}
			.rightBox .boxTitle:before {
				content: "";
				width: 3px;
				height: 16px;
				position: absolute;
				left: -10px;
				top: 2.5px;
				background: #009bff;
			}
		}
		.footer {
			width: 100%;
			font-size: 10px;
			position: absolute;
			bottom: 0;
			text-align: center;
		}
  }
</style>
