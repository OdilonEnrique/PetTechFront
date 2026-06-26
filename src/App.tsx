import { useMemo, useState } from "react";

import { useListAnimais } from "./http/animais/useListAnimais";
import { useListPosts } from "./http/posts/useListPosts";
import type { Post } from "./types/post";
import type { Animal } from "./types/animal";
import { useCurrentPessoa } from "./hooks/useCurrentPessoa";
import { Header } from "./components/header";
import { EmptyFeed } from "./components/empty-feed";
import { PostCard } from "./components/post-card";
import { RegisterPessoaModal } from "./components/modals/modals-register-pessoa";
import { CreateAnimalModal } from "./components/modals/create-animal-modal.tsx";
import { CreatePostModal } from "./components/modals/create-post-modal/index.tsx";
import { PostDetailModal } from "./components/modals/post-detail-modal/index.tsx";

type ModalType = "none" | "pessoa" | "animal" | "post";

export default function App() {
  const [modal, setModal] = useState<ModalType>("none");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [localLikes, setLocalLikes] = useState<Record<number, number>>({});

  const { pessoa: currentPessoa, savePessoa } = useCurrentPessoa();

  const { data: animaisData = [], isLoading: loadingAnimais } =
    useListAnimais();

  const { data: postsData = [], isLoading: loadingPosts } = useListPosts();

  const animais = useMemo(() => animaisData as Animal[], [animaisData]);
  const posts = useMemo(() => postsData as Post[], [postsData]);

  function findAnimalByPost(post: Post) {
    return post.animal ?? animais.find((animal) => animal.id === post.animalId);
  }

  function handlePostLiked(postId: number, likes: number) {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: true,
    }));

    setLocalLikes((prev) => ({
      ...prev,
      [postId]: likes,
    }));

    setSelectedPost((prev) => {
      if (!prev || prev.id !== postId) {
        return prev;
      }

      return {
        ...prev,
        likes,
      };
    });
  }

  return (
    <div className="app">
      <Header
        animais={animais}
        currentPessoa={currentPessoa}
        onOpenPessoa={() => setModal("pessoa")}
        onOpenAnimal={() => setModal("animal")}
        onOpenPost={() => setModal("post")}
      />

      <main className="feed-container">
        {loadingPosts || loadingAnimais ? (
          <p className="loading-text">Carregando posts...</p>
        ) : posts.length === 0 ? (
          <EmptyFeed onCreatePost={() => setModal("post")} />
        ) : (
          <section className="posts-grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  ...post,
                  likes: localLikes[post.id] ?? post.likes ?? 0,
                }}
                animal={findAnimalByPost(post)}
                isLiked={likedPosts[post.id] ?? false}
                onOpen={() =>
                  setSelectedPost({
                    ...post,
                    likes: localLikes[post.id] ?? post.likes ?? 0,
                  })
                }
              />
            ))}
          </section>
        )}
      </main>

      {modal === "pessoa" && (
        <RegisterPessoaModal
          onClose={() => setModal("none")}
          onSave={savePessoa}
        />
      )}

      {modal === "animal" && (
        <CreateAnimalModal onClose={() => setModal("none")} />
      )}

      {modal === "post" && (
        <CreatePostModal animais={animais} onClose={() => setModal("none")} />
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          animal={findAnimalByPost(selectedPost)}
          currentPessoa={currentPessoa}
          onClose={() => setSelectedPost(null)}
          onNeedRegister={() => setModal("pessoa")}
          onPostLiked={handlePostLiked}
        />
      )}
    </div>
  );
}
