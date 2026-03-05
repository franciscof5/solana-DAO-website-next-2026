import React, { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, ShieldAlert, Users, Wallet, ExternalLink, Menu, X, ChevronRight, Activity, Zap, Pizza, Triangle, Quote } from 'lucide-react';
import { getTreasuryBalance, getTokenPrice, RPC_ENDPOINT } from './services/solana';

// Default styles for wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

const Dashboard = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [price, setPrice] = useState<string>("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [b, p] = await Promise.all([
        getTreasuryBalance(connection),
        getTokenPrice()
      ]);
      setBalance(b);
      setPrice(p);
      setLoading(false);
    };
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [connection]);

  return (
    <div className="min-h-screen bg-habit text-sand selection:bg-crust selection:text-habit">
      {/* Navigation */}
      <nav className="px-8 py-6 flex justify-between items-center border-b border-sand/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-crust flex items-center justify-center shadow-lg shadow-crust/20">
            <Triangle className="w-5 h-5 text-habit fill-current" />
          </div>
          <span className="text-serif text-2xl font-bold tracking-tight italic">Freira DAO</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-sand/60">
            <a href="#" className="hover:text-crust transition-colors">Tesouro</a>
            <a href="#" className="hover:text-crust transition-colors">Calls</a>
            <a href="#" className="hover:text-crust transition-colors">Esfiha-Meter</a>
          </div>
          <WalletMultiButton />
        </div>
      </nav>

      <main>
        {/* Hero Section - Editorial Style */}
        <section className="relative px-8 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              className="lg:col-span-7 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 border border-crust/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-crust mb-8 font-bold">
                A Pirâmide Perfeita
              </div>
              <h1 className="text-serif text-7xl lg:text-9xl font-bold leading-[0.85] mb-10 tracking-tighter">
                Siga a <br />
                <span className="italic text-crust">Freira.</span>
              </h1>
              <p className="text-serif text-2xl lg:text-3xl leading-relaxed text-sand/80 max-w-2xl mb-12 italic">
                "Em busca da pirâmide perfeita, enganando os trouxas e saindo com o máximo de lucro."
              </p>
              
              <div className="flex flex-wrap gap-6">
                <button className="px-10 py-5 bg-crust text-habit font-bold uppercase tracking-widest rounded-full hover:bg-sand transition-all flex items-center gap-3 shadow-xl shadow-crust/20">
                  Entrar na Pirâmide
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 border border-sand/20 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-bold">Líder Online</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Image Frame inspired by the reference */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border-[12px] border-sand/5 shadow-2xl">
                <img 
                  src="https://i.ibb.co/fYM1w23T/PDF-square-Gemini-Generated-Image-epdkyzepdkyzepdk.png" 
                  alt="A Freira e a Pirâmide de Esfihas"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-habit/60 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-sand/10 backdrop-blur-md border border-sand/20 rounded-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <ShieldAlert className="w-6 h-6 text-crust" />
                    <span className="text-xs uppercase tracking-widest font-bold text-crust">Risco Calculado</span>
                  </div>
                  <p className="text-sm italic text-sand/90">
                    "Ter o esfiha no grupo é o preço da glória."
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 border border-crust/20 rounded-full animate-spin-slow" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-crust/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Clean & Minimal */}
        <section className="px-8 py-24 bg-sand/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-crust font-bold">Preço do Token</div>
                <div className="text-5xl font-serif italic">{loading ? "..." : `$${price}`}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-crust font-bold">Tesouro DAO</div>
                <div className="text-5xl font-serif italic">{loading ? "..." : `${balance?.toFixed(2)} SOL`}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-crust font-bold">Vítimas Atuais</div>
                <div className="text-5xl font-serif italic">1,420</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-crust font-bold">Esfihas Comidas</div>
                <div className="text-5xl font-serif italic">∞</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="px-8 py-32 text-center max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-crust/30 mx-auto mb-10" />
          <h2 className="text-serif text-4xl lg:text-6xl italic leading-tight mb-12">
            "Não somos apenas um grupo, somos uma religião. E nossa hóstia é a esfiha de carne com tempero duvidoso."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-crust/30" />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">O Grande Líder Freira</span>
            <div className="w-12 h-[1px] bg-crust/30" />
          </div>
        </section>

        {/* Grid of Features inspired by the "Market" feel of the image */}
        <section className="px-8 py-24 border-t border-sand/10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 border border-crust/30 flex items-center justify-center rounded-lg">
                <Pizza className="w-6 h-6 text-crust" />
              </div>
              <h3 className="text-serif text-3xl italic">Calls de Elite</h3>
              <p className="text-sand/60 leading-relaxed">
                Receba as melhores calls diretamente do convento. Se a Freira falou, o rug é certo (ou não).
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 border border-crust/30 flex items-center justify-center rounded-lg">
                <Triangle className="w-6 h-6 text-crust" />
              </div>
              <h3 className="text-serif text-3xl italic">Arquitetura Piramidal</h3>
              <p className="text-sand/60 leading-relaxed">
                Nossa estrutura foi desenhada pelos mesmos engenheiros das pirâmides do Egito. Sólida como pão amanhecido.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 border border-crust/30 flex items-center justify-center rounded-lg">
                <ShieldAlert className="w-6 h-6 text-crust" />
              </div>
              <h3 className="text-serif text-3xl italic">Segurança Esfiha</h3>
              <p className="text-sand/60 leading-relaxed">
                Monitoramento constante do Esfiha. Se ele entrar em uma trade, nós saímos. Simples assim.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-20 border-t border-sand/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-serif text-3xl italic font-bold">Freira DAO</div>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-sand/40">
            <a href="#" className="hover:text-crust transition-colors">Twitter</a>
            <a href="#" className="hover:text-crust transition-colors">Telegram</a>
            <a href="#" className="hover:text-crust transition-colors">Solscan</a>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-sand/30">
            © 2024 - A Pirâmide que nunca dorme
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}} />
    </div>
  );
};

export default function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Dashboard />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
