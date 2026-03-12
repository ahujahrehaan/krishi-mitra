import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/recommend', async (req, res) => {
  try {
    const { state, district, block, season, soilType } = req.body;

    const prompt = `
Based on the following inputs:
- State: ${state}
- District: ${district}
- Block: ${block}
- Season: ${season}
- Soil Type: ${soilType}

Suggest:
1. Suitable crops
2. Fertilizer recommendations (organic and/or inorganic)
3. Dosage and application timing
4. A sustainability tip for the region
Keep suggestions practical, farmer-friendly, and region-specific.
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      geminiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!geminiText) {
      throw new Error("No valid response from Gemini.");
    }

    res.json({ recommendations: geminiText });

  } catch (error) {
    console.error('Error fetching recommendations from Gemini:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate recommendations.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
