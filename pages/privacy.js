import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Alexandria Hamilton</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ background: '#F8F7FB', minHeight: '100vh' }}>
        <nav className="navbar">
          <div className="navbar-inner">
            <a href="https://www.alexandriahamilton.co.uk" className="navbar-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.webp" alt="Alexandria Hamilton" className="navbar-logo-img" />
              <span className="navbar-logo-text">Alexandria Hamilton</span>
            </a>
          </div>
        </nav>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#231D45' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ color: '#64748B', marginBottom: 40 }}>Last updated: April 2026</p>

          {[
            { title: '1. Who we are', body: 'Alexandria Hamilton is a UK estate agency registered in England & Wales (Company No. 16936042). We operate this property valuation tool to help homeowners understand the market value of their property.' },
            { title: '2. What data we collect', body: 'When you use this valuation tool, we collect: property details you enter (address, postcode, property type, bedrooms, condition etc.), any additional description you provide, and property photos you upload. We do not collect your name or contact details through this tool.' },
            { title: '3. How we use your data', body: 'Your property details and photos are sent to Google Gemini (an AI model) solely to generate a property valuation report. Photos are processed in real time and are not stored on our servers or by Google beyond the duration of the API call.' },
            { title: '4. Data retention', body: 'We do not store property details or photos submitted through this valuation tool. Each session is processed in real time with no persistent storage.' },
            { title: '5. Third parties', body: 'We use Google Gemini AI to process valuation requests. Google\'s data processing is governed by their AI services terms. We do not sell or share your data with any other third parties.' },
            { title: '6. Your rights', body: 'Under UK GDPR you have the right to access, rectify, or erase personal data held about you. As we do not store your data, there is nothing to retrieve or delete. For any queries contact us at hello@alexandriahamilton.co.uk.' },
            { title: '7. Contact', body: 'Alexandria Hamilton · hello@alexandriahamilton.co.uk · alexandriahamilton.co.uk' },
          ].map(({ title, body }) => (
            <div key={title} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, marginBottom: 8 }}>{title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#475569' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
