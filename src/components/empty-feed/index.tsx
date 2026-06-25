import { PawPrint } from "lucide-react";

type EmptyFeedProps = {
  onCreatePost: () => void;
};

export function EmptyFeed({ onCreatePost }: EmptyFeedProps) {
  return (
    <div className="empty-feed">
      <div>
        <PawPrint size={36} />
      </div>

      <h2>Nenhum post ainda</h2>

      <p>Cadastre seu pet e compartilhe o primeiro momento especial.</p>

      <button className="btn btn-primary" onClick={onCreatePost}>
        Criar primeiro post
      </button>
    </div>
  );
}
