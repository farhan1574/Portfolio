import React, { useState } from 'react';
import ModalContainer from './ModalContainer';
import { 
  ShoppingBag, 
  ExternalLink, 
  Github, 
  Check, 
  Heart, 
  ShoppingCart, 
  Calendar,
  Layers
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ThreadlyModal({ isOpen, onClose, showToast }) {
  const project = portfolioData.projects.find(p => p.id === 'threadly') || portfolioData.projects[0];
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([1]);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const categories = ['All', 'Outerwear', 'Shirts', 'Pants', 'T-Shirts'];

  const filteredProducts = activeCategory === 'All' 
    ? project.sampleProducts 
    : project.sampleProducts.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Added "${product.name}" to cart! 🛍️`, 'success');
  };

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to wishlist ❤️', 'success');
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FARHAN20') {
      setDiscountApplied(true);
      showToast('Promo Code FARHAN20 Applied! 20% Discount Activated 🎉', 'success');
    } else {
      showToast('Try promo code: FARHAN20 for 20% off', 'info');
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalTotal = discountApplied ? (rawTotal * 0.8) : rawTotal;

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={`${project.title} – ${project.subtitle}`}
      subtitle={`Completed: ${project.date}`}
      icon={Layers}
      glowColor="cyan"
    >
      {/* Overview & Tech Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
              {project.badge}
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </span>
        </div>

        {/* Project Bullets from CV */}
        <ul className="space-y-2 pt-1">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 inline-block" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-bold">Tech:</span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-slate-800/80 text-cyan-300 border border-cyan-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Live Mini-Simulator */}
      <div className="p-4 rounded-xl glass-card border border-cyan-500/30 bg-slate-900/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <h4 className="font-semibold text-white text-sm">Interactive Product & Cart Demo</h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1">
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              Cart: <strong className="text-cyan-300">{totalCartCount}</strong>
            </span>
            <span className="text-emerald-400 font-bold">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black font-semibold shadow-neon-cyan'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {product.image}
                    </span>
                    <div>
                      <h5 className="font-semibold text-white text-xs leading-tight group-hover:text-cyan-300 transition-colors">
                        {product.name}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(product.id)}
                    className="text-slate-500 hover:text-pink-400 transition-colors p-1"
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-cyan-500/20">
                    {product.tag}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-all flex items-center gap-1 active:scale-95"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Code Test */}
        <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            placeholder="Try promo code 'FARHAN20'"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-black text-slate-300 text-xs font-medium transition-all"
          >
            Apply Code
          </button>
        </form>
      </div>

      {/* Links & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>github.com/farhan1574</span>
        </a>

        <div className="flex gap-2">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-neon-cyan active:scale-95"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>
    </ModalContainer>
  );
}
