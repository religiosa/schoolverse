import { useState } from 'react';
import { motion } from 'motion/react';
import { PlayerData } from './SettingsView';
import { Button } from './ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ShopViewProps {
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

interface ShopItem {
  id: string;
  name: string;
  decoration: string;
  price: number;
  category: 'hats' | 'accessories' | 'special';
  description: string;
}

export function ShopView({ playerData, onUpdatePlayerData }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hats' | 'accessories' | 'special'>('all');

  const shopItems: ShopItem[] = [
    // Hats
    { id: 'crown', name: 'Kruunu', decoration: '👑', price: 100, category: 'hats', description: 'Koulun kunkulle tai kuningattarelle!' },
    { id: 'tophat', name: 'Silinteri', decoration: '🎩', price: 75, category: 'hats', description: 'Klassinen valinta' },
    { id: 'cap', name: 'Lippis', decoration: '🧢', price: 50, category: 'hats', description: 'Urheilullinen' },
    { id: 'party', name: 'Juhlahattu', decoration: '🎉', price: 60, category: 'hats', description: 'Aina valmiina juhlaan!' },
    { id: 'wizard', name: 'Velhon hattu', decoration: '🧙', price: 90, category: 'hats', description: 'Maaginen ja mystinen' },
    
    // Accessories
    { id: 'star', name: 'Tähti', decoration: '⭐', price: 80, category: 'accessories', description: 'Olet tähtioppilas!' },
    { id: 'sparkle', name: 'Glitter', decoration: '✨', price: 70, category: 'accessories', description: 'Vähän kimalletta!' },
    { id: 'fire', name: 'Tuliefekti', decoration: '🔥', price: 85, category: 'accessories', description: 'Sä oot lit!' },
    { id: 'heart', name: 'Sydämet', decoration: '💖', price: 65, category: 'accessories', description: 'Lisää rakkautta' },
    { id: 'lightning', name: 'Salama', decoration: '⚡', price: 95, category: 'accessories', description: 'Sähköistävä vaihtoehto!' },
    
    // Special
    { id: 'rainbow', name: 'Sateenkaari', decoration: '🌈', price: 120, category: 'special', description: 'Ultra-harvinainen sateenkaariefekti!' },
    { id: 'trophy', name: 'Palkinto', decoration: '🏆', price: 150, category: 'special', description: 'Voittajan valinta' },
    { id: 'medal', name: 'Kultamitali', decoration: '🥇', price: 130, category: 'special', description: 'Eka!' },
    { id: 'rocket', name: 'Raketti', decoration: '🚀', price: 140, category: 'special', description: 'Tavoittele tähtiin!' },
    { id: 'diamond', name: 'Timantti', decoration: '💎', price: 200, category: 'special', description: 'Legendaarinen koristus!' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const purchaseItem = (item: ShopItem) => {
    if (playerData.ownedDecorations.includes(item.decoration)) {
      toast.error('Sinulla on jo tämä koriste!');
      return;
    }

    if (playerData.gameCoins < item.price) {
      toast.error('Ei tarpeeksi kolikoita! Suorita haasteita saadaksesi lisää kolikoita.');
      return;
    }

    // Purchase successful
    onUpdatePlayerData({
      gameCoins: playerData.gameCoins - item.price,
      ownedDecorations: [...playerData.ownedDecorations, item.decoration]
    });
    
    toast.success(`${item.name} ostettu! Löydät sen Avatar-osiosta.`);
  };

  const isOwned = (decoration: string) => playerData.ownedDecorations.includes(decoration);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white/10 rounded-lg border-3 border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="text-yellow-400" size={24} />
            <h3 className="text-white">Koristekauppa</h3>
          </div>
          <div className="bg-yellow-400 px-4 py-2 rounded-lg border-2 border-yellow-600 flex items-center space-x-2">
            <span className="text-lg">🪙</span>
            <span className="text-gray-900">{playerData.gameCoins}</span>
          </div>
        </div>
        <p className="text-white/80 text-sm">
          Osta koristeita ansaitsemillasi kolikoilla!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto">
        <Button
          onClick={() => setSelectedCategory('all')}
          className={`${
            selectedCategory === 'all'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border-2 border-gray-600'
          }`}
        >
          Kaikki koristeet
        </Button>
        <Button
          onClick={() => setSelectedCategory('hats')}
          className={`${
            selectedCategory === 'hats'
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border-2 border-gray-600'
          }`}
        >
          🎩 Hatut
        </Button>
        <Button
          onClick={() => setSelectedCategory('accessories')}
          className={`${
            selectedCategory === 'accessories'
              ? 'bg-pink-600 hover:bg-pink-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border-2 border-gray-600'
          }`}
        >
          ✨ Koristeet
        </Button>
        <Button
          onClick={() => setSelectedCategory('special')}
          className={`${
            selectedCategory === 'special'
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border-2 border-gray-600'
          }`}
        >
          💎 Erikoiset
        </Button>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        {filteredItems.map((item) => {
          const owned = isOwned(item.decoration);
          const canAfford = playerData.gameCoins >= item.price;

          return (
            <motion.div
              key={item.id}
              className={`relative p-4 rounded-lg border-3 ${
                owned
                  ? 'border-green-500 bg-green-500/20'
                  : canAfford
                  ? 'border-gray-600 bg-white/10'
                  : 'border-gray-700 bg-white/5'
              }`}
              whileHover={!owned ? { scale: 1.05 } : {}}
            >
              {/* Owned Badge */}
              {owned && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}

              {/* Category Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs ${
                item.category === 'hats' ? 'bg-purple-600' :
                item.category === 'accessories' ? 'bg-pink-600' :
                'bg-yellow-600'
              } text-white`}>
                {item.category}
              </div>

              {/* Item Display */}
              <div className="text-5xl text-center mb-3 mt-6">{item.decoration}</div>
              
              <h4 className="text-white text-center mb-1">{item.name}</h4>
              <p className="text-white/70 text-xs text-center mb-3">{item.description}</p>

              {/* Price and Purchase */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 bg-yellow-400 px-2 py-1 rounded">
                  <span className="text-sm">🪙</span>
                  <span className="text-gray-900 text-sm">{item.price}</span>
                </div>

                <Button
                  onClick={() => purchaseItem(item)}
                  disabled={owned || !canAfford}
                  className={`text-sm ${
                    owned
                      ? 'bg-gray-500 cursor-not-allowed'
                      : canAfford
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-600 cursor-not-allowed'
                  } text-white`}
                  size="sm"
                >
                  {owned ? 'Omistat' : 'Osta'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How to Earn Coins Info */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg border-3 border-blue-800 p-4">
        <h4 className="text-white mb-2">💡 Miten saat lisää kolikoita?</h4>
        <ul className="text-white/90 text-sm space-y-1">
          <li>• Puhu uusille opettajille (+10 kolikkoa)</li>
          <li>• Tutki uusia luokkatiloja (+15 kolikkoa)</li>
          <li>• Tee päivittäisiä haasteita (+50 kolikkoa)</li>
          <li>• Vastaa oikein tietovisassa (+25 kolikkoa)</li>
        </ul>
      </div>
    </div>
  );
}
