"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-5"
      >
        <div className="absolute -inset-1 rounded-full bg-white/10 blur-xl opacity-60" />
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/5 ring-1 ring-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.10)]">
          <Image
            src="/avatar.png"
            alt="Gabriel Madureira"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#C5FF4A] border-2 border-[#08080a] shadow-[0_0_12px_rgba(197,255,74,0.5)]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold tracking-tight text-white"
      >
        Gabriel Madureira
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-1.5 text-[12.5px] font-mono text-white/45 tracking-wide"
      >
        @ogmadureira
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-[14px] text-white/65 max-w-xs leading-relaxed font-light"
      >
        construo IA dentro de operação de marketing.
        <br />
        dezenas de clientes, 4 produtos. cripto, web3, fintech.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.div>
  );
}
