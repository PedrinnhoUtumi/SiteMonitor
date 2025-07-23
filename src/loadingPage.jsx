import { PuffLoader } from "react-spinners";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-fundo_azul_escuro_elegante">
        <PuffLoader
          color="#f5af33"
          size={200}
          speedMultiplier={2}
        />
    </div>
  );
}