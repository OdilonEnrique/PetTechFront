import { useState } from "react";
import { User, X } from "lucide-react";

import { useCreatePessoa } from "../../../http/pessoa/useCreatePessoa";
import type { Pessoa } from "@/types/pessoa";
import { Modal } from "../../modal";

type RegisterPessoaModalProps = {
  onClose: () => void;
  onSave: (pessoa: Pessoa) => void;
};

export function RegisterPessoaModal({
  onClose,
  onSave,
}: RegisterPessoaModalProps) {
  const [nome, setNome] = useState("");

  const { mutateAsync: createPessoa, isPending } = useCreatePessoa();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await createPessoa({
      nome,
    } as never);

    const pessoaCriada: Pessoa = {
      id: response?.id,
      nome: response?.nome ?? nome,
    };

    onSave(pessoaCriada);
    onClose();
  }

  return (
    <Modal zIndex={9999} onClose={onClose} size="small">
      <div className="modal-header">
        <div className="modal-title">
          <User size={18} />
          <h2>Cadastro de Pessoa</h2>
        </div>

        <button className="icon-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <form className="modal-form" onSubmit={handleSubmit}>
        <p className="muted-text">
          Cadastre-se como <strong>Pessoa</strong> para poder comentar nos
          posts.
        </p>

        <div className="avatar-preview">
          <User size={34} />
        </div>

        <label className="field">
          <span>Nome *</span>

          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
            autoFocus
          />
        </label>

        <button
          className="submit-button"
          type="submit"
          disabled={isPending || !nome.trim()}
        >
          {isPending ? "Cadastrando..." : "Cadastrar e comentar"}
        </button>
      </form>
    </Modal>
  );
}
