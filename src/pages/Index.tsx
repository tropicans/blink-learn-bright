
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Brain, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();

  const placeholderWords = [
    "matematika...",
    "bahasa inggris...",
    "programming...",
    "desain grafis...",
    "sejarah indonesia...",
    "ekonomi...",
    "fisika...",
    "biologi..."
  ];

  const topicRecommendations = [
    {
      id: "math-basic",
      title: "Matematika Dasar",
      description: "Operasi hitung, aljabar, dan geometri untuk pemula",
      icon: "📊",
      difficulty: "Pemula",
      duration: "2-3 jam"
    },
    {
      id: "english-conversation",
      title: "English Conversation",
      description: "Percakapan bahasa Inggris sehari-hari",
      icon: "🗣️",
      difficulty: "Menengah",
      duration: "1-2 jam"
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "HTML, CSS, JavaScript untuk membuat website",
      icon: "💻",
      difficulty: "Menengah",
      duration: "4-5 jam"
    },
    {
      id: "graphic-design",
      title: "Desain Grafis",
      description: "Prinsip desain dan penggunaan tools design",
      icon: "🎨",
      difficulty: "Pemula",
      duration: "3-4 jam"
    },
    {
      id: "indonesian-history",
      title: "Sejarah Indonesia",
      description: "Perjalanan sejarah bangsa Indonesia",
      icon: "🏛️",
      difficulty: "Pemula",
      duration: "2-3 jam"
    },
    {
      id: "business-basic",
      title: "Ekonomi Bisnis",
      description: "Dasar-dasar ekonomi dan bisnis modern",
      icon: "📈",
      difficulty: "Menengah",
      duration: "3-4 jam"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % placeholderWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setShowRecommendations(true);
      toast({
        title: "Mencari topik pembelajaran...",
        description: `Menampilkan rekomendasi untuk "${searchQuery}"`,
      });
    } else {
      setShowRecommendations(true);
    }
  };

  const handleTopicSelect = (topicId: string) => {
    console.log("Selected topic:", topicId);
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edu<span className="text-gray-600">Blink</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>1000+ pengguna</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>50+ topik</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {!showRecommendations ? (
          // Landing Section
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-300 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-gray-600" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Belajar Jadi
              <br />
              <span className="text-gray-600">
                Lebih Seru!
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Temukan cara belajar yang menyenangkan dengan kuis interaktif AI. 
              Mulai perjalanan belajarmu sekarang!
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={`Mau belajar ${placeholderWords[currentWordIndex]}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 text-lg pl-6 pr-16 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-100"
                />
                <div className="absolute right-2 top-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-6 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
                  <div className="w-0.5 h-6 bg-gray-400 animate-pulse"></div>
                </div>
              </div>
            </form>
            
            {/* CTA */}
            <div className="text-center">
              <p className="text-gray-500 mb-4">
                Atau mulai dengan topik populer
              </p>
              <Button
                onClick={() => setShowRecommendations(true)}
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Lihat Rekomendasi
              </Button>
            </div>
          </div>
        ) : (
          // Recommendations Section
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <Button
                onClick={() => setShowRecommendations(false)}
                variant="ghost"
                className="mb-6 text-edublink-gray-600 hover:text-edublink-orange-600"
              >
                ← Kembali ke pencarian
              </Button>
              <h3 className="text-3xl font-bold text-edublink-gray-800 mb-4">
                Topik Pembelajaran Pilihan
              </h3>
              <p className="text-edublink-gray-600">
                Pilih topik yang ingin kamu pelajari dan mulai belajar sekarang!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {topicRecommendations.map((topic, index) => (
                <Card
                  key={topic.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-edublink-orange-100 hover:border-edublink-orange-300 group"
                  onClick={() => handleTopicSelect(topic.id)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {topic.icon}
                    </div>
                    <CardTitle className="text-xl text-edublink-gray-800 group-hover:text-edublink-orange-600 transition-colors">
                      {topic.title}
                    </CardTitle>
                    <CardDescription className="text-edublink-gray-600">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center text-sm text-edublink-gray-500 mb-4">
                      <span className="px-3 py-1 bg-edublink-orange-100 text-edublink-orange-700 rounded-full">
                        {topic.difficulty}
                      </span>
                      <span>{topic.duration}</span>
                    </div>
                    <Button className="w-full gradient-orange hover:opacity-90 group-hover:glow-orange transition-all duration-300">
                      Mulai Belajar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-edublink-gray-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-edublink-gray-600">
            Dibuat-buat oleh <span className="font-semibold text-edublink-orange-600">Yudhi</span> © 2025
          </p>
          <p className="text-sm text-edublink-gray-500 mt-2">
            EduBlink - Aplikasi pembelajaran interaktif untuk semua
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
