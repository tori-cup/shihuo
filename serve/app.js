const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const User = require('./model/user')
var multer = require('multer')
const cors = require('cors')
app.use(cors())

// token
const jwt = require('jsonwebtoken')
//撒盐，加密时候混淆
const secret = '113Bmongojsdalkfnxcvmas'
//生成token，info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 30 * 60
  })
  return token
}
//验证Token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })
// var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 拉去用户信息
// app.get('/user/info', function(req, res) {
//   const data = {
//     code: 20000,
//     data: {
//       roles: ['admin'],
//       introduction: 'I am a super administrator',
//       avatar:
//         'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//       name: 'Super Admin'
//     }
//   }
//   res.json(data)
// })

// 图片上传
app.post('/upload', upload.single('avatar'), function(req, res, next) {
  res.json({
    code: 20000,
    msg: '图片上传成功',
    path: req.file.path
  })
})

//注册
app.post('/user/register', async (req, res) => {
  const resultss = await User.find({ username: req.body.username })
  const user = new User(req.body)

  if (resultss.length > 0) {
    res.json({
      code: 20001,
      msg: '用户名重复请重试'
    })
  } else {
    var results = await user.save()
    res.json({
      code: 20000,
      msg: '注册成功'
    })
  }
})

// 登录
// app.post('/user/login', function(req, res) {
//   console.log(req.body.username)
//   const result = User.find({ username: req.body.username })
//   // mongoose.connect('mongodb://localhost:27017/user').then(mon => {
//   //   const users = new User(req.body)
//   //   console.log(users)
//   // })
//   let token = createToken(req.body)
//   res.json({
//     code: 20000,
//     msg: '登陆成功',
//     token
//   })
// })
//登陆

app.post('/user/login', async (req, res) => {
  const result = await User.find()
  const username1 = req.body.username
  const password1 = req.body.password
  result.forEach(item => {
    if (item.username === username1 && item.password === password1) {
      res.json({
        code: 20000,
        msg: '登陆成功',
        result
      })
    } else {
      res.json({
        code: 20001,
        msg: '登陆失败，请检查账号'
      })
    }
  })
})
// 移动端登录接口（简易接口）
// app.post('/user/login', async (req, res) => {
//   console.log(req.body)
//   // const user = new User(req.body) //获取comment页面提交的评论信息
//   // const result = await user.save() // 保存
//   res.json({
//     code: 20000,
//     msg: '登陆成功',
//     token: 'asdasdqweq113213asasa'
//   })
// })

// const { roles, name, avatar, introduction } = data
// 退出登录
app.post('/user/logout', function(req, res) {
  res.json({ code: 20000, message: 'success' })
})
// 获取用户列表
app.get('/users', (req, res) => {
  const start = req.query.start ? Number(req.query.start) : 0
  const end = req.query.end ? Number(req.query.end) : 0
  console.log(start, end)
  mongoose.connect('mongodb://localhost:27017/user').then(async mon => {
    console.log('数据库连接成功')
    const num = await User.find()
    const result = await User.find()
      .skip(start)
      .limit(end)
    res.json({
      code: 20000,
      msg: '获取城市数据成功',
      list: result,
      total: num.length
    })
  })
})
// 删除用户
app.post('/user/delete/:id', (req, res) => {
  const id = req.params.id
  mongoose.connect('mongodb://localhost:27017/user').then(async mon => {
    User.findByIdAndDelete(id).then(result => {
      if (result) {
        res.json({
          code: 20000,
          msg: '删除电影成功'
        })
      }
    })
  })
})

// 测试轮播图
app.get('/lunbo', (req, res) => {
  const list = [
    {
      imgurl: 'http://localhost:8888/uploads/1.jpg'
    },
    {
      imgurl: 'http://localhost:8888/uploads/2.jpg'
    },
    {
      imgurl: 'http://localhost:8888/uploads/3.jpg'
    }
  ]
  res.json({
    code: 200,
    msg: 'success',
    list: list
  })
})
// // 登录
// app.post('/user/login', (req, res) => {
//   console.log(req.body)
//   mongoose.connect('mongodb://localhost:27017/movie').then(mon => {
//     Movie.findByIdAndUpdate(req.body.id, req.body).then(result => {
//       res.json({
//         code: 20000,
//         msg: '电影修改成功'
//       })
//     })
//   })
// })
// // 根据id获取电影
// app.get('/movie/:id', (req, res) => {
//   const id = req.params.id
//   console.log(111111, id)
//   mongoose.connect('mongodb://localhost:27017/movie').then(async mon => {
//     Movie.findById(id).then(result => {
//       console.log(result)
//       if (result) {
//         res.json({
//           code: 20000,
//           msg: '获取电影数据成功',
//           movie: result
//         })
//       }
//     })
//   })
// })

app.listen(8888, '127.0.0.1')
