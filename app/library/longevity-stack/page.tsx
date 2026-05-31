'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (full previous code with added affiliate disclosure and prominent CTAs)

export default function LongevityStackPage() {
  // ... existing code

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* Existing content */}
      {/* Added: Affiliate Disclosure Banner */}
      <div className="max-w-7xl mx-auto px-8 py-4 bg-white/5 text-sm text-white/70">
        TNIC may earn a commission from purchases made through links on this site. This supports our research at no extra cost to you. All recommendations are based on evidence and quality, not compensation.
      </div>
      {/* Rest of the page */}
    </div>
  );
}