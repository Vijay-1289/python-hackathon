
export interface TestCase {
  input: string;
  expected: string;
}

export interface Question {
  id: number;
  title: string;
  difficulty: "beginner" | "intermediate" | "pro";
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

type LanguageQuestions = {
  [key: string]: Question[];
};

export const languageQuestions: LanguageQuestions = {
  "JavaScript": [
    {
      id: 1001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(arr)` that calculates the sum of all elements in an array.",
      starterCode: "function sumArray(arr) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "sumArray([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sumArray([-1, -2, -3])", expected: "-6" },
        { input: "sumArray([])", expected: "0" }
      ],
      hints: [
        "You can use a loop to iterate through the array",
        "Consider using array methods like reduce()"
      ]
    },
    {
      id: 1002,
      title: "Reverse String",
      difficulty: "beginner",
      description: "Write a function `reverseString(str)` that reverses a string.",
      starterCode: "function reverseString(str) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "reverseString('hello')", expected: "'olleh'" },
        { input: "reverseString('JavaScript')", expected: "'tpircSavaJ'" },
        { input: "reverseString('')", expected: "''" }
      ],
      hints: [
        "You can convert the string to an array, reverse it, and join it back",
        "You can also use a loop to build the reversed string"
      ]
    },
    {
      id: 1003,
      title: "Find Maximum Element",
      difficulty: "beginner",
      description: "Write a function `findMax(arr)` that finds the largest number in an array.",
      starterCode: "function findMax(arr) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "findMax([1, 3, 5, 7, 9])", expected: "9" },
        { input: "findMax([-5, -3, -1])", expected: "-1" },
        { input: "findMax([10, 10, 10])", expected: "10" }
      ],
      hints: [
        "You can use the Math.max() function with the spread operator",
        "You can also iterate through the array to find the maximum value"
      ]
    },
    {
      id: 1004,
      title: "Check Palindrome",
      difficulty: "beginner",
      description: "Write a function `isPalindrome(str)` that checks if a string is a palindrome.",
      starterCode: "function isPalindrome(str) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "isPalindrome('racecar')", expected: "true" },
        { input: "isPalindrome('hello')", expected: "false" },
        { input: "isPalindrome('A man a plan a canal Panama')", expected: "true" }
      ],
      hints: [
        "Remove spaces and convert to lowercase before checking",
        "Compare the string with its reverse"
      ]
    },
    {
      id: 1005,
      title: "Fibonacci Sequence",
      difficulty: "intermediate",
      description: "Write a function `fibonacci(n)` that returns the nth number in the Fibonacci sequence.",
      starterCode: "function fibonacci(n) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "fibonacci(0)", expected: "0" },
        { input: "fibonacci(1)", expected: "1" },
        { input: "fibonacci(10)", expected: "55" }
      ],
      hints: [
        "The Fibonacci sequence starts with 0 and 1",
        "Each subsequent number is the sum of the two preceding ones",
        "Consider using recursion or iteration"
      ]
    },
    // Add more JavaScript questions
  ],
  "Java": [
    {
      id: 2001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(int[] arr)` that calculates the sum of all elements in an array.",
      starterCode: "public class Solution {\n  public static int sumArray(int[] arr) {\n    // Write your code here\n    return 0;\n  }\n}\n",
      testCases: [
        { input: "sumArray(new int[]{1, 2, 3, 4, 5})", expected: "15" },
        { input: "sumArray(new int[]{-1, -2, -3})", expected: "-6" },
        { input: "sumArray(new int[]{})", expected: "0" }
      ],
      hints: [
        "You can use a for loop to iterate through the array",
        "Consider using Java streams for a functional approach"
      ]
    },
    {
      id: 2002,
      title: "Reverse String",
      difficulty: "beginner",
      description: "Write a function `reverseString(String str)` that reverses a string.",
      starterCode: "public class Solution {\n  public static String reverseString(String str) {\n    // Write your code here\n    return \"\";\n  }\n}\n",
      testCases: [
        { input: "reverseString(\"hello\")", expected: "\"olleh\"" },
        { input: "reverseString(\"Java\")", expected: "\"avaJ\"" },
        { input: "reverseString(\"\")", expected: "\"\"" }
      ],
      hints: [
        "You can use StringBuilder to reverse the string efficiently",
        "You can also convert the string to a character array and reverse it"
      ]
    },
    // Add more Java questions
  ],
  "TypeScript": [
    {
      id: 3001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(arr: number[]): number` that calculates the sum of all elements in an array.",
      starterCode: "function sumArray(arr: number[]): number {\n  // Write your code here\n  return 0;\n}\n",
      testCases: [
        { input: "sumArray([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sumArray([-1, -2, -3])", expected: "-6" },
        { input: "sumArray([])", expected: "0" }
      ],
      hints: [
        "You can use a loop to iterate through the array",
        "Consider using array methods like reduce()"
      ]
    },
    {
      id: 3002,
      title: "Reverse String",
      difficulty: "beginner",
      description: "Write a function `reverseString(str: string): string` that reverses a string.",
      starterCode: "function reverseString(str: string): string {\n  // Write your code here\n  return '';\n}\n",
      testCases: [
        { input: "reverseString('hello')", expected: "'olleh'" },
        { input: "reverseString('TypeScript')", expected: "'tpircSepyT'" },
        { input: "reverseString('')", expected: "''" }
      ],
      hints: [
        "You can convert the string to an array, reverse it, and join it back",
        "Take advantage of TypeScript's type system"
      ]
    },
    // Add more TypeScript questions
  ],
  "Go": [
    {
      id: 4001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(arr []int) int` that calculates the sum of all elements in an array.",
      starterCode: "package main\n\nfunc sumArray(arr []int) int {\n  // Write your code here\n  return 0\n}\n",
      testCases: [
        { input: "sumArray([]int{1, 2, 3, 4, 5})", expected: "15" },
        { input: "sumArray([]int{-1, -2, -3})", expected: "-6" },
        { input: "sumArray([]int{})", expected: "0" }
      ],
      hints: [
        "You can use a for loop to iterate through the array",
        "Go has a simple syntax for iterating through slices"
      ]
    },
    // Add more Go questions
  ],
  "C#": [
    {
      id: 5001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `SumArray(int[] arr)` that calculates the sum of all elements in an array.",
      starterCode: "public class Solution {\n  public static int SumArray(int[] arr) {\n    // Write your code here\n    return 0;\n  }\n}\n",
      testCases: [
        { input: "SumArray(new int[]{1, 2, 3, 4, 5})", expected: "15" },
        { input: "SumArray(new int[]{-1, -2, -3})", expected: "-6" },
        { input: "SumArray(new int[]{})", expected: "0" }
      ],
      hints: [
        "You can use a for loop to iterate through the array",
        "Consider using LINQ for a more functional approach"
      ]
    },
    // Add more C# questions
  ],
  "Ruby": [
    {
      id: 6001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sum_array(arr)` that calculates the sum of all elements in an array.",
      starterCode: "def sum_array(arr)\n  # Write your code here\nend\n",
      testCases: [
        { input: "sum_array([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sum_array([-1, -2, -3])", expected: "-6" },
        { input: "sum_array([])", expected: "0" }
      ],
      hints: [
        "Ruby has built-in methods like reduce or inject for this purpose",
        "You can also use a simple loop to calculate the sum"
      ]
    },
    // Add more Ruby questions
  ],
  "Swift": [
    {
      id: 7001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(_ arr: [Int]) -> Int` that calculates the sum of all elements in an array.",
      starterCode: "func sumArray(_ arr: [Int]) -> Int {\n  // Write your code here\n  return 0\n}\n",
      testCases: [
        { input: "sumArray([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sumArray([-1, -2, -3])", expected: "-6" },
        { input: "sumArray([])", expected: "0" }
      ],
      hints: [
        "Swift has built-in methods like reduce for this purpose",
        "You can also use a simple loop to calculate the sum"
      ]
    },
    // Add more Swift questions
  ],
  "Kotlin": [
    {
      id: 8001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray(arr: IntArray): Int` that calculates the sum of all elements in an array.",
      starterCode: "fun sumArray(arr: IntArray): Int {\n  // Write your code here\n  return 0\n}\n",
      testCases: [
        { input: "sumArray(intArrayOf(1, 2, 3, 4, 5))", expected: "15" },
        { input: "sumArray(intArrayOf(-1, -2, -3))", expected: "-6" },
        { input: "sumArray(intArrayOf())", expected: "0" }
      ],
      hints: [
        "Kotlin has built-in methods like sum() for this purpose",
        "You can also use a simple loop to calculate the sum"
      ]
    },
    // Add more Kotlin questions
  ],
  "PHP": [
    {
      id: 9001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sumArray($arr)` that calculates the sum of all elements in an array.",
      starterCode: "function sumArray($arr) {\n  // Write your code here\n}\n",
      testCases: [
        { input: "sumArray([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sumArray([-1, -2, -3])", expected: "-6" },
        { input: "sumArray([])", expected: "0" }
      ],
      hints: [
        "PHP has a built-in function array_sum() for this purpose",
        "You can also use a loop to calculate the sum"
      ]
    },
    // Add more PHP questions
  ],
  "Rust": [
    {
      id: 10001,
      title: "Sum of Array Elements",
      difficulty: "beginner",
      description: "Write a function `sum_array(arr: &[i32]) -> i32` that calculates the sum of all elements in an array.",
      starterCode: "fn sum_array(arr: &[i32]) -> i32 {\n  // Write your code here\n  0\n}\n",
      testCases: [
        { input: "sum_array(&[1, 2, 3, 4, 5])", expected: "15" },
        { input: "sum_array(&[-1, -2, -3])", expected: "-6" },
        { input: "sum_array(&[])", expected: "0" }
      ],
      hints: [
        "Rust has a built-in iter().sum() method for this purpose",
        "You can also use a loop to calculate the sum"
      ]
    },
    // Add more Rust questions
  ],
  "SQL": [
    {
      id: 11001,
      title: "Sum of Column Values",
      difficulty: "beginner",
      description: "Write a SQL query to calculate the sum of all values in the 'amount' column of the 'transactions' table.",
      starterCode: "-- Write your SQL query here\n",
      testCases: [
        { input: "Given a table 'transactions' with column 'amount' containing values [10, 20, 30, 40, 50]", expected: "SUM(amount) = 150" }
      ],
      hints: [
        "Use the SUM() aggregate function",
        "The basic syntax is: SELECT SUM(column_name) FROM table_name;"
      ]
    },
    // Add more SQL questions
  ],
  "R": [
    {
      id: 12001,
      title: "Sum of Vector Elements",
      difficulty: "beginner",
      description: "Write a function `sum_vector(v)` that calculates the sum of all elements in a vector.",
      starterCode: "sum_vector <- function(v) {\n  # Write your code here\n}\n",
      testCases: [
        { input: "sum_vector(c(1, 2, 3, 4, 5))", expected: "15" },
        { input: "sum_vector(c(-1, -2, -3))", expected: "-6" },
        { input: "sum_vector(c())", expected: "0" }
      ],
      hints: [
        "R has a built-in sum() function for this purpose",
        "Be careful with empty vectors"
      ]
    },
    // Add more R questions
  ],
  "Dart": [
    {
      id: 13001,
      title: "Sum of List Elements",
      difficulty: "beginner",
      description: "Write a function `sumList(List<int> list)` that calculates the sum of all elements in a list.",
      starterCode: "int sumList(List<int> list) {\n  // Write your code here\n  return 0;\n}\n",
      testCases: [
        { input: "sumList([1, 2, 3, 4, 5])", expected: "15" },
        { input: "sumList([-1, -2, -3])", expected: "-6" },
        { input: "sumList([])", expected: "0" }
      ],
      hints: [
        "Dart has a built-in fold() method that can be used for this purpose",
        "You can also use a simple loop to calculate the sum"
      ]
    },
    // Add more Dart questions
  ]
};
