// Increase body size limit to handle base64-encoded property photos
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
}

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'

function buildPrompt(form, features) {
  const featureList = features && features.length ? features.join(', ') : 'None specified'
  const sizeText = form.sqft ? `${form.sqft} sq ft` : 'Not provided'

  return `You are a senior UK estate agent and RICS-qualified valuer with 20 years of experience across England and Wales. You have deep knowledge of HM Land Registry sold price data, local market conditions, and pricing strategy.

Produce a detailed, professional property valuation in JSON format based on the information provided. Draw on your knowledge of typical property prices for the given postcode area. Be specific and realistic — do not use round numbers.

PROPERTY DETAILS:
- Address: ${form.address || 'Not provided'}, ${form.postcode || 'Not provided'}
- Property Type: ${form.propertyType || 'Not specified'}
- Bedrooms: ${form.bedrooms || 'Not specified'} | Bathrooms: ${form.bathrooms || 'Not specified'}
- Tenure: ${form.tenure || 'Not specified'}
- Floor Area: ${sizeText}
- Condition: ${form.condition || 'Not specified'}
- Year Built: ${form.yearBuilt || 'Not specified'}
- Features: ${featureList}
- Seller's Description: ${form.description || 'None provided'}

${form.photoCount > 0 ? `${form.photoCount} property photo(s) have been uploaded and analysed visually.` : 'No photos uploaded — rely on the property details above.'}

IMPORTANT INSTRUCTIONS:
1. Generate realistic UK property prices appropriate for the ${form.postcode || 'given'} postcode
2. The three pricing strategies must differ meaningfully: Fast Sale ~5–8% below Market Value; Ambitious ~8–12% above
3. Comparable properties must be plausible street addresses near the given postcode, not made-up
4. The confidence score (0–100) should reflect data availability — higher with more details provided
5. All prices as integers (no £ symbol, no commas)

Respond ONLY with this JSON — no markdown fences, no explanation, just the raw JSON object:
{
  "priceRange": {
    "low": 0,
    "high": 0,
    "midpoint": 0,
    "confidence": 0
  },
  "strategies": {
    "fastSale": {
      "price": 0,
      "timeframe": "4–6 weeks",
      "description": "..."
    },
    "marketValue": {
      "price": 0,
      "timeframe": "8–12 weeks",
      "description": "...",
      "recommended": true
    },
    "ambitious": {
      "price": 0,
      "timeframe": "12–20 weeks",
      "description": "..."
    }
  },
  "analysis": {
    "summary": "3–4 sentence professional valuation summary for the seller.",
    "marketContext": "2–3 sentences on current market conditions in this area.",
    "propertyStrengths": "2–3 sentences on what positively affects value.",
    "considerations": "1–2 sentences on factors that may affect sale price or saleability."
  },
  "comparables": [
    {
      "address": "Plausible nearby address",
      "type": "Property type",
      "bedrooms": 0,
      "soldPrice": 0,
      "soldDate": "Month Year",
      "relevance": "Brief note on why this is a relevant comparable"
    }
  ],
  "agentNote": "A professional one-paragraph note from the agent suitable for sign-off on this valuation report."
}`
}

function parseValuation(text) {
  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const start = clean.indexOf('{')
    const end = clean.lastIndexOf('}') + 1
    if (start === -1 || end === 0) return null
    return JSON.parse(clean.slice(start, end))
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Please add GROQ_API_KEY to your environment variables.' })
  }

  const { form, features, photos } = req.body

  if (!form || !form.postcode || !form.propertyType) {
    return res.status(400).json({ error: 'Missing required property details.' })
  }

  // Groq text-only: note photo count in the prompt but don't send raw image data
  // (Groq's llama models do not accept base64 inline images)
  form.photoCount = Array.isArray(photos) ? Math.min(photos.length, 4) : 0

  const content = [{ type: 'text', text: buildPrompt(form, features) }]

  try {
    const response = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 2500,
        messages: [{ role: 'user', content }],
      }),
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      const msg = data.error?.message || `API error ${response.status}`
      return res.status(response.status || 500).json({ error: msg })
    }

    const text = data.choices?.[0]?.message?.content || ''
    const parsed = parseValuation(text)

    if (!parsed) {
      return res.status(500).json({ error: 'Could not parse the valuation response. Please try again.' })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    console.error('Valuation API error:', err)
    return res.status(500).json({ error: err.message || 'An unexpected error occurred.' })
  }
}
