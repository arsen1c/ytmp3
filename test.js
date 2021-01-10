const ytdl = require('ytdl-core');

const main  =  async () => {	
	const info = await ytdl.getInfo('https://www.youtube.com/watch?v=1m6en0SQNFs');
	console.log(info.formats);
}

main();