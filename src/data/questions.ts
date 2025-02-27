
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

// Sample questions - in a real app, this would be a much larger set
export const allQuestions: Question[] = [
  // Beginner level questions
  {
    id: 1,
    title: "Hello, World!",
    difficulty: "beginner",
    description: 
      "Write a function `hello_world()` that returns the string 'Hello, World!'.",
    starterCode: 
      "def hello_world():\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "hello_world()",
        expected: "Hello, World!"
      }
    ],
    hints: [
      "Remember that you need to return a string, not print it.",
      "Use the return keyword to send a value back from your function."
    ]
  },
  {
    id: 2,
    title: "Sum of Two Numbers",
    difficulty: "beginner",
    description: 
      "Write a function `add_numbers(a, b)` that takes two numbers as parameters and returns their sum.",
    starterCode: 
      "def add_numbers(a, b):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "add_numbers(5, 7)",
        expected: "12"
      },
      {
        input: "add_numbers(-3, 8)",
        expected: "5"
      },
      {
        input: "add_numbers(0, 0)",
        expected: "0"
      }
    ],
    hints: [
      "The + operator is used to add two numbers together.",
      "Make sure your function returns the result of the addition."
    ]
  },
  {
    id: 3,
    title: "Even or Odd",
    difficulty: "beginner",
    description: 
      "Write a function `is_even(number)` that returns 'Even' if the number is even, and 'Odd' if the number is odd.",
    starterCode: 
      "def is_even(number):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "is_even(4)",
        expected: "Even"
      },
      {
        input: "is_even(7)",
        expected: "Odd"
      },
      {
        input: "is_even(0)",
        expected: "Even"
      }
    ],
    hints: [
      "An even number is divisible by 2 with no remainder.",
      "Use the modulo operator (%) to check if a number is even."
    ]
  },
  {
    id: 4,
    title: "Reverse a String",
    difficulty: "beginner",
    description: 
      "Write a function `reverse_string(text)` that takes a string as input and returns the string reversed.",
    starterCode: 
      "def reverse_string(text):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "reverse_string('hello')",
        expected: "olleh"
      },
      {
        input: "reverse_string('Python')",
        expected: "nohtyP"
      },
      {
        input: "reverse_string('')",
        expected: ""
      }
    ],
    hints: [
      "There are several ways to reverse a string in Python.",
      "Try using string slicing with a negative step: text[::-1]"
    ]
  },
  
  // Intermediate level questions
  {
    id: 5,
    title: "Palindrome Checker",
    difficulty: "intermediate",
    description: 
      "Write a function `is_palindrome(text)` that checks if a given string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward, ignoring spaces, punctuation, and capitalization.",
    starterCode: 
      "def is_palindrome(text):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "is_palindrome('racecar')",
        expected: "True"
      },
      {
        input: "is_palindrome('A man, a plan, a canal: Panama')",
        expected: "True"
      },
      {
        input: "is_palindrome('hello')",
        expected: "False"
      }
    ],
    hints: [
      "You'll need to remove spaces and punctuation, and convert to lowercase first.",
      "Try using the re module to replace non-alphanumeric characters."
    ]
  },
  {
    id: 6,
    title: "FizzBuzz",
    difficulty: "intermediate",
    description: 
      "Write a function `fizzbuzz(n)` that returns an array of strings from 1 to n. For multiples of 3, use 'Fizz' instead of the number. For multiples of 5, use 'Buzz'. For numbers that are multiples of both 3 and 5, use 'FizzBuzz'.",
    starterCode: 
      "def fizzbuzz(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "fizzbuzz(15)",
        expected: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']"
      }
    ],
    hints: [
      "Use modulo to check if a number is divisible by 3 or 5.",
      "Build a list and append the appropriate string for each number."
    ]
  },
  {
    id: 7,
    title: "Two Sum",
    difficulty: "intermediate",
    description: 
      "Write a function `two_sum(nums, target)` that returns the indices of two numbers in the array such that they add up to the target number.",
    starterCode: 
      "def two_sum(nums, target):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "two_sum([2, 7, 11, 15], 9)",
        expected: "[0, 1]"
      },
      {
        input: "two_sum([3, 2, 4], 6)",
        expected: "[1, 2]"
      }
    ],
    hints: [
      "Using a nested loop would work, but there's a more efficient approach.",
      "Consider using a dictionary to store the numbers you've already seen."
    ]
  },
  
  // Pro level questions
  {
    id: 8,
    title: "Valid Anagram",
    difficulty: "pro",
    description: 
      "Write a function `is_anagram(s, t)` that returns True if t is an anagram of s, and False otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    starterCode: 
      "def is_anagram(s, t):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "is_anagram('anagram', 'nagaram')",
        expected: "True"
      },
      {
        input: "is_anagram('rat', 'car')",
        expected: "False"
      }
    ],
    hints: [
      "Consider how you could compare the character frequencies in both strings.",
      "Sorting both strings could be one approach."
    ]
  },
  {
    id: 9,
    title: "Merge Intervals",
    difficulty: "pro",
    description: 
      "Write a function `merge_intervals(intervals)` that merges all overlapping intervals and returns an array of the non-overlapping intervals that cover all the intervals in the input.",
    starterCode: 
      "def merge_intervals(intervals):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "merge_intervals([[1,3],[2,6],[8,10],[15,18]])",
        expected: "[[1,6],[8,10],[15,18]]"
      },
      {
        input: "merge_intervals([[1,4],[4,5]])",
        expected: "[[1,5]]"
      }
    ],
    hints: [
      "Start by sorting the intervals by their start time.",
      "Merge overlapping intervals as you iterate through the sorted list."
    ]
  },
  {
    id: 10,
    title: "LRU Cache",
    difficulty: "pro",
    description: 
      "Implement an LRU (Least Recently Used) cache. It should support the following operations: get and put. get(key) - Get the value of the key if the key exists in the cache, otherwise return -1. put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.",
    starterCode: 
      "class LRUCache:\n    def __init__(self, capacity):\n        # Initialize your data structure here\n        pass\n        \n    def get(self, key):\n        # Return the value of the key if it exists, otherwise return -1\n        pass\n        \n    def put(self, key, value):\n        # Update the value of the key if it exists\n        # Otherwise, add the key-value pair to the cache\n        # If the number of keys exceeds the capacity, invalidate the least recently used key\n        pass\n",
    testCases: [
      {
        input: "cache = LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1); cache.put(3, 3); cache.get(2); cache.put(4, 4); cache.get(1); cache.get(3); cache.get(4);",
        expected: "1, -1, -1, 3, 4"
      }
    ],
    hints: [
      "Consider using a combination of a hash map and a doubly linked list.",
      "The hash map gives O(1) access time, while the doubly linked list allows O(1) removal and insertion at both ends."
    ]
  }
];
