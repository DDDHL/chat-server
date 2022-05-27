<p align="center">
	<img alt="logo" width="80" src="https://img-blog.csdnimg.cn/cdcda78242424ba397c061537ead8573.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">仿微信聊天桌面应用后端-微聊</h1>
<h4 align="center">基于 Vue3 + Nodejs + express + electron 前后端分离的聊天应用</h4>

## 系统简介

个人开发应用

- 前端主要采用 Vue3、element-Plus、electron。
- 后端主要采用 Nodejs、express、WebSocket、Jwt。
- 权限认证使用 Jwt，密码加密使用 crypto-js。
- 整个应用使用响应式布局，可兼容各屏幕大小。
- 应用可打包为安装包或者绿色解压包，打开即可使用。
- 前端地址 :（[Vue3 + element-Plus + electron](https://gitee.com/donghe-li/chat)）。

## 系统功能

1. 账号管理：基本的账号登录注册、修改个人信息、头像、密码等功能。
2. 好友管理：默认没有好友，可通过账号或名字模糊搜索添加好友。
3. 聊天功能：主要功能，能保存聊天记录，显示时间基于今天日期动态变化。
4. 好友列表：展示好友的所有信息、可直接跳转至聊天框。
5. 发布动态：可发布个人动态，仅好友及自己可见、可发布纯文字或者图片动态。
6. 查看动态：可查看好友及个人的动态，以时间排序，时间可动态变化。
7. 其他功能：其他功能待完善......

## 待完成点：

#### 1.添加好友需要同意才可以通过

#### 2.登录页换成独立小框框

#### 3.右下角添加任务栏小图标

#### 4.监测双击放大

## 接口文档

[ApiPost6 chat-server 文档](https://console-docs.apipost.cn/preview/fa11bc47a236be4d/8fa8cdeb15b6498e)

## 错误代码表

| code |         意义         |
| :--: | :------------------: |
| 1001 |    服务器发生错误    |
| 1002 |      token 过期      |
| 1003 |      账号未注册      |
| 1004 |       密码错误       |
| 1005 |      账号被注册      |
| 1006 |       参数错误       |
| 1007 | 不允许未注册用户查询 |
| 1008 |      原密码错误      |
| 1009 |   删除图片文件失败   |
| 1010 |  删除数据库记录失败  |

## 演示图

<table>
    <tr>
        <td><img src="https://img-blog.csdnimg.cn/240f7423d8f54bfca0c698a0f0b3f718.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/bcd3987caa074d4d8522ae734c94f764.png"/></td>
    </tr>
    <tr>
        <td><img src="https://img-blog.csdnimg.cn/9f26fa42af03493e890e81c3a0305c2c.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/cab2abfcd76e4b0fb78bac1e31440390.png"/></td>
    </tr>
    ​<tr>
        <td><img src="https://img-blog.csdnimg.cn/b2decd2227604c8a834561f062b58994.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/65d535db83fe4fa7825212e96b70266b.png"/></td>
    </tr>
    <tr>
        <td><img src="https://img-blog.csdnimg.cn/b5b1deebf2ab41bf9ff9ac4cb93558ed.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/b4cc2603c2104328bb89c8a0ff5afd19.png"/></td>
    </tr>
    <tr>
        <td><img src="https://img-blog.csdnimg.cn/73d1dfa6331b484bb7f8b534273d01ca.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/f9aa0ab390da41c799fd3d5991d5ff5e.png"/></td>
    </tr>
    <tr>
        <td><img src="https://img-blog.csdnimg.cn/efa828454da1441fb6f4709b7b4b8d78.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/b94f1ac2562b4d859cfc1be9880873be.png"/></td>
    </tr>
     <tr>
        <td><img src="https://img-blog.csdnimg.cn/0f6f3d558e254317b6ddccd096318aee.png"/></td>
        <td><img src="https://img-blog.csdnimg.cn/916519b9d66943f58d3a56994583e22a.png"/></td>
    </tr>
</table>
