import { LS_USER_KEY } from "@/constants/faixaEtaria";
import type { Pessoa } from "@/types/pessoa";
import { useState } from "react";

export function useCurrentPessoa() {
  const [pessoa, setPessoa] = useState<Pessoa | null>(() => {
    try {
      const raw = localStorage.getItem(LS_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  function savePessoa(pessoaData: Pessoa) {
    localStorage.setItem(LS_USER_KEY, JSON.stringify(pessoaData));
    setPessoa(pessoaData);
  }

  return { pessoa, savePessoa };
}
