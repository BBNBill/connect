const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const client = require('./connect.js');

app.get('/testConnect', async (req, res) =>{
    try {
        await client.authenticate();
        res.send('Connection has been successfully.');
    } catch (error) {
        res.send('Unable to connect to the database:', error);
      }
})

const UrlModel = require('./Models/url');
const TimeModel = require('./Models/url');

app.post('/insert', async (req, res) =>{
try{
    const rows = await UrlModel.create(req.body);
    res.send({rows: rows})
}catch(error){
    res.send('Unable to connect to the database:', error);
}
})

app.post('/insert_time', async (req,res) =>{
    const rows = await TimeModel.create(req.body);
    res.send({rows: rows})
})

app.get('/select',async (req, res) =>{
    const rows = await UrlModel.findAll({
    order: [['updatedAt', 'DESC']] });
    res.send(rows);
})

app.delete('/delete/:id', async (req, res) =>{
    const rows = await UrlModel.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send({rows: rows});
})

app.put('/update', async (req, res) =>{
    const rows = await UrlModel.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.send({rows: rows});
})

app.get('/info/:ownerurl/:nameurl', async (req, res) => {
    const ownerurl = req.params.ownerurl;
    const nameurl = req.params.nameurl;
  
    try {
      const rows = await UrlModel.findAll({
        order: [['updatedAt', 'DESC']],
        where: {
          ownerurl: ownerurl,
          nameurl: nameurl
        }
      });
  
      if (rows.length != '') {
        res.send(rows);
      } else {
        res.status(404).send('url not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



app.listen(port, () => {
    console.log(`Example app listening on port `,port);
  })

  /*หากคุณต้องการดึงข้อมูลจาก 2 ตารางโดยใช้คีย์หลักจากตาราง 'url' และคีย์รองจากตาราง 
  'timecheck' และค้นหาข้อมูลที่ตรงกัน คุณสามารถใช้ Sequelize, 
  ซึ่งเป็น ORM (Object-Relational Mapping) ใน Node.js ได้เพื่อทำการดึงข้อมูลแบบนี้:

  app.get('/get-data/:id', async (req, res) => {
    try {
        const urlId = req.params.id;
        const data = await UrlModel.findOne({
            where: {
                id: urlId
            },
            include: [{
                model: TimecheckModel,
                where: {
                    account_id: Sequelize.col('url.account_id')
                }
            }]
        });

        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ error: 'Data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

ในโค้ดด้านบน:

เราใช้ UrlModel.findOne() เพื่อค้นหาข้อมูลในตาราง 'url' โดยใช้คีย์หลัก 'id' ที่รับมาจากพารามิเตอร์ของ URL.
เราใช้ include เพื่อระบุว่าต้องการเชื่อมข้อมูลจากตาราง 'timecheck'.
ใน include, เราใช้ where เพื่อกำหนดเงื่อนไขที่ต้องตรงกันระหว่าง 'account_id' ในตาราง 'timecheck' และ 'account_id' ในตาราง 'url'.
โปรดตรวจสอบและปรับปรุงโค้ดตามความต้องการของคุณและโครงสร้างของฐานข้อมูลของคุณเองตามต้องการในแต่ละส่วนของโค้ดที่ให้ไว้ด้านบนนี้.*/