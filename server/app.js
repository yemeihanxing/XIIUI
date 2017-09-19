let koa = require('koa2');
let cors = require('koa-cors');
let koaRouter = require('koa-router');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const _ = require('lodash');
let app = new koa();
let router = koaRouter();
let db;
let MongoClient = require('mongodb').MongoClient;
let ObjectID =require('mongodb').ObjectID;
let url = 'mongodb://localhost:27017/novel';
let DB_SEARCH = require('./db');

// let mongodb = require('mongodb')

async function getDb() {
  if (!db) {
    db = await MongoClient.connect(url)
    // console.log('db：', db);
  }

  return db;
}

//


let xii = {
  getModel: function (collection_name) {
    return {
      findPage: async function (query, limit = 0, page = 0) {
        let db = await getDb();
        let col = db.collection(collection_name);

        return await col.find(query).skip(page * limit).limit(parseInt(limit)).toArray();
      },
      findOne: async function (query) {

        let db = await getDb();

        let col = db.collection(collection_name);
        return await col.findOne(query);
      },
      save: async function (obj) {
        let result;
        let db = await getDb();
        let col = db.collection(collection_name);

        if (obj._id) {
          //更新
          obj._id = new ObjectID(obj._id) ;
          await col.updateOne({'_id': obj._id}, {"$set": obj});

        } else {
          // 插入
          obj = _.omit(obj,'_id');
          console.log('-------obj------:',obj);
          result = await col.insertOne(obj);
        }
        return result;
      }
    };
  }
}

// fs.readFile(file_name, function (err, data) {
//
// })
// function readFile(file_name, options = null) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(file_name, options, function (err, data) {
//       if (err) return reject(err);
//       resolve(data);
//     })
//   })
// }
// let a = async () => {
//   let file = await readFile(123);
// };
// router.get('/', async ctx => {
//   // col = await getModel('123')
//   // ctx.body = await col.find().toArray()
//   let db_name = await getModel('test');
//   await db_name.insertOne({hello: '124'});
//   ctx.body = '测试';
// });
/*db.collection('api').find({a: true}).toArray(function (apis) {
  for (api of apis) {
    router[api.method](api.url, (function (machine_name) {
      return async (ctx) => {
        let heo = new DB_SEARCH(Object.assign({ctx}, xii));
        // console.log('body value:',ctx.request.body.obj);
        let search_obj = await db.findOne({machine_name})
        let result = await heo.find(search_obj);
        // let result =  await heo.find(ctx.request.body.obj);

        ctx.body = result;
      }
    })(api.machine_name));
  }
});*/

router.post('/test', async ctx => {

  // let heo = new DB_SEARCH(Object.assign({ctx}, xii));
  // console.log('body value:',ctx.request.body.obj);
  // let search_obj = await db.findOne({machine_name: 'category'})
  // let result = await heo.find(search_obj);
  //     let save_result =
  await xii.getModel('api').save(ctx.request.body.obj);
  // let result =  await heo.find(ctx.request.body.obj);

  ctx.body = {success:true};
});
// 获取model里的key
router.get('/getKey', async ctx => {

  let db = await getDb();
  let col = db.collection(ctx.query.model);
  let data = _.keys((await col.findOne()));
  let result = [];
  _.forEach(data, function (li) {
    result.push({'field': li})
  });
  ctx.body = {success: true, data: result};
})
// 获取所有的api 里的东西
router.get('/allApiCollection',async ctx => {
  let db = await getDb();
  let data = await db.collection('api').find().toArray();
  console.log('data:',data);
  ctx.body = {success:true,data};
})
app.use(cors());
app.use(convert(bodyparser));
app.use(router.routes());

app.listen(3001);
