import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getApprovedTestimonials, addTestimonial, Testimonial } from "@/lib/testimonials";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: "",
  });

  useEffect(() => {
    setTestimonials(getApprovedTestimonials());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      addTestimonial({
        name: formData.name.toUpperCase(),
        role: formData.role || "Nouveau membre",
        content: formData.content,
        rating: formData.rating,
        image: formData.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      });

      setFormData({ name: "", role: "", content: "", rating: 5, image: "" });
      setDialogOpen(false);
      setSubmitting(false);
      toast.success(t("testimonials.form.success"));
    }, 1000);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-20">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            {t("testimonials.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-6">
            {t("testimonials.title1")} <span className="text-gradient">{t("testimonials.title2")}</span>
          </h2>
          
          {/* Add Review Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 gap-2">
                <Send className="w-4 h-4" />
                {t("testimonials.add")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{t("testimonials.dialog.title")}</DialogTitle>
                <DialogDescription>
                  {t("testimonials.dialog.desc")}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("testimonials.form.name")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("testimonials.form.name.placeholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t("testimonials.form.role")}</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={t("testimonials.form.role.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("testimonials.form.rating")}</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: n })}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${n <= formData.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">{t("testimonials.form.content")}</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder={t("testimonials.form.content.placeholder")}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">{t("testimonials.form.image")}</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("testimonials.form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t("testimonials.form.submit")}
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative p-6 md:p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/20 mb-4 md:mb-6" />

              {/* Content */}
              <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed mb-6 md:mb-8">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4 md:mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden border-2 border-primary">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display text-base md:text-lg">{testimonial.name}</h4>
                  <p className="font-body text-xs text-muted-foreground tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-primary/10 transform rotate-45 translate-x-6 -translate-y-6 md:translate-x-8 md:-translate-y-8 group-hover:bg-primary/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
