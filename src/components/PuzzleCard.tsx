import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, Lock, Unlock, Zap } from "lucide-react";

interface PuzzleCardProps {
  puzzleNumber: number;
  bits: number;
  address: string;
  balance: string;
  status: "solved" | "unsolved" | "solving";
  difficulty: "easy" | "medium" | "hard" | "impossible";
  onSolve?: () => void;
}

export const PuzzleCard = ({
  puzzleNumber,
  bits,
  address,
  balance,
  status,
  difficulty,
  onSolve,
}: PuzzleCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "solved":
        return <Badge variant="solved" className="gap-1"><Unlock className="w-3 h-3" />Gelöst</Badge>;
      case "solving":
        return <Badge variant="active" className="gap-1"><Zap className="w-3 h-3" />Wird gelöst...</Badge>;
      default:
        return <Badge variant="unsolved" className="gap-1"><Lock className="w-3 h-3" />Ungelöst</Badge>;
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
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

  return (
    <Card className={`relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 ${status === "solving" ? "glow-primary" : ""}`}>
      <div className="absolute inset-0 gradient-matrix opacity-30" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Puzzle #{puzzleNumber}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription className="font-mono text-xs">{address}</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Bits</p>
            <p className="font-mono font-semibold">{bits}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Balance</p>
            <p className="font-mono font-semibold text-primary">{balance} BTC</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-muted-foreground">Schwierigkeit</p>
            <p className={`font-semibold capitalize ${getDifficultyColor()}`}>{difficulty}</p>
          </div>
        </div>
        {status === "unsolved" && difficulty !== "impossible" && (
          <Button 
            variant="solver" 
            className="w-full mt-2"
            onClick={onSolve}
          >
            <Zap className="w-4 h-4" />
            Mit KI lösen
          </Button>
        )}
        {status === "solving" && (
          <div className="relative h-2 bg-muted rounded-full overflow-hidden mt-2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-scan" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
