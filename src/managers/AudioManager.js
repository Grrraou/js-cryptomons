
class AudioManager {
    constructor() {
        this.assetPath = require.context('@/assets/sounds', false, /\.(mp3|wav|ogg)$/);
        this.isSoundOn = true;
    }

    play(soundFileName, volume = 1) {
        return new Promise((resolve) => {
            const sound = new Audio(this.assetPath(`./${soundFileName}`));
            
            if (this.isSoundOn) {
                sound.volume = volume;
    
                try {
                    sound.play().then(() => {
                        resolve();  // Resolve when the audio successfully starts playing
                    }).catch(error => {
                        console.log(`Audio playback failed for ${soundFileName}:`, error);
                    });
                } catch (error) {
                    console.log(`Audio playback was blocked for ${soundFileName}:`, error);
                }
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