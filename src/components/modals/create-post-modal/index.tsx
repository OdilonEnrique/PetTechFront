import { useEffect, useState } from "react";
import { Camera, PawPrint, X } from "lucide-react";
import { useCreatePost } from "@/http/posts/useCreatePost";
import type { Animal } from "@/types/animal";
import { Modal } from "@/components/modal";
import { formatFaixaEtaria, getAnimalImage, getTagClass } from "@/utils/utils";

type CreatePostModalProps = {
  animais: Animal[];
  onClose: () => void;
};

export function CreatePostModal({ animais, onClose }: CreatePostModalProps) {
  const [animalId, setAnimalId] = useState<number | "">(animais[0]?.id ?? "");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState("");

  const { mutateAsync: createPost, isPending } = useCreatePost();

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

    if (!animalId) return;

    await createPost({
      titulo,
      conteudo,
      animalId,
      foto: foto || undefined,
    });

    onClose();
  }

  if (animais.length === 0) {
    return (
      <Modal onClose={onClose}>
        <div className="modal-header">
          <h2>Criar post</h2>

          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="empty-modal">
          <PawPrint size={48} />
          <p>Cadastre um animal antes de criar um post.</p>

          <button className="submit-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Criar post</h2>

        <button className="icon-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="field">
          <span>Animal</span>

          <div className="animal-options">
            {animais.map((animal) => (
              <button
                type="button"
                key={animal.id}
                className={animalId === animal.id ? "selected" : ""}
                onClick={() => setAnimalId(animal.id)}
              >
                <img src={getAnimalImage(animal)} alt={animal.nome} />
                <span>{animal.nome}</span>

                <small className={`tag ${getTagClass(animal.faixaEtaria)}`}>
                  {formatFaixaEtaria(animal.faixaEtaria)}
                </small>
              </button>
            ))}
          </div>
        </div>

        <label className="field">
          <span>Título *</span>

          <input
            type="text"
            placeholder="O que aconteceu de especial?"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            required
            autoFocus
          />
        </label>

        <label className="field">
          <span>Conteúdo *</span>

          <textarea
            rows={4}
            placeholder="Conte a história..."
            value={conteudo}
            onChange={(event) => setConteudo(event.target.value)}
            required
          />
        </label>

        <div className="photo-preview">
          {fotoPreview ? (
            <img src={fotoPreview} alt="Preview do post" />
          ) : (
            <Camera size={28} />
          )}
        </div>

        <label className="field">
          <span>Imagem do post</span>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleSelectFoto(event.target.files?.[0])}
          />
        </label>

        <button
          className="submit-button"
          type="submit"
          disabled={isPending || !titulo.trim() || !conteudo.trim()}
        >
          {isPending ? "Publicando..." : "Publicar post"}
        </button>
      </form>
    </Modal>
  );
}
