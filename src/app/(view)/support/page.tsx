"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Clock } from "lucide-react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:ktpatrick1@gmail.com?subject=${encodeURIComponent(
      `Dream Compass Support: ${formData.subject}`,
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`;

    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-xl font-semibold text-foreground">
            Sweet Treats
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Page Title */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold text-balance md:text-6xl tracking-tight">
              We're here to help
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Have a question or need assistance? Send us a message and we'll
              get back to you as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-border/50 hover:border-border transition-colors hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                  <CardDescription className="text-sm">
                    We typically respond within 24 hours
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50 hover:border-border transition-colors hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <Clock className="h-7 w-7 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Support Hours</CardTitle>
                  <CardDescription className="text-sm">
                    Available 24/7 to assist you
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-border/50 md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond to your inquiry
                  shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-10 border-border/50 transition-colors focus-visible:border-primary/60"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-10 border-border/50 transition-colors focus-visible:border-primary/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-10 border-border/50 transition-colors focus-visible:border-primary/60"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your question or issue..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none border-border/50 transition-colors focus-visible:border-primary/60"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-11 gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Sweet treats. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
