import React, { useState } from 'react';
import { Home, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AuthProps {
  onSuccess: (username: string) => void;
  onExit: () => void;
  initialMode?: 'register' | 'login';
}

export default function Auth({ onSuccess, onExit, initialMode = 'register' }: AuthProps) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);

    // Minor client sanity validations
    if (isRegister && !username.trim()) {
      setErrorStatus('Por favor, informe seu Nome de Usuário.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorStatus('Por favor, informe um endereço de Email válido.');
      return;
    }
    if (password.length < 5) {
      setErrorStatus('A senha de segurança precisa conter no mínimo 5 caracteres.');
      return;
    }

    setLoading(true);
    // Simulate instantaneous premium authorization pipeline
    setTimeout(() => {
      setLoading(false);
      const displayUsername = isRegister ? username : email.split('@')[0];
      onSuccess(displayUsername);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 auth-collage-bg flex flex-col font-sans select-none overflow-y-auto">
      {/* Top Header Row overlay */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center h-16 px-12 bg-transparent select-none">
        <div className="font-display text-xl font-black text-brand-gold uppercase tracking-tighter">
          HQ Stream
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="p-2 text-white/70 hover:text-brand-gold bg-white/5 rounded-full border border-white/5 transition-colors cursor-pointer"
            title="Voltar para a Home"
          >
            <Home size={18} />
          </button>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="bg-brand-highest text-white px-6 py-2 rounded-lg border border-white/5 font-sans font-bold text-xs hover:border-brand-gold transition-all cursor-pointer"
          >
            {isRegister ? 'Entrar' : 'Registrar-se'}
          </button>
        </div>
      </header>

      {/* Main Form Center Layout */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-[440px] bg-brand-surface/75 backdrop-blur-xl border border-brand-gold/15 rounded-2xl p-8 lg:p-10 shadow-2xl shadow-black/80 transition-all duration-500 hover:border-brand-gold/25">
          <div className="mb-8 text-left select-none">
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-2 leading-none">
              {isRegister ? 'Registre-se' : 'Entrar na Conta'}
            </h1>
            <p className="font-sans text-xs text-on-surface-variant opacity-70">
              {isRegister 
                ? 'Crie sua conta VIP para começar sua jornada cósmica.' 
                : 'Acesse suas HQs favoritadas e histórico de leitura de onde estiver.'}
            </p>
          </div>

          {/* Validation Feedback Banner */}
          {errorStatus && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-xs rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle size={16} className="shrink-0" />
              <p className="font-sans leading-relaxed">{errorStatus}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field (signup only) */}
            {isRegister && (
              <div className="group">
                <label className="block text-[11px] font-sans font-semibold tracking-wider text-on-surface-variant/75 uppercase mb-1.5 transition-colors group-focus-within:text-brand-gold">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-brand-dark border-b border-white/10 focus:border-brand-gold text-sm text-white py-2.5 px-0 transition-all outline-none"
                  placeholder="Ex: Peter Parker"
                />
              </div>
            )}

            {/* Email field */}
            <div className="group">
              <label className="block text-[11px] font-sans font-semibold tracking-wider text-on-surface-variant/75 uppercase mb-1.5 transition-colors group-focus-within:text-brand-gold">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-dark border-b border-white/10 focus:border-brand-gold text-sm text-white py-2.5 px-0 transition-all outline-none animate-none"
                placeholder="seu@email.com"
              />
            </div>

            {/* Password field */}
            <div className="group">
              <label className="block text-[11px] font-sans font-semibold tracking-wider text-on-surface-variant/75 uppercase mb-1.5 transition-colors group-focus-within:text-brand-gold">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-dark border-b border-white/10 focus:border-brand-gold text-sm text-white py-2.5 px-0 pr-10 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 hover:opacity-100 cursor-pointer"
                  title={showPassword ? "Ocultar senha" : "Exibir senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-display font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : isRegister ? 'Criar Conta VIP' : 'Fazer Login Premium'}
              </button>
            </div>
          </form>

          {/* Toggle form direction footer link */}
          <div className="mt-8 text-center select-none">
            <p className="text-xs font-sans text-on-surface-variant">
              {isRegister ? 'Já possui uma conta ativa?' : 'Ainda não é cadastrado no HQ Stream?'}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorStatus(null);
                }}
                className="text-brand-gold font-bold ml-1.5 hover:underline underline-offset-4 cursor-pointer"
              >
                {isRegister ? 'Entre aqui' : 'Crie sua conta grátis'}
              </button>
            </p>
          </div>

          {/* Disclaimer text policies */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center select-none opacity-50">
            <p className="text-[10px] text-on-surface-variant leading-relaxed uppercase tracking-wider font-medium">
              Ao registrar-se você concorda com nossos Termos de Serviço e Política de Privacidade.
            </p>
          </div>
        </div>
      </main>

      {/* Underline decorative bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent shadow-lg" />
    </div>
  );
}
