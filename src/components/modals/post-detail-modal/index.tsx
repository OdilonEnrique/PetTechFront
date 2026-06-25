import { useState } from "react";
import {
  Droplets,
  Heart,
  MessageCircle,
  Send,
  ShieldAlert,
  Smile,
  User,
  Utensils,
  X,
} from "lucide-react";
import type { Post } from "@/types/post";
import type { Animal } from "@/types/animal";
import type { Pessoa } from "@/types/pessoa";
import { useListComentariosByPost } from "@/http/comentarios/useListComentarioByPost";
import type { Comentario } from "@/types/comentario";
import { useCreateComentario } from "@/http/comentarios/useCreateComentario";
import { useCurtirPost } from "@/http/posts/useCurtirPost";
import {
  formatFaixaEtaria,
  getAnimalImage,
  getPostImage,
  getTagClass,
} from "@/utils/utils";
import { Modal } from "@/components/modal";

type PostDetailModalProps = {
  post: Post;
  animal?: Animal;
  currentPessoa: Pessoa | null;
  onClose: () => void;
  onNeedRegister: () => void;
};

function getPessoaInitials(nome?: string | null) {
  if (!nome?.trim()) {
    return "?";
  }

  const partes = nome.trim().split(/\s+/);

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function PostDetailModal({
  post,
  animal,
  currentPessoa,
  onClose,
  onNeedRegister,
}: PostDetailModalProps) {
  const [texto, setTexto] = useState("");
  const [showCuidados, setShowCuidados] = useState(false);

  const { data: comentariosData = [] } = useListComentariosByPost({
    postId: post.id,
  } as never);

  const comentarios = comentariosData as Comentario[];

  const { mutateAsync: createComentario, isPending } = useCreateComentario();
  const { mutateAsync: curtirPost } = useCurtirPost();

  async function handleSendComment() {
    if (!texto.trim()) return;

    if (!currentPessoa) {
      onNeedRegister();
      return;
    }

    await createComentario({
      pessoaId: currentPessoa.id,
      postId: post.id,
      texto: texto.trim(),
    } as never);

    setTexto("");
  }

  async function handleLike() {
    await curtirPost({
      id: post.id,
    } as never);
  }

  return (
    <Modal onClose={onClose} size="large">
      <div className="detail-header">
        <div className="detail-pet">
          {animal && <img src={getAnimalImage(animal)} alt={animal.nome} />}

          <div>
            <div className="detail-pet-name">
              <strong>{animal?.nome ?? "Animal"}</strong>

              {animal && (
                <span className={`tag ${getTagClass(animal.faixaEtaria)}`}>
                  {formatFaixaEtaria(animal.faixaEtaria)}
                </span>
              )}
            </div>

            <small>
              {animal?.especie}
              {animal?.raca ? ` · ${animal.raca}` : ""}
            </small>
          </div>
        </div>

        <div className="detail-actions">
          {animal && (
            <button
              type="button"
              className={`care-button ${showCuidados ? "active" : ""}`}
              onClick={() => setShowCuidados((value) => !value)}
            >
              Cuidados
            </button>
          )}

          <button type="button" className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="detail-body">
        {showCuidados && animal && (
          <div className="care-panel">
            <h3>Dados de cuidado — {formatFaixaEtaria(animal.faixaEtaria)}</h3>

            <div className="care-item">
              <Utensils size={15} />

              <div>
                <strong>Alimentação</strong>
                <p>{animal.alimentacao || "Não informado"}</p>
              </div>
            </div>

            <div className="care-item">
              <Droplets size={15} />

              <div>
                <strong>Higiene</strong>
                <p>{animal.higiene || "Não informado"}</p>
              </div>
            </div>

            <div className="care-item">
              <ShieldAlert size={15} />

              <div>
                <strong>Primeiros socorros</strong>
                <p>{animal.primeirosSocorros || "Não informado"}</p>
              </div>
            </div>
          </div>
        )}

        <img
          className="detail-image"
          src={getPostImage(post)}
          alt={post.titulo}
        />

        <div className="detail-content">
          <h2>{post.titulo}</h2>
          <p>{post.conteudo}</p>

          <div className="detail-stats">
            <button type="button" onClick={handleLike}>
              <Heart size={16} />
              {post.likes ?? 0}
            </button>

            <span>
              <MessageCircle size={16} />
              {comentarios.length}
            </span>

            <small>{formatDate(post.createdAt)}</small>
          </div>
        </div>

        <div className="comments-area">
          <h3>
            Comentários {comentarios.length > 0 && `(${comentarios.length})`}
          </h3>

          {comentarios.length === 0 && (
            <p className="empty-comments">Seja o primeiro a comentar.</p>
          )}

          {comentarios.map((comentario) => (
            <div className="comment" key={comentario.id}>
              <div
                className="person-initials-avatar"
                aria-label={comentario.pessoa?.nome ?? "Pessoa"}
                title={comentario.pessoa?.nome ?? "Pessoa"}
              >
                {getPessoaInitials(comentario.pessoa?.nome)}
              </div>

              <div>
                <div className="comment-bubble">
                  <strong>{comentario.pessoa?.nome ?? "Pessoa"}</strong>
                  <p>{comentario.texto}</p>
                </div>

                <small>{formatDate(comentario.createdAt)}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-input-area">
        {currentPessoa ? (
          <div
            className="person-initials-avatar"
            aria-label={currentPessoa.nome}
            title={currentPessoa.nome}
          >
            {getPessoaInitials(currentPessoa.nome)}
          </div>
        ) : (
          <div className="comment-user-placeholder">
            <User size={15} />
          </div>
        )}

        <div className="comment-input">
          <input
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            placeholder={
              currentPessoa
                ? "Escreva um comentário..."
                : "Entre para comentar..."
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendComment();
              }
            }}
          />

          <Smile size={16} />
        </div>

        <button
          type="button"
          className="send-button"
          disabled={!texto.trim() || isPending}
          onClick={handleSendComment}
        >
          <Send size={14} />
        </button>
      </div>
    </Modal>
  );
}
