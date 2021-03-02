const ytdl = require('ytdl-core');
const fs = require('fs');
require('dotenv').config();

const cookies = process.env.COOKIES;
console.log('Cookies: ' + cookies);

const extractData = async (url) => {
	console.log('URL is:', url);
	try {
		return ytdl.getInfo(url)
		.then(result => {
			// Download the song
			ytdl(`${result.videoDetails.video_url}`, {
				requestOptions: {
					headers: {
						'Cookie': cookies
					}
				}
			}).pipe(fs.createWriteStream(`./uploads/${result.videoDetails.title}.mp3`));
			return result;
		})
		.catch(() => console.log('Invalid Video ID'));
	} catch (err) {
		return {
			error : 'Invalid Video ID'
		}
	}
}	

const getBitrates = (formats) => {
	const audioFormats = ytdl.filterFormats(formats, 'audioonly');
	const bitRate = [];
	const urls = {};
	for(audio in audioFormats) {
		bitRate.push(audioFormats[audio]['audioBitrate'])
		urls[audio] = audioFormats[audio]['url']
	}
	// console.log(urls)

	return [bitRate.sort((a, b) => a - b), urls];
}


module.exports = {
	extractData,
	getBitrates
}