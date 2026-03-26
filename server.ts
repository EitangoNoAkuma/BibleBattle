import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic();

// LLM-based scoring: referee rates how relevant a verse is to a debate topic
app.post('/api/score', async (req, res) => {
  try {
    const { verseText, verseReference, themeName, themeDescription } = req.body;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `You are a referee in a Bible verse debate battle. Score how relevant this Bible verse is to the given debate topic.

Topic: ${themeDescription}
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

// LLM-based commentary: two reporters (Mike & Dave) have a conversation
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
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `You are writing dialogue for two sports commentators — Mike and Dave — who are providing live commentary for a Bible verse debate battle. Mike is the excitable play-by-play announcer. Dave is the insightful color commentator who adds analysis.

${roundContext}
Topic: "${themeDescription}"
${player} just played: ${verseReference} — "${verseText}"
The referee scored this verse ${score}/100 points. Reason: ${scoreReason}
${situationContext}

Write exactly 2 lines of dialogue — first Mike, then Dave responding. Keep each line SHORT and punchy (1-2 sentences max). Mike should be dramatic/excited. Dave should add analytical insight about why the verse does or doesn't connect to the topic. If the score is low, Mike can be humorously shocked and Dave can gently explain why it missed. If high, both should be impressed.

Do NOT include speaker names in the lines — just the dialogue text.

Respond with ONLY a JSON array of exactly 2 strings: ["Mike's line", "Dave's line"]`,
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      const lines = JSON.parse(match[0]);
      res.json({ lines: lines.slice(0, 2) });
    } else {
      res.json({ lines: [`${player} plays ${verseReference}!`, `Interesting choice for this topic.`] });
    }
  } catch (error) {
    console.error('Commentary error:', error);
    res.json({ lines: ['Something is happening down there...', 'We seem to have lost our feed for a moment.'] });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Bible Battle API server running on port ${PORT}`);
});
