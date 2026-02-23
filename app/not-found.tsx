import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary/20 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Page non trouvée
        </h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée. Vérifiez l&apos;URL ou retournez à la page d&apos;accueil.
        </p>
        <Button href="/" variant="primary" size="lg">
          <Home size={20} className="mr-2" />
          Retour à l&apos;accueil
        </Button>
      </div>
    </section>
  );
}
