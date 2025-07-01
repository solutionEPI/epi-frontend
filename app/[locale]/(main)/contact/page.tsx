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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

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
    <svg
      ref={svgRef}
      className="absolute bottom-0 left-0 w-[200%] h-40 pointer-events-none overflow-hidden"
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
  );
};

// Wheat icon SVG component
const WheatIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20,8 C20,8 18,15 20,22 C22,29 22,32 20,35"
        stroke="#1D3557"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="12" r="2" fill="#F4A261" />
      <circle cx="20" cy="17" r="2" fill="#F4A261" />
      <circle cx="20" cy="22" r="2" fill="#F4A261" />
      <circle cx="20" cy="27" r="2" fill="#F4A261" />
    </svg>
  );
};

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <main className="relative pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <div className="flex justify-center mb-4">
            <WheatIcon />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">{t("form.title")}</h2>

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

          {/* Map & Contact Info */}
          <div ref={mapRef}>
            {/* Map */}
            <motion.div
              className="mb-8 rounded-xl overflow-hidden h-[300px] relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <Image
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Map of Douala, Cameroon"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                  className="map-pin bg-primary text-white p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}>
                  <MapPin className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  className="map-pin"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Card>
                    <CardContent className="p-4 flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {info.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated wave at the bottom */}
      <WavesSVG />
    </main>
  );
}
