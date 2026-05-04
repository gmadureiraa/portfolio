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
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#EC6000]/40 to-[#EC6000]/10 blur-md opacity-60" />
        <div className="relative w-24 h-24 rounded-full border border-[#EC6000]/30 overflow-hidden bg-[#141414]">
          <Image
            src="/avatar.png"
            alt="Gabriel Madureira"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0a0a]" />
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
        className="mt-1 text-[13px] font-mono text-[#EC6000]/80"
      >
        @ogmadureira
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-[14px] text-[#888] max-w-xs leading-relaxed"
      >
        construo IA dentro de operação de marketing.
        <br />
        dezenas de clientes, 4 produtos. cripto, web3, fintech.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 w-12 h-px bg-gradient-to-r from-transparent via-[#EC6000]/40 to-transparent"
      />
    </motion.div>
  );
}
