"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Star, ChevronLeft, 
  Home, Calendar, User, Clock, Heart, 
  MessageCircle, Navigation2, FileText
} from 'lucide-react';
import { clsx } from 'clsx';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'electrician', name: 'Electrician', image: 'https://picsum.photos/seed/electrician/400/300' },
  { id: 'plumber', name: 'Plumber', image: 'https://picsum.photos/seed/plumbing/400/300' },
  { id: 'ac', name: 'AC Repair', image: 'https://picsum.photos/seed/ac/400/300' },
  { id: 'carpenter', name: 'Carpenter', image: 'https://picsum.photos/seed/carpentry/400/300' },
  { id: 'painter', name: 'Painter', image: 'https://picsum.photos/seed/painting/400/300' },
  { id: 'cleaner', name: 'Cleaner', image: 'https://picsum.photos/seed/cleaning/400/300' },
];

const WORKERS = [
  { id: 'w1', name: 'Robert Fox', categoryId: 'electrician', rating: 4.9, reviews: 124, price: 45, distance: 1.2, image: 'https://picsum.photos/seed/w1/150/150', about: 'Professional electrician with 10 years of experience in residential and commercial wiring. Focused on safety and quality.' },
  { id: 'w2', name: 'Kathryn Murphy', categoryId: 'plumber', rating: 4.8, reviews: 89, price: 50, distance: 2.5, image: 'https://picsum.photos/seed/w2/150/150', about: 'Expert plumber handling leaks, pipe bursts, and bathroom renovations.' },
  { id: 'w3', name: 'Jacob Jones', categoryId: 'ac', rating: 4.7, reviews: 201, price: 60, distance: 0.8, image: 'https://picsum.photos/seed/w3/150/150', about: 'Beat the heat! specialized in AC fitting, repairing, and maintenance.' },
  { id: 'w4', name: 'Eleanor Pena', categoryId: 'painter', rating: 4.9, reviews: 56, price: 35, distance: 3.1, image: 'https://picsum.photos/seed/w4/150/150', about: 'Interior and exterior painter. Clean work and premium finish.' },
  { id: 'w5', name: 'Albert Flores', categoryId: 'electrician', rating: 4.5, reviews: 40, price: 40, distance: 4.2, image: 'https://picsum.photos/seed/w5/150/150', about: 'Quick and reliable residential electrical services.' },
];

// --- COMPONENTS ---

function WorkerCard({ worker, onClick, className = '' }: any) {
  const catName = CATEGORIES.find(c => c.id === worker.categoryId)?.name;
  return (
    <div onClick={onClick} className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-transform flex flex-col ${className}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 relative rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
          <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{worker.name}</h3>
          <p className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full inline-block mt-1 font-medium">{catName}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center text-sm font-medium text-slate-600">
          <Star className="w-4 h-4 text-orange-500 mr-1 fill-orange-500" />
          {worker.rating} <span className="text-slate-400 font-normal ml-1">({worker.reviews})</span>
        </div>
        <div className="text-blue-900 font-bold">
          ${worker.price}<span className="text-xs text-slate-400 font-normal">/hr</span>
        </div>
      </div>
    </div>
  );
}

function HomeView({ onNavigate }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="pb-8">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-200 text-sm">Location</p>
            <div className="flex items-center font-semibold text-lg">
              <MapPin className="w-4 h-4 mr-1 text-orange-500" />
              New York, USA
            </div>
          </div>
          <div className="bg-blue-800 p-2 text-white/90 rounded-full">
            <User className="w-5 h-5" />
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Find services near you"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-slate-800 placeholder-slate-400 bg-white border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate('category', { categoryId: cat.id })}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
            >
               <div className="w-full h-28 relative bg-slate-100">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" referrerPolicy="no-referrer" />
               </div>
               <div className="p-3 w-full text-center">
                 <span className="font-semibold text-sm text-slate-800">{cat.name}</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Workers */}
      <div className="px-6 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900">Top Rated Workers</h2>
          <button className="text-orange-500 text-sm font-bold">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {WORKERS.slice(0, 3).map(w => (
            <WorkerCard key={w.id} worker={w} onClick={() => onNavigate('provider', { workerId: w.id })} className="min-w-[260px] snap-start" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CategoryListingView({ categoryId, onNavigate, onBack }: any) {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const workers = WORKERS.filter(w => w.categoryId === categoryId);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="min-h-full bg-slate-50 flex flex-col pb-6">
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-800 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg text-slate-900">{category?.name}s</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {workers.length === 0 ? (
          <div className="text-center text-slate-500 py-10 mt-10 p-6 bg-white rounded-2xl border border-slate-100 mx-auto">
             No workers found in this category yet.
          </div>
        ) : (
          workers.map(w => (
            <WorkerCard key={w.id} worker={w} onClick={() => onNavigate('provider', { workerId: w.id })} />
          ))
        )}
      </div>
    </motion.div>
  );
}

function ProviderView({ workerId, onNavigate, onBack }: any) {
  const worker = WORKERS.find(w => w.id === workerId);
  const category = CATEGORIES.find(c => c.id === worker?.categoryId);
  
  if (!worker) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="min-h-full bg-white flex flex-col">
      <div className="relative h-64 bg-slate-200">
        <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
        <button onClick={onBack} className="absolute left-6 top-6 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm text-slate-800 hover:bg-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-6 top-6 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white transition-colors text-orange-500">
          <Heart className="w-6 h-6" />
        </button>
      </div>
      
      <div className="px-6 py-6 flex-1 flex flex-col rounded-t-[2rem] -mt-8 bg-white relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{worker.name}</h1>
            <p className="text-orange-500 font-bold bg-orange-50 px-2.5 py-1 rounded-full text-xs inline-block mt-2">{category?.name}</p>
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-1">${worker.price}<span className="text-sm text-slate-400 font-normal">/hr</span></div>
        </div>

        <div className="flex gap-3 mt-6">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl flex-1 justify-center">
            <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
            <div className="font-bold text-slate-800 text-sm">{worker.rating} <span className="text-slate-400 font-medium">({worker.reviews})</span></div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl flex-1 justify-center">
            <Navigation2 className="w-5 h-5 text-blue-500" />
            <div className="font-bold text-slate-800 text-sm">{worker.distance} <span className="text-slate-400 font-medium">km away</span></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">About Provider</h2>
          <p className="text-slate-600 leading-relaxed text-sm">{worker.about}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-green-500/10 text-green-600 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-green-500/20 transition-colors">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
        </div>

        <div className="mt-auto pt-8 pb-4">
          <button 
            onClick={() => onNavigate('booking-flow', { workerId: worker.id })}
            className="w-full bg-blue-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-900/30 active:scale-[0.98] transition-transform"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BookingFlowView({ workerId, onNavigate, onBack, onAddBooking }: any) {
  const worker = WORKERS.find(w => w.id === workerId);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DATES = ['Today', 'Tomorrow', 'Oct 15', 'Oct 16', 'Oct 17'];
  const TIMES = ['10:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
       const newBooking = {
         id: Math.random().toString(36).substring(2, 9),
         workerId: worker?.id,
         date: selectedDate,
         time: selectedTime,
         status: 'Pending'
       };
       onAddBooking(newBooking);
       onNavigate('bookings');
    }, 1200);
  };

  if(!worker) return null;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="min-h-full bg-slate-50 flex flex-col px-6 py-6 pb-12">
      <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-200 text-slate-800 self-start mb-6 transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">Select Time</h1>
      <p className="text-slate-500 text-sm mb-8 font-medium">When do you need {worker.name}?</p>

      <div className="space-y-6 flex-1">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">Date</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {DATES.map(d => (
              <button 
                key={d} 
                onClick={() => setSelectedDate(d)}
                className={`shrink-0 px-5 py-3 rounded-2xl border-2 font-bold transition-all ${selectedDate === d ? 'border-blue-900 bg-blue-900 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <h2 className="text-base font-bold text-slate-900 mb-3">Time</h2>
          <div className="grid grid-cols-3 gap-3">
            {TIMES.map(t => (
              <button 
                key={t}
                onClick={() => setSelectedTime(t)}
                 className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${selectedTime === t ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 mt-8">
           <div className="w-14 h-14 relative rounded-full overflow-hidden bg-slate-100 shrink-0">
               <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
           <div>
             <h3 className="font-bold text-slate-900 text-sm">Booking {worker.name}</h3>
             <p className="text-xs text-slate-500 font-medium mt-0.5">Estimated • ${worker.price}/hr</p>
           </div>
        </div>
      </div>

      <div className="mt-8 pt-4">
         <button 
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-900/30 flex justify-center items-center gap-3 disabled:opacity-80 disabled:scale-100 active:scale-[0.98] transition-all"
          >
            {isSubmitting ? (
              <>
                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                 Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
      </div>
    </motion.div>
  );
}

function BookingsDashboard({ bookings }: any) {
  const [tab, setTab] = useState<'Active' | 'Past'>('Active');

  const activeBookings = bookings.filter((b: any) => ['Pending', 'Accepted', 'In Progress'].includes(b.status));
  const pastBookings = bookings.filter((b: any) => b.status === 'Completed');
  const displayBookings = tab === 'Active' ? activeBookings : pastBookings;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-h-full bg-slate-50 flex flex-col pb-8">
       <div className="bg-white px-6 pt-10 pb-4 shadow-sm sticky top-0 z-10 rounded-b-2xl">
         <h1 className="text-2xl font-bold text-blue-900 mb-6">My Bookings</h1>
         <div className="flex gap-4">
           {['Active', 'Past'].map(t => (
             <button 
               key={t} 
               onClick={() => setTab(t as any)}
               className={`flex-1 py-3 text-center rounded-xl font-bold text-sm transition-all ${tab === t ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
             >
               {t}
             </button>
           ))}
         </div>
       </div>

       <div className="px-6 py-6 space-y-4">
          {displayBookings.length === 0 ? (
            <div className="text-center text-slate-500 py-12 mt-4 bg-white rounded-3xl border border-slate-100 px-6">
               <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
               <p className="font-medium">No {tab.toLowerCase()} bookings found.</p>
            </div>
          ) : (
            displayBookings.map((b: any) => {
              const worker = WORKERS.find(w => w.id === b.workerId);
              if (!worker) return null;
              
              const statusColors = {
                'Pending': 'bg-orange-100 text-orange-700',
                'Accepted': 'bg-blue-100 text-blue-700',
                'In Progress': 'bg-blue-100 text-blue-700',
                'Completed': 'bg-green-100 text-green-700',
              }[b.status as string] || 'bg-slate-100 text-slate-600';

              return (
                 <div key={b.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {b.date} &bull; {b.time}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${statusColors}`}>
                        {b.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden bg-slate-100 shrink-0">
                        <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{worker.name}</h3>
                        <p className="text-xs text-orange-500 font-medium mt-0.5">{CATEGORIES.find(c => c.id === worker.categoryId)?.name}</p>
                      </div>
                      {tab === 'Active' ? (
                        <button className="bg-blue-50 p-2.5 rounded-full hover:bg-blue-100 transition-colors text-blue-600">
                           <Navigation2 className="w-5 h-5" />
                        </button>
                      ) : (
                         <button className="text-orange-500 text-sm font-bold bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">
                           Review
                         </button>
                      )}
                    </div>
                 </div>
              );
            })
          )}
       </div>
    </motion.div>
  )
}

function ProfileView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-h-full bg-slate-50 pb-8">
       <div className="bg-blue-900 text-white rounded-b-[2rem] px-6 pt-12 pb-10 flex flex-col items-center relative overflow-hidden">
         <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-blue-800 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none"></div>
         <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 border-4 border-white/20 overflow-hidden relative shadow-lg">
            <Image src="https://picsum.photos/seed/user/200/200" alt="Avatar" fill className="object-cover" referrerPolicy="no-referrer"/>
         </div>
         <h1 className="text-xl font-bold tracking-tight">Alex Johnson</h1>
         <p className="text-blue-200 text-sm font-medium mt-1">alex.j@example.com</p>
       </div>

       <div className="px-6 py-8 space-y-3">
         {['Personal Details', 'Payment Methods', 'Saved Address', 'Support', 'Logout'].map((item, i) => (
           <div key={i} className={`p-5 bg-white rounded-2xl font-bold text-sm flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 ${item === 'Logout' ? 'text-red-500 mt-8' : 'text-slate-800'}`}>
             <span>{item}</span>
             {item !== 'Logout' && <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180" />}
           </div>
         ))}
       </div>
    </motion.div>
  )
}

// --- MAIN APP COMPONENT ---

export default function FixItApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenContext, setScreenContext] = useState<any>({});
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  
  // Starting Bookings State
  const [bookings, setBookings] = useState([
     { id: 'b1', workerId: 'w1', date: 'Tomorrow', time: '10:00 AM', status: 'Accepted' },
     { id: 'b2', workerId: 'w2', date: 'Oct 12', time: '02:00 PM', status: 'Completed' },
  ]);

  const navigateTo = (screen: string, ctx?: any) => {
     setScreenContext(ctx || {});
     setNavigationHistory(prev => [...prev, screen]);
     setCurrentScreen(screen);
  };

  const goBack = () => {
     if(navigationHistory.length > 1) {
       const newHist = [...navigationHistory];
       newHist.pop();
       const prevScreen = newHist[newHist.length - 1];
       setNavigationHistory(newHist);
       setCurrentScreen(prevScreen);
     }
  };

  const SHOW_BOTTOM_NAV = ['home', 'bookings', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center p-0 md:p-8">
      <div className="w-full max-w-[420px] bg-slate-50 h-[100dvh] md:h-[844px] md:max-h-[844px] md:rounded-[2.5rem] md:shadow-2xl overflow-hidden relative flex flex-col md:border-[10px] border-slate-800">
        
        {/* Content Area */}
        <div className={clsx("flex-1 overflow-y-auto scrollbar-hide relative bg-white md:bg-slate-50", SHOW_BOTTOM_NAV ? "pb-[80px]" : "pb-0")}>
          <AnimatePresence mode="wait">
             {currentScreen === 'home' && <HomeView key="home" onNavigate={navigateTo} />}
             {currentScreen === 'category' && <CategoryListingView key={`cat-${screenContext.categoryId}`} categoryId={screenContext.categoryId} onNavigate={navigateTo} onBack={goBack} />}
             {currentScreen === 'provider' && <ProviderView key={`prov-${screenContext.workerId}`} workerId={screenContext.workerId} onNavigate={navigateTo} onBack={goBack} />}
             {currentScreen === 'booking-flow' && <BookingFlowView key={`book-${screenContext.workerId}`} workerId={screenContext.workerId} onNavigate={navigateTo} onBack={goBack} onAddBooking={(b: any) => setBookings([...bookings, b])} />}
             {currentScreen === 'bookings' && <BookingsDashboard key="bookings" bookings={bookings} />}
             {currentScreen === 'profile' && <ProfileView key="profile" />}
          </AnimatePresence>
        </div>

        {/* Bottom Nav */}
        <AnimatePresence>
          {SHOW_BOTTOM_NAV && (
            <motion.nav 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 w-full bg-white border-t border-slate-100 pt-3 pb-6 px-8 flex justify-between items-center z-50 rounded-b-[2rem] md:rounded-none md:rounded-b-2xl shadow-[0_-10px_20px_-5px_rgba(30,58,138,0.03)]"
            >
              {[
                { id: 'home', label: 'Home', Icon: Home },
                { id: 'bookings', label: 'Bookings', Icon: FileText },
                { id: 'profile', label: 'Profile', Icon: User }
              ].map(item => {
                const isActive = currentScreen === item.id;
                return (
                  <button 
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="flex flex-col items-center gap-1.5 min-w-[60px] cursor-pointer"
                  >
                    <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
                       <item.Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-blue-900 fill-blue-900/10' : 'text-slate-400'}`} />
                    </div>
                    <span className={`text-[10px] font-bold transition-colors ${isActive ? 'text-blue-900' : 'text-slate-400'}`}>{item.label}</span>
                  </button>
                )
              })}
            </motion.nav>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
