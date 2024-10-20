import React from "react";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Cpu,
  Database,
  Gamepad2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#19191D] text-[#EDEDF0]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#19191D]/70 border-b border-[#ccccce]/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FD366E]">BaaS Games</h1>
          <div className="space-x-4">
            <Button
              variant="ghost"
              className="text-[#EDEDF0] hover:text-[#FD366E]"
            >
              Login
            </Button>
            <Button className="bg-[#FD366E] text-[#19191D] hover:bg-[#FD366E]/80">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Play Games in the Cloud
            </h2>
            <p className="text-xl mb-8">
              Experience seamless multiplayer gaming with our
              Backend-as-a-Service platform.
            </p>
            <Button className="bg-[#FD366E] text-[#19191D] hover:bg-[#FD366E]/80 text-lg px-8 py-3">
              Start Gaming
            </Button>
          </div>
          <div className="lg:w-1/2">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Technical Structure Section */}
      <section className="py-20 bg-[#19191D]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon={<Cloud className="w-12 h-12 text-[#FD366E]" />}
              title="Cloud-Based"
            >
              Games run on our powerful cloud infrastructure, ensuring smooth
              performance across devices.
            </TechCard>
            <TechCard
              icon={<Database className="w-12 h-12 text-[#FD366E]" />}
              title="Scalable Backend"
            >
              Our BaaS platform automatically scales to handle any number of
              concurrent players.
            </TechCard>
            <TechCard
              icon={<Cpu className="w-12 h-12 text-[#FD366E]" />}
              title="Low Latency"
            >
              Advanced networking ensures minimal lag for a responsive gaming
              experience.
            </TechCard>
          </div>
        </div>
      </section>

      {/* Game Demo Sections */}
      <GameDemoSection
        title="CloudSweeper"
        description="Clear the clouds and reveal the sky in this addictive puzzle game."
        videoSrc="/CloudSweeper.png?height=572&width=272"
      />

      <GameDemoSection
        title="Connect4"
        description="Challenge your friends to a classic game of strategy and skill."
        videoSrc="/connect4.png?height=572&width=272"
        reverse
      />

      {/* Footer */}
      <footer className="py-10 border-t border-[#ccccce]/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; 2024 CloudGames. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#EDEDF0] hover:text-[#FD366E]">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#EDEDF0] hover:text-[#FD366E]">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#EDEDF0] hover:text-[#FD366E]">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto border-[#ccccce] dark:border-[#ccccce] bg-[#EDEDF0] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-[#ccccce] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-[#EDEDF0] absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-[#EDEDF0] absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-[#EDEDF0] absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
        <img
          src="/BaaS.png?height=572&width=272"
          alt="App Screenshot"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function TechCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#EDEDF0]/10 p-6 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function GameDemoSection({
  title,
  description,
  videoSrc,
  reverse = false,
}: {
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
}) {
  return (
    <section className={`py-20 ${reverse ? "bg-[#19191D]" : ""}`}>
      <div
        className={`container mx-auto px-4 flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center justify-between`}
      >
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8">{description}</p>
          <Button className="bg-[#FD366E] text-[#19191D] hover:bg-[#FD366E]/80">
            Play Now
          </Button>
        </div>
        <div className="lg:w-1/2">
          <div className="relative mx-auto border-[#ccccce] dark:border-[#ccccce] bg-[#EDEDF0] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-[#ccccce] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-[#EDEDF0] absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-[#EDEDF0] absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-[#EDEDF0] absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
              <img
                src={videoSrc}
                alt="App Screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
