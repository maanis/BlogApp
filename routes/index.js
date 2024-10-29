var express = require('express');
var router = express.Router();
var fs = require('fs')

router.get('/', function (req, res, next) {
  fs.readdir('./files', (err, fileName) => {
    res.render('index', { data: fileName });
  })
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/submit', (req, res) => {
  fs.writeFile(`./files/${req.body.title}`, `${req.body.body}`, (err, filename) => {
    res.redirect('/')
  })
})

router.get('/:slug', (req, res) => {
  fs.readFile(`./files/${req.params.slug}`, 'utf-8', (err, data) => {
    console.log(data)
    res.render('readMore', { title: req.params.slug, body: data })
  })
})

router.get('/edit/:slug', (req, res) => {
  res.render('edit', { oldName: req.params.slug })
})

router.post('/edited', (req, res) => {
  fs.rename(`./files/${req.body.old}`, `./files/${req.body.new}`, (e, f) => {
    res.redirect('/')
  })
})


router.get('/del/:slug', (req, res) => {
  fs.unlink(`./files/${req.params.slug}`, () => {
    res.redirect('/')
  })
})

module.exports = router;
