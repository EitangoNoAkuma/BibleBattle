import { useState } from 'react';
import { getApiKey, setApiKey } from '../lib/api';

interface Props {
  onReady: () => void;
}

export default function ApiKeySetup({ onReady }: Props) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const existingKey = getApiKey();

  if (existingKey) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
        <h1 className="text-4xl font-bold text-wine mb-4 animate-fade-in">⚔️ BIBLE BATTLE</h1>
        <p className="text-ink-light mb-6 animate-fade-in">✅ API key is saved and ready.</p>
        <button
          onClick={onReady}
          className="px-10 py-4 bg-wine hover:bg-wine-dark text-cream rounded-lg text-xl font-bold transition-colors cursor-pointer"
        >
          Continue
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('bible-battle-api-key');
            setKey('');
            window.location.reload();
          }}
          className="mt-4 text-sm text-ink-faint hover:text-wine cursor-pointer underline"
        >
          Change API Key
        </button>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed.startsWith('sk-ant-')) {
      setError('API key should start with "sk-ant-"');
      return;
    }
    setApiKey(trimmed);
    onReady();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
      <h1 className="text-4xl font-bold text-wine mb-2 animate-fade-in">⚔️ BIBLE BATTLE</h1>
      <p className="text-ink-light mb-8 max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
        🔑 Enter your Anthropic API key to power the AI referee and commentary.
        Your key is stored locally in your browser — never sent to any server.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="password"
          value={key}
          onChange={e => { setKey(e.target.value); setError(''); }}
          placeholder="sk-ant-api03-..."
          className="w-full px-4 py-3 bg-cream-light border-2 border-wine/20 focus:border-wine text-ink rounded-lg text-lg outline-none mb-2"
        />
        {error && <p className="text-wine text-sm mb-2">{error}</p>}
        <button
          type="submit"
          disabled={!key.trim()}
          className="w-full px-8 py-3 bg-wine hover:bg-wine-dark text-cream font-bold rounded-lg text-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Save & Play
        </button>
      </form>

      <p className="mt-8 text-xs text-ink-faint max-w-sm">
        Get your key at{' '}
        <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" className="underline hover:text-wine">
          console.anthropic.com
        </a>
        . Uses Claude Haiku — about $0.003 per game.
      </p>
    </div>
  );
}
