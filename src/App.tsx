/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronRight,
  ChevronLeft,
  Star,
  Users,
  Home,
  ShieldCheck,
  Globe
} from "lucide-react";

// Data
const recentPropertiesData = [
  { title: "Urban Industrial Loft", price: "$1,500,000", location: "New York, NY", img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=800" },
  { title: "Coastal Retreat", price: "$2,900,000", location: "Monterey, CA", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800" },
  { title: "Desert Mirage", price: "$3,450,000", location: "Scottsdale, AZ", img: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80&w=800" },
  { title: "Mountain Peak Cabin", price: "$1,850,000", location: "Aspen, CO", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800" },
  { title: "Zen Garden Pavilion", price: "$4,100,000", location: "San Francisco, CA", img: "https://images.unsplash.com/photo-1580587767303-9cd53000673a?auto=format&fit=crop&q=80&w=800" },
  { title: "Skyline Penthouse", price: "$8,900,000", location: "Chicago, IL", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" }
];

const featuredPropertiesData = [
  { title: "Modernist Villa", price: "$4,250,000", location: "Malibu, CA", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" },
  { title: "Sunset Residence", price: "$6,800,000", location: "Miami, FL", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800" },
  { title: "Glass Mansion", price: "$12,500,000", location: "Los Angeles, CA", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
  { title: "Nordic Retreat", price: "$3,150,000", location: "Aspen, CO", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800" }
];

// Animation Config
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'properties'>('home');
  const featuredRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-4xl mx-auto leading-tight"
          >
            Easiest way to find your <span className="italic font-light">dream home</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass max-w-3xl mx-auto p-2 rounded-full flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 w-full px-6 flex items-center gap-3">
              <Search className="text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter Zip Code or City, e.g. New York" 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 py-4"
              />
            </div>
            <button 
              onClick={() => setView('properties')}
              className="w-full md:w-auto px-10 py-4 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-secondary transition-all"
            >
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-brand-accent/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl mb-4 text-brand-primary font-bold">Featured Properties</h2>
              <p className="text-gray-500 max-w-lg">Discover our curated selection of ultra-luxury residences and architectural gems across the globe.</p>
            </motion.div>
            <div className="flex gap-4">
              <button 
                onClick={() => setView('properties')}
                className="px-8 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-secondary transition-all text-sm font-medium mr-4"
              >
                View all properties
              </button>
              <button 
                onClick={() => scroll(featuredRef, 'left')}
                className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-brand-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll(featuredRef, 'right')}
                className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-brand-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div 
            ref={featuredRef}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex gap-10 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar"
          >
            {featuredPropertiesData.map((prop, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="group cursor-pointer min-w-full md:min-w-[calc(50%-20px)] lg:min-w-[calc(33.333%-26.666px)] snap-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img 
                    src={prop.img} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-primary">
                    Coming Soon
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif text-brand-primary font-bold">{prop.title}</h3>
                    <span className="font-sans font-semibold text-brand-primary">{prop.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {prop.location}
                  </div>
                  <div className="flex items-center gap-6 pt-4 text-gray-500 text-xs border-t border-gray-100 flex-wrap">
                    <span className="flex items-center gap-2"><Bed className="w-4 h-4" /> 5 beds</span>
                    <span className="flex items-center gap-2"><Bath className="w-4 h-4" /> 4 baths</span>
                    <span className="flex items-center gap-2"><Maximize className="w-4 h-4" /> 4,500 sqft</span>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => setView('properties')}
                      className="w-1/2 py-3 bg-brand-primary text-white text-[10px] uppercase font-bold tracking-widest hover:bg-brand-secondary transition-all rounded-sm flex items-center justify-center gap-2"
                    >
                      View details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Properties (Carousel) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl mb-4 text-brand-primary font-bold">Recent Properties</h2>
              <p className="text-gray-500 max-w-lg text-sm">Discover our latest property listings curated just for you</p>
            </motion.div>
            <div className="flex gap-4">
              <button 
                onClick={() => scroll(recentRef, 'left')}
                className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-brand-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll(recentRef, 'right')}
                className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-brand-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div 
            ref={recentRef}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex gap-10 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar"
          >
            {recentPropertiesData.map((prop, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="group cursor-pointer min-w-full md:min-w-[calc(50%-20px)] lg:min-w-[calc(33.333%-26.666px)] snap-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img 
                    src={prop.img} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-primary text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                    New Listing
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif text-brand-primary font-bold">{prop.title}</h3>
                    <span className="font-sans font-semibold text-brand-primary">{prop.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {prop.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-accent/10">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6 text-brand-primary font-bold">Our Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We provide comprehensive real estate solutions tailored to the unique needs of property owners, buyers, and investors.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "Property for Sale", icon: <Home className="w-8 h-8" />, desc: "Browse our extensive collection of properties available for sale, from luxury condos to sprawling estates." },
              { title: "Real Estate Agent", icon: <Users className="w-8 h-8" />, desc: "Connect with our experienced and certified real estate agents who will guide you through every step of your journey." },
              { title: "House for Sale", icon: <ShieldCheck className="w-8 h-8" />, desc: "Looking to sell? We offer bespoke marketing strategies and expert negotiation to ensure you get the best value." },
              { title: "House for Rent", icon: <Globe className="w-8 h-8" />, desc: "Discover premium rental properties in world-class locations with flexible terms and white-glove service." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="p-8 bg-white border border-gray-100 rounded-sm hover:border-brand-primary transition-all group"
              >
                <div className="mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl mb-4 text-brand-primary font-bold">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <button onClick={() => setView('properties')} className="text-brand-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-primary text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 px-4">
             <motion.div {...fadeIn}>
               <h2 className="text-4xl md:text-5xl mb-4 font-bold">Customer Says</h2>
               <p className="text-white/60">Real stories from our esteemed clients.</p>
             </motion.div>
             <motion.div {...fadeIn} className="flex gap-4 mt-8 md:mt-0">
               <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"><ChevronLeft /></button>
               <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"><ChevronRight /></button>
             </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { name: "Mike Houston", role: "Business Owner, Texas", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
              { name: "Cameron Webster", role: "Seller, New York", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
              { name: "Dave Smith", role: "Investor, Florida", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" }
            ].map((p, i) => (
              <motion.div key={i} variants={fadeIn} className="space-y-6">
                <div className="flex items-center gap-4">
                  <img src={p.img} alt={p.name} className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-1">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                    </div>
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-xs text-white/40">{p.role}</p>
                  </div>
                </div>
                <p className="text-white/70 italic text-lg leading-relaxed">
                  "The attention to detail and professionalism shown by the team was unparalleled. They didn't just find us a house, they found us a piece of art."
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn} className="space-y-12">
              <div className="space-y-6 text-brand-primary">
                 <h2 className="text-5xl md:text-6xl max-w-md font-bold">Let's find home that's perfect for you</h2>
                 <p className="text-gray-500 text-balance">PropertyBazaar offers millions of properties with top-rated agents, legitimate verified listings, and transparent transactions to help you find your perfect home.</p>
              </div>
              
              <div className="space-y-8">
                {[
                  { title: "2M+ Properties", desc: "Explore millions of premium properties across global markets.", icon: <Home className="w-5 h-5" /> },
                  { title: "Top Rated Agents", desc: "Work with certified professionals dedicated to your success.", icon: <Users className="w-5 h-5" /> },
                  { title: "Legit Properties", desc: "All listings are verified ensuring legitimate and transparent transactions.", icon: <ShieldCheck className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="p-4 bg-brand-accent/50 rounded-sm text-brand-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-brand-primary">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100">
                {[
                  { val: "3,298", label: "# of Buy Properties" },
                  { val: "2,181", label: "# of Sell Properties" },
                  { val: "9,316", label: "# of All Properties" },
                  { val: "7,191", label: "# of Agents" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-brand-primary mb-1">{stat.val}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600607687940-c52fb036999c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern House" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 border-8 border-brand-accent -z-10 bg-white" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-24 bg-brand-accent/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-20">
            <h2 className="text-4xl md:text-5xl mb-6 text-brand-primary font-bold">Our Agents</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Meet our team of experienced real estate professionals dedicated to helping you find the perfect property and achieve your real estate goals.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { name: "James Doe", role: "Luxury Specialist", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300" },
              { name: "Jean Smith", role: "Commercial Advisor", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300" },
              { name: "Alicia Huston", role: "International Sales", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" }
            ].map((agent, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white p-10 rounded-sm shadow-sm group">
                <div className="relative mb-8 inline-block">
                  <img 
                    src={agent.img} 
                    alt={agent.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-brand-accent group-hover:border-brand-primary transition-colors mx-auto" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-bold text-brand-primary mb-1">{agent.name}</h4>
                <p className="text-sm text-gray-400 mb-6 font-medium">{agent.role}</p>
                <div className="flex justify-center gap-4 text-brand-primary">
                  <Twitter className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                  <Facebook className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                  <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                  <Instagram className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-secondary text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold">Ready to Find Your Dream Property?</h2>
            <p className="text-white/60 text-lg">Join thousands of satisfied customers who have found their perfect home with PropertyBazaar.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button 
                onClick={() => setView('properties')}
                className="px-10 py-4 bg-white text-brand-primary rounded-sm font-bold hover:bg-brand-accent transition-all"
              >
                Browse Now
              </button>
              <button className="px-10 py-4 border border-white/30 rounded-sm font-bold hover:bg-white/10 transition-all">Contact Us</button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>
    </>
  );

  const renderPropertiesPage = () => (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-24 bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1600607687940-c52fb036999c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="header-bg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.h1 {...fadeIn} className="text-5xl md:text-7xl mb-6 font-bold tracking-tight">Our Properties</motion.h1>
          <motion.p {...fadeIn} className="text-white/60 max-w-2xl text-xl leading-relaxed">Discover your next investment or dream home from our curated selection of verified premium listings.</motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white p-10 shadow-2xl rounded-sm border border-brand-accent/30">
            <h3 className="text-2xl font-serif text-brand-primary font-bold mb-8">Filter Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Enter location or keyword" className="w-full border-gray-100 bg-gray-50 rounded-sm text-sm p-3 pl-10 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Type</label>
                <select className="w-full border-gray-100 bg-gray-50 rounded-sm text-sm p-3 outline-none focus:ring-1 focus:ring-brand-primary">
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Mansion</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Status</label>
                <select className="w-full border-gray-100 bg-gray-50 rounded-sm text-sm p-3 outline-none focus:ring-1 focus:ring-brand-primary">
                  <option>All</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Price Range</label>
                <select className="w-full border-gray-100 bg-gray-50 rounded-sm text-sm p-3 outline-none focus:ring-1 focus:ring-brand-primary">
                  <option>All Prices</option>
                  <option>$1M - $5M</option>
                  <option>$5M - $10M</option>
                  <option>$10M+</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-6 items-center">
              <button className="px-10 py-3 bg-brand-primary text-white rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-md">Filter</button>
              <button className="text-brand-primary font-bold text-xs uppercase tracking-widest px-4 hover:opacity-70 transition-all">Reset</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-6 gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Showing 0 of 0 properties</span>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-300">Sort by:</span>
              <select className="border-gray-100 rounded-sm text-xs p-2 outline-none uppercase font-bold tracking-widest text-brand-primary">
                <option>Latest</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>

          <motion.div 
            {...fadeIn}
            className="bg-cyan-50/30 rounded-sm p-24 text-center border border-cyan-100/50"
          >
            <h3 className="text-4xl text-brand-primary mb-6 font-serif font-bold">No Properties Found</h3>
            <p className="text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">Sorry, no properties match your search criteria. Please try adjusting your filters or browse our full catalog.</p>
            <button 
              onClick={() => {}} 
              className="px-12 py-4 bg-brand-primary text-white rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl"
            >
              View All Properties
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || view !== 'home' ? "glass py-4 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm">
               <Home className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled || view !== 'home' ? "text-brand-primary" : "text-white"}`}>PropertyBazaar</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Home', 'Properties', 'Services', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => setView(item === 'Properties' ? 'properties' : 'home')} 
                className={`${isScrolled || view !== 'home' ? "text-brand-primary" : "text-white"} hover:opacity-70 transition-opacity`}
              >
                {item}
              </button>
            ))}
            <button className="px-6 py-2 bg-brand-primary text-white rounded-sm hover:bg-brand-secondary transition-colors">
              Login
            </button>
          </div>
        </div>
      </nav>

      <main>
        {view === 'home' ? renderHome() : renderPropertiesPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm">
                   <Home className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-serif font-bold tracking-tight">PropertyBazaar</span>
              </div>
              <p className="text-white/30 text-xs leading-loose tracking-wide">Discover premium properties and real estate solutions tailored to your needs. Exceptional service, legitimate listings, and modern architectural masterpieces.</p>
              <div className="flex gap-6 opacity-30">
                <Facebook className="w-4 h-4 hover:opacity-100 transition-opacity cursor-pointer" />
                <Twitter className="w-4 h-4 hover:opacity-100 transition-opacity cursor-pointer" />
                <Instagram className="w-4 h-4 hover:opacity-100 transition-opacity cursor-pointer" />
                <Linkedin className="w-4 h-4 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
            </div>

            <div className="lg:pl-10">
              <h4 className="font-bold mb-10 uppercase text-[10px] tracking-widest text-white/40">Quick Links</h4>
              <ul className="space-y-5 text-xs text-white/50 font-bold uppercase tracking-widest">
                <li><button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setView('properties')} className="hover:text-white transition-colors">Properties</button></li>
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-10 uppercase text-[10px] tracking-widest text-white/40">Services</h4>
              <ul className="space-y-5 text-xs text-white/50 font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">Buy Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">Sell Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">Rent Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-white/30 hover:text-white">Market Analysis</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-10 uppercase text-[10px] tracking-widest text-white/40">Contact Info</h4>
              <ul className="space-y-8 text-xs text-white/50 leading-relaxed font-medium">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-white/20 shrink-0" />
                  <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">123 Luxury Blvd, Beverly Hills,<br />Los Angeles, CA 90210</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-white/20 shrink-0" />
                  <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">+1-800-PROPERTY</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-white/20 shrink-0" />
                  <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">info@propertybazaar.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.2em] font-black text-white/20">
            <p>© 2026 PROPERTYBAZAAR. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
