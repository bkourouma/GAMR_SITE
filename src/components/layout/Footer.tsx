import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">GAMR</h3>
            <p className="text-sm text-gray-300">
              Plateforme intelligente de gestion des risques propulsée par l&apos;IA
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/fonctionnalites"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/etudes-de-cas"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Études de Cas
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Confidentialité RGPD
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/gerer-mes-donnees"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Gérer mes données
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">contact@gamr.com</li>
              <li className="text-sm text-gray-300">Support en français</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} ASPCI. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
