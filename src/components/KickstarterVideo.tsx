import { useEffect, useRef, useState, useCallback } from 'react'
import FadeUp from './FadeUp'

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function KickstarterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(true)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    
    const video = videoRef.current
    if (video) {
      video.volume = newVolume
      if (newVolume > 0) {
        video.muted = false
        setIsMuted(false)
      } else {
        video.muted = true
        setIsMuted(true)
      }
    }
    setHasInteracted(true)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    setHasInteracted(true)
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    
    if (!nextMuted && volume === 0) {
      video.volume = 0.8
      setVolume(0.8)
    } else {
      video.volume = volume
    }
  }

  // Listen to fullscreen changes to sync UI state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // IntersectionObserver: autoplay muted when in viewport, pause when out
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasInteracted) {
            video.muted = true
            setIsMuted(true)
            video.play().catch(() => {})
            setIsPlaying(true)
          }
        } else {
          if (!video.paused) {
            video.pause()
            setIsPlaying(false)
          }
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [hasInteracted])

  // Time update listener
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (!isDraggingScrubber) {
        setCurrentTime(video.currentTime)
      }
    }

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration)
      }
    }

    // Set immediately if already loaded
    if (video.readyState >= 1) {
      updateDuration()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('durationchange', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('durationchange', updateDuration)
    }
  }, [isDraggingScrubber])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    setHasInteracted(true)

    if (video.paused) {
      if (isMuted) {
        video.muted = false
        setIsMuted(false)
      }
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // Scrubber seek
  const seekToPosition = useCallback((clientX: number) => {
    const video = videoRef.current
    const bar = progressBarRef.current
    if (!video || !bar) return

    const videoDuration = duration || video.duration
    if (!videoDuration || isNaN(videoDuration)) return

    const rect = bar.getBoundingClientRect()
    const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    video.currentTime = fraction * videoDuration
    setCurrentTime(fraction * videoDuration)
  }, [duration])

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDraggingScrubber(true)
    seekToPosition(e.clientX)

    const handleMouseMove = (ev: MouseEvent) => seekToPosition(ev.clientX)
    const handleMouseUp = () => {
      setIsDraggingScrubber(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      id="kickstarter"
      ref={sectionRef}
      className="py-16 md:py-24 transition-colors duration-1000"
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <FadeUp>
          {/* Header Text */}
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-semibold mb-4 block">
              Our Story
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)] mb-4 leading-tight">
              See Para.Go in Action
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
              Watch how we're transforming Cebu's jeepney experience — from hardware to app to street.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          {/* Video Container — full section width */}
          <div className="relative w-full group">
            {/* Ambient glow behind video */}
            <div className="absolute -inset-4 md:-inset-6 bg-[var(--color-gold)]/8 blur-[60px] rounded-3xl pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Video wrapper with aspect ratio */}
            <div
              ref={wrapperRef}
              className="relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-2xl shadow-black/40 border border-white/[0.06] bg-black flex items-center justify-center"
              style={isFullscreen ? { width: '100%', height: '100%' } : { aspectRatio: '16 / 9' }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="https://res.cloudinary.com/dpxgscfxx/video/upload/KICKSTARTER_VIDEO_gdo1b6.mp4"
                playsInline
                loop
                muted
                preload="auto"
              />

              {/* Clickable overlay for play/pause (covers the video area ABOVE the controls) */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                style={{ bottom: '64px' }}
                onClick={togglePlayPause}
              />

              {/* Play/Pause button overlay — center (only when paused) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-20 ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/30 cursor-pointer'
                }`}
                onClick={togglePlayPause}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[var(--color-gold)]/20 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-[#0c0714] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Subtle vignette border */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none z-0" style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)'
              }} />

              {/* Bottom Controls Bar — sits above everything */}
              <div
                className={`absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-4 pt-10 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-400 z-30 ${
                  isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                {/* Progress Bar — tall hit area, thin visual track */}
                <div
                  ref={progressBarRef}
                  className="w-full py-2 cursor-pointer mb-1 group/bar relative"
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleProgressMouseDown(e) }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-1.5 bg-white/20 rounded-full relative">
                    {/* Played track */}
                    <div
                      className="absolute top-0 left-0 h-full bg-[var(--color-gold)] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                    {/* Scrubber dot */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[var(--color-gold)] rounded-full shadow-md shadow-black/40 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 -translate-x-1/2 pointer-events-none"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Timestamp + Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause mini button */}
                    <button
                      className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); togglePlayPause() }}
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Mute / Unmute Button */}
                    <button
                      className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); toggleMute() }}
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M6 9.75H4.5A1.5 1.5 0 003 11.25v1.5a1.5 1.5 0 001.5 1.5H6m0-4.5L10.5 6v12L6 14.25m0-4.5h0" />
                        </svg>
                      ) : volume < 0.5 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M6 9.75H4.5A1.5 1.5 0 003 11.25v1.5a1.5 1.5 0 001.5 1.5H6m0-4.5L10.5 6v12L6 14.25m0-4.5h0" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6 9.75H4.5A1.5 1.5 0 003 11.25v1.5a1.5 1.5 0 001.5 1.5H6m0-4.5L10.5 6v12L6 14.25m0-4.5h0" />
                        </svg>
                      )}
                    </button>

                    {/* Volume Slider */}
                    <div className="flex items-center mr-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-16 md:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[var(--color-gold)] focus:outline-none hover:h-1.5 transition-all"
                      />
                    </div>

                    {/* Timestamp */}
                    <span className="text-white/70 text-xs font-mono tracking-wider animate-fade-in">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen() }}
                  >
                    {isFullscreen ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sound hint */}
            <p className={`text-center text-[11px] uppercase tracking-[0.2em] text-white/30 mt-4 transition-opacity duration-500 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}>
              Click to play with sound
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

