import type { Animal } from "@/types/animal";
import type { Post } from "@/types/post";
import {
  formatFaixaEtaria,
  getAnimalImage,
  getPostImage,
  getTagClass,
} from "@/utils/utils";
import { ChevronRight, Heart, MessageCircle } from "lucide-react";

type PostCardProps = {
  post: Post;
  animal?: Animal;
  isLiked?: boolean;
  onOpen: () => void;
};

export function PostCard({
  post,
  animal,
  isLiked = false,
  onOpen,
}: PostCardProps) {
  return (
    <button className="post-card" onClick={onOpen}>
      <div className="post-image-area">
        <img src={getPostImage(post)} alt={post.titulo} />

        {animal && (
          <div className="pet-badge">
            <img src={getAnimalImage(animal)} alt={animal.nome} />

            <strong>{animal.nome}</strong>

            <span className={`tag ${getTagClass(animal.faixaEtaria)}`}>
              {formatFaixaEtaria(animal.faixaEtaria)}
            </span>
          </div>
        )}
      </div>

      <div className="post-content">
        <h3>{post.titulo}</h3>
        <p>{post.conteudo}</p>

        <footer>
          <span className={`post-like-info ${isLiked ? "liked" : ""}`}>
            <Heart size={13} fill={isLiked ? "currentColor" : "none"} />
            {post.likes ?? 0}
          </span>

          <span>
            <MessageCircle size={13} />
            {post.comentarios?.length ?? 0}
          </span>

          <strong>
            Ver post <ChevronRight size={12} />
          </strong>
        </footer>
      </div>
    </button>
  );
}
