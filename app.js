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
		res.render('index', { error: 'Please include YouTube links only!' })
	} else if (url.includes('&list')) {
		res.render('index', { error: 'I can handle only a single video' })
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
				likes: result.videoDetails.likes,
				dislikes: result.videoDetails.dislikes,
				videoUrl: result.videoDetails.video_url,
				thumbnail: result.videoDetails.thumbnails[0].url,
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

// Send 404 if endpoint is invalid
app.use((req, res) => {
	res.status(404).render('404')
})

app.listen(3000, () => {
	console.log('LIstening on port 3000')
})

