const ytdl = require('ytdl-core');

const extractData = async (url) => {
	console.log('URL is:', url);
	try {
		return ytdl.getInfo(url)
		.then(result => result)
		.catch(() => console.log('Invalid Video ID'));
	} catch (err) {
		return {
			error : 'Invalid Video ID'
		}
	}
}	

const getBitrates = (formats) => {
	const audioFormats = ytdl.filterFormats(formats, 'audioonly');
	const bitRate = []
	const urls = {}
	for(audio in audioFormats) {
		bitRate.push(audioFormats[audio]['audioBitrate'])
		urls[audio] = audioFormats[audio]['url']
	}
	// console.log(urls)

	return [bitRate, urls];
}


module.exports = {
	extractData,
	getBitrates
}