import React from 'react';
import { AircraftCategory } from '../data/jetzenData';

export const HeroAviationBlueprint: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[390px] lg:min-h-[470px] bg-[#0F141C] text-[#FAF8F5] overflow-hidden flex flex-col justify-between p-7 border border-[#242E3D]">
      {/* Architectural Great-Circle Radar & Fuselage Blueprint SVG */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skySlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F141C" />
            <stop offset="55%" stopColor="#151D2A" />
            <stop offset="100%" stopColor="#1B2638" />
          </linearGradient>
          <linearGradient id="brassStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF7A" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4AF7A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B89058" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="radarGlow" cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#B89058" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0F141C" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="600" fill="url(#skySlate)" />

        {/* Subtle Navigation Grid Lines */}
        <line x1="0" y1="150" x2="800" y2="150" stroke="#222D3F" strokeWidth="1" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#222D3F" strokeWidth="1" />
        <line x1="0" y1="450" x2="800" y2="450" stroke="#222D3F" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="600" stroke="#222D3F" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="600" stroke="#222D3F" strokeWidth="1" />
        <line x1="600" y1="0" x2="600" y2="600" stroke="#222D3F" strokeWidth="1" />

        {/* Great Circle Range Rings */}
        <circle cx="400" cy="275" r="220" fill="url(#radarGlow)" stroke="#29364B" strokeWidth="1" />
        <circle
          cx="400"
          cy="275"
          r="155"
          fill="none"
          stroke="#354660"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <circle cx="400" cy="275" r="90" fill="none" stroke="#B89058" strokeWidth="0.9" strokeOpacity="0.45" />

        {/* Great-Circle Transatlantic Flight Arc: KTEB -> EGGW */}
        <path
          d="M 195 335 Q 400 135 605 255"
          fill="none"
          stroke="url(#brassStroke)"
          strokeWidth="2.5"
        />
        <path
          d="M 195 335 Q 400 195 605 255"
          fill="none"
          stroke="#64748B"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Origin & Destination Waypoints */}
        <circle cx="195" cy="335" r="6" fill="#D4AF7A" />
        <circle cx="195" cy="335" r="13" fill="none" stroke="#D4AF7A" strokeWidth="1" />
        <circle cx="605" cy="255" r="6" fill="#D4AF7A" />
        <circle cx="605" cy="255" r="13" fill="none" stroke="#D4AF7A" strokeWidth="1" />

        {/* Top-Down Swept-Wing Ultra-Long-Range Jet Planform at Apex */}
        <g transform="translate(400, 226) rotate(-10)">
          {/* Fuselage */}
          <path
            d="M -65 0 C -40 -7, 35 -7, 72 0 C 35 7, -40 7, -65 0 Z"
            fill="#FAF8F5"
            stroke="#D4AF7A"
            strokeWidth="1.5"
          />
          {/* Swept Main Wings */}
          <polygon
            points="-5,-5 -38,-68 -22,-68 24,-5"
            fill="#CBD5E1"
            stroke="#D4AF7A"
            strokeWidth="1.2"
          />
          <polygon
            points="-5,5 -38,68 -22,68 24,5"
            fill="#CBD5E1"
            stroke="#D4AF7A"
            strokeWidth="1.2"
          />
          {/* T-Tail Horizontal Stabilizer */}
          <polygon points="-52,-3 -70,-26 -60,-26 -44,-3" fill="#94A3B8" />
          <polygon points="-52,3 -70,26 -60,26 -44,3" fill="#94A3B8" />
        </g>

        {/* Waypoint Callout Labels */}
        <text x="175" y="366" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono, monospace">
          KTEB · TETERBORO
        </text>
        <text x="495" y="286" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono, monospace">
          EGGW · LONDON LUTON
        </text>
        <text x="325" y="152" fill="#D4AF7A" fontSize="11" fontFamily="JetBrains Mono, monospace">
          3,010 NM · MACH 0.90 · FL450
        </text>
      </svg>

      {/* Top Overlay Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#94A3B8] border-b border-[#263244] pb-3">
        <span className="font-medium text-[#FAF8F5] whitespace-nowrap">
          JetZen Custom ML Charter Broker Workstation
        </span>
        <span className="font-mono-tabular text-[#D4AF7A] whitespace-nowrap">
          Part 135 & Empty-Leg Auto-Match Engine
        </span>
      </div>

      {/* Bottom Scrim & Broker Advantage Summary */}
      <div className="relative z-10 mt-auto pt-16">
        <div className="bg-[#141B26]/95 backdrop-blur-sm border border-[#2B384E] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#94A3B8]">
                Machine-Learning Workflow Automation · 72% Less Admin Overhead
              </p>
              <p className="font-display text-xl font-semibold text-[#FAF8F5] mt-0.5">
                More Time Cultivating Principal Relationships & Closing Lift
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#94A3B8]">Target Broker Earnings</p>
              <p className="font-mono-tabular text-sm font-semibold text-[#D4AF7A]">
                $35,000 – $450,000 / yr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AircraftSilhouetteCard: React.FC<{
  category: AircraftCategory;
  rangeNm: number;
  cruiseKnots: number;
}> = ({ category, rangeNm, cruiseKnots }) => {
  const wingSpanScale =
    category === 'ultra-long-range'
      ? 0.95
      : category === 'heavy'
        ? 0.88
        : category === 'super-midsize'
          ? 0.8
          : 0.7;

  return (
    <div className="relative w-full aspect-[16/7] bg-[#121822] border-b border-[#263244] overflow-hidden flex flex-col justify-end p-3 text-[#FAF8F5]">
      <svg
        viewBox="0 0 400 175"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="400" height="175" fill="#121822" />
        <line x1="20" y1="76" x2="380" y2="76" stroke="#243044" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="76" r="52" fill="none" stroke="#243044" strokeWidth="1" />

        <g transform={`translate(200, 76) scale(${wingSpanScale})`}>
          <path
            d="M -75 0 C -45 -8, 45 -8, 80 0 C 45 8, -45 8, -75 0 Z"
            fill="#FAF8F5"
            stroke="#D4AF7A"
            strokeWidth="1.5"
          />
          <polygon points="-8,-6 -42,-58 -25,-58 22,-6" fill="#CBD5E1" stroke="#D4AF7A" strokeWidth="1" />
          <polygon points="-8,6 -42,58 -25,58 22,6" fill="#CBD5E1" stroke="#D4AF7A" strokeWidth="1" />
          <polygon points="-58,-3 -76,-24 -66,-24 -48,-3" fill="#94A3B8" />
          <polygon points="-58,3 -76,24 -66,24 -48,3" fill="#94A3B8" />
        </g>
      </svg>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono-tabular pt-1">
        <span>RANGE: {rangeNm.toLocaleString()} NM</span>
        <span>CRUISE: {cruiseKnots} KTS</span>
      </div>
    </div>
  );
};
