const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT;
const session = require('express-session');

function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

let productsPage1 = [];
let productsPage2 = [];
let productsPage3 = [];
let productsPage4 = [];
let productsPage5 = [];
let productsPage6 = [];
let productsPage7 = [];
let productsPage8 = [];
let productsPage9 = [];
let productsPage10 = [];

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use(session({
    secret: '11111111',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send('登入失敗，用戶名稱或密碼不正確');
    }
    req.session.userId = user.id;
    res.redirect('/shop.html');
});

app.get('/select.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'select.html'));
});

app.get('/shop.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});

app.get('/shop2.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop3.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop4.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop5.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop6.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop7.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop8.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop9.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});
app.get('/shop10.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop2.html'));
});

app.post('/add-product/shop', upload.single('image'), (req, res) => {
    
    const { name, price, style} = req.body;
    const image = req.file.filename;
    productsPage1.push({ id: Date.now(), name, price, style, image });
    res.redirect('/shop.html');
});

app.post('/add-product/shop2', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage2.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop2.html');
});

app.post('/add-product/shop3', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage3.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop3.html');
});
app.post('/add-product/shop4', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage4.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop4.html');
});
app.post('/add-product/shop5', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage5.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop5.html');
});
app.post('/add-product/shop6', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage6.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop6.html');
});
app.post('/add-product/shop7', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage7.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop7.html');
});
app.post('/add-product/shop8', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage8.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop8.html');
});
app.post('/add-product/shop9', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage9.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop9.html');
});
app.post('/add-product/shop10', upload.single('image'), (req, res) => {
    const { name, price, style } = req.body;
    const image = req.file.filename;
    productsPage10.push({ id: Date.now(), name, price,style, image });
    res.redirect('/shop10.html');
});

app.delete('/delete-product/:page/:id', (req, res) => {
    const { page, id } = req.params;
    let products;

    if (page === 'shop') {
        products = productsPage1;
    } else if (page === 'shop2') {
        products = productsPage2;
    } else if (page === 'shop3') {
        products = productsPage3;
    } else if (page === 'shop4') {
        products = productsPage4;
    } else if (page === 'shop5') {
        products = productsPage5;
    } else if (page === 'shop6') {
        products = productsPage6;
    } else if (page === 'shop7') {
        products = productsPage7;
    } else if (page === 'shop8') {
        products = productsPage8;
    } else if (page === 'shop9') {
        products = productsPage9;
    } else if (page === 'shop10') {
        products = productsPage10;
    } else {
        return res.status(404).send('页面不存在');
    }

    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.status(404).send('商品不存在');
    }
});

app.get('/api/products/shop', (req, res) => {
    res.json(productsPage1);
});

app.get('/api/products/shop2', (req, res) => {
    res.json(productsPage2);
});
app.get('/api/products/shop3', (req, res) => {
    res.json(productsPage3);
});
app.get('/api/products/shop4', (req, res) => {
    res.json(productsPage4);
});
app.get('/api/products/shop5', (req, res) => {
    res.json(productsPage5);
});
app.get('/api/products/shop6', (req, res) => {
    res.json(productsPage6);
});
app.get('/api/products/shop7', (req, res) => {
    res.json(productsPage7);
});
app.get('/api/products/shop8', (req, res) => {
    res.json(productsPage8);
});
app.get('/api/products/shop9', (req, res) => {
    res.json(productsPage9);
});
app.get('/api/products/shop10', (req, res) => {
    res.json(productsPage10);
});
app.get('/index2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});
app.get('/index3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index3.html'));
});
app.get('/index4.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index4.html'));
});
app.get('/index5.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index5.html'));
});
app.get('/index6.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index6.html'));
});
app.get('/index7.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index7.html'));
});
app.get('/index8.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index8.html'));
});
app.get('/index9.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index9.html'));
});
app.get('/index9.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index9.html'));
});
app.get('/index10.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index10.html'));
});

app.get('/viewproduct.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewproduct.html'));
});

// 新增以下路由用於顯示商品詳細資訊頁面
app.get('/product-detail/:page/:id', (req, res) => {
    const { page, id } = req.params;
    let products;

    if (page === 'shop') {
        products = productsPage1;
    } else if (page === 'shop2') {
        products = productsPage2;
    } else {
        return res.status(404).send('页面不存在');
    }

    const product = products.find(product => product.id === parseInt(id));
    if (product) {
        res.render('product-detail', { product });
    } else {
        res.status(404).send('商品不存在');
    }
});
// 新增以下路由用於獲取商品詳細資訊
app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const allProducts = productsPage1.concat(productsPage2).concat(productsPage3).concat(productsPage4).concat(productsPage5).concat(productsPage6).concat(productsPage7).concat(productsPage8).concat(productsPage9).concat(productsPage10); // 將所有商品合併為一個數組
    const product = allProducts.find(product => product.id === parseInt(productId));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('商品不存在');
    }
});


// app.get('/api/product/:id', (req, res) => {
//     const productId = req.params.id;
//     const product = productsPage1.find(product => product.id === parseInt(productId));
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).send('商品不存在');
//     }
// });

let formSubmissions = [];

app.get('/receipt.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipt.html'));
});

app.post('/add-information', upload.none(), (req, res) => {
    const { name, phone, email, message,line } = req.body;
    formSubmissions.push({ name, phone, email,line, message });
    sendNotificationEmail(name, email,phone,message,line);
    res.redirect('/receipt.html');
});

app.get('/api/form-submissions', (req, res) => {
    res.json(formSubmissions);
});

function sendNotificationEmail(name, email,phone,message,line) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'patrickhsu12@gmail.com',
            pass: 'hugjbcwwnvihogqm'
        }
    });

    let mailOptions = {
        from: 'patrickhsu12@gmail.com',
        to: 'respect_1725@hotmail.com',
        subject: '提醒！',
        text: `您好,\n\n 有人詢問！\n 名字:${name}\n 電話：${phone}\n email:${email}\nLineID:${line}\n 留言訊息:${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.get('/inquery.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inquery.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`後端服務已啟動，端口：${port}`);
});
