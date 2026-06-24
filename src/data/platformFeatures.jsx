/* ------------------------------------------------------------------ */
/*  SVG Illustrations (viewBox 280x170)                               */
/* ------------------------------------------------------------------ */

const IlluHome = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ih-g" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#4272B8" />
        <stop offset="100%" stopColor="#54BA60" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="260" height="18" rx="4" fill="rgba(66,114,184,0.12)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
    <circle cx="22" cy="19" r="3" fill="#EF4444" opacity="0.65" />
    <circle cx="32" cy="19" r="3" fill="#F59E0B" opacity="0.65" />
    <circle cx="42" cy="19" r="3" fill="#54BA60" opacity="0.65" />
    <rect x="100" y="15" width="80" height="8" rx="3" fill="rgba(255,255,255,0.07)" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const fills = [0.82, 0.67, 0.55, 0.91, 0.78, 0.88];
      const healthColors = ["#54BA60", "#54BA60", "#EF4444", "#54BA60", "#F59E0B", "#54BA60"];
      return (
        <g key={i}>
          <rect x={10 + col * 88} y={36 + row * 36} width="82" height="30" rx="4" fill="rgba(66,114,184,0.07)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <circle cx={22 + col * 88} cy={45 + row * 36} r="3" fill={healthColors[i]} opacity="0.75" />
          <rect x={30 + col * 88} y={40 + row * 36} width="55" height="3.5" rx="2" fill="rgba(255,255,255,0.05)" />
          <rect x={30 + col * 88} y={40 + row * 36} width={55 * fills[i]} height="3.5" rx="2" fill="url(#ih-g)" opacity="0.75" />
          <rect x={30 + col * 88} y={47 + row * 36} width="55" height="3.5" rx="2" fill="rgba(255,255,255,0.04)" />
          <rect x={30 + col * 88} y={47 + row * 36} width={55 * fills[i] * 0.65} height="3.5" rx="2" fill="#4272B8" opacity="0.6" />
          <rect x={30 + col * 88} y={54 + row * 36} width={55 * fills[i] * 0.45} height="3.5" rx="2" fill="rgba(84,186,96,0.35)" />
        </g>
      );
    })}
    <rect x="10" y="112" width="260" height="20" rx="4" fill="rgba(84,186,96,0.05)" stroke="rgba(84,186,96,0.14)" strokeWidth="0.5" />
    <circle cx="22" cy="122" r="3" fill="#54BA60" opacity="0.9" />
    <rect x="30" y="119" width="60" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="98" y="119" width="50" height="6" rx="2" fill="rgba(66,114,184,0.3)" />
    <rect x="10" y="140" width="82" height="20" rx="4" fill="rgba(84,186,96,0.07)" stroke="rgba(84,186,96,0.18)" strokeWidth="0.5" />
    <rect x="100" y="140" width="82" height="20" rx="4" fill="rgba(66,114,184,0.07)" stroke="rgba(66,114,184,0.18)" strokeWidth="0.5" />
    <rect x="188" y="140" width="82" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
    <rect x="16" y="147" width="50" height="6" rx="2" fill="rgba(84,186,96,0.35)" />
    <rect x="106" y="147" width="45" height="6" rx="2" fill="rgba(66,114,184,0.45)" />
    <rect x="194" y="147" width="55" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
  </svg>
);

const IlluChat = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="14" width="175" height="38" rx="12" fill="rgba(66,114,184,0.14)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.5" />
    <polygon points="12,34 4,42 20,42" fill="rgba(66,114,184,0.14)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.5" />
    <rect x="20" y="23" width="130" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
    <rect x="20" y="34" width="95" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
    <rect x="93" y="66" width="175" height="32" rx="12" fill="rgba(84,186,96,0.1)" stroke="rgba(84,186,96,0.24)" strokeWidth="0.5" />
    <polygon points="268,82 276,90 260,90" fill="rgba(84,186,96,0.1)" stroke="rgba(84,186,96,0.24)" strokeWidth="0.5" />
    <rect x="102" y="75" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
    <rect x="102" y="85" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
    <rect x="12" y="113" width="205" height="44" rx="12" fill="rgba(66,114,184,0.14)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.5" />
    <polygon points="12,135 4,143 20,143" fill="rgba(66,114,184,0.14)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.5" />
    <rect x="20" y="122" width="160" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
    <rect x="20" y="132" width="120" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
    <rect x="20" y="142" width="80" height="6" rx="3" fill="rgba(84,186,96,0.32)" />
    <circle cx="253" cy="38" r="20" fill="rgba(66,114,184,0.08)" stroke="rgba(66,114,184,0.2)" strokeWidth="0.5" />
    <circle cx="253" cy="38" r="9" fill="rgba(84,186,96,0.12)" stroke="rgba(84,186,96,0.35)" strokeWidth="0.8" />
    <circle cx="253" cy="38" r="4" fill="rgba(84,186,96,0.5)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const r = (deg * Math.PI) / 180;
      return (<line key={deg} x1={253 + 11 * Math.cos(r)} y1={38 + 11 * Math.sin(r)} x2={253 + 17 * Math.cos(r)} y2={38 + 17 * Math.sin(r)} stroke="rgba(84,186,96,0.4)" strokeWidth="0.8" />);
    })}
  </svg>
);

const IlluVPCFlavours = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {[
      { label: "G9", sub: "اقتصادی", x: 10, w: 57, col: "#54BA60", cpu: "2 vCPU", ram: "4 GB" },
      { label: "S2", sub: "استاندارد", x: 74, w: 60, col: "#4272B8", cpu: "4 vCPU", ram: "8 GB" },
      { label: "M4", sub: "متوسط", x: 142, w: 64, col: "#4272B8", cpu: "8 vCPU", ram: "16 GB" },
      { label: "L8", sub: "پیشرفته", x: 214, w: 56, col: "#F59E0B", cpu: "16 vCPU", ram: "32 GB" },
    ].map((t, i) => (
      <g key={i}>
        <rect x={t.x} y="12" width={t.w} height="148" rx="8" fill="rgba(66,114,184,0.05)" stroke={`${t.col}40`} strokeWidth="0.8" />
        <rect x={t.x} y="12" width={t.w} height="24" rx="8" fill={`${t.col}18`} stroke={`${t.col}30`} strokeWidth="0.5" />
        <circle cx={t.x + t.w / 2} cy="24" r="5.5" fill={`${t.col}25`} stroke={t.col} strokeWidth="0.8" />
        <text x={t.x + t.w / 2} y="51" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="bold">{t.label}</text>
        <text x={t.x + t.w / 2} y="62" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6.5">{t.sub}</text>
        <rect x={t.x + 6} y="69" width={t.w - 12} height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
        <text x={t.x + t.w / 2} y="79.5" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5">{t.cpu}</text>
        <rect x={t.x + 6} y="87" width={t.w - 12} height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
        <text x={t.x + t.w / 2} y="97.5" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5">{t.ram}</text>
        {[0, 1, 2].map((b) => (
          <g key={b}>
            <rect x={t.x + 6} y={108 + b * 12} width={t.w - 12} height="8" rx="2" fill="rgba(255,255,255,0.03)" />
            <rect x={t.x + 6} y={108 + b * 12} width={(t.w - 12) * (0.3 + i * 0.22 + b * 0.06)} height="8" rx="2" fill={`${t.col}55`} />
          </g>
        ))}
        <rect x={t.x + 6} y="147" width={t.w - 12} height="9" rx="4.5" fill={`${t.col}22`} stroke={`${t.col}45`} strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

const IlluCustomImage = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="140" cy="68" rx="72" ry="38" fill="rgba(66,114,184,0.1)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.8" />
    <ellipse cx="106" cy="70" rx="36" ry="26" fill="rgba(66,114,184,0.07)" stroke="rgba(66,114,184,0.14)" strokeWidth="0.5" />
    <ellipse cx="176" cy="70" rx="40" ry="26" fill="rgba(66,114,184,0.07)" stroke="rgba(66,114,184,0.14)" strokeWidth="0.5" />
    <rect x="118" y="51" width="44" height="36" rx="6" fill="rgba(66,114,184,0.18)" stroke="rgba(66,114,184,0.4)" strokeWidth="0.8" />
    <rect x="124" y="57" width="32" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="124" y="64" width="24" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
    <rect x="124" y="71" width="32" height="4" rx="2" fill="rgba(84,186,96,0.35)" />
    <rect x="124" y="78" width="18" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
    <circle cx="155" cy="51" r="11" fill="#070B1A" stroke="rgba(66,114,184,0.35)" strokeWidth="0.5" />
    <circle cx="155" cy="51" r="7" fill="none" stroke="#4272B8" strokeWidth="1.2" strokeDasharray="2.2 1.4" />
    <circle cx="155" cy="51" r="3" fill="rgba(66,114,184,0.7)" />
    <path d="M46 108 L46 75 Q46 64 56 62 L82 62" fill="none" stroke="rgba(84,186,96,0.38)" strokeWidth="1" strokeDasharray="4 3" />
    <polygon points="80,59 87,62 80,65" fill="#54BA60" opacity="0.45" />
    <rect x="16" y="108" width="62" height="40" rx="7" fill="rgba(84,186,96,0.06)" stroke="rgba(84,186,96,0.2)" strokeWidth="0.7" />
    <text x="47" y="126" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7">Custom</text>
    <text x="47" y="136" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7">Image</text>
    <rect x="22" y="140" width="48" height="4" rx="2" fill="rgba(84,186,96,0.28)" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <line x1={96 + i * 56} y1="102" x2={96 + i * 56} y2="128" stroke="rgba(66,114,184,0.28)" strokeWidth="0.8" strokeDasharray="3 2" />
        <rect x={74 + i * 56} y="128" width="44" height="30" rx="6" fill="rgba(66,114,184,0.07)" stroke="rgba(66,114,184,0.22)" strokeWidth="0.7" />
        <circle cx={88 + i * 56} cy="138" r="3.5" fill="#54BA60" opacity={0.6 + i * 0.12} />
        <rect x={94 + i * 56} y="134" width="18" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x={94 + i * 56} y="141" width="12" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
      </g>
    ))}
  </svg>
);

const IlluMonitoring = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="im-r" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4272B8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#4272B8" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="im-w" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#54BA60" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#54BA60" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="260" height="150" rx="8" fill="rgba(10,17,38,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    <rect x="18" y="18" width="65" height="7" rx="3" fill="rgba(255,255,255,0.14)" />
    <rect x="90" y="18" width="45" height="7" rx="3" fill="rgba(66,114,184,0.3)" />
    <rect x="178" y="18" width="10" height="7" rx="2" fill="rgba(66,114,184,0.75)" />
    <rect x="192" y="20" width="28" height="5" rx="2" fill="rgba(255,255,255,0.18)" />
    <rect x="222" y="18" width="10" height="7" rx="2" fill="rgba(84,186,96,0.75)" />
    <rect x="236" y="20" width="28" height="5" rx="2" fill="rgba(255,255,255,0.18)" />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="30" y1={46 + i * 24} x2="265" y2={46 + i * 24} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
    ))}
    <path d="M30,116 C50,108 62,88 78,85 C94,82 105,97 124,89 C138,83 148,66 163,62 C178,58 188,70 208,66 C222,63 240,50 265,44 L265,142 L30,142 Z" fill="url(#im-r)" />
    <path d="M30,116 C50,108 62,88 78,85 C94,82 105,97 124,89 C138,83 148,66 163,62 C178,58 188,70 208,66 C222,63 240,50 265,44" fill="none" stroke="#4272B8" strokeWidth="1.8" />
    <path d="M30,130 C44,126 58,118 74,116 C88,114 102,122 118,114 C132,107 148,100 163,96 C178,92 194,100 214,95 C228,90 248,83 265,79 L265,142 L30,142 Z" fill="url(#im-w)" />
    <path d="M30,130 C44,126 58,118 74,116 C88,114 102,122 118,114 C132,107 148,100 163,96 C178,92 194,100 214,95 C228,90 248,83 265,79" fill="none" stroke="#54BA60" strokeWidth="1.8" />
    {["0", "500", "1K", "1.5K"].map((v, i) => (
      <text key={i} x="28" y={48 + i * 24} textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="6">{v}</text>
    ))}
    <rect x="235" y="140" width="35" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    <rect x="238" y="143" width="20" height="4" rx="2" fill="rgba(66,114,184,0.4)" />
  </svg>
);

const IlluNetwork = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="260" height="150" rx="10" fill="rgba(38,74,159,0.05)" stroke="rgba(38,74,159,0.28)" strokeWidth="0.8" strokeDasharray="6 3" />
    <rect x="20" y="26" width="102" height="55" rx="7" fill="rgba(66,114,184,0.07)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.6" />
    <text x="71" y="40" textAnchor="middle" fill="rgba(66,114,184,0.65)" fontSize="7">Application</text>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={26 + i * 48} y="44" width="40" height="28" rx="4" fill="rgba(66,114,184,0.1)" stroke="rgba(66,114,184,0.22)" strokeWidth="0.5" />
        <circle cx={34 + i * 48} cy="53" r="3.5" fill="#4272B8" opacity="0.7" />
        <rect x={42 + i * 48} y="50" width="18" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x={42 + i * 48} y="57" width="12" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
      </g>
    ))}
    <rect x="20" y="92" width="102" height="58" rx="7" fill="rgba(84,186,96,0.05)" stroke="rgba(84,186,96,0.24)" strokeWidth="0.6" />
    <text x="71" y="106" textAnchor="middle" fill="rgba(84,186,96,0.65)" fontSize="7">Backend</text>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={26 + i * 48} y="110" width="40" height="28" rx="4" fill="rgba(84,186,96,0.08)" stroke="rgba(84,186,96,0.18)" strokeWidth="0.5" />
        <circle cx={34 + i * 48} cy="119" r="3.5" fill="#54BA60" opacity="0.7" />
        <rect x={42 + i * 48} y="116" width="18" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x={42 + i * 48} y="123" width="12" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
      </g>
    ))}
    <rect x="148" y="26" width="112" height="124" rx="7" fill="rgba(38,74,159,0.07)" stroke="rgba(38,74,159,0.24)" strokeWidth="0.6" />
    <text x="204" y="40" textAnchor="middle" fill="rgba(66,114,184,0.58)" fontSize="7">Database</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <ellipse cx="204" cy={54 + i * 30} rx="28" ry="8" fill="rgba(38,74,159,0.14)" stroke="rgba(66,114,184,0.28)" strokeWidth="0.6" />
        <rect x="176" y={54 + i * 30} width="56" height="14" fill="rgba(38,74,159,0.08)" stroke="rgba(66,114,184,0.12)" strokeWidth="0.4" />
        <ellipse cx="204" cy={68 + i * 30} rx="28" ry="8" fill="rgba(38,74,159,0.1)" stroke="rgba(66,114,184,0.2)" strokeWidth="0.6" />
      </g>
    ))}
    <line x1="122" y1="53" x2="148" y2="78" stroke="rgba(66,114,184,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
    <line x1="122" y1="121" x2="148" y2="112" stroke="rgba(84,186,96,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
    <rect x="224" y="150" width="28" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <text x="238" y="156.5" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="5.5">IGW</text>
  </svg>
);

const IlluSales = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {[
      { x: 12, label: "تمدید", col: "#4272B8", icon: "✓" },
      { x: 78, label: "پرداخت", col: "#54BA60", icon: "✓" },
      { x: 144, label: "نوتیف", col: "#4272B8", icon: "✓" },
      { x: 210, label: "تیکت", col: "#F59E0B", icon: "⋯" },
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="18" width="58" height="72" rx="8" fill="rgba(66,114,184,0.06)" stroke={`${s.col}2e`} strokeWidth="0.8" />
        <circle cx={s.x + 29} cy="42" r="16" fill={`${s.col}12`} stroke={`${s.col}40`} strokeWidth="0.8" />
        <text x={s.x + 29} y="48" textAnchor="middle" fill={s.col} fontSize="11">{s.icon}</text>
        <text x={s.x + 29} y="78" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6.5">{s.label}</text>
        {i < 3 && (
          <>
            <line x1={s.x + 58} y1="54" x2={s.x + 78} y2="54" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" strokeDasharray="3 2" />
            <polygon points={`${s.x + 78},51 ${s.x + 84},54 ${s.x + 78},57`} fill="rgba(255,255,255,0.14)" />
          </>
        )}
      </g>
    ))}
    <rect x="12" y="106" width="126" height="52" rx="7" fill="rgba(66,114,184,0.06)" stroke="rgba(66,114,184,0.18)" strokeWidth="0.5" />
    <rect x="18" y="114" width="80" height="5" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="18" y="123" width="60" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
    <rect x="18" y="132" width="95" height="5" rx="2" fill="rgba(66,114,184,0.3)" />
    <rect x="18" y="141" width="50" height="5" rx="2" fill="rgba(255,255,255,0.07)" />
    <rect x="18" y="150" width="70" height="4" rx="2" fill="rgba(84,186,96,0.22)" />
    <rect x="148" y="106" width="120" height="52" rx="7" fill="rgba(84,186,96,0.05)" stroke="rgba(84,186,96,0.16)" strokeWidth="0.5" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx="160" cy={116 + i * 11} r="3" fill="#54BA60" opacity={0.45 + i * 0.12} />
        <rect x="168" y={113 + i * 11} width={75 - i * 8} height="5" rx="2" fill="rgba(255,255,255,0.08)" />
      </g>
    ))}
  </svg>
);

const IlluStorage = () => (
  <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <polygon points="140,66 156,75 156,93 140,102 124,93 124,75" fill="rgba(66,114,184,0.18)" stroke="rgba(66,114,184,0.5)" strokeWidth="0.8" />
    <text x="140" y="88" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8" fontWeight="bold">Ceph</text>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = ((i * 60 - 90) * Math.PI) / 180;
      const r = 44, s = 12;
      const cx = 140 + r * Math.cos(angle);
      const cy = 84 + r * Math.sin(angle);
      const pts = [0, 60, 120, 180, 240, 300].map((d) => {
        const rad = (d * Math.PI) / 180;
        return `${cx + s * Math.cos(rad)},${cy + s * Math.sin(rad)}`;
      }).join(" ");
      return (
        <g key={i}>
          <line x1="140" y1="84" x2={cx} y2={cy} stroke="rgba(66,114,184,0.2)" strokeWidth="0.5" />
          <polygon points={pts} fill="rgba(66,114,184,0.1)" stroke="rgba(66,114,184,0.35)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="3.5" fill="#4272B8" opacity="0.65" />
        </g>
      );
    })}
    <rect x="12" y="140" width="80" height="22" rx="5" fill="rgba(66,114,184,0.08)" stroke="rgba(66,114,184,0.22)" strokeWidth="0.5" />
    <text x="52" y="149" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="6.5">Object Storage</text>
    <text x="52" y="158" textAnchor="middle" fill="rgba(66,114,184,0.75)" fontSize="6.5">مرکز داده ونک</text>
    <rect x="100" y="140" width="80" height="22" rx="5" fill="rgba(84,186,96,0.06)" stroke="rgba(84,186,96,0.2)" strokeWidth="0.5" />
    <rect x="106" y="147" width="60" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="106" y="154" width="45" height="4" rx="2" fill="rgba(84,186,96,0.3)" />
    <circle cx="248" cy="34" r="22" fill="rgba(66,114,184,0.06)" stroke="rgba(66,114,184,0.14)" strokeWidth="0.5" />
    <circle cx="248" cy="34" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
    <circle cx="248" cy="34" r="16" fill="none" stroke="#4272B8" strokeWidth="5" strokeDasharray="65 36" strokeDashoffset="25" opacity="0.7" />
    <circle cx="248" cy="34" r="16" fill="none" stroke="#54BA60" strokeWidth="5" strokeDasharray="24 77" strokeDashoffset="-40" opacity="0.6" />
    <text x="248" y="38" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5">S3</text>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Platform news catalogue                                            */
/* ------------------------------------------------------------------ */
export const PLATFORM_FEATURES = [
  {
    id: "home-page",
    name: "Home Page",
    subtitle: "مرکز فرماندهی زیرساخت شما",
    shortDesc: "پایش کامل زیرساخت و مدیریت سرویس‌ها در یک داشبورد یکپارچه",
    descParagraphs: [
      "با صفحه Home پلتفرم ابرآمد، مدیریت و پایش زیرساخت سازمانی ساده‌تر و سریع‌تر از همیشه شده است. اینجا جایی‌ست که در یک نگاه، تصویر کامل زیرساخت خود را می‌بینید و کنترل همه چیز را در دست دارید.",
      "در این داشبورد، تمامی سرویس‌های فعال به‌همراه شاخص‌های کلیدی مصرف منابع مثل CPU، RAM و Storage نمایش داده می‌شوند. همچنین وضعیت سرویس‌های امنیتی مانند آنتی‌ویروس و WAF به‌صورت لحظه‌ای در دسترس شماست.",
    ],
    bulletsHeading: "از همین صفحه می‌توانید:",
    bullets: [
      "به Status Page دسترسی داشته باشید و وضعیت عملیاتی و پایداری سرویس‌ها را به‌صورت لحظه‌ای بررسی کنید.",
      "وارد بخش مستندات و راهنماهای فنی شوید و با نحوه نصب، راه‌اندازی و استقرار سرویس‌ها آشنا شوید و جزئیات تکمیلی بیشتری درباره سرویس‌ها بخوانید.",
      "با چت‌بات هوشمند ابرآمد گفتگو کنید و پاسخ سوالاتتان را در لحظه بگیرید.",
    ],
    Illustration: IlluHome,
    tag: "داشبورد",
  },
  {
    id: "chat-ai",
    name: "Chat AI",
    subtitle: "دستیار هوشمند همیشه در دسترس شما",
    shortDesc: "پاسخ‌گویی سریع و دقیق به سوالات سرویس‌ها و پلتفرم با هوش مصنوعی",
    descParagraphs: [
      "چت‌بات هوشمند ابرآمد برای پاسخ‌گویی سریع به سوالات رایج شما طراحی شده است. هر زمان درباره سرویس‌ها، تنظیمات یا فرآیندهای پلتفرم سوالی داشته باشید، این دستیار در لحظه پاسخی دقیق و کاربردی در اختیارتان می‌گذارد.",
    ],
    bullets: [],
    Illustration: IlluChat,
    tag: "هوش مصنوعی",
  },
  {
    id: "vpc-flavours",
    name: "VPC New Flavours",
    subtitle: "انتخاب‌های بیشتر برای هر نیاز و بودجه",
    shortDesc: "فلیورهای جدید VPC از اقتصادی تا حرفه‌ای برای انعطاف بیشتر",
    descParagraphs: [
      "با اضافه‌شدن فلیورهای جدید به سرویس VPC، آزادی عمل بیشتری در انتخاب سرور دارید و می‌توانید متناسب با نیاز فنی و بودجه سازمانتان سرور مناسب را انتخاب کنید.",
      "در این به‌روزرسانی، گزینه‌های اقتصادی‌تری مثل سرورهای G9 هم اضافه شده‌اند تا بدون این‌که از انعطاف یا کیفیت انتخاب‌ها کم شود، بتوانید هزینه زیرساخت را بهینه‌تر مدیریت کنید. در کنار آن، فلیورهای قدرتمندتر همچنان برای بارهای کاری سنگین در دسترس هستند.",
    ],
    bullets: [],
    Illustration: IlluVPCFlavours,
    tag: "VPC",
  },
  {
    id: "custom-image",
    name: "Custom Image VPC",
    subtitle: "ساخت ماشین از ایمیج دلخواه",
    shortDesc: "ایجاد ماشین مجازی از ایمیج‌های دلخواه با تنظیمات از پیش تعریف‌شده",
    descParagraphs: [
      "با این قابلیت می‌توانید ماشین‌های مجازی را از ایمیج‌های دلخواه ایجاد کنید. به این ترتیب می‌توانید محیط‌های از پیش پیکربندی‌شده خود را ذخیره کنید و هر زمان که نیاز داشتید، ماشین‌های جدید را با همان تنظیمات در چند لحظه راه‌اندازی کنید.",
    ],
    bullets: [],
    Illustration: IlluCustomImage,
    tag: "VPC",
  },
  {
    id: "vpc-monitoring",
    name: "VPC Monitoring",
    subtitle: "دید عمیق‌تر به عملکرد دیسک‌ها با IOPS",
    shortDesc: "پایش دقیق سرعت و عملکرد دیسک‌های ماشین مجازی با شاخص IOPS",
    descParagraphs: [
      "با اضافه‌شدن شاخص IOPS در مانیتورینگ VPC، می‌توانید سرعت و عملکرد دیسک‌های خود را به‌صورت دقیق پایش کنید و دید بهتری نسبت به وضعیت ذخیره‌سازی زیرساختتان داشته باشید.",
    ],
    bullets: [],
    Illustration: IlluMonitoring,
    tag: "مانیتورینگ",
  },
  {
    id: "vpc-network",
    name: "VPC Network",
    subtitle: "مدیریت پیشرفته شبکه در VPC",
    shortDesc: "Multi-Subnet برای ایجاد زیرشبکه‌های ایزوله و معماری شبکه‌ای حرفه‌ای",
    descParagraphs: [
      "با قابلیت Multi-Subnet می‌توانید زیرشبکه‌های ایزوله و چندلایه‌ای در سرورهای خود ایجاد کنید؛ مثل تفکیک لایه‌های Application، Backend و Database یا محیط‌های Dev، Stage و Prod.",
      "در این ساختار، دسترسی هر زیرشبکه به اینترنت و سرویس‌های داخلی به‌صورت مستقل و کنترل‌شده مدیریت می‌شود تا معماری شبکه‌ای امن‌تر و حرفه‌ای‌تری داشته باشید.",
    ],
    bullets: [],
    Illustration: IlluNetwork,
    tag: "شبکه",
  },
  {
    id: "sales-support",
    name: "فرآیندهای فروش و پشتیبانی",
    subtitle: "مدیریت یکپارچه فروش و پشتیبانی",
    shortDesc: "تمدید سرویس، پرداخت، تیکت و نوتیفیکیشن‌ها — همه در یک پلتفرم",
    descParagraphs: [
      "با انتقال فرآیندهای فروش و پشتیبانی به پلتفرم ابرآمد، می‌توانید امور عملیاتی را مستقیماً از پلتفرم انجام دهید. از تمدید خودکار سرویس‌ها و پرداخت مستقیم گرفته تا ثبت رسید پرداخت، دریافت نوتیفیکیشن‌های راه‌اندازی و مدیریت تیکت‌های قطع موقت یا دائم.",
      "همچنین اطلاعات و ارزش تجاری مشتریان از پرتال به پلتفرم منتقل شده تا تمامی تعاملات و فرآیندهای مرتبط با سرویس‌ها در محیط یکپارچه‌ای مدیریت شوند.",
    ],
    bullets: [],
    Illustration: IlluSales,
    tag: "پشتیبانی",
  },
  {
    id: "cloud-storage",
    name: "فضای ابری",
    subtitle: "ذخیره‌سازی ابری؛ منعطف‌تر از همیشه",
    shortDesc: "Object Storage جدید مبتنی بر Ceph در مرکز داده ونک",
    descParagraphs: [
      "در این به‌روزرسانی، Object Storage جدیدی مبتنی بر Ceph در مرکز داده ونک به پلتفرم ابرآمد اضافه شده است. با اضافه‌شدن این سرویس، امکان ذخیره‌سازی و مدیریت داده‌ها در زیرساختی مقیاس‌پذیر و پایدار فراهم شده و انتخاب‌های بیشتری برای مدیریت فضای ابری در اختیار شما قرار می‌گیرد.",
    ],
    bullets: [],
    Illustration: IlluStorage,
    tag: "استوریج",
  },
];
