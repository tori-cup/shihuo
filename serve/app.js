const { SSL_OP_NO_TLSv1_1 } = require('constants')

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
app.post('/register', async (req, res) => {
  const resultss = await User.find({ username: req.body.username })
  const user = new User(req.body)
  console.log('开始')
  if (resultss.length > 0) {
    console.log('失败')
    res.json({
      code: 20001,
      msg: '用户名重复请重试'
    })
  } else {
    console.log('成功')
    var results = await user.save()
    res.json({
      code: 20000,
      msg: '注册成功'
    })
  }
})

//登陆
app.post('/login', async (req, res) => {
  const result = await User.find()
  const username1 = req.body.username
  const password1 = req.body.password
  var flag = false
  console.log(result[28])
  result.forEach(item => {
    console.log(item.username === username1)
    if (item.username === username1 && item.password === password1) {
      let token = createToken(req.body)
      res.json({
        code: 20000,
        msg: '登陆成功',
        result,
        token
      })
    }
    const flag = true
  })
  if (!flag) {
    res.json({
      code: 20001,
      msg: '登陆失败，请检查账号'
    })
  }
})

// const { roles, name, avatar, introduction } = data
// 退出登录
app.post('/logout', function(req, res) {
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
// app.post('/login', (req, res) => {
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

// element-admin 管理后台
// 登录接口
app.post('/user/login', function(req, res) {
  // req.session.token='加密算法生成随机token'
  // const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
  const data = {
    code: 20000,
    data: {
      token: 'asasasasas',
      orangiseid: 'wwwwwwww',
      introduction: 'I am a super administrator',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super111 Admin'
    }
  }
  res.json(data)
})

// 拉取用户信息
app.get('/user/info', function(req, res) {
  const data = {
    code: 20000,
    data: {
      roles: ['editor'],
      introduction: 'I am a super administrator',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super111 Admin'
    }
  }
  res.json(data)
})

//注销
app.post('/user/logout', function(req, res) {
  res.json({ code: 20000, message: 'success' })
})
// 添加城市
app.post('/create/city', (req, res) => {
  const city = new City(req.body)
  city.save().then(mon => {
    console.log(mon)
  })
  res.json({
    msg: '添加成功'
  })
})

// 读取城市列表 因为返回的是promise对象，所以才能够使用async和await
app.get('/citys', async (req, res) => {
  const result = await City.find()
  if (result.length > 0) {
    res.json({
      code: 20000,
      message: '数据获取成功',
      citys: result
    })
  } else {
    res.json({
      code: 20001,
      message: '暂无数据'
    })
  }
})
// 上传图片
app.post('/comment/uploadpic', upload.single('avatar'), function(
  req,
  res,
  next
) {
  //上传文件
  if (req.file) {
    res.json({
      code: 20000,
      path: req.file.path //文件的完整路径，包括目录/文件名
    })
  }
})
// 添加评论
app.post('/create/comment', async (req, res) => {
  const comment = new CityComment(req.body)
  const result = await comment.save()
  if (result) {
    res.json({
      code: 20000,
      msg: '添加成功'
    })
  }
})

// 读取评论列表
app.get('/comments', async (req, res) => {
  const result = await CityComment.find()
  if (result.length > 0) {
    res.json({
      code: 20000,
      message: '数据获取成功',
      comments: result
    })
  } else {
    res.json({
      code: 20001,
      message: '暂无数据'
    })
  }
})
// 编辑评论列表
app.post('/updateCity', async (req, res) => {
  console.log(req.body.name)
  const data = await City.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    region: req.body.region,
    date1: req.body.date1,
    date2: req.body.date2,
    delivery: req.body.delivery,
    type: req.body.type,
    resource: req.body.resource,
    desc: req.body.desc,
    showflag: true
  })
})
// 删除评论列表
app.get('/deleteCity', async (req, res) => {
  const index = req.query.id
  console.log(index)
  const result = await City.findByIdAndRemove(index)
  console.log(result)
  if (result) {
    res.json({
      code: 20000,
      message: '数据删除成功'
    })
  } else {
    res.json({
      code: 20001,
      message: '失败'
    })
  }
})
app.listen(8888, '127.0.0.1')
