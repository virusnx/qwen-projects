import { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ cart, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 40 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center fade-in">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20"></div>
          <svg className="w-10 h-10 text-green-500 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-stone-800 mb-2">Order Confirmed!</h3>
        <p className="text-stone-500 text-sm max-w-xs">
          Thank you for your order. We're preparing your coffee with care. A confirmation email has been sent.
        </p>
        <div className="mt-6 px-4 py-2 rounded-full bg-stone-100 text-xs font-medium text-stone-600">
          Order #EB-{Math.random().toString(36).substr(2, 8).toUpperCase()}
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center fade-in">
        <div className="w-16 h-16 rounded-full border-4 border-stone-200 border-t-amber-500 animate-spin mb-6"></div>
        <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Processing your order...</h3>
        <p className="text-stone-500 text-sm">Please wait while we confirm your payment</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="font-display text-lg font-bold text-stone-800">Checkout</h2>
        <div className="w-12"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Order Summary Mini */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-stone-50 to-amber-50/30 border border-stone-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Order Total</span>
            <span className="text-lg font-bold text-stone-800">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
            <span>·</span>
            <span>{shipping === 0 ? 'Free shipping' : `$${shipping.toFixed(2)} shipping`}</span>
          </div>
        </div>

        {/* Shipping Section */}
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">1</span>
            Shipping Information
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
            />
            <input
              type="text"
              placeholder="Street Address"
              required
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                required
                value={formData.zip}
                onChange={(e) => updateField('zip', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">2</span>
            Payment Details
          </h3>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Card Number"
                required
                value={formData.cardNumber}
                onChange={(e) => updateField('cardNumber', e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <div className="w-8 h-5 rounded bg-gradient-to-r from-blue-600 to-blue-800"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM / YY"
                required
                value={formData.expiry}
                onChange={(e) => updateField('expiry', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
              />
              <input
                type="text"
                placeholder="CVV"
                required
                value={formData.cvv}
                onChange={(e) => updateField('cvv', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full btn-primary py-4 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay ${total.toFixed(2)}
          </button>
          <p className="text-center text-[10px] text-stone-400 mt-3 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Demo mode — no real payment will be processed
          </p>
        </div>
      </form>
    </div>
  );
}
