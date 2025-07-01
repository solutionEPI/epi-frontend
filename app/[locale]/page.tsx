"use client";

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
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { data: session } = useSession();
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Animate section titles
    const sections = [
      heroRef,
      aboutRef,
      productsRef,
      servicesRef,
      standardsRef,
      industriesRef,
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

    // Industry card animations
    const industryCards =
      industriesRef.current?.querySelectorAll(".industry-card");
    if (industryCards) {
      ScrollTrigger.create({
        trigger: industriesRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            industryCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.7,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });
    }
  }, []);

  // EPI Categories
  const epiCategories = [
    {
      name: "Protection de la tête",
      icon: <HardHat className="w-12 h-12 text-primary" />,
      products: [
        "Casques de sécurité",
        "Casques anti-bruit",
        "Casques de chantier",
      ],
      image:
        "https://images.pexels.com/photos/209265/pexels-photo-209265.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Protection auditive",
      icon: <Headphones className="w-12 h-12 text-primary" />,
      products: [
        "Bouchons d'oreilles",
        "Casques anti-bruit",
        "Protection auditive électronique",
      ],
      image:
        "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Protection oculaire",
      icon: <Glasses className="w-12 h-12 text-primary" />,
      products: [
        "Lunettes de sécurité",
        "Visières de protection",
        "Lunettes contre produits chimiques",
      ],
      image:
        "https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Vêtements de protection",
      icon: <Shirt className="w-12 h-12 text-primary" />,
      products: [
        "Combinaisons",
        "Vêtements haute-visibilité",
        "Vêtements résistants au feu",
      ],
      image:
        "https://images.pexels.com/photos/122477/pexels-photo-122477.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Protection des pieds",
      icon: <Footprints className="w-12 h-12 text-primary" />,
      products: [
        "Chaussures de sécurité",
        "Bottes",
        "Protection métatarsienne",
      ],
      image:
        "https://images.pexels.com/photos/66134/boots-shoes-couple-jump-66134.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Protection des mains",
      icon: <HandMetal className="w-12 h-12 text-primary" />,
      products: [
        "Gants anti-coupure",
        "Gants résistants aux produits chimiques",
        "Gants isolants",
      ],
      image:
        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
  ];

  // Services
  const services = [
    {
      title: "Conseil en sécurité",
      description:
        "Évaluation des risques et recommandations d'équipements adaptés à votre environnement de travail spécifique.",
      icon: <AlertTriangle className="w-12 h-12 text-primary" />,
    },
    {
      title: "Formation sur les EPI",
      description:
        "Sessions de formation sur l'utilisation correcte des équipements de protection individuelle pour vos employés.",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    {
      title: "Audit de conformité",
      description:
        "Vérification de la conformité de vos équipements aux normes et réglementations en vigueur.",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    {
      title: "Maintenance préventive",
      description:
        "Services d'entretien régulier et vérification de l'état de vos équipements de protection.",
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    },
  ];

  // Industries
  const industries = [
    {
      name: "Construction",
      image:
        "https://images.pexels.com/photos/5449713/pexels-photo-5449713.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Industrie pétrolière",
      image:
        "https://images.pexels.com/photos/256296/pexels-photo-256296.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Secteur médical",
      image:
        "https://images.pexels.com/photos/4483535/pexels-photo-4483535.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
    {
      name: "Industrie manufacturière",
      image:
        "https://images.pexels.com/photos/3739201/pexels-photo-3739201.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    },
  ];

  // Safety standards
  const safetyStandards = [
    "ISO 45001 - Systèmes de management de la santé et de la sécurité au travail",
    "EN 166 - Protection individuelle de l'œil",
    "EN 397 - Casques de protection pour l'industrie",
    "EN 388 - Gants de protection contre les risques mécaniques",
    "EN 352 - Protecteurs individuels contre le bruit",
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
              src="https://images.pexels.com/photos/5854192/pexels-photo-5854192.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
              alt="Équipement de protection individuelle"
              fill
              priority
              className="object-cover object-center brightness-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
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
              Solution EPI
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Votre partenaire pour la sécurité au travail. Des équipements de
              protection individuelle conformes aux normes les plus strictes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-lg"
                asChild>
                <Link href="#products">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:text-white hover:bg-white/20 px-8 py-6 text-lg font-bold"
                asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 text-foreground">
                À propos de Solution EPI
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>

              <p className="text-lg text-foreground mb-6">
                Depuis plus de 15 ans, Solution EPI est le leader dans la
                fourniture d'équipements de protection individuelle au Cameroun.
                Notre mission est de garantir la sécurité des travailleurs dans
                tous les secteurs d'activité.
              </p>

              <p className="text-lg text-foreground mb-8">
                Nous proposons une gamme complète d'équipements certifiés
                conformes aux normes internationales, adaptés aux besoins
                spécifiques de chaque industrie et environnement de travail.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      Qualité certifiée
                    </h3>
                    <p className="text-muted-foreground">
                      Produits conformes aux normes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      Expertise
                    </h3>
                    <p className="text-muted-foreground">
                      Conseil personnalisé
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
                  En savoir plus
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
                  src="https://images.pexels.com/photos/130472/pexels-photo-130472.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                  alt="Équipe Solution EPI"
                  fill
                  className="object-cover"
                />
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
              Nos catégories d'EPI
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Des équipements de protection individuelle adaptés à tous les
              types de risques professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {epiCategories.map((category, i) => (
              <div
                key={i}
                className="product-category bg-card rounded-lg overflow-hidden border shadow-md transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="text-xl font-bold ml-3 text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {category.products.map((product, j) => (
                      <li key={j} className="flex items-center text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        <span>{product}</span>
                      </li>
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
                      Voir les produits
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black px-8"
              asChild>
              <Link href="/products">
                Voir tous les produits
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
              Nos services
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Au-delà de la fourniture d'équipements, nous offrons une gamme
              complète de services pour garantir la sécurité de vos
              collaborateurs.
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
                  <Link href="/services">En savoir plus</Link>
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
                Normes et réglementations
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>

              <p className="text-lg text-foreground mb-6">
                La sécurité au travail est encadrée par des normes strictes.
                Chez Solution EPI, tous nos produits sont conformes aux normes
                internationales et locales en vigueur.
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
                      Obligation légale:
                    </strong>{" "}
                    L'employeur doit fournir gratuitement les EPI adaptés aux
                    risques.
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
                  src="https://images.pexels.com/photos/3825583/pexels-photo-3825583.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                  alt="Certifications de sécurité"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        id="industries"
        ref={industriesRef}
        className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 text-foreground">
              Secteurs d'activité
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Nos solutions de sécurité sont adaptées à tous les secteurs
              industriels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="industry-card relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">
                      {industry.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild>
              <Link href="/industries">
                Voir tous les secteurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 text-foreground">
              Contactez-nous
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Besoin d'équipements de protection ou de conseils ? Notre équipe
              d'experts est à votre disposition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-card border rounded-lg overflow-hidden shadow-lg">
                <div className="h-[400px] relative">
                  <Image
                    src="https://images.pexels.com/photos/886743/pexels-photo-886743.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                    alt="Bureau de Solution EPI"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Coordonnées</h3>

              <div className="space-y-6">
                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">
                      Adresse
                    </h4>
                    <p className="text-muted-foreground">
                      Boulangerie Saker, Deido
                      <br />
                      Douala, Cameroun
                    </p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">
                      Téléphone
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
                      Email
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
                  <Link href="/contact">Demander un devis</Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white flex-1"
                  asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
