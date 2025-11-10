import { CTAButton } from '@/components/shared/CTAButton';

export function FinalCTA() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Enhanced Background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2463] via-[#1e3a8a] via-[#1e40af] to-[#2563eb]"></div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Prêt à commencer votre transformation ?
        </div>

        {/* Main heading with enhanced styling */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-in-left">
          <span className="block">Prêt à Transformer</span>
          <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Votre Gestion des Risques ?
          </span>
        </h2>

        {/* Subtitle with better typography */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-in-right">
          Démarrez votre essai gratuit de 30 jours ou demandez une démonstration personnalisée.
          <br />
          <span className="text-blue-200 font-medium">
            Rejoignez des centaines d&apos;entreprises qui font déjà confiance à GAMRdigitale.
          </span>
        </p>

        {/* Enhanced CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <CTAButton
            href="/essai-gratuit"
            variant="primary"
            size="lg"
            className="group bg-white hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border-0 min-w-[280px] [&_button]:!text-blue-600 [&_p]:!text-blue-600 [&_p]:!text-sm"
            reassurance="Sans carte bancaire • Annulation à tout moment"
          >
            <span className="flex items-center justify-center">
              <span>Démarrer l&apos;Essai Gratuit</span>
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </CTAButton>

          <CTAButton
            href="/demander-demo"
            variant="secondary"
            size="lg"
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-w-[200px] [&_button]:!text-blue-400"
          >
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Demander une Démo
            </span>
          </CTAButton>
        </div>

        {/* Trust indicators */}
        <div
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Setup en 48 heures
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Sécurité et Confidentialité Garanties
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Support 24/7
          </div>
        </div>
      </div>
    </section>
  );
}
