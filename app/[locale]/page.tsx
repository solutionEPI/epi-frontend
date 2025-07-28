"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
  Award,
  Star,
  Clock,
  Zap,
  Target,
  Eye,
  HardHat,
  Shield,
  Globe,
  PhoneCall,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LatestPosts } from "@/components/latest-posts";
import { BackgroundShapes } from "@/components/ui/background-shapes";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { data: session } = useSession();

  const stats = [
    { number: "1,247+", label: t("stats.clientsProtected"), icon: Users },
    { number: "99.7%", label: t("stats.safetySuccessRate"), icon: ShieldCheck },
    { number: "15,420+", label: t("stats.equipmentDelivered"), icon: Award },
    { number: "15+", label: t("stats.yearsExperience"), icon: Clock },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: t("features.certifiedProtection.title"),
      description: t("features.certifiedProtection.description"),
    },
    {
      icon: Zap,
      title: t("features.fastDelivery.title"),
      description: t("features.fastDelivery.description"),
    },
    {
      icon: Users,
      title: t("features.expertConsultation.title"),
      description: t("features.expertConsultation.description"),
    },
    {
      icon: Award,
      title: t("features.qualityGuarantee.title"),
      description: t("features.qualityGuarantee.description"),
    },
  ];

  const services = [
    {
      title: t("services.equipmentSupply.title"),
      description: t("services.equipmentSupply.description"),
      features: [
        t("services.equipmentSupply.feature1"),
        t("services.equipmentSupply.feature2"),
        t("services.equipmentSupply.feature3"),
      ],
      icon: HardHat,
    },
    {
      title: t("services.training.title"),
      description: t("services.training.description"),
      features: [
        t("services.training.feature1"),
        t("services.training.feature2"),
        t("services.training.feature3"),
      ],
      icon: Users,
    },
    {
      title: t("services.auditing.title"),
      description: t("services.auditing.description"),
      features: [
        t("services.auditing.feature1"),
        t("services.auditing.feature2"),
        t("services.auditing.feature3"),
      ],
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      name: t("testimonials.client1.name"),
      company: t("testimonials.client1.company"),
      role: t("testimonials.client1.role"),
      content: t("testimonials.client1.content"),
      rating: 5,
      avatar: "JPM",
    },
    {
      name: t("testimonials.client2.name"),
      company: t("testimonials.client2.company"),
      role: t("testimonials.client2.role"),
      content: t("testimonials.client2.content"),
      rating: 5,
      avatar: "MN",
    },
    {
      name: t("testimonials.client3.name"),
      company: t("testimonials.client3.company"),
      role: t("testimonials.client3.role"),
      content: t("testimonials.client3.content"),
      rating: 5,
      avatar: "AF",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 my-16">
              <Badge variant="secondary" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                {t("hero.badgeText")}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="gradient-text">{t("hero.title")}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/products">
                  {t("hero.viewProductsButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
                asChild>
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-5 w-5" />
                  {t("hero.getQuoteButton")}
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card text-card-foreground border border-border/50 rounded-lg shadow-sm p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("features.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card text-card-foreground border border-border/50 rounded-lg shadow-sm p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("services.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("services.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}>
                <Card className="h-full">
                  <CardHeader>
                    <service.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full mt-6">
                      {t("services.learnMoreButton")}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <BackgroundShapes />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t("cta.title")}</h2>
            <p className="text-xl opacity-90">{t("cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg"
                asChild>
                <Link href="/contact">
                  <Target className="mr-2 h-5 w-5" />
                  {t("cta.consultationButton")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild>
                <Link href="/products">
                  <Eye className="mr-2 h-5 w-5" />
                  {t("cta.catalogButton")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("testimonials.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-primary fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("blog.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("blog.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("blog.subtitle")}
            </p>
          </div>

          <LatestPosts />

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                {t("blog.viewAllButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {t("finalCta.title")}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    {t("finalCta.description")}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{t("finalCta.phone")}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{t("finalCta.email")}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{t("finalCta.location")}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="px-8 py-6 text-lg" asChild>
                      <Link href="/contact">
                        <PhoneCall className="mr-2 h-5 w-5" />
                        {t("finalCta.contactSalesButton")}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 text-lg"
                      asChild>
                      <Link href={session ? "/dashboard" : "/login"}>
                        <Globe className="mr-2 h-5 w-5" />
                        {session
                          ? t("finalCta.viewDashboardButton")
                          : t("finalCta.getStartedButton")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
