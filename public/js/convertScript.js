const bitRateBtn = document.querySelectorAll('.bitRateBtn');
const downloadDiv = document.querySelector('.download-link');
const audioSrc = document.querySelector('source');


bitRateBtn.forEach(button => {
	button.addEventListener('click', e => {
		// console.log(e.target.getAttribute('data-link'));
		downloadDiv.classList.remove('block');
		
		if (downloadDiv.querySelector('#audio-player') !== null) {
			const sound = document.querySelector('#audio-player')
			downloadDiv.removeChild(sound);

			// Create the audio element
			downloadDiv.innerText = e.target.innerText + 'bit audio';
			const audio = document.createElement('audio');
			audio.id = 'audio-player';
			audio.controls = 'controls';
			audio.src =  e.target.getAttribute('data-link');
			audio.type = 'audio/mp3';

			downloadDiv.appendChild(audio);
		} else {
			// Create the audio element
			downloadDiv.innerText = e.target.innerText + 'bits';
			const audio = document.createElement('audio');
			audio.id = 'audio-player';
			audio.controls = 'controls';
			audio.src =  e.target.getAttribute('data-link');
			audio.type = 'audio/mpeg';

			downloadDiv.appendChild(audio);
		}
	})
})