import { useState, useEffect } from "react";
import { PuzzleCard } from "@/components/PuzzleCard";
import { SolverPanel } from "@/components/SolverPanel";
import { Bitcoin } from "lucide-react";
import { toast } from "sonner";

interface Puzzle {
  number: number;
  bits: number;
  address: string;
  balance: string;
  status: "solved" | "unsolved" | "solving";
  difficulty: "easy" | "medium" | "hard" | "impossible";
}

const Index = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([
    { number: 1, bits: 1, address: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH", balance: "0.001", status: "solved", difficulty: "easy" },
    { number: 2, bits: 2, address: "1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb", balance: "0.002", status: "solved", difficulty: "easy" },
    { number: 3, bits: 3, address: "19ZewH8Kk1PDbSNdJ97FP4EiCjTRaZMZQA", balance: "0.003", status: "solved", difficulty: "easy" },
    { number: 4, bits: 4, address: "1EhqbyUMvvs7BfL8goY6qcPbD6YKfPqb7e", balance: "0.004", status: "solved", difficulty: "easy" },
    { number: 5, bits: 5, address: "1E6NuFjCi27W5zoXg8TRdcSRq84zJeBW3k", balance: "0.005", status: "solved", difficulty: "easy" },
    { number: 10, bits: 10, address: "16JrGhLx5bcBSA34kew9V6Mufa4aXhFe9X", balance: "0.01", status: "solved", difficulty: "easy" },
    { number: 15, bits: 15, address: "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so", balance: "0.015", status: "unsolved", difficulty: "medium" },
    { number: 20, bits: 20, address: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9", balance: "0.02", status: "unsolved", difficulty: "medium" },
    { number: 25, bits: 25, address: "1MVDYgVaSN6iKKEsbzRUAYFrYJadLYZvvZ", balance: "0.025", status: "unsolved", difficulty: "medium" },
    { number: 30, bits: 30, address: "19vkiEajfhuZ8bs8Zu2jgmC6oqZbWqhxhG", balance: "0.03", status: "unsolved", difficulty: "hard" },
    { number: 40, bits: 40, address: "1GAHNE1x1AfSJwJY1ZnJgC7JfsKxk9hLy", balance: "0.04", status: "unsolved", difficulty: "hard" },
    { number: 50, bits: 50, address: "14oFNXucftsHiUMY8uctg6N487riuyXs4h", balance: "0.05", status: "unsolved", difficulty: "impossible" },
  ]);

  const [solverRunning, setSolverRunning] = useState(false);
  const [currentSolvingPuzzle, setCurrentSolvingPuzzle] = useState<number | undefined>();
  const [attemptsPerSecond, setAttemptsPerSecond] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  useEffect(() => {
    if (solverRunning) {
      const interval = setInterval(() => {
        const randomAttempts = Math.floor(Math.random() * 50000) + 100000;
        setAttemptsPerSecond(randomAttempts);
        setTotalAttempts((prev) => prev + randomAttempts);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [solverRunning]);

  const handleSolvePuzzle = (puzzleNumber: number) => {
    const puzzle = puzzles.find((p) => p.number === puzzleNumber);
    if (!puzzle) return;

    if (puzzle.difficulty === "impossible") {
      toast.error("Dieses Puzzle ist mit aktuellen Methoden praktisch unlösbar!");
      return;
    }

    setPuzzles((prev) =>
      prev.map((p) =>
        p.number === puzzleNumber ? { ...p, status: "solving" as const } : p
      )
    );
    
    setCurrentSolvingPuzzle(puzzleNumber);
    setSolverRunning(true);
    
    toast.success(`KI Solver gestartet für Puzzle #${puzzleNumber}`, {
      description: `Schwierigkeit: ${puzzle.difficulty}`,
    });

    // Simuliere Lösungsversuch (in Realität würde dies sehr lange dauern)
    setTimeout(() => {
      const success = Math.random() > 0.7; // 30% Erfolgsrate für Demo
      
      if (success) {
        setPuzzles((prev) =>
          prev.map((p) =>
            p.number === puzzleNumber ? { ...p, status: "solved" as const } : p
          )
        );
        toast.success(`🎉 Puzzle #${puzzleNumber} gelöst!`, {
          description: `Private Key gefunden nach ${totalAttempts.toLocaleString()} Versuchen!`,
        });
      } else {
        setPuzzles((prev) =>
          prev.map((p) =>
            p.number === puzzleNumber ? { ...p, status: "unsolved" as const } : p
          )
        );
        toast.error(`Puzzle #${puzzleNumber} konnte nicht gelöst werden`, {
          description: "Erhöhe die Rechenleistung oder versuche ein einfacheres Puzzle",
        });
      }
      
      setSolverRunning(false);
      setCurrentSolvingPuzzle(undefined);
    }, 8000);
  };

  const handleToggleSolver = () => {
    if (solverRunning) {
      setSolverRunning(false);
      setCurrentSolvingPuzzle(undefined);
      
      setPuzzles((prev) =>
        prev.map((p) =>
          p.status === "solving" ? { ...p, status: "unsolved" as const } : p
        )
      );
      
      toast.info("Solver gestoppt");
    } else {
      const firstUnsolved = puzzles.find(
        (p) => p.status === "unsolved" && p.difficulty !== "impossible"
      );
      
      if (firstUnsolved) {
        handleSolvePuzzle(firstUnsolved.number);
      } else {
        toast.error("Keine lösbaren Puzzles verfügbar!");
      }
    }
  };

  const handleResetSolver = () => {
    setTotalAttempts(0);
    setAttemptsPerSecond(0);
    toast.info("Solver zurückgesetzt");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Bitcoin className="w-8 h-8 text-primary glow-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Bitcoin Puzzle Solver
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                KI-gestützte systematische Lösung der Bitcoin-Puzzles
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Solver Panel */}
          <div className="lg:col-span-1">
            <SolverPanel
              isRunning={solverRunning}
              currentPuzzle={currentSolvingPuzzle}
              attemptsPerSecond={attemptsPerSecond}
              totalAttempts={totalAttempts}
              onToggle={handleToggleSolver}
              onReset={handleResetSolver}
            />
          </div>

          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Puzzle Übersicht</h2>
              <p className="text-sm text-muted-foreground">
                {puzzles.filter((p) => p.status === "solved").length} von {puzzles.length} Puzzles gelöst
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {puzzles.map((puzzle) => (
                <PuzzleCard
                  key={puzzle.number}
                  puzzleNumber={puzzle.number}
                  bits={puzzle.bits}
                  address={puzzle.address}
                  balance={puzzle.balance}
                  status={puzzle.status}
                  difficulty={puzzle.difficulty}
                  onSolve={() => handleSolvePuzzle(puzzle.number)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
