import { useState, useRef, useCallback } from 'react'
import Head from 'next/head'

// ── Constants ────────────────────────────────────────────────────────────────

const FEATURES = [
  'Garden',
  'Garage',
  'Parking',
  'Double Glazing',
  'Central Heating',
  'Loft / Attic',
  'Conservatory',
  'Recently Renovated',
  'Open Plan Kitchen',
  'En-suite',
  'South Facing',
  'Period Features',
]

const LOADING_STEPS = [
  'Analysing property photos',
  'Comparing local sold prices',
  'Assessing market conditions',
  'Calculating pricing strategies',
  'Preparing valuation report',
]

const PROPERTY_TYPES = [
  'Terraced House',
  'Semi-Detached House',
  'Detached House',
  'Flat / Apartment',
  'Bungalow',
  'Maisonette',
  'Cottage',
  'New Build',
]

const TENURES = ['Freehold', 'Leasehold', 'Share of Freehold']

const CONDITIONS = [
  'Excellent – recently renovated',
  'Good – well maintained',
  'Average – some work needed',
  'Needs refurbishment',
]

const NAV_LINKS = [
  {
    label: 'How It Works',
    href: 'https://www.alexandriahamilton.co.uk/#how-it-works',
  },
  { label: 'About Us', href: 'https://www.alexandriahamilton.co.uk/about' },
  { label: 'Pricing', href: 'https://www.alexandriahamilton.co.uk/pricing' },
  {
    label: 'Valuation',
    href: 'https://www.alexandriahamilton.co.uk/valuation',
    active: true,
  },
  { label: 'FAQ', href: 'https://www.alexandriahamilton.co.uk/faq' },
  { label: 'Contact', href: 'https://www.alexandriahamilton.co.uk/contact' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () =>
      resolve({
        data: reader.result.split(',')[1],
        mediaType: file.type || 'image/jpeg',
      })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function formatPrice(n) {
  if (!n) return '—'
  return '£' + Number(n).toLocaleString('en-GB')
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="https://www.alexandriahamilton.co.uk" className="navbar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.webp"
            alt="Alexandria Hamilton"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">Alexandria Hamilton</span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map(({ label, href, active }) => (
            <li key={label}>
              <a href={href} className={active ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://www.alexandriahamilton.co.uk/list"
          className="navbar-cta"
        >
          List My Home — £495
        </a>
      </div>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob-1" aria-hidden="true" />
      <div className="hero-blob-2" aria-hidden="true" />

      <div className="hero-inner hero-inner--two-col">
        {/* Left: text */}
        <div className="hero-text">
          <span className="hero-eyebrow">Instant Property Intelligence</span>
          <h1>
            Your home's value,
            <br />
            <em>in minutes.</em>
          </h1>
          <p className="hero-body">
            Upload your photos and property details. Our AI analyses local sold
            prices, market conditions, and your property's features to produce a
            professional valuation — instantly.
          </p>
          <p className="hero-note">
            <strong>No valuer required.</strong> Fill in your property details
            below. The more information you provide, the more accurate your
            valuation will be.
          </p>
        </div>

        {/* Right: image + floating badge */}
        <div className="hero-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/use-raq-ai-smart-pricing-analysis.webp"
            alt="AI-powered property pricing analysis on mobile"
            className="hero-image"
          />
          <div className="hero-badge">
            <div className="hero-badge-icon" aria-hidden="true">
              🧠
            </div>
            <div>
              <div className="hero-badge-label">Powered by</div>
              <div className="hero-badge-value">Local sold data &amp; AI</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 56L60 46.7C120 37.3 240 18.7 360 14C480 9.3 600 18.7 720 28C840 37.3 960 46.7 1080 46.7C1200 46.7 1320 37.3 1380 32.7L1440 28V56H1380C1320 56 1200 56 1080 56C960 56 840 56 720 56C600 56 480 56 360 56C240 56 120 56 60 56H0Z"
            fill="#F8F7FB"
          />
        </svg>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Tagline */}
        <p className="footer-tagline">
          Sell your home on Rightmove from £495. No commission. No appointments.
          No fluff.
        </p>

        {/* Three-column grid */}
        <div className="footer-grid">
          <div>
            <div className="footer-col-title">Sell Your Home</div>
            <ul className="footer-links">
              <li>
                <a href="https://www.alexandriahamilton.co.uk/#how-it-works">
                  How It Works
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/list">
                  List My Home
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li>
                <a href="https://www.alexandriahamilton.co.uk/about">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/faq">FAQ</a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/contact">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.alexandriahamilton.co.uk/agent-login"
                  className="footer-link-dim"
                >
                  Agent Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li>
                <a href="https://www.alexandriahamilton.co.uk/terms">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/cookies">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/complaints">
                  Complaints Procedure
                </a>
              </li>
              <li>
                <a href="https://www.alexandriahamilton.co.uk/redress">
                  Redress Scheme
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-legal">
            Alexandria Hamilton is registered in England &amp; Wales (Company
            No. 16936042) and members of the Property Redress Scheme (Membership
            No: PRS056063).
          </p>
          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo.webp"
                alt="Alexandria Hamilton"
                className="footer-logo"
              />
              <span className="footer-copy">
                © 2026 Alexandria Hamilton. All rights reserved.
              </span>
            </div>
            {/* <span className="footer-built">Built by 102.ai</span> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ValuationPage() {
  const [step, setStep] = useState('form')
  const [loadingStep, setLoadingStep] = useState(0)
  const [photos, setPhotos] = useState([])
  const [photoFiles, setPhotoFiles] = useState([])
  const [features, setFeatures] = useState([])
  const [valuation, setValuation] = useState(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef()

  const [form, setForm] = useState({
    address: '',
    postcode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    tenure: '',
    sqft: '',
    condition: '',
    description: '',
    yearBuilt: '',
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  // ── Photo Handling ─────────────────────────────────────────────────────────

  const addPhotos = (files) => {
    const arr = Array.from(files).slice(0, 12 - photos.length)
    const previews = arr.map((f) => URL.createObjectURL(f))
    setPhotos((p) => [...p, ...previews].slice(0, 12))
    setPhotoFiles((p) => [...p, ...arr].slice(0, 12))
  }

  const removePhoto = (i) => {
    URL.revokeObjectURL(photos[i])
    setPhotos((p) => p.filter((_, j) => j !== i))
    setPhotoFiles((p) => p.filter((_, j) => j !== i))
  }

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length) addPhotos(e.dataTransfer.files)
    },
    [photos.length],
  ) // eslint-disable-line

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)

  // ── Feature Toggle ─────────────────────────────────────────────────────────

  const toggleFeature = (f) =>
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )

  // ── Submit ─────────────────────────────────────────────────────────────────

  const runValuation = async () => {
    setError('')
    setStep('loading')
    setLoadingStep(0)

    const timings = [0, 1800, 3500, 5200, 7000]
    timings.forEach((t, i) => setTimeout(() => setLoadingStep(i), t))

    try {
      const photoData =
        photoFiles.length > 0
          ? await Promise.all(photoFiles.slice(0, 4).map(fileToBase64))
          : []

      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, features, photos: photoData }),
      })

      const data = await res.json()
      if (!res.ok || data.error)
        throw new Error(data.error || `Server error ${res.status}`)

      await new Promise((r) => setTimeout(r, 800))
      setLoadingStep(LOADING_STEPS.length)
      setValuation(data)
      setStep('results')
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
      setStep('error')
    }
  }

  const reset = () => {
    photos.forEach((url) => URL.revokeObjectURL(url))
    setStep('form')
    setValuation(null)
    setPhotos([])
    setPhotoFiles([])
    setFeatures([])
    setLoadingStep(0)
    setError('')
  }

  const canSubmit =
    form.address && form.postcode && form.propertyType && form.bedrooms

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Instant Property Valuation — Alexandria Hamilton</title>
        <meta
          name="description"
          content="Get a free AI-powered property valuation in minutes. Alexandria Hamilton analyses local sold prices and market conditions to give you a professional valuation instantly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />

      <div className="page-body">
        {/* ── FORM ── */}
        {step === 'form' && (
          <div className="form-wrap">
            <div className="form-card">
              {/* 1. Property Details */}
              <div className="form-section">
                <div className="form-section-header">
                  <span className="section-num">1</span>
                  <div>
                    <div className="form-section-title">Property Details</div>
                    <div className="form-section-sub">
                      Tell us about your home
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <div className="field">
                    <label>Full Address *</label>
                    <input
                      placeholder="e.g. 14 Victoria Road, Manchester"
                      value={form.address}
                      onChange={(e) => set('address', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid-2 mb-16">
                  <div className="field">
                    <label>Postcode *</label>
                    <input
                      placeholder="e.g. M20 4AL"
                      value={form.postcode}
                      onChange={(e) =>
                        set('postcode', e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Property Type *</label>
                    <select
                      value={form.propertyType}
                      onChange={(e) => set('propertyType', e.target.value)}
                    >
                      <option value="">Select type…</option>
                      {PROPERTY_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid-3 mb-16">
                  <div className="field">
                    <label>Bedrooms *</label>
                    <select
                      value={form.bedrooms}
                      onChange={(e) => set('bedrooms', e.target.value)}
                    >
                      <option value="">Select…</option>
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Bathrooms</label>
                    <select
                      value={form.bathrooms}
                      onChange={(e) => set('bathrooms', e.target.value)}
                    >
                      <option value="">Select…</option>
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Tenure</label>
                    <select
                      value={form.tenure}
                      onChange={(e) => set('tenure', e.target.value)}
                    >
                      <option value="">Select…</option>
                      {TENURES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid-3 mb-16">
                  <div className="field">
                    <label>Floor Area (sq ft)</label>
                    <input
                      type="number"
                      placeholder="e.g. 850"
                      min="0"
                      value={form.sqft}
                      onChange={(e) => set('sqft', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Year Built</label>
                    <input
                      type="number"
                      placeholder="e.g. 1995"
                      min="1800"
                      max={new Date().getFullYear()}
                      value={form.yearBuilt}
                      onChange={(e) => set('yearBuilt', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Condition</label>
                    <select
                      value={form.condition}
                      onChange={(e) => set('condition', e.target.value)}
                    >
                      <option value="">Select…</option>
                      {CONDITIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Additional Details</label>
                  <textarea
                    placeholder="Anything that affects value — recent extension, new kitchen, loft conversion, EPC rating, nearby amenities, reason for selling…"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                  />
                </div>
              </div>

              {/* 2. Features */}
              <div className="form-section">
                <div className="form-section-header">
                  <span className="section-num">2</span>
                  <div>
                    <div className="form-section-title">
                      Features &amp; Extras
                    </div>
                    <div className="form-section-sub">
                      Select all that apply to your property
                    </div>
                  </div>
                </div>

                <div className="features-grid">
                  {FEATURES.map((f) => (
                    <div
                      key={f}
                      className={`feature-chip${features.includes(f) ? ' selected' : ''}`}
                      onClick={() => toggleFeature(f)}
                      role="checkbox"
                      aria-checked={features.includes(f)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === ' ' && toggleFeature(f)}
                    >
                      <span className="tick">
                        {features.includes(f) ? '✓' : ''}
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Photos */}
              <div className="form-section">
                <div className="form-section-header">
                  <span className="section-num">3</span>
                  <div>
                    <div className="form-section-title">Property Photos</div>
                    <div className="form-section-sub">
                      Upload up to 12 photos — exterior, rooms, kitchen, garden
                    </div>
                  </div>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => addPhotos(e.target.files)}
                />

                {photos.length < 12 && (
                  <div
                    className={`photo-zone${isDragging ? ' dragging' : ''}`}
                    onClick={() => fileRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && fileRef.current?.click()
                    }
                    aria-label="Upload property photos"
                  >
                    <div className="photo-zone-icon">📸</div>
                    <div className="photo-zone-title">
                      Click to upload photos
                    </div>
                    <div className="photo-zone-sub">
                      JPG · PNG · WEBP &nbsp;·&nbsp; Up to 12 photos
                      &nbsp;·&nbsp; {photos.length}/12 uploaded
                    </div>
                  </div>
                )}

                {photos.length > 0 && (
                  <div className="photo-grid">
                    {photos.map((src, i) => (
                      <div key={i} className="photo-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Property photo ${i + 1}`} />
                        <button
                          className="photo-remove"
                          onClick={(e) => {
                            e.stopPropagation()
                            removePhoto(i)
                          }}
                          aria-label={`Remove photo ${i + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status + Submit */}
              <div
                className={`status-alert ${canSubmit ? 'ready' : 'incomplete'}`}
              >
                <p className="status-alert-text">
                  {canSubmit ? (
                    <>
                      <strong>Ready to value.</strong> Address, postcode, type
                      and bedrooms are all set.
                    </>
                  ) : (
                    <>
                      <strong>Almost there.</strong> Please complete: address,
                      postcode, property type and bedrooms.
                    </>
                  )}
                </p>
                <button
                  className="submit-btn"
                  disabled={!canSubmit}
                  onClick={runValuation}
                >
                  Get My Valuation →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {step === 'loading' && (
          <div
            className="form-wrap"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="loading-screen">
              <div className="loading-spinner" aria-hidden="true" />
              <h2>Valuing your property…</h2>
              <p>
                Analysing{' '}
                {photoFiles.length > 0
                  ? `${Math.min(photoFiles.length, 4)} photos and `
                  : ''}
                your details against local market intelligence
              </p>
              <div className="loading-steps" role="status" aria-live="polite">
                {LOADING_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`loading-step${i === loadingStep ? ' active' : i < loadingStep ? ' done' : ''}`}
                  >
                    <span className="step-dot" aria-hidden="true" />
                    {i < loadingStep ? '✓ ' : ''}
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === 'error' && (
          <div className="form-wrap">
            <div className="error-box">
              <strong>Valuation failed</strong>
              <br />
              {error}
            </div>
            <button className="submit-btn" onClick={() => setStep('form')}>
              ← Try Again
            </button>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === 'results' && valuation && (
          <Results valuation={valuation} form={form} onReset={reset} />
        )}
      </div>

      <Footer />
    </>
  )
}

// ── Results Component ──────────────────────────────────────────────────────────

function Results({ valuation, form, onReset }) {
  const v = valuation
  const s = v.strategies || {}
  const a = v.analysis || {}
  const r = v.priceRange || {}
  const comps = v.comparables || []

  const strategies = [
    { key: 'fastSale', label: 'Fast Sale', icon: '⚡' },
    { key: 'marketValue', label: 'Market Value', icon: '🏡' },
    { key: 'ambitious', label: 'Ambitious', icon: '🎯' },
  ]

  return (
    <div className="results-wrap">
      <div className="results-header">
        <p className="results-eyebrow">Valuation Complete</p>
        <h2>{form.address || 'Your Property'}</h2>
        <p>
          {[
            form.propertyType,
            form.bedrooms && `${form.bedrooms} bed`,
            form.postcode,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>

      {/* Price Range */}
      <div className="range-band">
        <div>
          <div className="range-label">Estimated Value Range</div>
          <div className="range-value">
            {formatPrice(r.low)} – {formatPrice(r.high)}
          </div>
          <div className="range-sub">Midpoint: {formatPrice(r.midpoint)}</div>
        </div>
        <div className="range-divider" aria-hidden="true" />
        <div className="range-confidence">
          <div className="confidence-label">Confidence Score</div>
          <div
            className="confidence-bar-track"
            role="progressbar"
            aria-valuenow={r.confidence}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="confidence-bar-fill"
              style={{ width: `${r.confidence || 75}%` }}
            />
          </div>
          <div className="confidence-pct">{r.confidence || 75}%</div>
        </div>
      </div>

      {/* Strategies */}
      <div className="strategies-grid">
        {strategies.map(({ key, label, icon }) => {
          const strat = s[key] || {}
          return (
            <div
              key={key}
              className={`strategy-card${strat.recommended ? ' recommended' : ''}`}
            >
              <div className="strategy-tag">
                {strat.recommended ? '✓ Recommended' : label}
              </div>
              <div className="strategy-name">
                {icon} {label}
              </div>
              <div className="strategy-price">{formatPrice(strat.price)}</div>
              <div className="strategy-desc">{strat.description}</div>
              <div className="strategy-timeline">⏱ {strat.timeframe}</div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      {a.summary && (
        <div className="analysis-card">
          <div className="analysis-title">📋 Valuation Summary</div>
          <div className="analysis-body">{a.summary}</div>
        </div>
      )}

      {/* Market Analysis */}
      {(a.marketContext || a.propertyStrengths || a.considerations) && (
        <div className="analysis-card">
          <div className="analysis-title">📊 Market Analysis</div>
          {a.marketContext && (
            <div style={{ marginBottom: 18 }}>
              <p className="analysis-section-label">Market Context</p>
              <div className="analysis-body">{a.marketContext}</div>
            </div>
          )}
          {a.propertyStrengths && (
            <div style={{ marginBottom: 18 }}>
              <p className="analysis-section-label">Property Strengths</p>
              <div className="analysis-body">{a.propertyStrengths}</div>
            </div>
          )}
          {a.considerations && (
            <div>
              <p className="analysis-section-label">Considerations</p>
              <div className="analysis-body">{a.considerations}</div>
            </div>
          )}
        </div>
      )}

      {/* Comparables */}
      {comps.length > 0 && (
        <div className="analysis-card">
          <div className="analysis-title">🏘 Comparable Sales</div>
          <div className="comps-list">
            {comps.map((c, i) => (
              <div key={i} className="comp-item">
                <div>
                  <div className="comp-address">{c.address}</div>
                  <div className="comp-detail">
                    {[c.type, c.bedrooms && `${c.bedrooms} bed`, c.relevance]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
                <div className="comp-right">
                  <div className="comp-price">{formatPrice(c.soldPrice)}</div>
                  <div className="comp-date">{c.soldDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent's Note */}
      {v.agentNote && (
        <div className="analysis-card">
          <div className="analysis-title">✍️ Agent's Note</div>
          <div
            className="analysis-body"
            style={{ fontStyle: 'italic', color: '#231D45' }}
          >
            {v.agentNote}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="agent-signoff">
        <div className="signoff-left">
          <h3>Ready to go live on Rightmove?</h3>
          <p>
            Your valuation is complete. An agent will review and countersign
            this report, then we'll get your property live on Rightmove —
            usually within 24 hours.
          </p>
        </div>
        <button
          className="signoff-btn"
          onClick={() =>
            (window.location.href = 'https://www.alexandriahamilton.co.uk/list')
          }
        >
          List My Home — £495 →
        </button>
      </div>

      <button className="reset-btn" onClick={onReset}>
        ← Value another property
      </button>
    </div>
  )
}
