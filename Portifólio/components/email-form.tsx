"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SendHorizonal, LoaderCircle } from "lucide-react";

import { useState } from "react";

// Define the form schema with email validation
const FormSchema = z.object({
  contato: z
    .string()
    .min(5, { message: "Digite um e-mail ou WhatsApp válido." })
    .refine((val) => {
      // Regex para e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regex para telefone/WhatsApp (aceita números, espaços, parênteses, traços, +)
      const phoneRegex = /^[0-9()+\-\s]{10,20}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, { message: "Digite um e-mail ou WhatsApp válido." }),
});

export function EmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contato: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Envia para a API do Telegram
      const res = await fetch("/api/send-telegram-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contato: data.contato }),
      });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Contato enviado com sucesso!",
          description: (
            <>
              <pre className="my-2 w-full rounded-md bg-background p-4">
                <code className="text-neutral-500 dark:text-neutral-300">
                  {data.contato}
                </code>
              </pre>
              <p className="font-semibold text-lg">
                Entrarei em contato em breve.
              </p>
            </>
          ),
        });
        form.reset();
      } else {
        throw new Error("Erro ao enviar contato");
      }
    } catch (error) {
      console.error("Error creating record:", error);
      toast({
        variant: "destructive",
        title: "Falha ao enviar contato.",
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="contato"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormControl className="w-full">
                  <Input
                    className="w-full border-neutral-500 text-base"
                    placeholder="Seu e-mail ou WhatsApp"
                    {...field}
                  />
                </FormControl>
                <div className="absolute -bottom-6 z-[-1]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="flex items-center gap-2 w-fit text-base group/Button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div>Enviando</div>
                <LoaderCircle className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div>Enviar</div>
                <SendHorizonal className="h-5 w-5 md:group-hover/Button:translate-x-[2px] transition-all duration-300" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
