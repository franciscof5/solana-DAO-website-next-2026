import React, { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, ShieldAlert, Users, Wallet, ExternalLink, Menu, X, ChevronRight, Activity, Zap } from 'lucide-react';
import { fetchTreasuryBalance, fetchTokenPrice, RPC_ENDPOINT } from './services/solana';

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
        fetchTreasuryBalance(connection),
        fetchTokenPrice()
      ]);
      setBalance(b);
      setPrice(p);
      setLoading(false);
    };
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [connection]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-neon-green selection:text-black">
      {/* Header */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-green flex items-center justify-center">
            <span className="text-black font-bold text-xl">F</span>
          </div>
          <span className="font-mono font-bold tracking-tighter text-xl uppercase">Freira DAO</span>
        </div>
        <div className="flex items-center gap-4">
          <WalletMultiButton />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-mono mb-6">
              <Activity className="w-3 h-3 animate-pulse" />
              LIVE ON SOLANA MAINNET
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              A PIRÂMIDE <br />
              <span className="text-neon-green italic">PERFEITA.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-lg mb-10 font-light leading-relaxed">
              Somos um grupo de investidores cripto em busca da pirâmide perfeita, 
              enganar os trouxas e sair com o máximo de lucro seguindo as calls do nosso grande líder <span className="text-white font-medium underline decoration-neon-green">Freira</span>!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neon-green transition-colors flex items-center gap-2 group">
                Comprar Token
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white/20 font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                Whitepaper
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-neon-green/20 to-transparent border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Zap className="w-64 h-64 text-neon-green" />
              </div>
              
              <div className="relative z-10">
                <div className="text-xs font-mono text-white/40 uppercase mb-2">Risco Calculado</div>
                <div className="flex items-center gap-4 p-4 bg-black/50 border border-white/10 backdrop-blur-sm">
                  <ShieldAlert className="w-8 h-8 text-neon-pink" />
                  <div>
                    <div className="font-bold text-lg">ALERTA DE ESFIHA</div>
                    <div className="text-sm text-white/50">O risco de ter o esfiha no grupo é real.</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/40 uppercase mb-1">Token Price</div>
                  <div className="text-3xl font-bold font-mono text-neon-green">
                    ${loading ? "---" : price}
                  </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/40 uppercase mb-1">Treasury</div>
                  <div className="text-3xl font-bold font-mono">
                    {loading ? "---" : balance?.toFixed(2)} SOL
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { label: "Membros Ativos", value: "420", icon: Users, color: "text-blue-400" },
            { label: "Volume 24h", value: "$1.2M", icon: TrendingUp, color: "text-neon-green" },
            { label: "Total Locked", value: "$69,420", icon: Wallet, color: "text-neon-pink" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-6`} />
              <div className="text-xs font-mono text-white/40 uppercase mb-2 tracking-widest">{stat.label}</div>
              <div className="text-4xl font-bold tracking-tighter group-hover:text-neon-green transition-colors">{stat.value}</div>
            </motion.div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="border border-neon-green p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-green/5 pointer-events-none" />
          <h2 className="text-4xl font-bold mb-6 tracking-tighter">PRONTO PARA O PRÓXIMO RUG?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Junte-se ao exército do Freira e vamos dominar a Solana. 
            Não garantimos lucros, mas garantimos risadas (especialmente quando o Esfiha for liquidado).
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-10 py-5 bg-neon-green text-black font-bold uppercase tracking-widest hover:bg-white transition-all">
              Entrar no Discord
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <span className="text-black font-bold text-sm">F</span>
            </div>
            <span className="font-mono font-bold tracking-tighter uppercase text-sm">Freira DAO © 2024</span>
          </div>
          <div className="flex gap-8 text-xs font-mono text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-neon-green">Twitter</a>
            <a href="#" className="hover:text-neon-green">Telegram</a>
            <a href="#" className="hover:text-neon-green">DexScreener</a>
          </div>
        </div>
      </footer>
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
