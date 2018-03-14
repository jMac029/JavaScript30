/* Get elements from the DOM */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out Functions */

// handle the playing and pausing of the video
function togglePlay() {
    // turnerary operator to handle the play and pause
    video[video.paused ? 'play' : 'pause']();
}

// change the toggle button
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
  }

// skip foward and back based on the data attribute of the skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

// update the progress bar as the video plays
function handleProgress() {
    // convert the time and duration of the video progress into a percent
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    // convert the scrubBar position into time
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    // update the time of the video to the new scrub time
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */
// handle the pausing and playing of the video if the video is clicked
video.addEventListener('click', togglePlay);
// toggle play/pause when the toggle button is clicked
toggle.addEventListener('click', togglePlay);
// update the toggle button to show the status of the video when it is clicked
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// listen for the progress of the video
video.addEventListener('timeupdate', handleProgress);

// listen for skipButton presses to advance or rollback video
skipButtons.forEach(button => button.addEventListener('click', skip));

// listen for range sliders for to update the volume and playrate ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// flag for whether or not someone is mousingdown on the scrub bar
let mousedown = false;
// listen for clicks on the scrub progress bar
progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

