"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Users,
  FileText,
  HardHat,
  Headphones,
  Glasses,
  Shirt,
  Footprints,
  HandMetal,
  AlertTriangle,
  Shield,
  Sparkles,
  Award,
  LucideIcon,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SVG Components
const SafetyPattern = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1000 1000"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="safetyPattern"
        patternUnits="userSpaceOnUse"
        width="60"
        height="60">
        <path
          d="M30 5L55 30L30 55L5 30Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      </pattern>
      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#safetyPattern)" />
    <rect width="100%" height="100%" fill="url(#heroGradient)" />
  </svg>
);

export default function HomePage() {
  const t = useTranslations("HomePageLegacy");
  const { data: session } = useSession();
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Animated icons state
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [
    { icon: HardHat, label: t("hero.headProtection") },
    { icon: Headphones, label: t("hero.hearingProtection") },
    { icon: Glasses, label: t("hero.eyeProtection") },
    { icon: Shield, label: t("hero.bodyProtection") },
  ];

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const heroPatternY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Animate section titles
    const sections = [
      heroRef,
      aboutRef,
      productsRef,
      servicesRef,
      standardsRef,
      contactRef,
    ];

    sections.forEach((sectionRef) => {
      if (!sectionRef.current) return;

      const heading = sectionRef.current.querySelector("h2");
      if (!heading) return;

      ScrollTrigger.create({
        trigger: heading,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        },
        once: true,
      });
    });

    // Icon animation interval
    const iconInterval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 3000);

    // Product category animations
    const productItems =
      productsRef.current?.querySelectorAll(".product-category");
    if (productItems) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            productItems,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });
    }

    // Service animations
    const serviceItems = servicesRef.current?.querySelectorAll(".service-item");
    if (serviceItems) {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            serviceItems,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              duration: 0.7,
              ease: "back.out(1.2)",
            }
          );
        },
        once: true,
      });
    }

    // Standards list animation
    const standardItems =
      standardsRef.current?.querySelectorAll(".standard-item");
    if (standardItems) {
      ScrollTrigger.create({
        trigger: standardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            standardItems,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        },
        once: true,
      });
    }

    return () => clearInterval(iconInterval);
  }, [icons.length]);

  // EPI Categories
  const epiCategories = [
    {
      name: t("productCategories.headProtection.name"),
      icon: <HardHat className="w-12 h-12 text-primary" />,
      products: t("productCategories.headProtection.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/8961277/pexels-photo-8961277.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: t("productCategories.hearingProtection.name"),
      icon: <Headphones className="w-12 h-12 text-primary" />,
      products: t("productCategories.hearingProtection.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/1078058/pexels-photo-1078058.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: t("productCategories.eyeProtection.name"),
      icon: <Glasses className="w-12 h-12 text-primary" />,
      products: t("productCategories.eyeProtection.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/4492346/pexels-photo-4492346.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: t("productCategories.protectiveClothing.name"),
      icon: <Shirt className="w-12 h-12 text-primary" />,
      products: t("productCategories.protectiveClothing.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/3912364/pexels-photo-3912364.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: t("productCategories.footProtection.name"),
      icon: <Footprints className="w-12 h-12 text-primary" />,
      products: t("productCategories.footProtection.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/4492141/pexels-photo-4492141.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: t("productCategories.handProtection.name"),
      icon: <HandMetal className="w-12 h-12 text-primary" />,
      products: t("productCategories.handProtection.products")
        .split(",")
        .map((item) => item.trim())
        .slice(0, 3),
      image:
        "https://images.pexels.com/photos/4491470/pexels-photo-4491470.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
  ];

  // Services
  const services = [
    {
      title: t("services.safetyConsulting.title"),
      description: t("services.safetyConsulting.description"),
      icon: <AlertTriangle className="w-12 h-12 text-primary" />,
    },
    {
      title: t("services.ppeTraining.title"),
      description: t("services.ppeTraining.description"),
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    {
      title: t("services.complianceAudit.title"),
      description: t("services.complianceAudit.description"),
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    {
      title: t("services.preventiveMaintenance.title"),
      description: t("services.preventiveMaintenance.description"),
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    },
  ];

  // Safety standards
  const safetyStandards = [
    t("standards.items.0"),
    t("standards.items.1"),
    t("standards.items.2"),
    t("standards.items.3"),
    t("standards.items.4"),
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Animated SVG Background */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-16 pb-24 overflow-hidden bg-gradient-to-br from-secondary to-secondary/90 dark:from-secondary/80 dark:to-secondary">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80"
          alt="Travailleur équipé d'EPI"
          fill
          unoptimized
          priority
          className="absolute inset-0 -z-10 object-cover object-center"
        />

        {/* Animated SVG Pattern Background */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden text-primary/10 opacity-70"
          style={{ y: heroPatternY }}>
          <SafetyPattern className="w-full h-full" />
        </motion.div>

        {/* Animated floating shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                width: 50 + Math.random() * 100,
                height: 50 + Math.random() * 100,
                opacity: 0.3 + Math.random() * 0.5,
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                ],
                y: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                ],
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
                repeatType: "reverse",
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-10 z-10 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="max-w-2xl text-white mb-10 lg:mb-0"
              style={{ y: heroContentY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {t("hero.title")}
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-lg"
                  asChild>
                  <Link href="#products">
                    {t("hero.discoverProducts")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-slate-900 hover:text-white hover:bg-white/20 px-8 py-6 text-lg font-bold"
                  asChild>
                  <Link href="/contact">{t("hero.contactUs")}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Animated icons showcase */}
            <motion.div
              className="lg:flex-1 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Rotating outer circle */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Center feature */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIcon}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.5 }}
                          className="text-center">
                          {React.createElement(icons[activeIcon].icon, {
                            className: "w-20 h-20 text-primary mx-auto",
                          })}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-white font-bold text-xl">
                            {icons[activeIcon].label}
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Decorative dots */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-primary"
                        style={{
                          left: `calc(50% + ${
                            Math.cos(i * (Math.PI / 6)) * 48
                          }%)`,
                          top: `calc(50% + ${
                            Math.sin(i * (Math.PI / 6)) * 48
                          }%)`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 text-foreground">
                {t("about.title")}
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>

              <p className="text-lg text-foreground mb-6">
                {t("about.description1")}
              </p>

              <p className="text-lg text-foreground mb-8">
                {t("about.description2")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("about.certifiedQuality")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("about.productsComplyWithStandards")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("about.expertise")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("about.personalizedAdvice")}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-bold"
                asChild>
                <Link href="/about">
                  {t("about.learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="md:w-1/2">
              <motion.div
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}>
                <Image
                  src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop"
                  alt="Équipe Solution EPI"
                  fill
                  unoptimized
                  priority
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent">
                  <motion.div
                    className="absolute bottom-8 left-8 max-w-xs"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}>
                    <span className="bg-primary text-black px-4 py-2 rounded-full font-bold inline-block mb-4">
                      {t("about.yearsOfExperience", { years: 15 })}
                    </span>
                    <p className="text-white font-medium">
                      {t("about.dedicatedTeam")}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="products" ref={productsRef} className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 text-foreground">
              {t("productCategories.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              {t("productCategories.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {epiCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="product-category bg-card rounded-lg overflow-hidden border shadow-md transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-secondary/5 to-primary/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-primary"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}>
                      {React.cloneElement(category.icon, {
                        className: "w-24 h-24 opacity-80",
                      })}
                    </motion.div>

                    {/* Decorative pattern based on category */}
                    <motion.div
                      className="absolute inset-0 z-0 opacity-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + 0.1 * i }}>
                      {category.name === "Protection de la tête" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`helmet-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20">
                            <path
                              d="M10,0 C14,6 14,14 10,20 C6,14 6,6 10,0"
                              stroke="currentColor"
                              fill="none"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#helmet-pattern-${i})`}
                          />
                        </svg>
                      )}

                      {category.name === "Protection auditive" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`audio-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20">
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              stroke="currentColor"
                              fill="none"
                            />
                            <circle
                              cx="10"
                              cy="10"
                              r="3"
                              stroke="currentColor"
                              fill="none"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#audio-pattern-${i})`}
                          />
                        </svg>
                      )}

                      {category.name === "Protection oculaire" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`eye-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30">
                            <path
                              d="M0,15 C10,5 20,5 30,15 C20,25 10,25 0,15 Z"
                              stroke="currentColor"
                              fill="none"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#eye-pattern-${i})`}
                          />
                        </svg>
                      )}

                      {category.name === "Vêtements de protection" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`clothing-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20">
                            <path
                              d="M0,0 L20,20 M20,0 L0,20"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#clothing-pattern-${i})`}
                          />
                        </svg>
                      )}

                      {category.name === "Protection des pieds" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`foot-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20">
                            <path
                              d="M5,10 C5,5 15,5 15,10 C15,15 5,15 5,10 Z"
                              stroke="currentColor"
                              fill="none"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#foot-pattern-${i})`}
                          />
                        </svg>
                      )}

                      {category.name === "Protection des mains" && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg">
                          <pattern
                            id={`hand-pattern-${i}`}
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20">
                            <path
                              d="M10,0 L10,10 L0,10 M10,10 L20,10 L20,20"
                              stroke="currentColor"
                              fill="none"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#hand-pattern-${i})`}
                          />
                        </svg>
                      )}
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {React.cloneElement(category.icon, {
                      className: "w-8 h-8 text-primary",
                    })}
                    <h3 className="text-xl font-bold ml-3 text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {Array.isArray(category.products) &&
                      category.products.map((product, j) => (
                        <motion.li
                          key={j}
                          className="flex items-center text-foreground"
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + 0.1 * j }}>
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>{product}</span>
                        </motion.li>
                      ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-medium"
                    asChild>
                    <Link
                      href={`/products/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}>
                      {t("productCategories.viewProducts")}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black px-8"
              asChild>
              <Link href="/products">
                {t("productCategories.viewAllProducts")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 text-foreground">
              {t("services.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              {t("services.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-item bg-card rounded-lg p-6 border shadow-md h-full flex flex-col">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center text-foreground">
                  {service.title}
                </h3>
                <p className="text-foreground mb-6 text-center flex-grow">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  className="mt-auto w-full border-primary text-primary hover:bg-primary hover:text-white font-medium"
                  asChild>
                  <Link href="/services">{t("services.learnMore")}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section
        id="standards"
        ref={standardsRef}
        className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 text-foreground">
                {t("standards.title")}
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>

              <p className="text-lg text-foreground mb-6">
                {t("standards.description")}
              </p>

              <ul className="space-y-4 mb-8">
                {safetyStandards.map((standard, i) => (
                  <li key={i} className="standard-item flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1 mr-3" />
                    <span className="text-foreground">{standard}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-amber-100 border-l-4 border-amber-500 p-4 flex items-start">
                  <AlertTriangle className="text-amber-500 h-6 w-6 shrink-0 mt-0.5 mr-3" />
                  <p>
                    <strong className="font-semibold">
                      {t("standards.legalObligation")}
                    </strong>{" "}
                    {t("standards.employerMustProvidePPE")}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 order-1 md:order-2">
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}>
                <Image
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop"
                  alt="Certification et normes"
                  fill
                  unoptimized
                  priority
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end">
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      {/* Certification badges */}
                      <motion.div
                        className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center text-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}>
                        <div>
                          <div className="font-bold text-primary">ISO</div>
                          <div className="text-xs text-secondary">45001</div>
                        </div>
                      </motion.div>
                      <motion.div
                        className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center text-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.4,
                        }}>
                        <div>
                          <div className="font-bold text-primary">EN</div>
                          <div className="text-xs text-secondary">166</div>
                        </div>
                      </motion.div>
                      <motion.div
                        className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center text-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.6,
                        }}>
                        <div className="font-bold text-primary">CE</div>
                      </motion.div>
                    </div>
                    <motion.p
                      className="text-white font-medium text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}>
                      {t("standards.allProductsMeetStandards")}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 text-foreground">
              {t("contact.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="bg-card border rounded-lg overflow-hidden shadow-lg h-[400px] relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}>
                <Image
                  src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop"
                  alt="Contactez Solution EPI"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-secondary/30 flex items-center justify-center">
                  <motion.div
                    className="bg-white/90 p-8 rounded-lg shadow-xl max-w-xs text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}>
                    <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">
                      {t("contact.getInTouch")}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t("contact.teamAvailable")}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div className="h-2 w-2 rounded-full bg-primary/60"></div>
                      <div className="h-2 w-2 rounded-full bg-primary/30"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">
                {t("contact.coordinates")}
              </h3>

              <div className="space-y-6">
                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">
                      {t("contact.address")}
                    </h4>
                    <p className="text-muted-foreground">
                      {t("contact.addressValue")}
                    </p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">
                      {t("contact.phone")}
                    </h4>
                    <p className="text-muted-foreground">+237 6XX XXX XXX</p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">
                      {t("contact.email")}
                    </h4>
                    <p className="text-muted-foreground">
                      contact@solution-epi.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black flex-1"
                  asChild>
                  <Link href="/contact">{t("contact.requestQuote")}</Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white flex-1"
                  asChild>
                  <Link href="/contact">{t("contact.contactUs")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
