export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-text-primary">
      <div className="max-w-2xl w-full space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">
            Beatrix <span className="text-accent-neon">// Probabilités</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Vérification du thème Precision Dark
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-surface border border-white/10 space-y-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-widest">
              Test de Surface
            </h2>
            <div className="text-3xl font-mono text-accent-neon">
              74.2%
            </div>
            <p className="text-sm text-text-secondary">
              Probabilité prédite par le moteur d'analyse.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-white/10 space-y-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-widest">
              Test d'Accent
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-neon animate-pulse" />
              <span className="font-mono text-accent-neon">VALUE BET DETECTED</span>
            </div>
            <p className="text-sm text-text-secondary">
              L'accent néon doit être clairement visible sur le fond sombre. (Vérifié ✅)
            </p>
          </div>
        </div>

        <footer className="pt-8 text-center text-xs text-text-secondary font-mono">
          Système Beatrix v1.0 // 2026
        </footer>
      </div>
    </div>
  );
}
