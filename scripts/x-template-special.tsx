import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  Skull, 
  Compass, 
  Shield, 
  Zap, 
  BookOpen, 
  Wand2, 
  Hammer, 
  Gem, 
  Scroll, 
  Volume2, 
  Eye, 
  Lock, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ShieldAlert,
  Moon,
  Sun,
  User,
  Activity,
  Award
} from 'lucide-react';

// === ข้อมูลคัมภีร์เวทมนตร์ (Spell Codex) ===
interface Spell {
  id: string;
  name: string;
  thaiName: string;
  school: 'evocation' | 'necromancy' | 'chronomancy' | 'illusion' | 'cosmic';
  level: number;
  manaCost: number;
  castTime: string;
  incantation: string;
  description: string;
  effects: string[];
  runes: string[];
}

const SPELLS_DATA: Spell[] = [
  {
    id: 'sp-1',
    name: 'Aetherial Singularity',
    thaiName: 'เอกภาพแห่งเอเธอร์',
    school: 'cosmic',
    level: 9,
    manaCost: 250,
    castTime: '4.5 วินาที',
    incantation: 'Aethel-Vortix Nebula Imperium Omnis',
    description: 'อัญเชิญจุดดับแห่งจักรวาลเพื่อบิดเบือนมิติรอบทิศทาง ดึงดูดและทำลายล้างสสารทุกชนิดให้อยู่ในความว่างเปล่า',
    effects: ['ทำลายมิติ 100%', 'ดาเมจแรงโน้มถ่วงวงกว้าง', 'สร้างสถานะสับสนแก่ศัตรู'],
    runes: ['🌌 Cosmic', '⏳ Chronos', '⚡ Void']
  },
  {
    id: 'sp-2',
    name: 'Apocalypse Vermillion',
    thaiName: 'มหาเพลิงวิบัติโลกันตร์',
    school: 'evocation',
    level: 8,
    manaCost: 180,
    castTime: '3.0 วินาที',
    incantation: 'Ignis Purificatio Vermillion Overlord',
    description: 'ปลดปล่อยพายุเพลิงสีชาดที่ร้อนแรงกว่าลาวาใต้แกนโลก แผดเผาวิญญาณของศัตรูจนไม่เหลือแม้แต่เถ้าถ่าน',
    effects: ['ดาเมจธาตุไฟต่อเนื่อง', 'ลดพลังป้องกัน 40%', 'ละลายเกราะบาเรีย'],
    runes: ['🔥 Ignis', '⚡ Chaos', '💥 Burst']
  },
  {
    id: 'sp-3',
    name: 'Grave Monarch Call',
    thaiName: 'บัญชาการราชาสุสาน',
    school: 'necromancy',
    level: 7,
    manaCost: 140,
    castTime: '2.5 วินาที',
    incantation: 'Mortis Revictum Rex Abyssi Summon',
    description: 'เปิดประตูสู่ปรภพเพื่ออัญเชิญวิญญาณอัศวินและซากศพโบราณขึ้นมารับใช้ผู้ร่าย พร้อมสร้างออร่าแห่งความหวาดกลัว',
    effects: ['อัญเชิญบริวาร 3 ตน', 'ดูดซับพลังชีวิตศัตรู', 'ลดความเร็วการเคลื่อนที่ศัตรู'],
    runes: ['💀 Mortis', '🌑 Umbra', '👻 Spirit']
  },
  {
    id: 'sp-4',
    name: 'Temporal Paradox',
    thaiName: 'ขัดแย้งกาลเวลา',
    school: 'chronomancy',
    level: 9,
    manaCost: 300,
    castTime: 'Instant',
    incantation: 'Chronos Divergere Paradox Quantum Null',
    description: 'หยุดเวลาของผู้ร่ายและย้อนเหตุการณ์เลวร้ายที่เกิดขึ้นใน 5 วินาทีก่อนหน้า เพื่อแก้ไขชะตากรรมที่ผิดพลาด',
    effects: ['ฟื้นฟู HP/Mana เต็มพิกัด', 'หยุดศัตรูชั่วคราว', 'ล้างสถานะผิดปกติทั้งหมด'],
    runes: ['⏳ Chronos', '🛡️ Aegis', '🌌 Mirror']
  },
  {
    id: 'sp-5',
    name: 'Mirage of Mirage',
    thaiName: 'ภาพลวงตาอนันต์',
    school: 'illusion',
    level: 5,
    manaCost: 90,
    castTime: '1.2 วินาที',
    incantation: 'Velo Phantasma Deceptio Oculus',
    description: 'สร้างร่างจำลองนับร้อยเพื่อเบี่ยงเบนความสนใจ พร้อมเปลี่ยนสิ่งแวดล้อมโดยรอบให้เป็นเขาวงกตที่ไร้ทางออก',
    effects: ['เพิ่มอัตราหลบหลีก 80%', 'สร้างความมึนงงแก่เป้าหมาย', 'ซ่อนเร้นตัวตนสมบูรณ์'],
    runes: ['🌌 Mirror', '🌫️ Nebula', '🔮 Mind']
  }
];

// === ข้อมูลอักขระรูน (Rune Stones) ===
interface Rune {
  id: string;
  name: string;
  thaiName: string;
  element: string;
  symbol: string;
  power: number;
  color: string;
}

const RUNES_DATA: Rune[] = [
  { id: 'r-fire', name: 'Ignis', thaiName: 'อัคคี', element: 'Fire', symbol: '𐍈', power: 45, color: 'text-red-500 shadow-red-500/50' },
  { id: 'r-water', name: 'Aqua', thaiName: 'วารี', element: 'Water', symbol: '𐍉', power: 30, color: 'text-cyan-400 shadow-cyan-400/50' },
  { id: 'r-void', name: 'Chaos', thaiName: 'โกลาหล', element: 'Void', symbol: '𐌸', power: 60, color: 'text-purple-500 shadow-purple-500/50' },
  { id: 'r-time', name: 'Chronos', thaiName: 'กาลเวลา', element: 'Time', symbol: '𐌵', power: 55, color: 'text-amber-400 shadow-amber-400/50' },
  { id: 'r-death', name: 'Mortis', thaiName: 'มรณา', element: 'Death', symbol: '𐌾', power: 50, color: 'text-emerald-500 shadow-emerald-500/50' },
  { id: 'r-order', name: 'Aegis', thaiName: 'พิทักษ์', element: 'Order', symbol: '𐍇', power: 35, color: 'text-blue-500 shadow-blue-500/50' }
];

// === ข้อมูลเครื่องรางและโบราณวัตถุ (Artifacts Vault) ===
interface Artifact {
  id: string;
  name: string;
  thaiName: string;
  description: string;
  statBonus: string;
  rarity: 'Legendary' | 'Mythical' | 'Ancient';
  icon: string;
}

const ARTIFACTS_DATA: Artifact[] = [
  { id: 'art-1', name: 'Staff of Azathoth', thaiName: 'คทาแห่งอซาธอท', description: 'คทาไม้ศักดิ์สิทธิ์ที่แกะสลักจากกิ่งต้นไม้โลกใบสุดท้าย บรรจุไอพลังแห่งความโกลาหลลึกลับ', statBonus: 'พลังเวทมนตร์ +150, มานาสูงสุด +300', rarity: 'Mythical', icon: '🪄' },
  { id: 'art-2', name: 'Eye of Chronos', thaiName: 'ดวงตาแห่งโครนอส', description: 'ศิลาอัญมณีทรงกลมที่หมุนวนด้วยฝุ่นเวลา สามารถทำให้มองเห็นอนาคตล่วงหน้าได้ 3 วินาที', statBonus: 'ลดเวลาร่ายเวท 30%, อัตราการฟื้นฟูมานา +25%', rarity: 'Legendary', icon: '👁️' },
  { id: 'art-3', name: 'Grimoire of Void', thaiName: 'คัมภีร์แห่งความว่างเปล่า', description: 'หนังสือหนังมังกรทมิฬที่ไม่มีวันจารึกคำสิ้นสุด หน้ากระดาษแต่ละแผ่นเชื่อมโยงไปที่มิติที่สูญหาย', statBonus: 'ดาเมจจากอักขระรูน Void แรงขึ้น 50%', rarity: 'Ancient', icon: '📖' }
];

export default function App() {
  // === State Management ===
  const [activeTab, setActiveTab] = useState<'codex' | 'forge' | 'vault'>('codex');
  const [selectedSpell, setSelectedSpell] = useState<Spell>(SPELLS_DATA[0]);
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [castingSpellName, setCastingSpellName] = useState<string>('');
  
  // Stats (ปรับเปลี่ยนได้ตาม Artifact ที่สวมใส่)
  const [mana, setMana] = useState<number>(550);
  const [maxMana, setMaxMana] = useState<number>(1000);
  const [arcanePower, setArcanePower] = useState<number>(340);
  const [stability, setStability] = useState<number>(85);
  
  // Spell Forge State
  const [selectedRunes, setSelectedRunes] = useState<Rune[]>([]);
  const [forgeSuccessRate, setForgeSuccessRate] = useState<number>(100);
  const [forgedResult, setForgedResult] = useState<{ name: string; power: number } | null>(null);
  const [isForgining, setIsForgining] = useState<boolean>(false);

  // Equipped Artifacts
  const [equippedIds, setEquippedIds] = useState<string[]>(['art-2']);

  // History Log
  const [historyLog, setHistoryLog] = useState<string[]>([
    'ระบบ: Grimoire โลกันตร์เปิดใช้งานเรียบร้อยแล้ว...',
    'ระบบ: พลังงานมานาเสถียรในเกณฑ์ปกติ'
  ]);

  // === Synthesizer เสียงเวทมนตร์ (Web Audio API) ===
  const playArcaneSound = (type: 'click' | 'cast' | 'success' | 'fail' | 'rune') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'rune') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'cast') {
        // ดีไซน์เสียงเวทร่ายแบบอภิมหาทรงพลัง (Deep rumble + High hum)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        
        const highOsc = ctx.createOscillator();
        const highGain = ctx.createGain();
        highOsc.type = 'sine';
        highOsc.frequency.setValueAtTime(800, ctx.currentTime);
        highOsc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.8);
        highOsc.connect(highGain);
        highGain.connect(ctx.destination);
        highGain.gain.setValueAtTime(0.15, ctx.currentTime);
        highGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.8);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
        highOsc.start();
        highOsc.stop(ctx.currentTime + 0.8);
      } else if (type === 'success') {
        // เสียงระฆังเวทมนตร์วิเศษประสพความสำเร็จ
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn('ไม่สามารถเล่นเสียงออดิโอได้:', e);
    }
  };

  // === ระบบสวดคาถาด้วย Text-to-Speech ===
  const speakIncantation = (text: string) => {
    playArcaneSound('click');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 0.4; // ปรับคีย์ต่ำเพิ่มความน่ากลัวและขลัง
      utterance.rate = 0.85; // ท่องคาถาช้าๆ แบบสุขุม
      window.speechSynthesis.speak(utterance);
      addLog(`สวดภาวนาอักขระ: "${text}"`);
    } else {
      addLog('ระบบตรวจพบว่าอุปกรณ์นี้ไม่รอบรับระบบสวดคาถาเสียงสังเคราะห์');
    }
  };

  // === ฟังก์ชันอำนวยความสะดวก ===
  const addLog = (msg: string) => {
    setHistoryLog(prev => [msg, ...prev.slice(0, 15)]);
  };

  const handleCastSpell = (spell: Spell) => {
    if (mana < spell.manaCost) {
      playArcaneSound('fail');
      addLog(`[ล้มเหลว] มานาไม่เพียงพอสำหรับร่าย ${spell.thaiName} (ต้องการ ${spell.manaCost} MP)`);
      return;
    }

    playArcaneSound('cast');
    setIsCasting(true);
    setCastingSpellName(spell.thaiName);
    setMana(prev => Math.max(0, prev - spell.manaCost));
    addLog(`[เริ่มร่าย] คาถา ${spell.thaiName} กำลังถูกควบคุมผ่านมิติเอเธอร์...`);

    setTimeout(() => {
      setIsCasting(false);
      playArcaneSound('success');
      addLog(`[ร่ายสำเร็จ] ปลดปล่อย ${spell.thaiName} สร้างผลกระทบมหาศาล!`);
    }, 1800);
  };

  // === จัดการระบบผสมอักขระรูน ===
  const addRuneToForge = (rune: Rune) => {
    if (selectedRunes.length >= 3) {
      addLog('เบ้าหลอมเวทมนตร์สามารถบรรจุอักขระได้ไม่เกิน 3 ตัวอักษร');
      playArcaneSound('fail');
      return;
    }
    playArcaneSound('rune');
    setSelectedRunes([...selectedRunes, rune]);
    addLog(`วางศิลาอักขระรูน: [${rune.name}]`);
  };

  const removeRuneFromForge = (index: number) => {
    playArcaneSound('click');
    const newRunes = [...selectedRunes];
    const removed = newRunes.splice(index, 1);
    setSelectedRunes(newRunes);
    addLog(`นำอักขระรูน [${removed[0].name}] ออกจากเบ้าหลอม`);
  };

  // อัตราการคำนวณการฟอร์จรูน
  useEffect(() => {
    if (selectedRunes.length === 0) {
      setForgeSuccessRate(100);
      return;
    }
    // คิดตามความเสถียรและพลังของรูนแต่ละก้อน (ความสมดุลจะลดอัตราเสี่ยง)
    const totalPower = selectedRunes.reduce((acc, r) => acc + r.power, 0);
    const calculatedRate = Math.max(25, 100 - Math.floor(totalPower * 0.35));
    setForgeSuccessRate(calculatedRate);
  }, [selectedRunes]);

  const handleForgeSynthesis = () => {
    if (selectedRunes.length === 0) {
      playArcaneSound('fail');
      addLog('โปรดวางศิลารูนในวงแหวนอย่างน้อย 1 ก้อน');
      return;
    }

    setIsForgining(true);
    playArcaneSound('cast');
    addLog('อุณหภูมิเตาหลอมพร้อม... ดำเนินการควบแน่นพลังงานอักขระรูนโบราณ...');

    setTimeout(() => {
      const roll = Math.random() * 100;
      if (roll <= forgeSuccessRate) {
        // สำเร็จ
        const totalPower = selectedRunes.reduce((acc, r) => acc + r.power, 0) + Math.floor(arcanePower * 0.1);
        const namePrefixes = ['Void', 'Hellfire', 'Chronos', 'Aegis', 'Eclipse'];
        const nameSuffixes = ['Wrath', 'Sanctuary', 'Pact', 'Nova', 'Sunder'];
        const pfx = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
        const sfx = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
        const spellName = `${pfx} ${sfx}`;

        setForgedResult({
          name: spellName,
          power: totalPower
        });
        playArcaneSound('success');
        addLog(`[สร้างสำเร็จ] ยินดีด้วย! คุณได้รับเวทบทประยุกต์ใหม่ระดับมหากาพย์: "${spellName}" (พลังอานุภาพ: ${totalPower})`);
      } else {
        // ล้มเหลว
        setForgedResult(null);
        playArcaneSound('fail');
        setStability(prev => Math.max(30, prev - 15));
        addLog('[หลอมล้มเหลว] พลังงานวิบัติย้อนกลับ! สูญเสียเสถียรภาพอาร์เค่นเตาหลอม');
      }
      setIsForgining(false);
      setSelectedRunes([]);
    }, 2000);
  };

  // === จัดการระบบสวมใส่โบราณวัตถุ ===
  const toggleArtifact = (id: string) => {
    playArcaneSound('click');
    let newEquipped = [...equippedIds];
    if (newEquipped.includes(id)) {
      newEquipped = newEquipped.filter(item => item !== id);
      addLog(`ถอดถอนเครื่องราง: [${ARTIFACTS_DATA.find(a => a.id === id)?.thaiName}]`);
    } else {
      newEquipped.push(id);
      addLog(`สวมใส่เครื่องราง: [${ARTIFACTS_DATA.find(a => a.id === id)?.thaiName}] โบนัสพลังงานได้รับการปรับใช้`);
    }
    setEquippedIds(newEquipped);
  };

  // คำนวณบัฟจากเครื่องราง
  useEffect(() => {
    let baseMaxMana = 1000;
    let baseArcanePower = 340;
    
    if (equippedIds.includes('art-1')) {
      baseArcanePower += 150;
      baseMaxMana += 300;
    }
    if (equippedIds.includes('art-2')) {
      baseMaxMana += 100;
    }
    if (equippedIds.includes('art-3')) {
      baseArcanePower += 50;
    }

    setMaxMana(baseMaxMana);
    setArcanePower(baseArcanePower);
  }, [equippedIds]);

  // ฟื้นฟูมานาอัตโนมัติทีละน้อยเพื่อมิติความสมจริง
  useEffect(() => {
    const timer = setInterval(() => {
      setMana(prev => {
        if (prev < maxMana) {
          const recovery = equippedIds.includes('art-2') ? 12 : 6;
          return Math.min(maxMana, prev + recovery);
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [maxMana, equippedIds]);

  return (
    <div className="min-h-screen bg-[#08070e] text-slate-100 flex flex-col font-sans relative overflow-hidden select-none">
      {/* เอฟเฟกต์หมอกควันและเวทมนตร์ด้านหลัง */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#200d3d_0%,#08070e_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none" />

      {/* --- หัวข้อบอร์ดหลัก (Main Header) --- */}
      <header className="relative z-10 border-b border-amber-500/20 bg-[#0c0a15]/90 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 blur opacity-60 animate-spin-slow" />
            <div className="relative w-12 h-12 rounded-full bg-[#151226] border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-lg shadow-purple-900/40">
              <BookOpen className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-purple-400 uppercase font-serif">
              Arcanum Dark-Fantasy Grimoire
            </h1>
            <p className="text-xs text-amber-500/80 font-mono tracking-widest">
              คัมภีร์เวทอักขระโบราณ & แผงควบคุมพลังวิญญาณสูญสิ้น
            </p>
          </div>
        </div>

        {/* แถบเมนูด้านบน */}
        <nav className="flex gap-2 bg-[#120f24] p-1 rounded-lg border border-purple-900/40">
          {[
            { id: 'codex', label: 'คัมภีร์เวท', icon: Scroll, color: 'text-amber-400' },
            { id: 'forge', label: 'เตาหลอมอักขระ', icon: Hammer, color: 'text-purple-400' },
            { id: 'vault', label: 'คลังโบราณวัตถุ', icon: Gem, color: 'text-rose-400' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playArcaneSound('click'); setActiveTab(tab.id as any); }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-950 to-amber-950/40 border border-amber-500/40 text-amber-200 shadow-md shadow-amber-950/50'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/20'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* --- ส่วนหลักของเว็บแอปพลิเคชัน --- */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* คอลัมน์ซ้าย: บาร์ข้อมูลอาร์เค่น (Arcane Panel) คอควบคุมค่าสเตตัส (4 คอลัมน์) */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          
          {/* ข้อมูลสเตตัสเวทมนตร์ */}
          <div className="relative overflow-hidden bg-gradient-to-b from-[#130f25] to-[#0c0919] border border-purple-500/20 rounded-2xl p-5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-sm font-semibold tracking-wider text-amber-400 flex items-center gap-2 border-b border-purple-500/10 pb-3 uppercase mb-4">
              <Activity className="w-4 h-4" /> แหล่งพลังงานเวทมนตร์ (Mana Core)
            </h2>

            {/* เกจมานาแบบวงกลม/เส้น */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-cyan-400 font-mono flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 fill-current" /> มานาที่หลงเหลือ (MANA)
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{mana} / {maxMana} MP</span>
                </div>
                {/* เกจมานาดีไซน์หรูหรา */}
                <div className="w-full bg-[#08070e] h-3.5 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                    style={{ width: `${(mana / maxMana) * 100}%` }}
                  />
                </div>
              </div>

              {/* ความเสถียรของสมาธิ */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> ความเสถียรเวท (STABILITY)
                  </span>
                  <span className="font-mono text-emerald-300 font-bold">{stability}%</span>
                </div>
                <div className="w-full bg-[#08070e] h-3.5 rounded-full overflow-hidden p-0.5 border border-emerald-500/20">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-emerald-400 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                    style={{ width: `${stability}%` }}
                  />
                </div>
              </div>

              {/* สเตตัสทั่วไป */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#181330] p-3 rounded-lg border border-purple-500/10 flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 tracking-wider">พลังเวทมนตร์เสริม</span>
                  <span className="text-lg font-bold text-amber-300 font-mono flex items-center gap-1">
                    {arcanePower} <Wand2 className="w-4 h-4 text-purple-400" />
                  </span>
                </div>
                <div className="bg-[#181330] p-3 rounded-lg border border-purple-500/10 flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 tracking-wider">เครื่องรางที่ทำงาน</span>
                  <span className="text-lg font-bold text-rose-400 font-mono flex items-center gap-1">
                    {equippedIds.length} ชิ้น <Gem className="w-4 h-4 text-rose-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* อักขระรูนในเบ้าสะสม (Quick runes display) */}
          <div className="bg-[#130f25]/80 border border-purple-500/20 rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold tracking-wider text-amber-400 flex items-center gap-2 border-b border-purple-500/10 pb-3 mb-4 uppercase">
              <Scroll className="w-4 h-4" /> แผ่นหินอักขระพกพา (Runestones List)
            </h2>
            <p className="text-[11px] text-slate-400 mb-4">
              คลิกเพื่อนำศิลาอักขระใส่ในเบ้าหลอมสำหรับการสังเคราะห์ในแถบเมนู
            </p>
            <div className="grid grid-cols-2 gap-3">
              {RUNES_DATA.map(rune => (
                <button
                  key={rune.id}
                  onClick={() => addRuneToForge(rune)}
                  className="flex items-center gap-2.5 p-2 bg-[#1b1635] hover:bg-[#231d45] border border-purple-900/50 hover:border-amber-500/40 rounded-xl transition-all duration-300 text-left group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-[#0e0a1f] flex items-center justify-center text-lg font-serif border border-purple-500/20 group-hover:border-amber-400 ${rune.color}`}>
                    {rune.symbol}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{rune.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{rune.thaiName} (P: {rune.power})</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ประวัติการใช้เวทมนตร์ (Console Log) */}
          <div className="bg-[#120f23]/90 border border-purple-500/20 rounded-2xl p-5 flex-1 min-h-[220px] flex flex-col shadow-inner">
            <h3 className="text-xs font-semibold tracking-wider text-purple-400 flex items-center justify-between border-b border-purple-500/10 pb-3 mb-3">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-rose-500" /> บันทึกจารึกอาคม</span>
              <button onClick={() => setHistoryLog([])} className="text-slate-500 hover:text-slate-300 text-[10px] uppercase font-mono">ล้างบันทึก</button>
            </h3>
            <div className="flex-1 overflow-y-auto max-h-[190px] font-mono text-[10px] text-slate-400 space-y-2 pr-1 custom-scrollbar">
              {historyLog.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-600 italic">ว่างเปล่า... ไม่มีร่องรอยการปล่อยเวทมนตร์</div>
              ) : (
                historyLog.map((log, idx) => (
                  <div key={idx} className="border-l border-amber-500/20 pl-2 leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* คอลัมน์ขวา: พื้นที่ปฏิสัมพันธ์หลัก (8 คอลัมน์) */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          {/* แท็บที่ 1: หน้าแสดงข้อมูลคัมภีร์เวท (SPELL CODEX) */}
          {activeTab === 'codex' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-[600px]">
              
              {/* รายการคาถาด้านซ้าย (5 คอลัมน์) */}
              <div className="md:col-span-5 bg-[#120f23]/80 border border-purple-500/20 rounded-2xl p-4 flex flex-col shadow-md">
                <h3 className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 px-1 border-b border-purple-500/10 pb-2">
                  บทสวดเวททั้งหมดในตำรา
                </h3>
                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[500px] pr-1">
                  {SPELLS_DATA.map(spell => {
                    const isSelected = selectedSpell.id === spell.id;
                    return (
                      <button
                        key={spell.id}
                        onClick={() => { playArcaneSound('click'); setSelectedSpell(spell); }}
                        className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#20193e] to-[#2a1d4b] border-amber-500/60 shadow-lg shadow-purple-950/40 translate-x-1'
                            : 'bg-[#1b1633]/50 border-purple-900/40 hover:border-purple-500/30 hover:bg-[#1f1a3a]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-xs font-mono tracking-wider font-semibold text-amber-300">{spell.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-mono bg-purple-950 text-purple-300 border border-purple-500/20">
                            Lv. {spell.level}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-100">{spell.thaiName}</h4>
                          <span className="text-[11px] text-cyan-400 font-mono font-semibold">{spell.manaCost} MP</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* หน้ารายละเอียดคัมภีร์เวทด้านขวา (7 คอลัมน์) */}
              <div className="md:col-span-7 bg-gradient-to-b from-[#131028] to-[#0d0a1d] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* ลายเส้นเวทมนตร์พื้นหลัง */}
                <div className="absolute -top-10 -right-10 w-44 h-44 border border-amber-500/5 rounded-full pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-48 h-48 border border-dashed border-amber-500/10 rounded-full pointer-events-none animate-spin-slow" />

                <div>
                  <div className="flex justify-between items-start gap-4 mb-4 border-b border-amber-500/10 pb-4">
                    <div>
                      <span className="text-xs text-amber-500 uppercase tracking-widest font-mono">มหาคาถาระดับสุญญตา</span>
                      <h2 className="text-2xl font-bold font-serif text-slate-100 flex items-center gap-2 mt-0.5">
                        {selectedSpell.thaiName} <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 italic">{selectedSpell.name}</p>
                    </div>
                    <div className="bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg text-right">
                      <p className="text-[9px] text-amber-500 tracking-wider font-mono">MANA COST</p>
                      <p className="text-base font-bold text-cyan-300 font-mono">{selectedSpell.manaCost} MP</p>
                    </div>
                  </div>

                  {/* สเตตัสคาถา */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#1a1435] p-3 rounded-lg border border-purple-500/10">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">ระยะเวลาร่าย (CAST TIME)</p>
                      <p className="text-sm font-bold text-amber-200 mt-1">{selectedSpell.castTime}</p>
                    </div>
                    <div className="bg-[#1a1435] p-3 rounded-lg border border-purple-500/10">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">ธาตุหลัก/ตระกูลเวท</p>
                      <p className="text-sm font-bold text-purple-300 uppercase mt-1 tracking-wider">{selectedSpell.school}</p>
                    </div>
                  </div>

                  {/* บทพรรณนาวิชา */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">คำอธิบายแห่งเวทวิทยา</h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#14102c] p-3 rounded-xl border border-purple-900/30">
                        {selectedSpell.description}
                      </p>
                    </div>

                    {/* รูนาสมานฉันท์ */}
                    <div>
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">อักขระรูนประกอบ</h4>
                      <div className="flex gap-2 flex-wrap">
                        {selectedSpell.runes.map((r, i) => (
                          <span key={i} className="text-[10px] px-3 py-1.5 bg-[#1f193f] border border-purple-500/30 rounded-lg text-amber-300 font-mono">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* บทคาถาคำท่องสวด */}
                    <div>
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        บทสวดอักษรเทวะ (Spell Incantation)
                      </h4>
                      <div className="bg-[#0b081c] border border-amber-500/20 rounded-xl p-3 flex justify-between items-center group">
                        <p className="text-sm font-serif italic text-amber-200 tracking-wider">
                          "{selectedSpell.incantation}"
                        </p>
                        <button
                          onClick={() => speakIncantation(selectedSpell.incantation)}
                          className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-all border border-amber-500/20 active:scale-95 flex items-center justify-center"
                          title="สวดคาถาเสียงสังเคราะห์"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ปุ่มควบคุมและเรียกเวท */}
                <div className="border-t border-purple-500/10 pt-4 flex gap-3">
                  <button
                    onClick={() => handleCastSpell(selectedSpell)}
                    disabled={isCasting}
                    className="flex-1 py-3.5 bg-gradient-to-r from-purple-800 via-rose-700 to-amber-600 hover:from-purple-700 hover:via-rose-600 hover:to-amber-500 text-slate-100 font-semibold font-serif rounded-xl border-t border-amber-400/40 shadow-lg shadow-purple-900/50 hover:shadow-rose-900/50 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Wand2 className="w-5 h-5 animate-pulse" />
                    <span>ปล่อยคาถาลงบนพื้นโลก</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* แท็บที่ 2: หน้าการฟอร์จรูน (SPELL FORGE) */}
          {activeTab === 'forge' && (
            <div className="bg-gradient-to-b from-[#140f2b] to-[#0c0919] border border-purple-500/30 rounded-2xl p-6 min-h-[600px] flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div>
                <div className="flex justify-between items-center border-b border-purple-500/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-slate-100 flex items-center gap-2">
                      <Hammer className="w-5 h-5 text-purple-400 animate-spin-slow" /> เตาหลอมอักขระเวทสมาน
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      สมานและฟิวชั่นหินพลังงานเพื่อสร้างสุดยอดคาถาประจำตัว
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-purple-400 font-mono block">สิทธิ์แห่งความสำเร็จ</span>
                    <span className={`text-xl font-bold font-mono ${forgeSuccessRate > 70 ? 'text-green-400' : 'text-amber-400'}`}>
                      {forgeSuccessRate}%
                    </span>
                  </div>
                </div>

                {/* แผงฟิวชั่นเวทมนตร์รูปวงแหวนอภิมหาอลังการ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
                  
                  {/* ภาพจำลองการฟอร์จวงแหวน */}
                  <div className="flex justify-center items-center relative py-12">
                    {/* วงกลมหลักดวงแก้วปิศาจ */}
                    <div className="absolute w-72 h-72 border border-purple-500/15 rounded-full" />
                    <div className="absolute w-60 h-60 border border-amber-500/20 rounded-full animate-spin-slow" />
                    <div className="absolute w-44 h-44 border-2 border-dashed border-purple-500/35 rounded-full animate-spin-reverse" />
                    
                    {/* รังสีอาร์เค่นใจกลาง */}
                    <div className={`relative w-28 h-28 rounded-full bg-[#120a20] border-2 border-amber-400/50 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${
                      isForgining ? 'animate-ping scale-110 shadow-purple-500/80 bg-purple-900/30' : 'shadow-purple-500/20'
                    }`}>
                      {selectedRunes.length === 0 ? (
                        <div className="text-center p-3">
                          <Plus className="w-6 h-6 text-slate-500 mx-auto animate-pulse" />
                          <span className="text-[9px] text-slate-500 font-mono tracking-wider">ใส่รูนด้านล่าง</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-[10px] text-amber-500 font-mono font-bold uppercase">วัตถุดิบ</p>
                          <p className="text-lg font-bold text-slate-100 font-mono">{selectedRunes.length} / 3</p>
                        </div>
                      )}
                    </div>

                    {/* รูทหลักด้านข้างแบบลอยตัว */}
                    {selectedRunes.map((rune, idx) => {
                      const angles = [0, 120, 240];
                      const radian = (angles[idx] * Math.PI) / 180;
                      const radius = 100;
                      const x = Math.cos(radian) * radius;
                      const y = Math.sin(radian) * radius;

                      return (
                        <button
                          key={idx}
                          onClick={() => removeRuneFromForge(idx)}
                          className="absolute w-12 h-12 bg-[#1b153c] border border-amber-500/50 hover:border-red-500 rounded-xl flex items-center justify-center text-lg shadow-lg group hover:scale-110 transition-all duration-300 cursor-pointer"
                          style={{ transform: `translate(${x}px, ${y}px)` }}
                          title="คลิกเพื่อนำออก"
                        >
                          <span className={`${rune.color}`}>{rune.symbol}</span>
                          <span className="absolute -top-1.5 -right-1.5 bg-red-600 rounded-full text-[8px] w-4.5 h-4.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            ✕
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* คำอธิบายสิทธิ์สถิตและการรับรูน */}
                  <div className="space-y-4">
                    <div className="bg-[#181335]/90 border border-purple-500/20 p-5 rounded-2xl">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">คู่มือการหลอมเวท</h4>
                      <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                        <li>อัญเชิญแร่รูนอย่างน้อยหนึ่งก้อนจากแท็บพกพาด้านซ้ายมาใส่ในเบ้าหลอมเวทมนตร์</li>
                        <li>ปริมาณพลังงานรวมของอักขระจะกำหนดอานุภาพความแรงของคาถา</li>
                        <li>ระดับพลังงานที่สูงขึ้นจะส่งผลต่อ <span className="text-amber-400">อัตราความสำเร็จ</span> ที่ต่ำลง</li>
                        <li>ใช้ <span className="text-rose-400">คทาแห่งอซาธอท</span> (หากสวมใส่) เพิ่มประสิทธิภาพการผสมเวทอีก 15%</li>
                      </ul>
                    </div>

                    {/* การแสดงผลสัมฤทธิ์ฟิวชั่นที่เพิ่งผ่านไป */}
                    {forgedResult && (
                      <div className="bg-gradient-to-r from-amber-950/30 to-purple-950/30 border border-amber-500/40 p-4 rounded-xl relative">
                        <span className="absolute -top-2.5 left-4 bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase">
                          คาถาล่าสุดที่สร้าง
                        </span>
                        <div className="flex justify-between items-center mt-1">
                          <div>
                            <p className="text-sm font-bold text-slate-100 font-serif">{forgedResult.name}</p>
                            <p className="text-[10px] text-slate-400">พลังอำนาจที่บันทึกได้</p>
                          </div>
                          <span className="text-lg font-mono font-bold text-amber-300">
                            {forgedResult.power} AP
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ตัวเลือกรูนด้านล่าง */}
                <div className="border-t border-purple-500/10 pt-6">
                  <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    คลังศิลารูนสำหรับร้อยเรียง
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {RUNES_DATA.map(rune => (
                      <button
                        key={rune.id}
                        onClick={() => addRuneToForge(rune)}
                        className="flex flex-col items-center p-3 bg-[#171330]/60 hover:bg-[#201944] border border-purple-900/40 hover:border-amber-500/40 rounded-xl transition-all duration-300 text-center"
                      >
                        <span className={`text-2xl font-serif mb-1 ${rune.color}`}>{rune.symbol}</span>
                        <span className="text-xs font-bold text-slate-200">{rune.name}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 font-mono">P: {rune.power}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ปุ่มหลอมฟอร์จเวท */}
              <div className="border-t border-purple-500/10 pt-4 flex gap-4 mt-6">
                <button
                  onClick={() => { playArcaneSound('click'); setSelectedRunes([]); }}
                  className="px-4 py-3 bg-[#1e193a]/60 hover:bg-red-950/30 hover:text-red-300 border border-purple-500/20 text-slate-400 rounded-xl text-xs font-semibold transition-colors active:scale-95"
                >
                  เคลียร์เตาหลอม
                </button>
                <button
                  onClick={handleForgeSynthesis}
                  disabled={isForgining}
                  className="flex-1 py-3.5 bg-gradient-to-r from-purple-800 via-rose-800 to-amber-600 hover:from-purple-700 hover:via-rose-700 hover:to-amber-500 text-slate-100 font-semibold rounded-xl font-serif text-sm border-t border-amber-400/30 shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Hammer className="w-4 h-4" />
                  {isForgining ? 'กำลังหลอมอักขระเวท...' : 'เริ่มกระบวนการควบแน่นหลอมรวม'}
                </button>
              </div>
            </div>
          )}

          {/* แท็บที่ 3: คลังอุปกรณ์และเครื่องรางโบราณ (ARTIFACTS VAULT) */}
          {activeTab === 'vault' && (
            <div className="bg-gradient-to-b from-[#140f2b] to-[#0c0919] border border-purple-500/30 rounded-2xl p-6 min-h-[600px] flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div>
                <div className="flex justify-between items-center border-b border-purple-500/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-slate-100 flex items-center gap-2">
                      <Gem className="w-5 h-5 text-rose-400 animate-pulse" /> คลังมหาสมบัติเวทโบราณ
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      สวมใส่โบราณวัตถุเพื่อขยายขีดจำกัดพลังมานาและความเสถียรแห่งการร่ายเวท
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-[#20122e] border border-purple-500/30 text-purple-300 font-mono">
                    สวมใส่สูงสุด: 3 ชิ้น
                  </span>
                </div>

                {/* ตารางแสดงเครื่องราง */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ARTIFACTS_DATA.map(artifact => {
                    const isEquipped = equippedIds.includes(artifact.id);
                    return (
                      <div
                        key={artifact.id}
                        className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                          isEquipped
                            ? 'bg-gradient-to-b from-[#251538] to-[#140b24] border-rose-500/50 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/20'
                            : 'bg-[#15122a] border-purple-900/40 hover:border-purple-500/30'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-3xl">{artifact.icon}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                              artifact.rarity === 'Mythical' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                              artifact.rarity === 'Legendary' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' :
                              'bg-purple-950 text-purple-300 border border-purple-500/30'
                            }`}>
                              {artifact.rarity}
                            </span>
                          </div>
                          
                          <h3 className="text-base font-bold text-slate-100 mb-1">{artifact.thaiName}</h3>
                          <p className="text-[10px] text-slate-400 font-mono italic mb-3">{artifact.name}</p>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{artifact.description}</p>
                        </div>

                        <div>
                          {/* ส่วนคุณสมบัติเสริม */}
                          <div className="bg-[#0b081c]/70 border border-purple-500/10 p-2.5 rounded-xl mb-4">
                            <p className="text-[9px] text-rose-400 font-mono uppercase tracking-wider">โบนัสสเตตัส</p>
                            <p className="text-[11px] text-slate-200 font-semibold mt-0.5">{artifact.statBonus}</p>
                          </div>

                          <button
                            onClick={() => toggleArtifact(artifact.id)}
                            className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                              isEquipped
                                ? 'bg-red-950/30 hover:bg-red-950/50 border-red-500/40 text-red-300'
                                : 'bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 border-purple-500/30 text-slate-100'
                            }`}
                          >
                            {isEquipped ? 'ถอดการติดตั้งวัตถุ' : 'ติดตั้งสถิตวิญญาณ'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#110e24] p-4 rounded-xl border border-purple-500/10 flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">ผลึกเสริมพลังงานแฝง</h4>
                    <p className="text-[11px] text-slate-400">การสวมใส่ส่งผลกระทบต่อเนื่องทางเคมีอาร์เค่นต่อมานาและเวลาคูลดาวน์โดยตรง</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>
      </main>

      {/* --- ส่วนฟุตเตอร์ลิขสิทธิ์ความลึกลับ --- */}
      <footer className="relative z-10 border-t border-purple-500/10 bg-[#06050a] px-6 py-4 text-center mt-8">
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          Arcanum Grimoire UI System v4.2.0 • ดำเนินการโดยสมบูรณ์ผ่านแกนวิญญาณสังเคราะห์
        </p>
      </footer>

      {/* --- จอประสานเวทร่ายคาถา (Casting Overlay Screen Flash) --- */}
      {isCasting && (
        <div className="fixed inset-0 bg-[#08070ebd]/95 z-50 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-500 animate-fade-in">
          {/* แอนิเมชันวงเวทร่ายเรืองแสง */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute inset-0 border border-amber-500/25 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border-2 border-dashed border-purple-500/30 rounded-full animate-spin-reverse" />
            <div className="absolute inset-10 border border-rose-500/20 rounded-full" />
            <div className="absolute inset-16 bg-[#160c2b] border-2 border-amber-400 flex flex-col items-center justify-center rounded-full shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              <Wand2 className="w-12 h-12 text-amber-400 animate-bounce" />
              <p className="text-[11px] text-amber-500 tracking-widest font-mono uppercase mt-2">Casting spell</p>
            </div>
            
            {/* รูโบราณแวดล้อม */}
            <span className="absolute top-0 text-amber-400 font-serif text-xl select-none">𐍈</span>
            <span className="absolute bottom-0 text-amber-400 font-serif text-xl select-none">𐌸</span>
            <span className="absolute left-0 text-amber-400 font-serif text-xl select-none">𐌵</span>
            <span className="absolute right-0 text-amber-400 font-serif text-xl select-none">𐍇</span>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-purple-400">
              {castingSpellName}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-2 tracking-wider">
              กำลังประสานพลังงานสสารรอบมิติอย่างสั่นไหว...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}