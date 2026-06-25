import { useEffect, useState } from "react";
import {
  Camera,
  Droplets,
  PawPrint,
  ShieldAlert,
  Utensils,
  X,
} from "lucide-react";
import type { FaixaEtaria } from "@/types/animal";
import { useCreateAnimal } from "@/http/animais/useCreateAnimal";
import { Modal } from "@/components/modal";
import { ESPECIES, FAIXAS } from "@/constants/faixaEtaria";
import { formatFaixaEtaria } from "@/utils/utils";

type CreateAnimalModalProps = {
  onClose: () => void;
};

export function CreateAnimalModal({ onClose }: CreateAnimalModalProps) {
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState("");

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("Cachorro");
  const [raca, setRaca] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState<FaixaEtaria>("ADULTO");
  const [alimentacao, setAlimentacao] = useState("");
  const [higiene, setHigiene] = useState("");
  const [primeirosSocorros, setPrimeirosSocorros] = useState("");

  const { mutateAsync: createAnimal, isPending } = useCreateAnimal();

  useEffect(() => {
    return () => {
      if (fotoPreview) {
        URL.revokeObjectURL(fotoPreview);
      }
    };
  }, [fotoPreview]);

  function handleSelectFoto(file?: File) {
    if (!file) {
      setFoto(null);
      setFotoPreview("");
      return;
    }

    if (fotoPreview) {
      URL.revokeObjectURL(fotoPreview);
    }

    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await createAnimal({
      foto,
      nome,
      especie,
      raca: raca || undefined,
      faixaEtaria,
      alimentacao,
      higiene,
      primeirosSocorros,
    });

    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <div className="modal-title">
          <PawPrint size={20} />
          <h2>Cadastrar Animal</h2>
        </div>

        <button className="icon-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="photo-preview">
          {fotoPreview ? (
            <img src={fotoPreview} alt="Preview do animal" />
          ) : (
            <Camera size={28} />
          )}
        </div>

        <label className="field">
          <span>Foto do animal</span>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleSelectFoto(event.target.files?.[0])}
          />
        </label>

        <label className="field">
          <span>Nome *</span>

          <input
            type="text"
            placeholder="Ex: Bolinha"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
            autoFocus
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Espécie *</span>

            <select
              value={especie}
              onChange={(event) => setEspecie(event.target.value)}
            >
              {ESPECIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Raça</span>

            <input
              type="text"
              placeholder="Ex: Golden"
              value={raca}
              onChange={(event) => setRaca(event.target.value)}
            />
          </label>
        </div>

        <div className="field">
          <span>Faixa etária *</span>

          <div className="age-options">
            {FAIXAS.map((faixa) => (
              <button
                type="button"
                key={faixa}
                className={faixaEtaria === faixa ? "selected" : ""}
                onClick={() => setFaixaEtaria(faixa)}
              >
                {formatFaixaEtaria(faixa)}
              </button>
            ))}
          </div>
        </div>

        <div className="care-title">
          Dados de cuidado — {formatFaixaEtaria(faixaEtaria)}
        </div>

        <label className="field">
          <span className="label-with-icon">
            <Utensils size={13} />
            Alimentação *
          </span>

          <textarea
            rows={2}
            placeholder="Descreva a dieta..."
            value={alimentacao}
            onChange={(event) => setAlimentacao(event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span className="label-with-icon">
            <Droplets size={13} />
            Higiene *
          </span>

          <textarea
            rows={2}
            placeholder="Banho, escovação..."
            value={higiene}
            onChange={(event) => setHigiene(event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span className="label-with-icon">
            <ShieldAlert size={13} />
            Primeiros socorros *
          </span>

          <textarea
            rows={2}
            placeholder="Situações de emergência..."
            value={primeirosSocorros}
            onChange={(event) => setPrimeirosSocorros(event.target.value)}
            required
          />
        </label>

        <button
          className="submit-button"
          type="submit"
          disabled={
            isPending ||
            !nome.trim() ||
            !alimentacao.trim() ||
            !higiene.trim() ||
            !primeirosSocorros.trim()
          }
        >
          {isPending ? "Cadastrando..." : "Cadastrar animal"}
        </button>
      </form>
    </Modal>
  );
}
