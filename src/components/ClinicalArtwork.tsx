import React from 'react';
import { TreatmentItem } from '../data/clinicData';

export const HeroClinicIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[460px] bg-[#EFE9E0] overflow-hidden flex flex-col justify-between p-8 border border-[#E2D9CC]">
      {/* Architectural travertine light & shadow composition */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="travertineWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5EFE6" />
            <stop offset="55%" stopColor="#EAE0D2" />
            <stop offset="100%" stopColor="#DCD0BE" />
          </linearGradient>
          <linearGradient id="sunlightBeam" x1="0" y1="0" x2="1" y2="0.8">
            <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.82" />
            <stop offset="60%" stopColor="#F7EFE4" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#E5D8C5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="brassAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF7A" />
            <stop offset="50%" stopColor="#B89058" />
            <stop offset="100%" stopColor="#8F6B39" />
          </linearGradient>
          <linearGradient id="roseQuartz" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C5BE" />
            <stop offset="50%" stopColor="#C98A80" />
            <stop offset="100%" stopColor="#9E3B33" />
          </linearGradient>
          <radialGradient id="laserGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9E3B33" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#9E3B33" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Travertine Slabs */}
        <rect width="800" height="600" fill="url(#travertineWall)" />
        <line x1="260" y1="0" x2="260" y2="600" stroke="#D5C7B4" strokeWidth="1" />
        <line x1="540" y1="0" x2="540" y2="600" stroke="#D5C7B4" strokeWidth="1" />
        <line x1="0" y1="420" x2="800" y2="420" stroke="#D0C2AE" strokeWidth="1.5" />

        {/* Architectural Recessed Archway */}
        <path
          d="M 290 420 L 290 190 A 130 130 0 0 1 550 190 L 550 420 Z"
          fill="#E4D9C8"
          stroke="#CBBBA4"
          strokeWidth="1.5"
        />
        <path
          d="M 310 420 L 310 200 A 115 115 0 0 1 530 200 L 530 420 Z"
          fill="#EFE7DA"
        />

        {/* Morning Sunlight Diagonal Window Cast */}
        <polygon points="0,40 480,0 740,600 180,600" fill="url(#sunlightBeam)" />

        {/* Sculptural Travertine Plinth & Optical Laser Console */}
        <rect x="345" y="310" width="150" height="145" fill="#DFD3C1" stroke="#C5B49D" strokeWidth="1.5" />
        <rect x="335" y="298" width="170" height="14" fill="#EAE0D1" stroke="#C5B49D" strokeWidth="1" />

        {/* Optical Sapphire Prism & Laser Calibration Ring */}
        <circle cx="420" cy="215" r="76" fill="url(#laserGlow)" />
        <circle
          cx="420"
          cy="215"
          r="54"
          fill="none"
          stroke="url(#brassAccent)"
          strokeWidth="2"
        />
        <circle
          cx="420"
          cy="215"
          r="40"
          fill="none"
          stroke="#9E3B33"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Medical Grade Handpiece Silhouette & Serum Vessel */}
        <rect
          x="398"
          y="165"
          width="44"
          height="112"
          rx="22"
          fill="#FAF6F0"
          stroke="#B89058"
          strokeWidth="1.8"
        />
        <rect x="411" y="142" width="18" height="25" rx="4" fill="url(#brassAccent)" />
        <circle cx="420" cy="215" r="11" fill="url(#roseQuartz)" />

        {/* Secondary Alabaster Dropper Bottle on Plinth */}
        <rect
          x="462"
          y="230"
          width="34"
          height="68"
          rx="6"
          fill="#F7F2EB"
          stroke="#C5B49D"
          strokeWidth="1.5"
        />
        <rect x="471" y="214" width="16" height="16" rx="2" fill="url(#brassAccent)" />
        <path d="M 475 204 L 483 204 L 485 214 L 473 214 Z" fill="#9E3B33" />

        {/* Fine Architectural Calibration Lines */}
        <line x1="120" y1="215" x2="340" y2="215" stroke="#B89058" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="500" y1="215" x2="690" y2="215" stroke="#B89058" strokeWidth="0.75" strokeDasharray="3 3" />
      </svg>

      {/* Top Overlay Clinical Spec Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#575049] border-b border-[#D8CFC2] pb-3">
        <span className="font-medium tracking-wide text-[#181615] whitespace-nowrap">
          Beverly Hills Flagship · Suite 104
        </span>
        <span className="font-mono-tabular text-[#6E655C] whitespace-nowrap">
          755nm / 1064nm / 1927nm Optical Calibration
        </span>
      </div>

      {/* Bottom Scrim & Clinical Telemetry Card */}
      <div className="relative z-10 mt-auto pt-16">
        <div className="bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E2D9CC] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#6E655C]">
                Board-Certified Supervision · Skintel® Melanin Dosimetry
              </p>
              <p className="font-display text-xl font-semibold text-[#181615] mt-0.5">
                Personalized Fitzpatrick I–VI Aesthetic Protocols
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#6E655C]">Registered Nurse Specialists</p>
              <p className="font-mono-tabular text-sm font-semibold text-[#9E3B33]">
                150+ Nationwide Studios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TreatmentCardArtwork: React.FC<{
  type: TreatmentItem['artworkType'];
  wavelengthLabel: string;
}> = ({ type, wavelengthLabel }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#F2ECE3] border-b border-[#E6DEC8] overflow-hidden flex flex-col justify-between p-4">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`bg-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F6F1E9" />
            <stop offset="100%" stopColor="#E6DDD0" />
          </linearGradient>
          <linearGradient id="accentBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D1AE79" />
            <stop offset="100%" stopColor="#9A7440" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#bg-${type})`} />

        {/* Subtle Stone Plinth Base */}
        <path d="M 70 235 L 330 235 L 350 280 L 50 280 Z" fill="#DFD4C3" stroke="#C9B9A3" strokeWidth="1" />
        <line x1="40" y1="235" x2="360" y2="235" stroke="#C9B9A3" strokeWidth="1" />

        {type === 'laser-hair' && (
          <g>
            {/* Sapphire Optical Prism & Dual-Wavelength Beams */}
            <circle cx="200" cy="145" r="64" fill="#EFE7DA" stroke="#C9B9A3" strokeWidth="1.2" />
            <polygon
              points="200,82 248,185 152,185"
              fill="#FAF7F2"
              stroke="url(#accentBrass)"
              strokeWidth="2"
            />
            <line x1="110" y1="135" x2="200" y2="145" stroke="#9E3B33" strokeWidth="2" />
            <line x1="200" y1="145" x2="295" y2="115" stroke="#9E3B33" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="200" y1="145" x2="295" y2="165" stroke="#B89058" strokeWidth="1.5" />
            <circle cx="200" cy="145" r="7" fill="#9E3B33" />
          </g>
        )}

        {type === 'botox-injectable' && (
          <g>
            {/* Precision Borosilicate Vial & Golden-Ratio Caliper Arcs */}
            <circle cx="200" cy="145" r="68" fill="none" stroke="#C9B9A3" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="145" r="46" fill="none" stroke="url(#accentBrass)" strokeWidth="1.2" />
            <rect x="176" y="102" width="48" height="92" rx="10" fill="#FAF8F5" stroke="#B89058" strokeWidth="1.8" />
            <rect x="186" y="84" width="28" height="18" rx="3" fill="url(#accentBrass)" />
            <line x1="200" y1="62" x2="200" y2="84" stroke="#9E3B33" strokeWidth="2" />
            <rect x="184" y="138" width="32" height="38" rx="4" fill="#EFE5D8" />
            <circle cx="200" cy="122" r="4" fill="#9E3B33" />
          </g>
        )}

        {type === 'clear-brilliant' && (
          <g>
            {/* Fractional 1927nm Micro-Thermal Zone Matrix */}
            <rect x="135" y="85" width="130" height="120" rx="14" fill="#FAF8F5" stroke="#C9B9A3" strokeWidth="1.5" />
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={160 + col * 20}
                  cy={110 + row * 18}
                  r={row === 2 && col === 2 ? 4.5 : 2.5}
                  fill={row === 2 && col === 2 ? '#9E3B33' : '#B89058'}
                  opacity={0.85}
                />
              ))
            )}
            <circle cx="200" cy="146" r="38" fill="none" stroke="#9E3B33" strokeWidth="1.2" />
          </g>
        )}

        {type === 'coolsculpting' && (
          <g>
            {/* Cryolipolysis C-Contour Geometric Sculpture */}
            <path
              d="M 145 95 C 195 95, 255 125, 255 155 C 255 185, 195 205, 145 205"
              fill="none"
              stroke="url(#accentBrass)"
              strokeWidth="3"
            />
            <path
              d="M 255 95 C 205 95, 145 125, 145 155 C 145 185, 205 205, 255 205"
              fill="none"
              stroke="#9E3B33"
              strokeWidth="2"
            />
            <polygon points="200,112 226,150 200,188 174,150" fill="#FAF8F5" stroke="#B89058" strokeWidth="1.5" />
          </g>
        )}

        {(type === 'skincare-serum' || type === 'thermage') && (
          <g>
            {/* Trio of Alabaster Clinical Skincare Bottles */}
            <rect x="130" y="122" width="38" height="86" rx="6" fill="#FAF8F5" stroke="#C5B49D" strokeWidth="1.5" />
            <rect x="140" y="106" width="18" height="16" fill="url(#accentBrass)" />
            <rect x="180" y="96" width="44" height="112" rx="8" fill="#FFFDF9" stroke="#B89058" strokeWidth="1.8" />
            <rect x="192" y="78" width="20" height="18" fill="url(#accentBrass)" />
            <path d="M 197 66 L 207 66 L 209 78 L 195 78 Z" fill="#9E3B33" />
            <rect x="236" y="132" width="36" height="76" rx="6" fill="#F5EFE6" stroke="#C5B49D" strokeWidth="1.5" />
            <rect x="245" y="118" width="18" height="14" fill="url(#accentBrass)" />
          </g>
        )}
      </svg>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#6E655C]">
        <span className="font-mono-tabular truncate max-w-[85%]">{wavelengthLabel}</span>
      </div>
    </div>
  );
};
