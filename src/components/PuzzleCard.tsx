import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, Lock, Unlock, Zap, Hash, Code, Brain, Key } from "lucide-react";

interface PuzzleState {
  id: number;
  type: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  challenge: string;
  hint?: string;
  solution?: string;
  solutionMethod?: string;
  reward?: string;
  bits?: number;
  address?: string;
  balance?: string;
  status: "solved" | "unsolved" | "solving";
  foundSolution?: string;
}

interface PuzzleCardProps {
  puzzle: PuzzleState;
  onSolve?: () => void;
}

const typeIcons: Record<string, typeof Bitcoin> = {
  "bitcoin-address": Bitcoin,
  "hash-preimage": Hash,
  "cipher-decode": Code,
  "pattern-analysis": Brain,
  "private-key-recovery": Key,
};

export const PuzzleCard = ({ puzzle, onSolve }: PuzzleCardProps) => {
  const getStatusBadge = () => {
    switch (puzzle.status) {
      case "solved":
        return <Badge variant="solved" className="gap-1"><Unlock className="w-3 h-3" />Solved</Badge>;
      case "solving":
        return <Badge variant="active" className="gap-1"><Zap className="w-3 h-3" />Solving...</Badge>;
      default:
        return <Badge variant="unsolved" className="gap-1"><Lock className="w-3 h-3" />Unsolved</Badge>;
    }
  };

  const getDifficultyColor = () => {
    switch (puzzle.difficulty) {
      case "easy":
        return "text-success";
      case "medium":
        return "text-warning";
      case "hard":
        return "text-destructive";
      case "impossible":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  const TypeIcon = typeIcons[puzzle.type] || Bitcoin;
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card className={`relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 ${puzzle.status === "solving" ? "glow-primary" : ""}`}>
      <div className="absolute inset-0 gradient-matrix opacity-30" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{puzzle.name}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription className="text-xs line-clamp-2">{puzzle.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div className="space-y-2 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Type</p>
            <p className="font-mono text-xs capitalize">{puzzle.type.replace('-', ' ')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Challenge</p>
            <p className="font-mono text-xs break-all">{truncateText(puzzle.challenge, 60)}</p>
          </div>
          {puzzle.bits !== undefined && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Bits</p>
              <p className="font-mono font-semibold text-xs">{puzzle.bits}</p>
            </div>
          )}
          {puzzle.balance && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Balance</p>
              <p className="font-mono font-semibold text-primary text-xs">{puzzle.balance} BTC</p>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Difficulty</p>
            <p className={`font-semibold capitalize text-xs ${getDifficultyColor()}`}>{puzzle.difficulty}</p>
          </div>
          {puzzle.hint && puzzle.status !== "solved" && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Hint</p>
              <p className="text-xs italic text-muted-foreground">{puzzle.hint}</p>
            </div>
          )}
          {puzzle.status === "solved" && (puzzle.foundSolution || puzzle.solution) && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Solution</p>
              <p className="font-mono font-semibold text-success text-xs">{puzzle.foundSolution || puzzle.solution}</p>
              {puzzle.solutionMethod && (
                <p className="text-xs text-muted-foreground italic">{puzzle.solutionMethod}</p>
              )}
            </div>
          )}
        </div>
        {puzzle.status === "unsolved" && puzzle.difficulty !== "impossible" && (
          <Button 
            variant="solver" 
            className="w-full mt-2"
            onClick={onSolve}
          >
            <Zap className="w-4 h-4" />
            Solve with AI
          </Button>
        )}
        {puzzle.status === "solving" && (
          <div className="relative h-2 bg-muted rounded-full overflow-hidden mt-2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-scan" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
