'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const MINIMUM_VISIBLE_MS = 2200
const FALLBACK_VISIBLE_MS = 7500

const PRELOAD_SRCS = [
  '/logo/UTS-logo.png',
  '/hero_img.png',
  '/hero_img_2.webp',
  '/hero_img_3.webp',
  '/airport-transfers.jpg',
  '/corporate-chauffeur.webp',
]

const STREAKS = [
  { top: '12%', width: 110, duration: '2.70s', delay: '-1.25s' },
  { top: '22%', width:  68, duration: '2.20s', delay: '-.40s'  },
  { top: '32%', width: 148, duration: '3.10s', delay: '-2.15s' },
  { top: '42%', width:  88, duration: '2.45s', delay: '-1.50s' },
  { top: '52%', width: 178, duration: '3.30s', delay: '-2.80s' },
  { top: '62%', width:  72, duration: '2.35s', delay: '-.85s'  },
  { top: '72%', width: 130, duration: '2.95s', delay: '-1.95s' },
  { top: '80%', width:  55, duration: '2.10s', delay: '-.60s'  },
  { top: '88%', width: 158, duration: '3.20s', delay: '-2.45s' },
  { top: '94%', width:  95, duration: '2.55s', delay: '-1.20s' },
]

const FAINT_STREAKS = [
  { top: '18%', delay: '-.85s'  },
  { top: '44%', delay: '-1.40s' },
  { top: '66%', delay: '-.30s'  },
  { top: '84%', delay: '-1.70s' },
]


export default function PageLoader() {
  const [visible,  setVisible]  = useState(true)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const startedAt = performance.now()
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let progressInterval: ReturnType<typeof setInterval> | undefined

    let current = 0
    progressInterval = setInterval(() => {
      current = Math.min(current + Math.random() * 5 + 1, 88)
      setProgress(current)
    }, 200)

    const completeAndHide = () => {
      clearInterval(progressInterval)
      setProgress(100)
      const elapsed = performance.now() - startedAt
      hideTimer = setTimeout(
        () => setVisible(false),
        Math.max(300, MINIMUM_VISIBLE_MS - elapsed),
      )
    }

    let domReady     = false
    let assetsLoaded = 0
    const total      = PRELOAD_SRCS.length
    const checkDone  = () => { if (domReady && assetsLoaded >= total) completeAndHide() }

    PRELOAD_SRCS.forEach(src => {
      const img = new window.Image()
      img.onload = img.onerror = () => { assetsLoaded++; checkDone() }
      img.src = src
    })

    const vid = document.createElement('video')
    vid.src = '/stats-video/UTS-video.mp4'
    vid.preload = 'auto'
    vid.muted = true

    if (document.readyState === 'complete') {
      domReady = true; checkDone()
    } else {
      window.addEventListener('load', () => { domReady = true; checkDone() }, { once: true })
    }

    const fallback = setTimeout(() => setVisible(false), FALLBACK_VISIBLE_MS)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fallback)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="uts-loader"
          initial={{ y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.78, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
            background: 'linear-gradient(180deg,#0f1014 0%,#09090c 42%,#060608 67%,#020203 100%)',
          }}
          role="status"
          aria-label="Loading United Travel Services"
          aria-live="polite"
          aria-busy="true"
        >
          <style>{`
            @keyframes utsStreak {
              0%   { transform:translateX(0);                    opacity:0   }
              9%   {                                             opacity:.40 }
              74%  {                                             opacity:.26 }
              100% { transform:translateX(calc(100vw + 450px)); opacity:0   }
            }
            @keyframes utsFaint {
              from { transform:translateX(0); opacity:0 }
              12%  { opacity:.28 }
              80%  { opacity:.18 }
              to   { transform:translateX(calc(100vw + 350px)); opacity:0 }
            }
            @keyframes utsContact {
              0%,100% { opacity:.10 }
              10%,82% { opacity:.38 }
            }
            @keyframes utsDash {
              from { transform:translateX(0)      }
              to   { transform:translateX(-120px) }
            }
          `}</style>

          {/* Subtle environment light */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: [
              'linear-gradient(180deg,rgba(255,255,255,.010),transparent 38%)',
              'radial-gradient(ellipse at 50% 46%,rgba(255,255,255,.015),transparent 52%)',
            ].join(','),
          }} />

          {/* Horizon line */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: 0, right: 0, top: '50%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.048) 18%,rgba(255,255,255,.082) 50%,rgba(255,255,255,.048) 82%,transparent)',
            opacity: .7,
          }} />

          {/* Road band — asphalt gray so black car reads against it */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: 0, right: 0, top: '44%', height: '56%',
            overflow: 'hidden',
            background: 'linear-gradient(180deg,rgba(88,88,94,0.78) 0%,rgba(64,64,70,0.82) 30%,rgba(42,42,48,0.88) 68%,rgba(18,18,22,0.92) 100%)',
          }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.065) 20%,rgba(255,255,255,.11) 50%,rgba(255,255,255,.065) 80%,transparent)',
            }} />
            <div style={{
              position: 'absolute', left: 0, right: 0, top: '28%', height: 1,
              overflow: 'hidden', opacity: .18,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, height: 1, width: '200%',
                background: 'repeating-linear-gradient(90deg,rgba(255,255,255,.55) 0px,rgba(255,255,255,.55) 60px,transparent 60px,transparent 120px)',
                animation: prefersReducedMotion ? 'none' : 'utsDash 1.2s linear infinite',
              }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              {STREAKS.map((s, i) => (
                <span key={i} aria-hidden="true" style={{
                  position: 'absolute', left: -220, top: s.top,
                  height: 1, width: s.width, borderRadius: 999,
                  background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.07) 8%,rgba(255,255,255,.28) 52%,rgba(255,255,255,.07) 88%,transparent 100%)',
                  animation: prefersReducedMotion ? 'none' : `utsStreak ${s.duration} linear ${s.delay} infinite`,
                } as React.CSSProperties} />
              ))}
              {FAINT_STREAKS.map((s, i) => (
                <span key={i} aria-hidden="true" style={{
                  position: 'absolute', left: -180, top: s.top,
                  height: 1, width: 48,
                  background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)',
                  animation: prefersReducedMotion ? 'none' : `utsFaint 2s linear ${s.delay} infinite`,
                } as React.CSSProperties} />
              ))}
            </div>
          </div>

          {/* Car */}
          <motion.div
            aria-hidden="true"
            initial={{ x: '-28vw' }}
            animate={prefersReducedMotion ? { x: 'calc(50vw - 50%)' } : { x: ['-28vw', '110vw'] }}
            transition={prefersReducedMotion ? { duration: 0 } : {
              duration: 4.2,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: 'clamp(180px, 22vw, 296px)',
              y: '-50%',
              zIndex: 10,
            }}
          >
            <Image
              src="/top-down-car.png"
              alt=""
              width={400}
              height={700}
              priority
              sizes="(max-width:640px) 180px, 22vw"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* ── Logo — top half ─────────────────────────────────────────────── */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '14%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: 'min(360px, 80vw)',
            zIndex: 20,
          }}>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}
            >
              <Image
                src="/logo/UTS-logo.png"
                alt="United Travel Services"
                width={440}
                height={160}
                priority
                style={{
                  width: 'clamp(150px, 18vw, 220px)',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.88,
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                margin: 0,
                color: 'rgba(255,255,255,.30)',
                fontFamily: 'Inter,sans-serif',
                fontSize: '7.5px',
                fontWeight: 400,
                letterSpacing: '.48em',
                textTransform: 'uppercase',
                paddingInlineStart: '.48em',
                whiteSpace: 'nowrap',
              }}
            >
              The Art of a Better Journey
            </motion.p>
          </div>

          {/* ── Linear progress bar — bottom ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            style={{
              position: 'absolute',
              left: '50%', bottom: '7%',
              transform: 'translateX(-50%)',
              width: 'min(280px, 62vw)',
              zIndex: 20,
            }}
            aria-hidden="true"
          >
            <div style={{
              width: '100%',
              height: 2,
              borderRadius: 1,
              background: 'rgba(255,255,255,0.10)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: 1,
                background: 'rgba(255,255,255,0.75)',
                boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                transition: 'width 0.2s ease',
              }} />
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
