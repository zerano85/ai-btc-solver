/**
 * Cryptographic Puzzle Definitions
 * Diverse set of cryptographic challenges with solutions
 */

export type PuzzleType = 
  | "bitcoin-address" 
  | "hash-preimage" 
  | "cipher-decode" 
  | "pattern-analysis"
  | "private-key-recovery";

export interface CryptoPuzzle {
  id: number;
  type: PuzzleType;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  challenge: string;
  hint?: string;
  solution?: string;
  solutionMethod?: string;
  reward?: string;
  // Bitcoin-specific fields
  bits?: number;
  address?: string;
  balance?: string;
}

/**
 * Comprehensive collection of cryptographic puzzles
 */
export const cryptoPuzzles: CryptoPuzzle[] = [
  // Bitcoin Address Puzzles (Original)
  {
    id: 1,
    type: "bitcoin-address",
    name: "Puzzle #1 - 1 bit",
    description: "Find the private key for a 1-bit Bitcoin address",
    difficulty: "easy",
    challenge: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH",
    bits: 1,
    address: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH",
    balance: "0.001",
    solution: "1",
    solutionMethod: "Brute force: 2^1 = 2 possible keys",
    hint: "Only 2 possible private keys to try"
  },
  {
    id: 2,
    type: "bitcoin-address",
    name: "Puzzle #2 - 2 bits",
    description: "Find the private key for a 2-bit Bitcoin address",
    difficulty: "easy",
    challenge: "1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb",
    bits: 2,
    address: "1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb",
    balance: "0.002",
    solution: "3",
    solutionMethod: "Brute force: 2^2 = 4 possible keys",
    hint: "Search space: 0-3"
  },
  {
    id: 3,
    type: "bitcoin-address",
    name: "Puzzle #3 - 3 bits",
    description: "Find the private key for a 3-bit Bitcoin address",
    difficulty: "easy",
    challenge: "19ZewH8Kk1PDbSNdJ97FP4EiCjTRaZMZQA",
    bits: 3,
    address: "19ZewH8Kk1PDbSNdJ97FP4EiCjTRaZMZQA",
    balance: "0.003",
    solution: "7",
    solutionMethod: "Brute force: 2^3 = 8 possible keys",
    hint: "Maximum value for 3 bits"
  },
  {
    id: 4,
    type: "bitcoin-address",
    name: "Puzzle #4 - 4 bits",
    description: "Find the private key for a 4-bit Bitcoin address",
    difficulty: "easy",
    challenge: "1EhqbyUMvvs7BfL8goY6qcPbD6YKfPqb7e",
    bits: 4,
    address: "1EhqbyUMvvs7BfL8goY6qcPbD6YKfPqb7e",
    balance: "0.004",
    solution: "8",
    solutionMethod: "Brute force: 2^4 = 16 possible keys",
    hint: "Middle of the search space"
  },
  {
    id: 5,
    type: "bitcoin-address",
    name: "Puzzle #5 - 5 bits",
    description: "Find the private key for a 5-bit Bitcoin address",
    difficulty: "easy",
    challenge: "1E6NuFjCi27W5zoXg8TRdcSRq84zJeBW3k",
    bits: 5,
    address: "1E6NuFjCi27W5zoXg8TRdcSRq84zJeBW3k",
    balance: "0.005",
    solution: "21",
    solutionMethod: "Brute force: 2^5 = 32 possible keys",
    hint: "Around 2/3 of the maximum"
  },
  
  // Hash Preimage Puzzles
  {
    id: 6,
    type: "hash-preimage",
    name: "SHA-256 Simple Preimage",
    description: "Find the input that produces this SHA-256 hash",
    difficulty: "easy",
    challenge: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    solution: "",
    solutionMethod: "Hash of empty string",
    hint: "Sometimes the simplest answer is the right one"
  },
  {
    id: 7,
    type: "hash-preimage",
    name: "SHA-256 Common Word",
    description: "Find the common English word that produces this hash",
    challenge: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
    difficulty: "easy",
    solution: "foo",
    solutionMethod: "Dictionary attack with common words",
    hint: "Three letter word, often used in programming examples"
  },
  {
    id: 8,
    type: "hash-preimage",
    name: "SHA-256 Numeric Pattern",
    description: "Find the numeric string that hashes to this value",
    challenge: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
    difficulty: "medium",
    solution: "1",
    solutionMethod: "Brute force numeric strings",
    hint: "Single digit number"
  },
  
  // Cipher Decode Puzzles
  {
    id: 9,
    type: "cipher-decode",
    name: "Caesar Cipher - ROT13",
    description: "Decode this ROT13 encrypted Bitcoin private key hint",
    difficulty: "easy",
    challenge: "GUVF VF N FRPERG ZRFFNTR",
    solution: "THIS IS A SECRET MESSAGE",
    solutionMethod: "Apply ROT13 transformation (shift by 13)",
    hint: "Classic rotation cipher"
  },
  {
    id: 10,
    type: "cipher-decode",
    name: "Base64 Encoded Key",
    description: "Decode this Base64 encoded private key fragment",
    difficulty: "easy",
    challenge: "UHJpdmF0ZUtleUZyYWdtZW50",
    solution: "PrivateKeyFragment",
    solutionMethod: "Base64 decoding",
    hint: "Standard encoding for binary-to-text"
  },
  {
    id: 11,
    type: "cipher-decode",
    name: "Hex to ASCII",
    description: "Convert this hexadecimal string to reveal the key",
    difficulty: "easy",
    challenge: "48656c6c6f20426974636f696e",
    solution: "Hello Bitcoin",
    solutionMethod: "Hexadecimal to ASCII conversion",
    hint: "Common encoding for binary data"
  },
  {
    id: 12,
    type: "cipher-decode",
    name: "XOR Cipher",
    description: "Decode this XOR encrypted message (key: 'KEY')",
    difficulty: "medium",
    challenge: "0a1e1b1f4b0a1e1b1f",
    solution: "BITCOIN",
    solutionMethod: "XOR decryption with known key",
    hint: "XOR each byte with cycling key bytes"
  },
  
  // Pattern Analysis Puzzles
  {
    id: 13,
    type: "pattern-analysis",
    name: "Fibonacci Sequence",
    description: "Find the next number in the sequence to unlock the key",
    difficulty: "medium",
    challenge: "1, 1, 2, 3, 5, 8, 13, 21, ?",
    solution: "34",
    solutionMethod: "Fibonacci sequence: sum of previous two numbers",
    hint: "Each number is the sum of the previous two"
  },
  {
    id: 14,
    type: "pattern-analysis",
    name: "Prime Number Pattern",
    description: "Identify the pattern in these prime numbers",
    difficulty: "medium",
    challenge: "2, 3, 5, 7, 11, 13, 17, 19, ?",
    solution: "23",
    solutionMethod: "Sequence of prime numbers",
    hint: "These are consecutive prime numbers"
  },
  {
    id: 15,
    type: "pattern-analysis",
    name: "Binary Pattern",
    description: "Decode the binary pattern to find the key value",
    difficulty: "medium",
    challenge: "01000010 01010100 01000011",
    solution: "BTC",
    solutionMethod: "Binary to ASCII conversion",
    hint: "8 bits per character"
  },
  
  // Advanced Bitcoin Puzzles
  {
    id: 16,
    type: "bitcoin-address",
    name: "Puzzle #10 - 10 bits",
    description: "Find the private key for a 10-bit Bitcoin address",
    difficulty: "medium",
    challenge: "16JrGhLx5bcBSA34kew9V6Mufa4aXhFe9X",
    bits: 10,
    address: "16JrGhLx5bcBSA34kew9V6Mufa4aXhFe9X",
    balance: "0.01",
    solutionMethod: "Brute force: 2^10 = 1,024 possible keys",
    hint: "Feasible with modern computing"
  },
  {
    id: 17,
    type: "bitcoin-address",
    name: "Puzzle #15 - 15 bits",
    description: "Find the private key for a 15-bit Bitcoin address",
    difficulty: "medium",
    challenge: "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so",
    bits: 15,
    address: "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so",
    balance: "0.015",
    solutionMethod: "Brute force: 2^15 = 32,768 possible keys",
    hint: "Requires optimized algorithms"
  },
  {
    id: 18,
    type: "bitcoin-address",
    name: "Puzzle #20 - 20 bits",
    description: "Find the private key for a 20-bit Bitcoin address",
    difficulty: "hard",
    challenge: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
    bits: 20,
    address: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
    balance: "0.02",
    solutionMethod: "Brute force: 2^20 = 1,048,576 possible keys",
    hint: "Requires parallel processing"
  },
  
  // Expert Level Puzzles
  {
    id: 19,
    type: "hash-preimage",
    name: "Double SHA-256 Challenge",
    description: "Find input for double SHA-256 hash (Bitcoin style)",
    difficulty: "hard",
    challenge: "4f8b42c22dd3729b519ba6f68d2da7cc5b2d606d05daed5ad5128cc03e6c6358",
    solutionMethod: "Double hashing: SHA256(SHA256(input))",
    hint: "Bitcoin uses double SHA-256 for security"
  },
  {
    id: 20,
    type: "private-key-recovery",
    name: "Partial Key Recovery",
    description: "Recover private key from partial information",
    difficulty: "hard",
    challenge: "First 64 bits known: 0x0000000000000000...",
    solutionMethod: "Brute force remaining bits with known prefix",
    hint: "Reduce search space using known information"
  },
  
  // Impossible/Demonstration Puzzles
  {
    id: 21,
    type: "bitcoin-address",
    name: "Puzzle #50 - 50 bits",
    description: "Theoretical demonstration of computational limits",
    difficulty: "impossible",
    challenge: "14oFNXucftsHiUMY8uctg6N487riuyXs4h",
    bits: 50,
    address: "14oFNXucftsHiUMY8uctg6N487riuyXs4h",
    balance: "0.05",
    solutionMethod: "Brute force: 2^50 = 1.1 quadrillion attempts",
    hint: "Would take years even with GPUs"
  },
  {
    id: 22,
    type: "bitcoin-address",
    name: "Puzzle #66 - Real Bitcoin Challenge",
    description: "Part of the famous Bitcoin puzzle transaction",
    difficulty: "impossible",
    challenge: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
    bits: 66,
    address: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
    balance: "6.6",
    solutionMethod: "Beyond current computational feasibility",
    hint: "Requires breakthrough in quantum computing or algorithms"
  }
];

/**
 * Get puzzles by type
 */
export function getPuzzlesByType(type: PuzzleType): CryptoPuzzle[] {
  return cryptoPuzzles.filter(p => p.type === type);
}

/**
 * Get puzzles by difficulty
 */
export function getPuzzlesByDifficulty(difficulty: CryptoPuzzle['difficulty']): CryptoPuzzle[] {
  return cryptoPuzzles.filter(p => p.difficulty === difficulty);
}

/**
 * Get puzzle by ID
 */
export function getPuzzleById(id: number): CryptoPuzzle | undefined {
  return cryptoPuzzles.find(p => p.id === id);
}
