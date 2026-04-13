import React, { useState, useEffect } from "react";

export default function App() {
  // --- STATES ---
  const [page, setPage] = useState("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const [announcements, setAnnouncements] = useState([
    { id: 1, text: "Bienvenue aux étudiants de FI.ARA.M Toliara !", date: "13/04/2026" }
  ]);
  const [newAnnonceText, setNewAnnonceText] = useState("");
  const [members, setMembers] = useState([]);

  const [newMember, setNewMember] = useState({
    id: null, nom: "", grade: "", filiere: "", experience: "", whatsapp: "", statut: "Actif"
  });

  const [form] = useState({
    nom: "NANDRASANA", prenom: "Eddy", profession: "Full Stack Developer", whatsapp: "261340000000",
  });

  // --- NAVIGATION ---
  useEffect(() => {
    if (page === "splash") {
      const timer = setTimeout(() => setPage("login"), 2500);
      return () => clearTimeout(timer);
    }
  }, [page]);

  const handleLogin = () => { setIsLoggedIn(true); setPage("annonces"); };

  const handlePostAnnonce = () => {
    if (!newAnnonceText.trim()) return;
    setAnnouncements([{ id: Date.now(), text: newAnnonceText, date: new Date().toLocaleDateString() }, ...announcements]);
    setNewAnnonceText("");
  };

  const handleSaveMember = () => {
    if (!newMember.nom || !newMember.grade) return alert("Nom et Grade requis");
    if (newMember.id) {
      setMembers(members.map(m => m.id === newMember.id ? newMember : m));
    } else {
      setMembers([{ ...newMember, id: Date.now() }, ...members]);
    }
    setNewMember({ id: null, nom: "", grade: "", filiere: "", experience: "", whatsapp: "", statut: "Actif" });
    setPage("list");
  };

  // --- STYLING VARS ---
  const theme = {
    bg: isDarkMode ? "bg-[#0F172A]" : "bg-[#F8FAFC]",
    card: isDarkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E2E8F0]",
    text: isDarkMode ? "text-white" : "text-[#1E293B]",
    subtext: isDarkMode ? "text-slate-400" : "text-slate-500",
    input: isDarkMode ? "bg-[#0F172A] border-[#334155] text-white shadow-inner" : "bg-slate-50 border-[#E2E8F0] text-slate-900",
  };

  // --- SIDEBAR ---
  const Sidebar = () => (
    <div className={`fixed inset-0 z-[200] transition-all duration-500 ${isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)} />
      <div className={`absolute left-0 top-0 h-full w-72 ${isDarkMode ? 'bg-[#1E293B]' : 'bg-white'} transition-transform duration-500 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-br-[3rem] shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 mb-4 flex items-center justify-center text-2xl font-black border border-white/20">EN</div>
          <h2 className="text-lg font-bold">{form.prenom}</h2>
          <p className="text-[10px] opacity-70 uppercase font-bold tracking-wider">{form.profession}</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-500/10 mb-4">
             <span className={`text-xs font-black uppercase ${theme.text}`}>Dark Mode</span>
             <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
             </button>
          </div>
          
          {['annonces', 'list', 'add', 'scan'].map((item) => (
            <button key={item} onClick={() => {setPage(item); setIsSidebarOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all capitalize ${theme.text} hover:bg-indigo-500/10`}>
               {item === 'annonces' ? '📢 News' : item === 'list' ? '👥 Students' : item === 'add' ? '➕ Register' : '📸 Scanner'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500 font-sans`}>
      <Sidebar />

     {page === "splash" && (
  <div className="fixed inset-0 bg-indigo-700 flex flex-col items-center justify-center">
    <h1 className="mt-6 text-white font-black tracking-[0.4em] text-[10px] uppercase opacity-80">
      FI.ARA.M TOLIARA
    </h1>
  </div>
)}

      {/* LOGIN */}
      {page === "login" && (
        <div className="p-8 pt-24 animate-in fade-in zoom-in-95">
          <h1 className={`text-5xl font-black mb-2 tracking-tighter ${theme.text}`}>FI.ARA.M<span className="text-indigo-500
        ">.</span></h1>
          <p className={`${theme.subtext} font-bold uppercase text-[10px] tracking-widest mb-10`}>University Students Portal</p>
          <div className="space-y-4">
            <input className={`w-full p-5 rounded-3xl border-2 transition-all outline-none font-bold ${theme.input}`} placeholder="Student ID" />
            <input className={`w-full p-5 rounded-3xl border-2 transition-all outline-none font-bold ${theme.input}`} type="password" placeholder="Password" />
            <button onClick={handleLogin} className="w-full py-5 bg-indigo-600 text-white font-black rounded-[2rem] shadow-lg shadow-indigo-500/30 mt-6 active:scale-95 transition-all uppercase tracking-widest text-xs">Login</button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="pb-32">
          {/* Header */}
          <div className={`p-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${theme.card}`}>
            <button onClick={() => setIsSidebarOpen(true)} className={`w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm border ${theme.card} active:scale-90 transition-all`}>☰</button>
            <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.subtext}`}>{page}</h2>
            <div onClick={() => setPage("profile")} className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black cursor-pointer shadow-lg active:scale-90 transition-all">E</div>
          </div>

          {/* ANNONCES PAGE */}
          {page === "annonces" && (
            <div className="px-5 animate-in fade-in">
              <h3 className={`text-2xl font-black mb-6 mt-4 ${theme.text}`}>News Feed</h3>
              <div className={`p-6 rounded-[2.5rem] border shadow-sm mb-8 transition-colors ${theme.card}`}>
                <textarea 
                  className={`w-full p-4 rounded-2xl border-none outline-none text-sm font-bold resize-none h-24 mb-4 placeholder:opacity-30 ${theme.input}`} 
                  placeholder="Écrire une annonce pour FI.ARA.M..." 
                  value={newAnnonceText} 
                  onChange={(e) => setNewAnnonceText(e.target.value)} 
                />
                <button onClick={handlePostAnnonce} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg shadow-indigo-500/20">Publier</button>
              </div>
              <div className="space-y-4">
                {announcements.map(ann => (
                  <div key={ann.id} className={`p-6 rounded-[2rem] border transition-all ${theme.card}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${theme.subtext}`}>{ann.date}</p>
                    </div>
                    <p className={`text-sm font-bold leading-relaxed ${theme.text}`}>{ann.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIST PAGE */}
          {page === "list" && (
            <div className="px-5 animate-in fade-in">
              <h3 className={`text-2xl font-black mb-6 mt-4 ${theme.text}`}>Community</h3>
              <input 
                className={`w-full p-4 rounded-2xl border-2 outline-none font-bold text-sm mb-8 transition-all ${theme.input}`} 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <div className="space-y-4">
                {members.filter(m => m.nom.toLowerCase().includes(searchQuery.toLowerCase())).map(m => (
                  <div key={m.id} className={`p-5 rounded-[2.5rem] border transition-all ${theme.card}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-lg">{m.grade}</div>
                        <div>
                          <h4 className={`font-black text-sm uppercase ${theme.text}`}>{m.nom}</h4>
                          <p className={`text-[10px] font-bold uppercase tracking-tighter text-indigo-400`}>{m.filiere}</p>
                        </div>
                      </div>
                      <button onClick={() => {setNewMember(m); setPage("add")}} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs ${theme.bg} ${theme.text}`}>✏️</button>
                    </div>
                    <div className="flex gap-3">
                      <a href={`https://wa.me/${m.whatsapp.replace(/[^0-9]/g, '')}`} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all">
                        💬 WhatsApp
                      </a>
                      <a href={`tel:${m.whatsapp.replace(/[^0-9+]/g, '')}`} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all shadow-md">
                        📞 Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADD PAGE */}
          {page === "add" && (
            <div className="px-5 animate-in slide-in-from-bottom-10">
              <h3 className={`text-2xl font-black mb-6 mt-4 ${theme.text}`}>Registration</h3>
              <div className={`space-y-4 p-8 rounded-[3rem] border shadow-2xl transition-all ${theme.card}`}>
                <input className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm transition-all ${theme.input}`} placeholder="Full Name" value={newMember.nom} onChange={(e) => setNewMember({...newMember, nom: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <select className={`w-full p-4 rounded-2xl border font-bold text-sm outline-none appearance-none transition-all ${theme.input}`} value={newMember.grade} onChange={(e) => setNewMember({...newMember, grade: e.target.value})}>
                    <option value="">Level</option>
                    <option value="L1">L1</option><option value="L2">L2</option><option value="L3">L3</option>
                    <option value="M1">M1</option><option value="M2">M2</option>
                  </select>
                  <input className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm transition-all ${theme.input}`} placeholder="Major" value={newMember.filiere} onChange={(e) => setNewMember({...newMember, filiere: e.target.value})} />
                </div>
                <input className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm transition-all ${theme.input}`} placeholder="WhatsApp (261...)" value={newMember.whatsapp} onChange={(e) => setNewMember({...newMember, whatsapp: e.target.value})} />
                <button onClick={handleSaveMember} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl mt-4 uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all">SAVE STUDENT</button>
              </div>
            </div>
          )}

          {/* SCANNER */}
          {page === "scan" && (
             <div className="px-5 animate-in fade-in text-center">
             <h3 className={`text-2xl font-black mb-6 mt-4 ${theme.text}`}>Scanner QR</h3>
             <div className={`relative aspect-square w-full rounded-[3.5rem] overflow-hidden border-8 shadow-2xl transition-all ${theme.card}`}>
               <div className={`absolute inset-0 flex items-center justify-center ${isScanning ? "animate-pulse" : "opacity-20"}`}>
                 <div className="w-64 h-64 border-2 border-indigo-400 border-dashed rounded-[3rem] relative">
                   <div className="absolute w-full h-1 bg-indigo-400 top-1/2 shadow-[0_0_20px_#6366f1] animate-bounce"></div>
                 </div>
               </div>
             </div>
             <button onClick={() => setIsScanning(!isScanning)} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl mt-10 uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all">{isScanning ? "Désactiver" : "Ouvrir Caméra"}</button>
           </div>
          )}

          {/* PROFILE */}
          {page === "profile" && (
            <div className="px-5 animate-in zoom-in-95">
               <div className={`p-12 rounded-[3.5rem] text-center border relative overflow-hidden shadow-2xl transition-all ${theme.card}`}>
                  <div className="w-28 h-28 bg-indigo-600/10 rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center text-indigo-500 text-4xl font-black border-2 border-indigo-500/20 shadow-xl">EN</div>
                  <h3 className={`text-2xl font-black leading-tight ${theme.text}`}>{form.prenom} {form.nom}</h3>
                  <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-3">{form.profession}</p>
                  <div className="mt-10 space-y-3">
                    <a href={`tel:${form.whatsapp}`} className={`block w-full p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>Contact Admin</a>
                    <button onClick={() => setIsLoggedIn(false)} className="block w-full p-5 text-red-500 font-black text-[10px] uppercase tracking-widest active:scale-95">Déconnexion</button>
                  </div>
               </div>
            </div>
          )}

          {/* BOTTOM NAVIGATION */}
          <div className={`fixed bottom-6 left-6 right-6 backdrop-blur-2xl rounded-[2.5rem] flex justify-around items-center py-4 z-[100] shadow-2xl border transition-colors ${theme.card}`}>
            {[
              { id: 'annonces', icon: '🏠' },
              { id: 'list', icon: '👥' },
              { id: 'add', icon: '➕' },
              { id: 'scan', icon: '📸' },
              { id: 'profile', icon: '👤' }
            ].map((btn) => (
              <button 
                key={btn.id}
                onClick={() => setPage(btn.id)} 
                className={`text-2xl transition-all duration-300 ${page === btn.id ? 'text-indigo-500 scale-125 translate-y-[-4px]' : 'opacity-30'}`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}