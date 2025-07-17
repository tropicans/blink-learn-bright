
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, FileText, CheckCircle2, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Mock data - in real app, this would come from API
  const topicData = {
    "math-basic": {
      title: "Matematika Dasar",
      description: "Pelajari operasi hitung, aljabar, dan geometri dari dasar hingga mahir",
      icon: "📊",
      difficulty: "Pemula",
      duration: "2-3 jam",
      rating: 4.8,
      students: 1234,
      sections: [
        {
          id: "intro",
          title: "Pengenalan Matematika",
          type: "video",
          duration: "15 menit",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Dasar-dasar matematika dan pentingnya dalam kehidupan sehari-hari"
        },
        {
          id: "arithmetic",
          title: "Operasi Aritmatika",
          type: "video",
          duration: "30 menit",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Penjumlahan, pengurangan, perkalian, dan pembagian"
        },
        {
          id: "algebra",
          title: "Dasar Aljabar",
          type: "pdf",
          duration: "45 menit",
          url: "#",
          description: "Variabel, persamaan linear, dan penyelesaiannya"
        },
        {
          id: "geometry",
          title: "Geometri Dasar",
          type: "video",
          duration: "40 menit",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Bangun datar, keliling, dan luas"
        }
      ]
    }
  };

  const currentTopic = topicData[topicId as keyof typeof topicData];

  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-edublink-gray-800 mb-4">Topik Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/")} className="gradient-orange">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  const progress = (completedSections.length / currentTopic.sections.length) * 100;

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-edublink-gray-200 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-edublink-gray-600 hover:text-edublink-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-edublink-gray-600">Progress</p>
                <p className="font-semibold text-edublink-orange-600">{Math.round(progress)}%</p>
              </div>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Topic Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-5xl">{currentTopic.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold text-edublink-gray-800 mb-2">
                    {currentTopic.title}
                  </h1>
                  <p className="text-lg text-edublink-gray-600 max-w-2xl">
                    {currentTopic.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-edublink-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{currentTopic.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{currentTopic.students.toLocaleString()} siswa</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentTopic.duration}</span>
                </div>
                <Badge className="bg-edublink-orange-100 text-edublink-orange-700">
                  {currentTopic.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-edublink-gray-800 mb-6">Materi Pembelajaran</h2>
            <div className="space-y-6">
              {currentTopic.sections.map((section, index) => {
                const isCompleted = completedSections.includes(section.id);
                return (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-edublink-orange-100 text-edublink-orange-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-semibold">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            <CardDescription>{section.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-edublink-gray-500">
                          {section.type === 'video' ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span>{section.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {section.type === 'video' ? (
                        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                          <iframe
                            src={section.url}
                            className="w-full h-full"
                            allowFullScreen
                            title={section.title}
                          />
                        </div>
                      ) : (
                        <div className="bg-edublink-gray-100 rounded-lg p-6 mb-4 text-center">
                          <FileText className="w-12 h-12 text-edublink-gray-400 mx-auto mb-3" />
                          <p className="text-edublink-gray-600">Materi PDF</p>
                          <Button variant="outline" className="mt-3">
                            Buka PDF
                          </Button>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => handleSectionComplete(section.id)}
                        disabled={isCompleted}
                        className={
                          isCompleted
                            ? "w-full bg-green-600 hover:bg-green-700"
                            : "w-full gradient-orange hover:opacity-90"
                        }
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Selesai
                          </>
                        ) : (
                          "Tandai Selesai"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Progress Belajar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Kemajuan</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-edublink-gray-500 mt-2">
                    {completedSections.length} dari {currentTopic.sections.length} materi selesai
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Selanjutnya</h4>
                  {progress >= 75 ? (
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎯</div>
                      <p className="text-sm text-edublink-gray-600 mb-4">
                        Hebat! Kamu sudah hampir selesai. Saatnya uji pemahaman dengan kuis!
                      </p>
                      <Button
                        onClick={handleStartQuiz}
                        className="w-full gradient-orange glow-orange"
                      >
                        Mulai Kuis
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-edublink-gray-600">
                      Selesaikan minimal 75% materi untuk membuka kuis
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopicDetail;
