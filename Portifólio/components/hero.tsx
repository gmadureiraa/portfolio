"use client";

import MeteorShower from "@/components/magicui/meteors";
import WordPullUp from "@/components/magicui/word-pull-up";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/magicui/fade-in";
import { Mail, Github } from "lucide-react";
import BlurIn from "@/components/magicui/blur-in";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex h-full w-full mx-auto items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="flex flex-col items-start justify-center h-full overflow-hidden p-6 z-50">
        <WordPullUp
          words="Do código ao conteúdo."
          className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl !leading-[1.1] !text-left w-full break-words"
        />

        <div className="text-lg text-neutral-500 dark:text-neutral-400 lg:px-1 w-full ">
          <BlurIn className="w-3/4 sm:w-2/3">
            Fundador da Kaleidos. 15+ produtos digitais construídos para o mercado cripto — de dashboards DeFi a gateways de pagamento. Marketing, desenvolvimento e estratégia em um só lugar.
          </BlurIn>

          <FadeIn direction="down" className="my-class">
            <div className="flex items-center gap-2 w-full lg:w-2/3 mt-4">
              <div className="flex items-center gap-4 text-sm text-neutral-400 dark:text-neutral-500">
                <span className="font-semibold text-neutral-200">15+ produtos</span>
                <span className="text-neutral-600">|</span>
                <span className="font-semibold text-neutral-200">Cripto, IA & Marketing</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-2/3 mt-4">
              <a
                href="https://wa.me/5512997796835?text=Ol%C3%A1%20Gabriel,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre..."
                target="_blank"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 w-full group/Mail"
                >
                  <div>Falar sobre seu projeto</div>
                  <Mail className="h-5 w-5 lg:group-hover/Mail:translate-x-1 transition-all duration-300" />
                </Button>
              </a>

              <a
                href="/projects"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 w-full group/Github"
                >
                  <div>Ver projetos</div>
                  <Image src="/Logos-10.svg" alt="Kaleidos logo" width={24} height={24} className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
      <MeteorShower />
    </div>
  );
}
