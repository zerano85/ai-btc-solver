import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Pause, Play, RotateCcw } from "lucide-react";

interface SolverPanelProps {
  isRunning: boolean;
  currentPuzzle?: number;
  attemptsPerSecond: number;
  totalAttempts: number;
  onToggle: () => void;
  onReset: () => void;
}

export const SolverPanel = ({
  isRunning,
  currentPuzzle,
  attemptsPerSecond,
  totalAttempts,
  onToggle,
  onReset,
}: SolverPanelProps) => {
  return (
    <Card className="border-secondary/30 bg-card/80 backdrop-blur glow-secondary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-secondary" />
            <CardTitle className="text-lg">KI Solver Status</CardTitle>
          </div>
          <Badge variant={isRunning ? "active" : "info"}>
            {isRunning ? "Aktiv" : "Bereit"}
          </Badge>
        </div>
        <CardDescription>Systematische Brute-Force Analyse</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Aktuelles Puzzle</p>
            <p className="text-2xl font-bold font-mono text-primary">
              {currentPuzzle ? `#${currentPuzzle}` : "—"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Versuche/Sek</p>
            <p className="text-2xl font-bold font-mono text-secondary">
              {attemptsPerSecond.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Gesamtversuche</p>
          <p className="text-lg font-mono font-semibold">{totalAttempts.toLocaleString()}</p>
        </div>

        {isRunning && (
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary via-primary to-secondary animate-scan" />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant={isRunning ? "destructive" : "cyber"}
            className="flex-1"
            onClick={onToggle}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Stoppen
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Starten
              </>
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
