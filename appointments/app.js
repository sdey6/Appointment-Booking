var createError= require('http-errors');
var path=require('path');
const config= require('./config');
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
MongoClient.connect('mongodb://${config.dbHost}',
	useNewUrlParser:true,
	useUnifiedTopology:true,)
	.then(client=>{
		const db=client.db(config.dbName);
		const collection=db.collection(config.dbCollection);
		app.locals[config.dbCollection]=collection;
		})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use((req,res,next)=>{
	const collection=req.app.locals[config.dbCollection];
	req.collection=collection;
	next();})
	