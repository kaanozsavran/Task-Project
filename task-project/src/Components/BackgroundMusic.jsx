import { useEffect, useRef, useState } from "react";

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = [
    { title: "Naruto Sad Soundtrack", file: "/assets/song1.mp3" },
    { title: "Eksik", file: "/assets/song2.mp3" },
    { title: "Die With A Smile", file: "/assets/song3.mp3" },
    { title: "Skapova", file: "/assets/song4.mp3" },
    { title: "Hayko", file: "/assets/song5.mp3" },
  ];

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) =>
            console.log("Tarayıcı otomatik çalmayı engelledi:", error)
          );
      } else {
        setIsPlaying(true);
      }
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <>
      <audio ref={audioRef} src={tracks[currentTrack].file} />

      <div className="music-controller">
        <strong>{tracks[currentTrack].title}</strong>
        <div className="controls">
          <button onClick={handlePrev} title="Önceki">
            ⏮️
          </button>

          <button
            onClick={togglePlayPause}
            className="play-pause-button"
            title={isPlaying ? "Durdur" : "Başlat"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button onClick={handleNext} title="Sonraki">
            ⏭️
          </button>
        </div>

        <label>🔊 Ses: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </>
  );
}

export default BackgroundMusic;
