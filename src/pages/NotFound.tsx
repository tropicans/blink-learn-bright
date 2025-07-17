
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl mb-6">🤔</div>
        
        <h1 className="text-6xl font-bold text-edublink-orange-500 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-edublink-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-edublink-gray-600 mb-8 leading-relaxed">
          Oops! Sepertinya halaman yang kamu cari tidak ada. 
          Mungkin kamu salah ketik URL atau halaman sudah dipindahkan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gradient-orange glow-orange"
          >
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="border-edublink-orange-300 text-edublink-orange-600 hover:bg-edublink-orange-50"
          >
            <Search className="w-4 h-4 mr-2" />
            Cari Topik Belajar
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-edublink-gray-500">
          <p>
            Dibuat-buat oleh <span className="font-semibold text-edublink-orange-600">Yudhi</span> © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
