import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Users, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSchedule, getScheduleByDay, DAYS, ClassSession } from "@/lib/classSchedule";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const ScheduleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<ClassSession['day']>('Lundi');
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [dayIndex, setDayIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Get current day
    const today = new Date().getDay();
    const dayMap: Record<number, number> = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    const currentDayIndex = dayMap[today];
    setDayIndex(currentDayIndex);
    setSelectedDay(DAYS[currentDayIndex]);
  }, []);

  useEffect(() => {
    setClasses(getScheduleByDay(selectedDay));
  }, [selectedDay]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrevDay = () => {
    const newIndex = dayIndex === 0 ? DAYS.length - 1 : dayIndex - 1;
    setDayIndex(newIndex);
    setSelectedDay(DAYS[newIndex]);
  };

  const handleNextDay = () => {
    const newIndex = dayIndex === DAYS.length - 1 ? 0 : dayIndex + 1;
    setDayIndex(newIndex);
    setSelectedDay(DAYS[newIndex]);
  };

  const handleBookClass = (classSession: ClassSession) => {
    const message = `Bonjour, je souhaite m'inscrire au cours "${classSession.name}" du ${selectedDay} à ${classSession.startTime} avec ${classSession.instructor}.`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section
      id="planning"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden bg-card/30"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_85%_50%_/_0.05)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
              {t("schedule.label")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6">
              {t("schedule.title1")} <span className="text-gradient">{t("schedule.title2")}</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
              {t("schedule.desc")}
            </p>
          </div>

          {/* Day Selector - Mobile */}
          <div className="flex md:hidden items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevDay}
              className="border border-border"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="font-display text-2xl text-primary min-w-[120px] text-center">
              {selectedDay.toUpperCase()}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextDay}
              className="border border-border"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day Selector - Desktop */}
          <div className="hidden md:flex justify-center gap-2 mb-12">
            {DAYS.map((day, index) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setDayIndex(index);
                }}
                className={`px-4 lg:px-6 py-3 font-body text-xs lg:text-sm tracking-widest transition-all duration-300 border ${
                  selectedDay === day
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {day.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {classes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="font-body text-muted-foreground">
                  {t("schedule.noclass")}
                </p>
              </div>
            ) : (
              classes.map((classSession) => {
                const isFull = classSession.currentEnrollment >= classSession.maxCapacity;
                const fillPercentage = (classSession.currentEnrollment / classSession.maxCapacity) * 100;

                return (
                  <div
                    key={classSession.id}
                    className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top accent bar */}
                    <div className={`h-1 ${classSession.color}`} />

                    <div className="p-4 md:p-6">
                      {/* Time & Capacity */}
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="font-display text-lg md:text-xl">
                            {classSession.startTime} - {classSession.endTime}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-body ${isFull ? 'text-destructive' : 'text-muted-foreground'}`}>
                          <Users className="w-3 h-3" />
                          {classSession.currentEnrollment}/{classSession.maxCapacity}
                        </div>
                      </div>

                      {/* Class Name */}
                      <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                        {classSession.name}
                      </h3>

                      {/* Instructor */}
                      <p className="font-body text-sm text-muted-foreground mb-2">
                        {t("schedule.with")} {classSession.instructor}
                      </p>

                      {/* Description */}
                      <p className="font-body text-xs text-muted-foreground mb-4">
                        {classSession.description}
                      </p>

                      {/* Capacity Bar */}
                      <div className="mb-4">
                        <div className="h-1 bg-border overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${isFull ? 'bg-destructive' : 'bg-primary'}`}
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Book Button */}
                      <Button
                        className={`w-full gap-2 text-xs ${isFull ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary hover:bg-accent'}`}
                        onClick={() => !isFull && handleBookClass(classSession)}
                        disabled={isFull}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {isFull ? t("schedule.full") : t("schedule.book")}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
