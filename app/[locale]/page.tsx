"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Book,
  Code,
  Cog,
  Layers,
  Lightbulb,
  MapPin,
  Phone,
  Clock,
  Mail,
  Star,
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
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// SVG Animated Components
const WheatAnimation = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const circlesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = pathRef.current;
    const circles = circlesRef.current?.querySelectorAll("circle");

    if (path && circles) {
      gsap.set(circles, { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: path,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      tl.fromTo(
        path,
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        { strokeDashoffset: 0, duration: 2 }
      );

      circles.forEach((circle, index) => {
        tl.to(
          circle,
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: index * 0.1,
          },
          "-=1.5"
        );
      });
    }
  }, []);

  return (
    <svg
      className="absolute right-0 top-10 h-full w-1/2"
      viewBox="0 0 300 600"
      fill="none">
      <path
        ref={pathRef}
        d="M150,50 C170,100 120,150 160,200 C200,250 120,300 160,350 C200,400 120,450 150,500"
        stroke="#1D3557"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <g ref={circlesRef}>
        {Array.from({ length: 12 }).map((_, index) => {
          const y = 70 + index * 40;
          const offset = index % 2 === 0 ? -10 : 10;
          return (
            <circle
              key={index}
              cx={150 + offset}
              cy={y}
              r={index % 3 === 0 ? 8 : 5}
              fill={index % 2 === 0 ? "#F4A261" : "#E9C46A"}
            />
          );
        })}
      </g>
    </svg>
  );
};

// Bread SVG Animation
const BreadAnimation = () => {
  const breadRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !breadRef.current) return;

    const bread = breadRef.current;
    const parts = bread.querySelectorAll("path");

    gsap.set(parts, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: bread,
      start: "top 80%",
      onEnter: () => {
        gsap.to(parts, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(parts, {
          opacity: 0,
          y: 20,
          duration: 0.5,
        });
      },
    });
  }, []);

  return (
    <svg className="w-full h-auto" viewBox="0 0 400 200" fill="none">
      <g ref={breadRef}>
        <path
          d="M100,50 C150,30 250,30 300,50 C330,60 350,100 340,130 C330,160 270,170 220,170 C170,170 90,160 70,130 C50,100 60,65 100,50Z"
          fill="#F8DEB5"
        />
        <path
          d="M110,60 C150,45 250,45 290,60 C310,65 320,90 315,110 C310,130 270,140 220,140 C170,140 110,130 95,110 C80,90 85,70 110,60Z"
          fill="#EAC989"
        />
        <path
          d="M180,80 C170,90 170,110 180,120"
          stroke="#9E7540"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M220,80 C230,90 230,110 220,120"
          stroke="#9E7540"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M150,100 L250,100"
          stroke="#9E7540"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { data: session } = useSession();
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fade-in animations for section titles
    const sections = [
      heroRef,
      aboutRef,
      productRef,
      testimonialsRef,
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

    // Product cards animation
    const productCards = productRef.current?.querySelectorAll(".product-card");
    if (productCards) {
      ScrollTrigger.create({
        trigger: productRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            productCards,
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

    // Testimonial cards animation
    const testimonialItems =
      testimonialsRef.current?.querySelectorAll(".testimonial-card");
    if (testimonialItems) {
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            testimonialItems,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.2,
              duration: 0.7,
              ease: "back.out(1.2)",
            }
          );
        },
        once: true,
      });
    }

    // Contact info items animation
    const contactItems = contactRef.current?.querySelectorAll(".contact-item");
    if (contactItems) {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            contactItems,
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
  }, []);

  // Product data
  const products = [
    {
      name: "Baguette Traditionnelle",
      description:
        "Classic French-style baguette with crispy exterior and soft, airy interior.",
      price: "1.200 FCFA",
      image:
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      name: "Pain au Chocolat",
      description: "Buttery, flaky pastry filled with rich, smooth chocolate.",
      price: "800 FCFA",
      image:
        "https://images.unsplash.com/photo-1592985684811-6c0f98adb014?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Brioche",
      description: "Light, slightly sweet bread enriched with butter and eggs.",
      price: "1.500 FCFA",
      image:
        "https://images.unsplash.com/photo-1620921568790-c1cf8984624c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Pain de Campagne",
      description:
        "Rustic country bread with a hearty crust and complex flavor.",
      price: "2.000 FCFA",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      name: "Marie Tchouta",
      role: "Restaurant Owner",
      content:
        "Solution Epi consistently provides the finest quality bread for our restaurant. Their baguettes are simply exceptional.",
      rating: 5,
    },
    {
      name: "Jean Mbarga",
      role: "Regular Customer",
      content:
        "I've been buying bread here for years. The quality is always outstanding and the service is friendly and professional.",
      rating: 5,
    },
    {
      name: "Sophie Nkoulou",
      role: "Cafe Manager",
      content:
        "Our cafe relies on Solution Epi for all our pastry needs. Their consistent quality and on-time delivery make them invaluable partners.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-16 pb-24 overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            style={{ y: heroImageY }}>
            <Image
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Fresh bread and pastries"
              fill
              priority
              className="object-cover object-center brightness-50"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-10 z-10 relative">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t("hero.title")}
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-black font-medium px-8 py-6 text-lg"
                asChild>
                <Link href="#products">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:text-white hover:bg-white/20 px-8 py-6 text-lg"
                asChild>
                <Link href="/contact">{t("hero.contact")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0">
                {t("about.title")}
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                {t("about.description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Established 2008</h3>
                    <p className="text-muted-foreground">
                      Over 15 years of excellence
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quality Ingredients</h3>
                    <p className="text-muted-foreground">
                      Premium locally sourced
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  asChild>
                  <Link href="#contact">Visit Our Bakery</Link>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 order-1 md:order-2">
              <motion.div
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}>
                <Image
                  src="https://images.unsplash.com/photo-1605807646983-377bc5a76493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Our Bakery"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" ref={productRef} className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
              {t("products.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of freshly baked artisanal breads and
              pastries, crafted daily using traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <div
                key={i}
                className={`product-card bg-card rounded-lg overflow-hidden border shadow-md ${
                  product.featured ? "md:col-span-2" : ""
                }`}>
                <div
                  className={`h-64 relative overflow-hidden ${
                    product.featured ? "md:h-80" : ""
                  }`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 right-4 bg-primary text-black font-medium px-3 py-1 rounded-full text-sm">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="px-8" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with
              Solution Epi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="testimonial-card bg-card border rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-primary fill-primary"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-lg mb-8 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
              Visit Our Bakery
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Come experience the aroma of freshly baked bread and pastries at
              our location in Douala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-card border rounded-lg overflow-hidden shadow-lg">
                <div className="h-[400px] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1590237080369-092a9ecf60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Solution Epi location"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      Boulangerie Saker, Deido
                      <br />
                      Douala, Cameroon
                    </p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+237 6XX XXX XXX</p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      contact@solution-epi.com
                    </p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 7AM - 7PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black"
                  asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
