const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const { extractData, getBitrates } = require('./services/convert.js');


// [+] MIDDLEWARES [+]
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// [+] ROUTES [+]

// Root
app.get('/', (req, res) => {
	res.render('index', { error: null })
})

// Convert
app.post('/convert',  async (req, res) => {

	// Grab the URL from the POST request
	const url = req.body.url;

	if (!(url.includes('youtube') || url.includes('youtu.be'))) {
		res.render('index', { error: 'I only accept youtube links :)' })
	} else if (url.includes('&list')) {
		res.render('index', { error: 'Calm down! Don\'t throw a playlist on me' })
	} else {
		// call the extractData function from convert.js
		// pass the url to it
		const result = await extractData(url)
		
		if (result !== undefined) {
			// Destructing the returned array from getBitrates function
			const [ bitRate, bitRateURL ] = getBitrates(result.formats);
			// console.log(result.formats)
			const details = {
				title: result.videoDetails.title,
				author: result.videoDetails.author.name,
				views: result.videoDetails.viewCount,
				likes: result.videoDetails.likes,
				dislikes: result.videoDetails.dislikes,
				videoUrl: result.videoDetails.video_url,
				thumbnail: result.videoDetails.thumbnails[1].url,
				bitRate,
				bitRateURL
			};
			// console.log('URLS:', bitRateURL)
			// res.send(details.bitRate);
			res.render('convert', { details })
		} else {
			res.render('index', { error: 'Invalid Video ID' })
		}
	}
})

// Download Route
app.get('/download/:songName', (req, res) => {
	const filePath = `${__dirname + '/uploads/' + req.params.songName}.mp3`
	console.log('File path: ' + filePath);
	res.download(filePath);
})

// Send 404 if endpoint is invalid
app.use((req, res) => {
	res.status(404).render('404')
})

app.listen(3000, () => {
	console.log('Listening on port 3000')
})

