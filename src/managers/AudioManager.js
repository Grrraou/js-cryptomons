
class AudioManager {
    constructor() {
        this.assetPath = require.context('@/assets/sounds', false, /\.(mp3|wav|ogg)$/);
        this.isSoundOn = true;
    }

    play(soundFileName, volume = 1) {
        return new Promise((resolve, reject) => {
            const sound = new Audio(this.assetPath(`./${soundFileName}`));
            
            if (this.isSoundOn) {
                sound.volume = volume;
                sound.play().then(() => {
                    resolve();  // Resolve when the audio successfully starts playing
                }).catch(error => {
                    console.error(`Audio playback failed for ${soundFileName}:`, error);
                    reject(error);  // Reject the promise if playback fails
                });
            } else {
                resolve(); // If sound is off, resolve immediately (no playback)
            }
        });
    }

    playRandom(soundsArray, volume = 1) {
        const randomIndex = Math.floor(Math.random() * soundsArray.length);
        this.play(soundsArray[randomIndex], volume);
    }
}

export default new AudioManager();