
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Mock quiz data - in real app, this would be generated by AI
  const quizData: { [key: string]: QuizQuestion[] } = {
    "math-basic": [
      {
        id: "q1",
        question: "Berapa hasil dari 15 + 28?",
        options: ["42", "43", "44", "45"],
        correctAnswer: 1,
        explanation: "15 + 28 = 43. Ini adalah operasi penjumlahan dasar."
      },
      {
        id: "q2", 
        question: "Jika x + 5 = 12, maka nilai x adalah?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 1,
        explanation: "x + 5 = 12, maka x = 12 - 5 = 7"
      },
      {
        id: "q3",
        question: "Luas persegi dengan sisi 6 cm adalah?",
        options: ["24 cm²", "36 cm²", "42 cm²", "48 cm²"],
        correctAnswer: 1,
        explanation: "Luas persegi = sisi × sisi = 6 × 6 = 36 cm²"
      },
      {
        id: "q4",
        question: "Hasil dari 8 × 7 adalah?",
        options: ["54", "56", "58", "60"],
        correctAnswer: 1,
        explanation: "8 × 7 = 56. Ini adalah operasi perkalian dasar."
      },
      {
        id: "q5",
        question: "Berapa hasil dari 72 ÷ 8?",
        options: ["8", "9", "10", "11"],
        correctAnswer: 1,
        explanation: "72 ÷ 8 = 9. Ini adalah operasi pembagian dasar."
      }
    ]
  };

  const questions = quizData[topicId || ""] || [];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    setShowResults(true);
    toast({
      title: "Kuis Selesai!",
      description: "Lihat hasil dan pembahasanmu di bawah.",
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    };
  };

  const score = calculateScore();

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setTimeLeft(600);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-edublink-gray-800 mb-4">Kuis Tidak Tersedia</h1>
          <Button onClick={() => navigate("/")} className="gradient-orange">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50">
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-edublink-gray-200 z-10">
          <div className="container mx-auto px-6 py-4">
            <Button
              onClick={() => navigate(`/topic/${topicId}`)}
              variant="ghost"
              className="text-edublink-gray-600 hover:text-edublink-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Materi
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">
                  {score.percentage >= 80 ? "🏆" : score.percentage >= 60 ? "👏" : "💪"}
                </div>
                <CardTitle className="text-3xl mb-2">
                  {score.percentage >= 80 ? "Luar Biasa!" : score.percentage >= 60 ? "Bagus!" : "Tetap Semangat!"}
                </CardTitle>
                <CardDescription className="text-lg">
                  Kamu berhasil menjawab {score.correct} dari {score.total} soal dengan benar
                </CardDescription>
                <div className="mt-4">
                  <Badge 
                    className={`text-lg px-4 py-2 ${
                      score.percentage >= 80 
                        ? "bg-green-100 text-green-700"
                        : score.percentage >= 60
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    Score: {score.percentage}%
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Review Questions */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-edublink-gray-800 mb-6">Pembahasan Soal</h2>
              
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </div>
                            <CardTitle className="text-lg">Soal {index + 1}</CardTitle>
                          </div>
                          <p className="text-edublink-gray-700 mb-4">{question.question}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = optionIndex === question.correctAnswer;
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                isCorrectAnswer
                                  ? "border-green-300 bg-green-50 text-green-700"
                                  : isUserAnswer && !isCorrectAnswer
                                  ? "border-red-300 bg-red-50 text-red-700"
                                  : "border-edublink-gray-200 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                <div className="flex items-center space-x-2">
                                  {isCorrectAnswer && (
                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                      Jawaban Benar
                                    </Badge>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <Badge className="bg-red-100 text-red-700 text-xs">
                                      Jawabanmu
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">Pembahasan:</h4>
                            <p className="text-blue-700 text-sm">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                onClick={handleRetryQuiz}
                variant="outline"
                size="lg"
                className="border-edublink-orange-300 text-edublink-orange-600 hover:bg-edublink-orange-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
              <Button
                onClick={() => navigate(`/topic/${topicId}`)}
                size="lg"
                className="gradient-orange hover:opacity-90"
              >
                Kembali ke Materi
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-edublink-gray-50 to-edublink-orange-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-edublink-gray-200 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate(`/topic/${topicId}`)}
              variant="ghost"
              className="text-edublink-gray-600 hover:text-edublink-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-edublink-gray-600">Waktu Tersisa</p>
                <p className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-edublink-orange-600'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-edublink-gray-600">Progress</p>
                <p className="font-semibold text-edublink-orange-600">
                  {currentQuestion + 1}/{totalQuestions}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-edublink-orange-100 text-edublink-orange-700">
                  Soal {currentQuestion + 1}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-edublink-gray-500">
                  <Trophy className="w-4 h-4" />
                  <span>Kuis Matematika Dasar</span>
                </div>
              </div>
              
              <CardTitle className="text-2xl mb-4">
                {questions[currentQuestion]?.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-edublink-orange-400 bg-edublink-orange-50 text-edublink-orange-700"
                      : "border-edublink-gray-200 bg-white hover:border-edublink-orange-200 hover:bg-edublink-orange-25"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-edublink-orange-400 bg-edublink-orange-400"
                        : "border-edublink-gray-300"
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevQuestion}
              variant="outline"
              disabled={currentQuestion === 0}
              className="border-edublink-gray-300"
            >
              Sebelumnya
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalQuestions }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? "bg-edublink-orange-500"
                      : selectedAnswers[index] !== undefined
                      ? "bg-edublink-orange-200"
                      : "bg-edublink-gray-200"
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="gradient-orange hover:opacity-90"
            >
              {currentQuestion === totalQuestions - 1 ? "Selesai" : "Selanjutnya"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
