import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic();

// LLM-based scoring: rate how relevant a verse is to a debate topic
app.post('/api/score', async (req, res) => {
  try {
    const { verseText, verseReference, themeName, themeDescription } = req.body;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `You are a Bible debate judge. Score how relevant this Bible verse is to the given debate topic.

Topic: "${themeName}" — ${themeDescription}
Verse: ${verseReference} — "${verseText}"

Rate the relevance from 0 to 100:
- 80-100: Directly addresses the core of this debate topic
- 60-79: Strongly related with clear connection
- 40-59: Moderately related, requires some interpretation
- 20-39: Loosely related, tangential connection
- 1-19: Very weak connection
- 0: Completely unrelated

Respond with ONLY a JSON object in this exact format:
{"score": <number>, "reason": "<one sentence explanation>"}`,
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      res.json({ score: Math.min(100, Math.max(0, parsed.score)), reason: parsed.reason });
    } else {
      res.json({ score: 0, reason: 'Could not parse response' });
    }
  } catch (error) {
    console.error('Score error:', error);
    res.status(500).json({ error: 'Scoring failed' });
  }
});

// LLM-based commentary: generate exciting play-by-play
app.post('/api/commentary', async (req, res) => {
  try {
    const {
      player,
      verseReference,
      verseText,
      score,
      scoreReason,
      themeName,
      themeDescription,
      playerTotal,
      aiTotal,
      round,
      totalRounds,
      isSecondPlayer,
    } = req.body;

    const situationContext = isSecondPlayer
      ? `The score is now ${playerTotal} (Player) vs ${aiTotal} (AI Pastor).`
      : `Before this play, the score was ${playerTotal} (Player) vs ${aiTotal} (AI Pastor).`;

    const roundContext = round === totalRounds
      ? 'This is the FINAL ROUND!'
      : `This is round ${round} of ${totalRounds}.`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 250,
      messages: [{
        role: 'user',
        content: `You are an enthusiastic sports commentator for a Bible verse debate battle. Generate exciting play-by-play commentary.

${roundContext}
Topic: "${themeName}" — ${themeDescription}
${player} just played: ${verseReference} — "${verseText}"
This verse scored ${score}/100 points. Reason: ${scoreReason}
${situationContext}

Write 1-2 SHORT, punchy commentary lines (like a sports announcer). Be dramatic and entertaining. Reference the specific verse and how it connects (or doesn't) to the topic. If the score is low, be humorously sympathetic. If high, be excited.

Respond with ONLY a JSON array of strings: ["line1", "line2"]`,
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      const lines = JSON.parse(match[0]);
      res.json({ lines });
    } else {
      res.json({ lines: [`${player} plays ${verseReference}!`] });
    }
  } catch (error) {
    console.error('Commentary error:', error);
    res.json({ lines: ['The commentator seems speechless...'] });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Bible Battle API server running on port ${PORT}`);
});
