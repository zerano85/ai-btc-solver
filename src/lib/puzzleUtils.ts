/**
 * Puzzle Statistics and Helper Utilities
 */

import { cryptoPuzzles, CryptoPuzzle, PuzzleType } from './cryptoPuzzles';

export interface PuzzleStatistics {
  total: number;
  byType: Record<PuzzleType, number>;
  byDifficulty: Record<string, number>;
  solved: number;
  unsolved: number;
}

/**
 * Calculate puzzle statistics
 */
export function getPuzzleStatistics(solvedIds: number[] = []): PuzzleStatistics {
  const stats: PuzzleStatistics = {
    total: cryptoPuzzles.length,
    byType: {
      'bitcoin-address': 0,
      'hash-preimage': 0,
      'cipher-decode': 0,
      'pattern-analysis': 0,
      'private-key-recovery': 0,
    },
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      impossible: 0,
    },
    solved: solvedIds.length,
    unsolved: cryptoPuzzles.length - solvedIds.length,
  };

  cryptoPuzzles.forEach(puzzle => {
    stats.byType[puzzle.type]++;
    stats.byDifficulty[puzzle.difficulty]++;
  });

  return stats;
}

/**
 * Get recommended next puzzle based on difficulty progression
 */
export function getRecommendedPuzzle(solvedIds: number[]): CryptoPuzzle | null {
  // Filter out already solved and impossible puzzles
  const availablePuzzles = cryptoPuzzles.filter(
    p => !solvedIds.includes(p.id) && p.difficulty !== 'impossible'
  );

  if (availablePuzzles.length === 0) {
    return null;
  }

  // Sort by difficulty (easy -> medium -> hard)
  const difficultyOrder = { easy: 1, medium: 2, hard: 3, impossible: 4 };
  availablePuzzles.sort((a, b) => {
    const diffA = difficultyOrder[a.difficulty];
    const diffB = difficultyOrder[b.difficulty];
    if (diffA !== diffB) return diffA - diffB;
    return a.id - b.id; // Same difficulty, sort by ID
  });

  return availablePuzzles[0];
}

/**
 * Validate a solution against a puzzle
 */
export function validateSolution(puzzle: CryptoPuzzle, proposedSolution: string): boolean {
  if (!puzzle.solution) {
    return false; // No known solution to validate against
  }

  // Normalize both solutions for comparison
  const normalized = proposedSolution.trim().toLowerCase();
  const expected = puzzle.solution.trim().toLowerCase();

  return normalized === expected;
}

/**
 * Get puzzle difficulty description
 */
export function getDifficultyDescription(difficulty: CryptoPuzzle['difficulty']): string {
  const descriptions: Record<CryptoPuzzle['difficulty'], string> = {
    easy: 'Solvable in seconds with basic algorithms',
    medium: 'Requires optimized algorithms, solvable in seconds to minutes',
    hard: 'Computationally intensive, may take several minutes',
    impossible: 'Beyond current computational capabilities without breakthroughs',
  };

  return descriptions[difficulty];
}

/**
 * Format large numbers for display
 */
export function formatLargeNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num < 1000000000000) return `${(num / 1000000000).toFixed(1)}B`;
  return `${(num / 1000000000000).toFixed(1)}T`;
}

/**
 * Calculate expected attempts for Bitcoin puzzles
 */
export function calculateExpectedAttempts(bits: number): number {
  return Math.pow(2, bits);
}

/**
 * Get puzzle type description
 */
export function getPuzzleTypeDescription(type: PuzzleType): string {
  const descriptions: Record<PuzzleType, string> = {
    'bitcoin-address': 'Find the private key that generates a specific Bitcoin address',
    'hash-preimage': 'Find the input that produces a specific hash output',
    'cipher-decode': 'Decrypt or decode an encrypted message or data',
    'pattern-analysis': 'Identify and continue mathematical or logical patterns',
    'private-key-recovery': 'Recover private keys from partial information',
  };

  return descriptions[type];
}

/**
 * Check if a puzzle is currently solvable with reasonable computation
 */
export function isSolvableWithCurrentTech(puzzle: CryptoPuzzle): boolean {
  if (puzzle.difficulty === 'impossible') {
    return false;
  }

  // For Bitcoin puzzles, check bit size
  if (puzzle.type === 'bitcoin-address' && puzzle.bits) {
    return puzzle.bits <= 30; // Reasonable upper limit
  }

  return true;
}

/**
 * Get hints for a puzzle based on its type
 */
export function getAdditionalHints(puzzle: CryptoPuzzle): string[] {
  const hints: string[] = [];

  switch (puzzle.type) {
    case 'cipher-decode':
      hints.push('Try different encoding/decoding methods');
      hints.push('Look for patterns in the encrypted text');
      break;
    case 'pattern-analysis':
      hints.push('Look for mathematical relationships');
      hints.push('Consider well-known sequences');
      break;
    case 'hash-preimage':
      hints.push('Try common words and phrases');
      hints.push('Consider empty strings or simple inputs');
      break;
    case 'bitcoin-address':
      if (puzzle.bits && puzzle.bits <= 5) {
        hints.push('The search space is very small');
      } else if (puzzle.bits && puzzle.bits <= 15) {
        hints.push('May require optimized search algorithms');
      }
      break;
  }

  return hints;
}

/**
 * Export puzzle data for external use
 */
export function exportPuzzleData(puzzleId: number): string {
  const puzzle = cryptoPuzzles.find(p => p.id === puzzleId);
  if (!puzzle) {
    return '';
  }

  return JSON.stringify({
    id: puzzle.id,
    type: puzzle.type,
    name: puzzle.name,
    description: puzzle.description,
    difficulty: puzzle.difficulty,
    challenge: puzzle.challenge,
    hint: puzzle.hint,
    // Don't export solution for security
  }, null, 2);
}

/**
 * Import puzzle results for tracking
 */
export interface PuzzleResult {
  puzzleId: number;
  solved: boolean;
  solution?: string;
  attempts: number;
  timeMs: number;
  timestamp: Date;
}

/**
 * Generate a solving report
 */
export function generateSolvingReport(results: PuzzleResult[]): string {
  const totalAttempts = results.reduce((sum, r) => sum + r.attempts, 0);
  const totalTime = results.reduce((sum, r) => sum + r.timeMs, 0);
  const solved = results.filter(r => r.solved).length;

  const report = `
Puzzle Solving Report
=====================
Total Puzzles Attempted: ${results.length}
Successfully Solved: ${solved} (${((solved / results.length) * 100).toFixed(1)}%)
Total Attempts: ${formatLargeNumber(totalAttempts)}
Total Time: ${(totalTime / 1000).toFixed(2)}s
Average Time per Puzzle: ${(totalTime / results.length / 1000).toFixed(2)}s

By Difficulty:
${generateDifficultyBreakdown(results)}
  `;

  return report.trim();
}

function generateDifficultyBreakdown(results: PuzzleResult[]): string {
  const byDifficulty: Record<string, { total: number; solved: number }> = {};

  results.forEach(result => {
    const puzzle = cryptoPuzzles.find(p => p.id === result.puzzleId);
    if (puzzle) {
      if (!byDifficulty[puzzle.difficulty]) {
        byDifficulty[puzzle.difficulty] = { total: 0, solved: 0 };
      }
      byDifficulty[puzzle.difficulty].total++;
      if (result.solved) {
        byDifficulty[puzzle.difficulty].solved++;
      }
    }
  });

  return Object.entries(byDifficulty)
    .map(([diff, stats]) => `  ${diff}: ${stats.solved}/${stats.total}`)
    .join('\n');
}
