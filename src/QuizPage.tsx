import { useState } from "react";
import { shortQuiz, longQuiz, type Quiz, type QuizQuestion, type QuizAnswer } from "./quizData";

type QuizPageProps = {
  onClose: () => void;
};

type Answers = Record<string, string | string[]>;

const categoryColors: Record<string, string> = {
  tilanne: "bg-[#E1F5EE] text-[#085041]",
  kieli: "bg-[#9FE1CB] text-[#04342C]",
  "tuen muoto": "bg-[#E1F5EE] text-[#085041]",
  ammattilainen: "bg-[#EEEDFE] text-[#3C3489]",
  tyyli: "bg-[#EEEDFE] text-[#3C3489]",
  käytäntö: "bg-[#FAEEDA] text-[#633806]",
  historia: "bg-[#FAECE7] text-[#712B13]",
  sinä: "bg-[#E6F1FB] text-[#0C447C]",
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full h-1 bg-[#F8F2EA] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#C4674A] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function QuestionStep({
  question,
  answers,
  onAnswer,
  onMultiToggle,
  onTextChange,
  onNext,
  onBack,
  isFirst,
  isLast,
}: {
  question: QuizQuestion;
  answers: Answers;
  onAnswer: (questionId: string, answerId: string) => void;
  onMultiToggle: (questionId: string, answerId: string) => void;
  onTextChange: (questionId: string, text: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const selected = answers[question.id];
  const categoryColor =
    categoryColors[question.category] ?? "bg-[#F1EFE8] text-[#5F5E5A]";

  const canProceed = question.openText
    ? true
    : question.multiSelect
    ? Array.isArray(selected) && selected.length > 0
    : !!selected;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${categoryColor}`}
        >
          {question.category}
        </span>
        <span className="text-[12px] text-[#888780]">
          {question.multiSelect ? "Voit valita useamman" : ""}
        </span>
      </div>

      <h2
        className="font-serif text-2xl text-[#1E1610] leading-snug"
        style={{ fontFamily: "Lora, serif" }}
      >
        {question.question}
      </h2>

      {question.openText ? (
        <textarea
          className="w-full rounded-2xl border border-[#e8ddd6] bg-[#FAF6F0] px-5 py-4 text-[15px] text-[#1E1610] placeholder:text-[#b4a89e] resize-none focus:outline-none focus:border-[#C4674A] transition-colors"
          rows={5}
          placeholder="Kirjoita tähän..."
          value={(answers[question.id] as string) ?? ""}
          onChange={(e) => onTextChange(question.id, e.target.value)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {question.answers?.map((answer: QuizAnswer) => {
            const isSelected = question.multiSelect
              ? Array.isArray(selected) && selected.includes(answer.id)
              : selected === answer.id;

            return (
              <button
                key={answer.id}
                onClick={() =>
                  question.multiSelect
                    ? onMultiToggle(question.id, answer.id)
                    : onAnswer(question.id, answer.id)
                }
                className={`text-left px-5 py-4 rounded-2xl border text-[15px] transition-all duration-150
                  ${
                    isSelected
                      ? "border-[#C4674A] bg-[#FBF0EC] text-[#1E1610]"
                      : "border-[#e8ddd6] bg-[#FAF6F0] text-[#4a3728] hover:border-[#C4674A] hover:bg-[#FBF0EC]"
                  }`}
              >
                {answer.text}
              </button>
            );
          })}
        </div>
      )}

      {question.note && (
        <p className="text-[12px] text-[#888780] italic leading-relaxed">
          {question.note}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          disabled={isFirst}
          className="text-[14px] text-[#888780] hover:text-[#4a3728] disabled:opacity-0 transition-colors px-2 py-1"
        >
          Takaisin
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-full text-[14px] font-medium transition-all duration-200
            ${
              canProceed
                ? "bg-[#C4674A] text-white hover:bg-[#b05a3e] active:scale-95"
                : "bg-[#e8ddd6] text-[#b4a89e] cursor-not-allowed"
            }`}
        >
          {isLast ? "Valmis" : "Seuraava"}
        </button>
      </div>
    </div>
  );
}

function QuizComplete({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center animate-fade-in py-8">
      <div className="w-16 h-16 rounded-full bg-[#E1F5EE] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M8 16l6 6 10-12"
            stroke="#1D9E75"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2
          className="font-serif text-2xl text-[#1E1610] mb-2"
          style={{ fontFamily: "Lora, serif" }}
        >
          Kiitos vastauksistasi
        </h2>
        <p className="text-[15px] text-[#888780] leading-relaxed max-w-sm mx-auto">
          Etsimme sinulle sopivimmat ammattilaiset vastauksiesi perusteella.
          Tulokset ovat valmiina hetken kuluttua.
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-8 py-3 rounded-full bg-[#C4674A] text-white text-[14px] font-medium hover:bg-[#b05a3e] transition-colors"
      >
        Näytä ehdotukset
      </button>
    </div>
  );
}

export default function QuizPage({ onClose }: QuizPageProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const questions = selectedQuiz?.questions ?? [];
  const currentQuestion = questions[currentStep];
  const isLast = currentStep === questions.length - 1;
  const isFirst = currentStep === 0;

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleMultiToggle = (questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) ?? [];
      const exists = current.includes(answerId);
      return {
        ...prev,
        [questionId]: exists
          ? current.filter((id) => id !== answerId)
          : [...current, answerId],
      };
    });
  };

  const handleTextChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleNext = () => {
    if (isLast) {
      setDone(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF6F0] flex flex-col overflow-y-auto">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8ddd6] sticky top-0 bg-[#FAF6F0] z-10">
        <span
          className="text-[18px] font-medium text-[#C4674A]"
          style={{ fontFamily: "Lora, serif" }}
        >
          Myötä
        </span>
        {selectedQuiz && !done && (
          <div className="flex-1 mx-8">
            <ProgressBar current={currentStep + 1} total={questions.length} />
          </div>
        )}
        <button
          onClick={onClose}
          className="text-[#888780] hover:text-[#1E1610] transition-colors p-1"
          aria-label="Sulje"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Quiz selection */}
          {!selectedQuiz && !done && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#888780] mb-3">
                  Löydä sopiva ammattilainen
                </p>
                <h1
                  className="text-3xl text-[#1E1610] leading-snug"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  Minkä verran sinulla on aikaa?
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSelectedQuiz(shortQuiz)}
                  className="text-left p-6 rounded-3xl border border-[#e8ddd6] bg-white hover:border-[#C4674A] hover:bg-[#FBF0EC] transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[16px] font-medium text-[#1E1610] mb-1">
                        Nopea kartoitus
                      </p>
                      <p className="text-[14px] text-[#888780] leading-relaxed">
                        7 kysymystä, noin 2 minuuttia. Saat välittömästi ehdotukset.
                      </p>
                    </div>
                    <span className="text-[#C4674A] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                      →
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedQuiz(longQuiz)}
                  className="text-left p-6 rounded-3xl border border-[#e8ddd6] bg-white hover:border-[#C4674A] hover:bg-[#FBF0EC] transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[16px] font-medium text-[#1E1610] mb-1">
                        Tarkempi kartoitus
                      </p>
                      <p className="text-[14px] text-[#888780] leading-relaxed">
                        16 kysymystä, noin 5 minuuttia. Tarkempi matchaus juuri sinulle.
                      </p>
                    </div>
                    <span className="text-[#C4674A] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                      →
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Active quiz */}
          {selectedQuiz && !done && currentQuestion && (
            <div>
              <p className="text-[12px] text-[#888780] mb-8">
                {currentStep + 1} / {questions.length}
              </p>
              <QuestionStep
                question={currentQuestion}
                answers={answers}
                onAnswer={handleAnswer}
                onMultiToggle={handleMultiToggle}
                onTextChange={handleTextChange}
                onNext={handleNext}
                onBack={handleBack}
                isFirst={isFirst}
                isLast={isLast}
              />
            </div>
          )}

          {/* Done */}
          {done && <QuizComplete onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}
