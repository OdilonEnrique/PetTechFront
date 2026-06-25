import type { Animal } from "@/types/animal";
import type { Pessoa } from "@/types/pessoa";
import { getAnimalImage } from "@/utils/utils";
import { PawPrint, Plus, User } from "lucide-react";

type HeaderProps = {
  animais: Animal[];
  currentPessoa: Pessoa | null;
  onOpenPessoa: () => void;
  onOpenAnimal: () => void;
  onOpenPost: () => void;
};

function getPessoaIniciais(nome: string) {
  const partesNome = nome.trim().split(/\s+/);

  if (partesNome.length === 0) {
    return "";
  }

  if (partesNome.length === 1) {
    return partesNome[0][0].toUpperCase();
  }

  return `${partesNome[0][0]}${partesNome[1][0]}`.toUpperCase();
}

export function Header({
  animais,
  currentPessoa,
  onOpenPessoa,
  onOpenAnimal,
  onOpenPost,
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-icon">
            <PawPrint size={17} />
          </div>

          <strong>PetPost</strong>
        </div>

        <div className="header-avatars">
          {animais.slice(0, 5).map((animal) => (
            <img
              key={animal.id}
              src={getAnimalImage(animal)}
              alt={animal.nome}
              title={animal.nome}
            />
          ))}
        </div>

        <div className="header-actions">
          {currentPessoa ? (
            <div className="logged-user">
              <div
                className="pessoa-iniciais"
                title={currentPessoa.nome}
                aria-label={currentPessoa.nome}
              >
                {getPessoaIniciais(currentPessoa.nome)}
              </div>

              <span>{currentPessoa.nome}</span>
            </div>
          ) : (
            <button className="btn btn-light" onClick={onOpenPessoa}>
              <User size={14} />
              Entrar
            </button>
          )}

          <button className="btn btn-light" onClick={onOpenAnimal}>
            <Plus size={15} />
            Criar animal
          </button>

          <button className="btn btn-primary" onClick={onOpenPost}>
            <Plus size={15} />
            Criar post
          </button>
        </div>
      </div>
    </header>
  );
}
