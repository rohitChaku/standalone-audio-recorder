const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csv = require('csvtojson')
const fs = require('fs');

const app = express();

// Middleware
app.use(
	bodyParser.json({
		limit: '10mb',
		extended: true
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '10mb',
		extended: true
	})
);
app.use(cors());

app.get('/records', (req, res) => {
	csv()
		.fromFile('./assets/audio_record.csv')
		.then((jsonObj)=>{
			console.log(jsonObj);
			res.send(jsonObj);
		});
});

app.post('/saveRecord', (req, res) => {
	try {
		fs.unlinkSync(req.body.filepath);
	} catch (error) {
		console.log("New File!");
	}
	let writeStream = fs.createWriteStream(req.body.filepath);
	writeStream.write(req.body.base64data.substring(22), 'base64');
	writeStream.on('finish', () => {
		console.log('wrote all data to file');
		res.sendStatus(200);
	});
	writeStream.end();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));