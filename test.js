const ytdl = require('ytdl-core');
const fs = require('fs');
// const main  =  async () => {	
// 	const info = await ytdl.getInfo('https://www.youtube.com/watch?v=j5-yKhDd64s');
// 	console.log(info);
// }
 
const main = async () => {
	ytdl('https://www.youtube.com/watch?v=j5-yKhDd64s').pipe(fs.createWriteStream('Music.mp3'))
}

main();


// const youtubedl = require('youtube-dl')

// const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
// // Optional arguments passed to youtube-dl.
// // const options = ['--username=user', '--password=hunter2']

// youtubedl.getInfo(url, function(err, info) {
//   if (err) throw err

//   console.log(info)

//   // console.log('id:', info.id)
//   // console.log('title:', info.title)
//   // console.log('url:', info.url)
//   // console.log('thumbnail:', info.thumbnail)
//   // console.log('description:', info.description)
//   // console.log('filename:', info._filename)
//   // console.log('format id:', info.format_id)
// })