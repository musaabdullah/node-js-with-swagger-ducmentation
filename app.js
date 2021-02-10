const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const postRouter = require('./routers/posts');
const port = process.env.PORT | 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Node js documentation API',
      version: '1.0.0'
    }
  },
  // apis: ['.routers/*.js'],
  apis: ['app.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(cors('dev'));
app.use('/public',express.static(path.join(__dirname,'public'))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.set('view engine', 'ejs');

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



/**
 * @swagger
 * /posts:
 *   get:
 *     description: Get all posts 
 *     responses:
 *         200:
 *           description: Success
 */
app.get('/posts', async (req, res) => {
  try {
    res.status(200).json({ message: 'posts data' })
  } catch(error) {
      res.json(error);
  }
})
/**
 * @swagger 
 * /posts:
 *   post: 
 *     summary: insert new post
 *     description: insert new post
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *             title:
 *               type: string
 *               description: post title
 *             body:
 *               type: string
 *               description: body of the post
 *       responses:
 *           201:
 *            description: post has been inserted
 *           422:
 *            description: post already exists
 *
 */
app.post('/posts', async (req, res) => {
  try {
    const post = { title, body } = req.body;
    res.status(201).json({ post })
  } catch(error ) {
    res.status(400).json(error);
  }
})

/**
 * @swagger 
 * /posts:
 *   put: 
 *     description: put post
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *             title:
 *               type: string
 *               description: post title
 *             body:
 *               type: string
 *               description: body of the post
 *       responses:
 *           201:
 *            description: post has been inserted
 *           422:
 *            description: post already exists
 *
 */
app.put('/posts', async (req, res) => {
  try {
    const post = { title, body } = req.body;
    res.status(201).json({ post })
  } catch(error ) {
    res.status(400).json(error);
  }
})

/**
 * @swagger 
 * /posts:
 *   delete: 
 *
 *     description: delete
 *     requestBody:
 *       content:
 *         application/json:
 *         responses:
 *           201:
 *            description: post has been inserted
 *           422:
 *            description: post already exists
 *
 */
app.delete('/posts', async (req, res) => {
  try {
    const post = { title, body } = req.body;
    res.status(201).json({ post })
  } catch(error ) {
    res.status(400).json(error);
  }
})

// app.use(postRouter);

app.listen(port, () => {
    console.log(port);
})