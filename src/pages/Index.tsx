import { useState, useEffect } from "react";
import { PuzzleCard } from "@/components/PuzzleCard";
import { SolverPanel } from "@/components/SolverPanel";
import { DigitalClock } from "@/components/DigitalClock";
import { Bitcoin } from "lucide-react";
import { toast } from "sonner";
import { cryptoPuzzles, CryptoPuzzle } from "@/lib/cryptoPuzzles";
import { solvePuzzleWithAI, estimateSolveTime } from "@/lib/aiSolver";

// Constants
const INITIALLY_SOLVED_PUZZLE_COUNT = 3; // First 3 puzzles are pre-solved

interface PuzzleState extends CryptoPuzzle {
  status: "solved" | "unsolved" | "solving";
  foundSolution?: string;
}

const Index = () => {
  const [puzzles, setPuzzles] = useState<PuzzleState[]>(
    cryptoPuzzles.map(p => ({
      ...p,
      status: (p.id <= INITIALLY_SOLVED_PUZZLE_COUNT ? "solved" : "unsolved") as "solved" | "unsolved" | "solving",
      foundSolution: p.id <= INITIALLY_SOLVED_PUZZLE_COUNT ? p.solution : undefined
    }))
  );

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

  const handleSolvePuzzle = async (puzzleId: number) => {
    const puzzle = puzzles.find((p) => p.id === puzzleId);
    if (!puzzle) return;

    if (puzzle.difficulty === "impossible") {
      toast.error("This puzzle is computationally infeasible with current methods!", {
        description: `Estimated time: ${estimateSolveTime(puzzle)}`
      });
      return;
    }

    setPuzzles((prev) =>
      prev.map((p) =>
        p.id === puzzleId ? { ...p, status: "solving" as const } : p
      )
    );
    
    setCurrentSolvingPuzzle(puzzleId);
    setSolverRunning(true);
    
    toast.success(`AI Solver started for ${puzzle.name}`, {
      description: `Type: ${puzzle.type} | Difficulty: ${puzzle.difficulty}`,
    });

    try {
      // Use AI solver
      const result = await solvePuzzleWithAI(puzzle);
      
      if (result.success && result.solution) {
        setPuzzles((prev) =>
          prev.map((p) =>
            p.id === puzzleId ? { ...p, status: "solved" as const, foundSolution: result.solution } : p
          )
        );
        toast.success(`🎉 Puzzle #${puzzleId} solved!`, {
          description: `Solution: ${result.solution} | Method: ${result.method} | Attempts: ${result.attempts.toLocaleString()}`,
        });
      } else {
        setPuzzles((prev) =>
          prev.map((p) =>
            p.id === puzzleId ? { ...p, status: "unsolved" as const } : p
          )
        );
        toast.error(`Puzzle #${puzzleId} could not be solved`, {
          description: `Method tried: ${result.method} | Attempts: ${result.attempts.toLocaleString()}`,
        });
      }
    } catch (error) {
      setPuzzles((prev) =>
        prev.map((p) =>
          p.id === puzzleId ? { ...p, status: "unsolved" as const } : p
        )
      );
      toast.error(`Error solving puzzle #${puzzleId}`, {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setSolverRunning(false);
      setCurrentSolvingPuzzle(undefined);
    }
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
      
      toast.info("Solver stopped");
    } else {
      const firstUnsolved = puzzles.find(
        (p) => p.status === "unsolved" && p.difficulty !== "impossible"
      );
      
      if (firstUnsolved) {
        handleSolvePuzzle(firstUnsolved.id);
      } else {
        toast.error("No solvable puzzles available!");
      }
    }
  };

  const handleResetSolver = () => {
    setTotalAttempts(0);
    setAttemptsPerSecond(0);
    toast.info("Solver reset");
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
                AI-powered systematic solution of cryptographic puzzles
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Solver Panel and Digital Clock */}
          <div className="lg:col-span-1 space-y-6">
            <SolverPanel
              isRunning={solverRunning}
              currentPuzzle={currentSolvingPuzzle}
              attemptsPerSecond={attemptsPerSecond}
              totalAttempts={totalAttempts}
              onToggle={handleToggleSolver}
              onReset={handleResetSolver}
            />
            <DigitalClock />
          </div>

          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Puzzle Overview</h2>
              <p className="text-sm text-muted-foreground">
                {puzzles.filter((p) => p.status === "solved").length} of {puzzles.length} puzzles solved
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {puzzles.map((puzzle) => (
                <PuzzleCard
                  key={puzzle.id}
                  puzzle={puzzle}
                  onSolve={() => handleSolvePuzzle(puzzle.id)}
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
