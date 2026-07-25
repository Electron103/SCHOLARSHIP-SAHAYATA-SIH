import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageCode } from "../types";
// @ts-ignore
import styles from "./Slider.module.css";

interface Slide {
  id: number;
  url: string;
  alt: string;
  titleEn: string;
  subtitleEn: string;
  titleHi: string;
  subtitleHi: string;
}

interface SliderProps {
  currentLang?: LanguageCode; // optional, defaults to English
}

const SLIDES: Slide[] = [
  {
    id: 1,
    url: "/slider/slide1.png",
    alt: "Scholarship Sahayata DBT awareness banner",
    titleEn: "Empowering Students Through Transparent Digital Scholarships",
    subtitleEn:
      "Scholarship Sahayata helps students access DBT-enabled benefits — Safe, Direct, and Hassle-Free.",
    titleHi: "छात्रों के लिए पारदर्शी डिजिटल छात्रवृत्ति का सशक्तिकरण",
    subtitleHi:
      "स्कॉलरशिप सहायता छात्रों को DBT आधारित लाभ सुरक्षित, सीधे और बिना परेशानी पहुँचाने में मदद करती है।",
  },
  {
    id: 2,
    url: "/slider/slide2.png",
    alt: "Journey of a scholarship from government to student through DBT",
    titleEn: "From Government to Your Bank — The DBT Scholarship Journey",
    subtitleEn:
      "No middleman, no delay — just secure, transparent scholarship transfer.",
    titleHi: "सरकार से आपके बैंक तक – DBT छात्रवृत्ति की यात्रा",
    subtitleHi:
      "न कोई बिचौलिया, न देरी – सिर्फ सुरक्षित और पारदर्शी छात्रवृत्ति ट्रांसफर।",
  },
  {
    id: 3,
    url: "/slider/slide3.png",
    alt: "Teacher explaining DBT readiness to students and parents",
    titleEn: "Let’s Make Every Student DBT Ready!",
    subtitleEn:
      "Awareness starts at schools, homes, and CSC centres — Learn, Verify, and Enable DBT.",
    titleHi: "आइए हर छात्र को DBT सक्षम बनाएं!",
    subtitleHi:
      "जागरूकता की शुरुआत स्कूल, घर और CSC केंद्रों से होती है — सीखें, जाँचें और DBT सक्रिय करें।",
  },
  {
    id: 4,
    url: "/slider/slide4.png",
    alt: "Comparison between Aadhaar linked and DBT enabled accounts for scholarship",
    titleEn: "Aadhaar Linked is NOT Enough — Your Account Must Be DBT Enabled",
    subtitleEn:
      "Only DBT-enabled bank accounts receive scholarships — Check your status today.",
    titleHi: "सिर्फ आधार लिंक होना काफी नहीं — खाता DBT सक्षम होना ज़रूरी है",
    subtitleHi:
      "केवल DBT सक्षम बैंक खाते में ही छात्रवृत्ति आती है — आज ही अपनी स्थिति जाँचे।",
  },
  {
    id: 5,
    url: "/slider/slide5.png",
    alt: "Teacher explaining Scholarship Sahayata benefits on a blackboard",
    titleEn: "Scholarship Sahayata — Your Trusted DBT Support Platform",
    subtitleEn:
      "Guiding every student safely from application to scholarship credit.",
    titleHi: "स्कॉलरशिप सहायता — आपका विश्वसनीय DBT सहायता मंच",
    subtitleHi:
      "आवेदन से लेकर छात्रवृत्ति आपके खाते में जमा होने तक, हर कदम पर मार्गदर्शन।",
  },
  {
    id: 6,
    url: "/slider/slide6.png", // put your fraud-awareness image here
    alt: "Stay safe from scholarship and DBT frauds awareness graphic",
    titleEn: "Stay Safe from Scholarship & DBT Frauds",
    subtitleEn:
      "Use only official government portals and verified CSC centres — scholarships are free, no OTP or extra fee needed.",
    titleHi: "छात्रवृत्ति और DBT धोखाधड़ी से सावधान रहें",
    subtitleHi:
      "केवल सरकारी पोर्टल और प्रमाणित CSC केंद्रों का उपयोग करें — छात्रवृत्ति निशुल्क है, किसी OTP या अतिरिक्त शुल्क की आवश्यकता नहीं।",
  },
];

const Slider: React.FC<SliderProps> = ({ currentLang = "en" }) => {
  const [current, setCurrent] = useState(0);
  const isHindi = currentLang === "hi";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () =>
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prev = () =>
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-[350px] md:h-[550px] lg:h-[650px] bg-white overflow-hidden group border-b-4 border-white">
      {/* Slides Container */}
      <div
        className={`${styles.slidesContainer}`}
        data-offset={current}
      >
        {SLIDES.map((slide) => {
          const title = isHindi ? slide.titleHi : slide.titleEn;
          const subtitle = isHindi ? slide.subtitleHi : slide.subtitleEn;

          return (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative flex items-center justify-center bg-white"
            >
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-contain"
              />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-tiranga-blue/95 via-tiranga-blue/60 to-transparent p-6 md:p-10 text-white">
                <div className="container mx-auto">
                  <div className="border-l-4 border-tiranga-saffron pl-5">
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold drop-shadow-md mb-2">
                      {title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-200 opacity-95">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-tiranga-blue/50 hover:bg-tiranga-saffron text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-tiranga-blue/50 hover:bg-tiranga-saffron text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full transition-colors shadow-sm border border-white/30 ${
              current === idx
                ? "bg-tiranga-saffron scale-110"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
