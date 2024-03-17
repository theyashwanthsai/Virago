// Virago backend
// Home page. Chatbot page. news. community. auth
// Read and write using json file. User.json and Post.json
const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API-KEY');
const app = express()
const port = 3001
const secretKey = 'KALPANA';
const { Configuration, OpenAIApi } = require("openai");
const mysql = require('mysql');
app.use(cors());


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '24982498',
  database: 'kalpana'
});


// const {verifyToken} = require('./middleware.js');
const verifyToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['authorization'];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.split(' ')[1], secretKey);
        req.user = decoded;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/news', (req, res) => {   
    newsapi.v2.everything({
    q: 'financial+literacy+women+india',
    language: 'en'
    }).then(response => {
        const articles = response.articles.map(article => {
            return {
                title: article.title,
                author: article.author,
                description: article.description,
                url: article.url
            };
        });
        res.json(articles);
    }).catch(error => {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/schemes', (req, res) => {   
    newsapi.v2.everything({
    q: 'women+schemes+india',
    language: 'en'
    }).then(response => {
        const articles = response.articles.map(article => {
            return {
                title: article.title,
                author: article.author,
                description: article.description,
                url: article.url
            };
        });
        res.json(articles);
    }).catch(error => {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});



//
app.post('/post', verifyToken, (req, res) => {
    const { text, datePosted, opUsername } = req.body;

    // Insert the new post into the database
    pool.query('INSERT INTO posts (text, datePosted, opUsername) VALUES (?, ?, ?)', [text, datePosted, opUsername], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Post created successfully' });
    });
});

app.get('/posts', verifyToken, (req, res) => {
    // Retrieve all posts from the database
    pool.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
});


app.delete('/posts/:id', verifyToken, (req, res) => {
    const postId = req.params.id;

    // Delete the post from the database
    pool.query('DELETE FROM posts WHERE id = ?', postId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected (post deleted)
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user with matching username and password
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const user = results[0];
      // Successful login
      const token = jwt.sign({ username: user.username }, secretKey);
      res.json({ message: 'Login successful', user: user, token: token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

app.post('/signup', (req, res) => {
  const { username, password, location } = req.body;

  // Check if the username already exists
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert the new user into the database
    pool.query('INSERT INTO users (username, password, location) VALUES (?, ?, ?)', [username, password, location], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Successful signup
      const token = jwt.sign({ username: username }, secretKey);
      res.json({ message: 'Signup successful', token: token });
    });
  });
});
let answer = ""

app.post('/chat', async(req, res) => {
    let content = "These are sample conversations which u need to take as your context. Dont use these in your answers. use this as a reference. Answer accordingly."
    content += `{
        "Question": "What is the difference between simple interest and compound interest, as explained in the text? How do these interest types affect the growth of savings?",
        "Answer": "Simple interest is earned only on the principal amount, while compound interest is earned on both the principal and previously earned interest. Compound interest leads to exponential growth of savings over time, whereas simple interest does not account for the reinvestment of earned interest."
    }`;

    content += `{
        "Question": "How does inflation impact investments, as discussed in the text? Why is it important for investors to consider inflation during financial planning?",
        "Answer": "Inflation reduces the value of money over time, decreasing the purchasing power of savings and investments. It is crucial for investors to consider inflation during financial planning to ensure that their investments maintain or exceed the rate of inflation, preserving their real value."
    }, {
        "Question": "What is the of savings and investment according to the text.",
        "Answer": "Savings are the surplus of income over expenditure, while investment involves deploying money from savings into financial or non-financial products with the expectation of earning higher returns over time."
    }, {
        "Question": "What is the Stand-Up India Scheme outlined in the text. How does it support women entrepreneurs, and what are its objectives?",
        "Answer": "The Stand-Up India Scheme promotes entrepreneurship among women and marginalized communities by providing bank loans for the establishment of greenfield businesses. It ensures that at least one woman per bank branch receives financial support to start or expand her small business, thereby empowering women to become entrepreneurs."
    }`;
 
    Uinput = req.body.message;
   
    const keywords = [
        'women',
        'Women',
        'female',
        'financial literacy',
        'financial education',
        'budgeting',
        'saving',
        'investing',
        'retirement planning',
        'debt management',
        'financial independence',
        'wage gap',
        'taxes',
        'tax',
        'bank',
        'loans',
        'schemes',
        'girls',
        'school',
        'gender equality in finance',
        'economic empowerment',
        'financial inclusion',
        'financial decision-making',
        'financial awareness',
        'money management',
        'financial security',
        'entrepreneurship opportunities for women'
    ];
    const containsKeyword = keywords.some(keyword => Uinput.includes(keyword));
    if(!containsKeyword){
        return res.json({answer: "Out of syllabus"})
    }
    content += Uinput;
    // few shot approach
   
        // console.log(content);
    const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: 'API-KEY',
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: JSON.stringify(content)}],

});

console.log(chatCompletion.data.choices[0].message.content);
answer = chatCompletion.data.choices[0].message.content;
res.json({answer: answer});
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
