"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Users,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SVG Animation Component
const WavesSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !svgRef.current) return;

    const waves = svgRef.current.querySelectorAll("path");

    waves.forEach((wave, i) => {
      gsap.to(wave, {
        x: -200, // Make it move left
        repeat: -1, // Infinite repeat
        duration: 8 + i * 2, // Different duration for each wave
        ease: "linear",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden h-40 pointer-events-none">
      <svg
        ref={svgRef}
        className="w-[100%] h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".1"
          fill="#1D3557"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".25"
          fill="#F4A261"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          opacity=".15"
          fill="#E63946"
        />
      </svg>
    </div>
  );
};

// Safety icon SVG component
const SafetyIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4L6 10V22C6 32.4 13.6 42.2 24 44C34.4 42.2 42 32.4 42 22V10L24 4Z"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <motion.path
        d="M16 24L22 30L32 18"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("general");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    const mapElement = mapRef.current;

    // Create a simple animation for map pins
    gsap.fromTo(
      mapElement.querySelectorAll(".map-pin"),
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: mapElement,
          start: "top 80%",
        },
        ease: "back.out(1.7)",
      }
    );

    // Animate FAQ items
    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current.querySelectorAll(".faq-item"),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: t("address.title"),
      value: "Boulangerie Saker, Deido, Douala, Cameroon",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: t("phone.title"),
      value: "+237 6XX XXX XXX",
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: t("email.title"),
      value: "contact@solution-epi.com",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t("hours.title"),
      value: "Monday-Saturday: 7AM-7PM",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Comment choisir les bons EPI pour mon entreprise ?",
      answer:
        "Pour choisir les bons EPI, vous devez d'abord effectuer une évaluation des risques spécifiques à votre environnement de travail. Nos experts peuvent vous aider à identifier les dangers et à sélectionner les équipements adaptés conformes aux normes en vigueur.",
    },
    {
      question: "Proposez-vous des formations pour l'utilisation des EPI ?",
      answer:
        "Oui, nous offrons des formations complètes sur l'utilisation correcte, l'entretien et la maintenance de tous les équipements de protection que nous fournissons. Ces formations peuvent être personnalisées selon les besoins spécifiques de votre entreprise.",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Nos délais de livraison varient généralement entre 3 à 7 jours ouvrables pour les commandes standard. Pour les commandes volumineuses ou personnalisées, le délai peut être plus long. Contactez-nous pour obtenir une estimation précise.",
    },
    {
      question: "Offrez-vous des remises pour les commandes en gros ?",
      answer:
        "Oui, nous proposons des tarifs dégressifs pour les commandes en volume. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.",
    },
    {
      question:
        "Comment puis-je vérifier la conformité de vos produits aux normes ?",
      answer:
        "Tous nos produits sont accompagnés de certificats de conformité aux normes internationales et locales. Nous pouvons vous fournir ces documents sur demande, avant ou après l'achat.",
    },
  ];

  const formSubjects = [
    { value: "general", label: "Demande générale" },
    { value: "quote", label: "Demande de devis" },
    { value: "support", label: "Support technique" },
    { value: "partnership", label: "Partenariat" },
  ];

  return (
    <main className="relative pt-24 pb-20">
      {/* Hero section with background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent h-96 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary-50) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <div className="flex justify-center mb-4">
            <SafetyIcon />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Contact cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 text-center">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-muted-foreground">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          {/* Contact Form - 3 columns */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-card border rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-primary" />
              {t("form.title")}
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="mb-4 text-primary">
                  <CheckCircle2 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {t("form.success.title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("form.success.message")}
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  {t("form.success.button")}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      {t("form.firstName")}
                    </label>
                    <Input
                      id="firstName"
                      placeholder={t("form.firstNamePlaceholder")}
                      {...register("firstName", { required: true })}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm">
                        {t("form.required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      {t("form.lastName")}
                    </label>
                    <Input
                      id="lastName"
                      placeholder={t("form.lastNamePlaceholder")}
                      {...register("lastName", { required: true })}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm">
                        {t("form.required")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("form.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">
                        {errors.email.type === "pattern"
                          ? t("form.invalidEmail")
                          : t("form.required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Téléphone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+237 6XX XXX XXX"
                      {...register("phone")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Entreprise
                  </label>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="company"
                      placeholder="Nom de votre entreprise"
                      {...register("company")}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {formSubjects.map((subject) => (
                      <Button
                        key={subject.value}
                        type="button"
                        variant={
                          selectedSubject === subject.value
                            ? "default"
                            : "outline"
                        }
                        className="text-sm"
                        onClick={() => setSelectedSubject(subject.value)}>
                        {subject.label}
                      </Button>
                    ))}
                    <input
                      type="hidden"
                      {...register("subject")}
                      value={selectedSubject}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("form.message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("form.messagePlaceholder")}
                    rows={5}
                    {...register("message", { required: true })}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm">
                      {t("form.required")}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("form.sending")}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {t("form.submit")}
                    </div>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Map - 2 columns */}
          <div ref={mapRef} className="lg:col-span-2">
            <motion.div
              className="mb-8 rounded-xl overflow-hidden h-[400px] relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.204534680436!2d9.69606535!3d4.0623265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128c8c1af2b9%3A0x65fc9e1e3c3c9b0d!2sDeido%2C%20Douala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"></iframe>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="map-pin bg-primary text-white p-3 rounded-full shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}>
                  <MapPin className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-semibold">Notre équipe</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Notre équipe d'experts en sécurité est disponible pour vous
                conseiller sur les meilleurs équipements adaptés à vos besoins
                spécifiques.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {["JD", "MS", "AL", "PT"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 mr-1 text-primary" />
                  <span>Certifiés ISO 45001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement des réponses aux questions les plus courantes
              concernant nos produits et services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="faq-item border rounded-lg mb-4 px-4">
                  <AccordionTrigger className="text-left font-medium py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Besoin d'une solution personnalisée?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Notre équipe d'experts est prête à élaborer une solution sur mesure
            pour répondre aux besoins spécifiques de votre entreprise.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Demander un rendez-vous
          </Button>
        </motion.div>
      </div>

      {/* Animated wave at the bottom */}
      <WavesSVG />
    </main>
  );
}
