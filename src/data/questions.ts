
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

// Complete list of questions organized by difficulty
export const allQuestions: Question[] = [
  // ===== BEGINNER LEVEL QUESTIONS (Easy) =====
  
  // Basic Python Operations
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
    title: "Swap Two Variables",
    difficulty: "beginner",
    description: 
      "Write a function `swap_variables(a, b)` that swaps the values of two variables without using a third variable. Return the swapped values as a tuple (b, a).",
    starterCode: 
      "def swap_variables(a, b):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "swap_variables(5, 10)",
        expected: "(10, 5)"
      },
      {
        input: "swap_variables('hello', 'world')",
        expected: "('world', 'hello')"
      }
    ],
    hints: [
      "You can use arithmetic operations to swap numeric values.",
      "For strings or other types, you can use tuple packing and unpacking."
    ]
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "Celsius to Fahrenheit",
    difficulty: "beginner",
    description: 
      "Write a function `celsius_to_fahrenheit(celsius)` that converts a temperature from Celsius to Fahrenheit and returns the result.",
    starterCode: 
      "def celsius_to_fahrenheit(celsius):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "celsius_to_fahrenheit(0)",
        expected: "32.0"
      },
      {
        input: "celsius_to_fahrenheit(100)",
        expected: "212.0"
      },
      {
        input: "celsius_to_fahrenheit(-40)",
        expected: "-40.0"
      }
    ],
    hints: [
      "The formula to convert Celsius to Fahrenheit is: F = (C × 9/5) + 32",
      "Make sure to return a float value."
    ]
  },
  {
    id: 6,
    title: "Largest of Three Numbers",
    difficulty: "beginner",
    description: 
      "Write a function `find_largest(a, b, c)` that returns the largest of three numbers.",
    starterCode: 
      "def find_largest(a, b, c):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "find_largest(5, 10, 3)",
        expected: "10"
      },
      {
        input: "find_largest(-5, -10, -3)",
        expected: "-3"
      },
      {
        input: "find_largest(5, 5, 5)",
        expected: "5"
      }
    ],
    hints: [
      "You can use the max() function.",
      "You can also use if-elif-else statements to compare the numbers."
    ]
  },
  {
    id: 7,
    title: "Factorial",
    difficulty: "beginner",
    description: 
      "Write a function `factorial(n)` that returns the factorial of a non-negative integer n.",
    starterCode: 
      "def factorial(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "factorial(5)",
        expected: "120"
      },
      {
        input: "factorial(0)",
        expected: "1"
      },
      {
        input: "factorial(1)",
        expected: "1"
      }
    ],
    hints: [
      "The factorial of n is the product of all positive integers less than or equal to n.",
      "You can use a loop to calculate the factorial.",
      "Remember that 0! = 1 by definition."
    ]
  },
  {
    id: 8,
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
      "Try using string slicing with a negative step: text[::-1]",
      "You could also convert the string to a list, reverse it, and then join it back."
    ]
  },
  {
    id: 9,
    title: "Count Vowels",
    difficulty: "beginner",
    description: 
      "Write a function `count_vowels(text)` that counts the number of vowels (a, e, i, o, u) in a given string. Ignore case sensitivity.",
    starterCode: 
      "def count_vowels(text):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "count_vowels('hello')",
        expected: "2"
      },
      {
        input: "count_vowels('Python Programming')",
        expected: "4"
      },
      {
        input: "count_vowels('AEIOU')",
        expected: "5"
      }
    ],
    hints: [
      "Convert the string to lowercase first.",
      "Iterate through the string and check if each character is a vowel.",
      "Keep a counter to track the number of vowels."
    ]
  },
  {
    id: 10,
    title: "Square and Cube",
    difficulty: "beginner",
    description: 
      "Write a function `square_and_cube(n)` that returns a tuple containing the square and cube of a number n.",
    starterCode: 
      "def square_and_cube(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "square_and_cube(2)",
        expected: "(4, 8)"
      },
      {
        input: "square_and_cube(0)",
        expected: "(0, 0)"
      },
      {
        input: "square_and_cube(-3)",
        expected: "(9, -27)"
      }
    ],
    hints: [
      "The square of a number is the number multiplied by itself: n * n or n ** 2",
      "The cube of a number is the number raised to the power of 3: n ** 3",
      "Return the result as a tuple (square, cube)."
    ]
  },
  {
    id: 11,
    title: "Leap Year",
    difficulty: "beginner",
    description: 
      "Write a function `is_leap_year(year)` that checks if a given year is a leap year. Return True if it is, and False otherwise.",
    starterCode: 
      "def is_leap_year(year):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "is_leap_year(2020)",
        expected: "True"
      },
      {
        input: "is_leap_year(1900)",
        expected: "False"
      },
      {
        input: "is_leap_year(2000)",
        expected: "True"
      }
    ],
    hints: [
      "A leap year is divisible by 4",
      "However, if a year is divisible by 100, it is not a leap year, unless...",
      "It is also divisible by 400, in which case it is a leap year."
    ]
  },
  {
    id: 12,
    title: "Area of a Circle",
    difficulty: "beginner",
    description: 
      "Write a function `circle_area(radius)` that computes the area of a circle with a given radius. Use π = 3.14159 and round the result to 2 decimal places.",
    starterCode: 
      "def circle_area(radius):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "circle_area(5)",
        expected: "78.54"
      },
      {
        input: "circle_area(0)",
        expected: "0.0"
      },
      {
        input: "circle_area(2.5)",
        expected: "19.63"
      }
    ],
    hints: [
      "The formula for the area of a circle is A = πr²",
      "Use the math module's math.pi constant for more precision if you want",
      "Use the round(number, 2) function to round the result to 2 decimal places."
    ]
  },
  {
    id: 13,
    title: "Sum of Digits",
    difficulty: "beginner",
    description: 
      "Write a function `sum_of_digits(number)` that calculates the sum of all the digits in a given positive integer.",
    starterCode: 
      "def sum_of_digits(number):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "sum_of_digits(123)",
        expected: "6"
      },
      {
        input: "sum_of_digits(9999)",
        expected: "36"
      },
      {
        input: "sum_of_digits(0)",
        expected: "0"
      }
    ],
    hints: [
      "Convert the number to a string to easily iterate through its digits.",
      "Remember to convert each digit back to an integer before adding.",
      "You could also use modulo (%) and integer division (//) to extract digits."
    ]
  },
  {
    id: 14,
    title: "Reverse Integer",
    difficulty: "beginner",
    description: 
      "Write a function `reverse_integer(n)` that reverses the digits of a given integer. The sign of the number should remain the same.",
    starterCode: 
      "def reverse_integer(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "reverse_integer(123)",
        expected: "321"
      },
      {
        input: "reverse_integer(-456)",
        expected: "-654"
      },
      {
        input: "reverse_integer(1000)",
        expected: "1"
      }
    ],
    hints: [
      "Convert the absolute value of the number to a string.",
      "Reverse the string.",
      "Convert back to an integer and restore the sign."
    ]
  },
  
  // Loops and Lists
  {
    id: 15,
    title: "Fibonacci Sequence",
    difficulty: "beginner",
    description: 
      "Write a function `fibonacci(n)` that returns a list containing the first n Fibonacci numbers. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
    starterCode: 
      "def fibonacci(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "fibonacci(1)",
        expected: "[0]"
      },
      {
        input: "fibonacci(5)",
        expected: "[0, 1, 1, 2, 3]"
      },
      {
        input: "fibonacci(10)",
        expected: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]"
      }
    ],
    hints: [
      "Initialize the sequence with the first two Fibonacci numbers: 0 and 1.",
      "Use a loop to generate the subsequent numbers.",
      "For each iteration, add the last two numbers to get the next one."
    ]
  },
  {
    id: 16,
    title: "Sum of List Elements",
    difficulty: "beginner",
    description: 
      "Write a function `sum_list(numbers)` that calculates the sum of all elements in a list.",
    starterCode: 
      "def sum_list(numbers):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "sum_list([1, 2, 3, 4, 5])",
        expected: "15"
      },
      {
        input: "sum_list([-1, -2, -3])",
        expected: "-6"
      },
      {
        input: "sum_list([])",
        expected: "0"
      }
    ],
    hints: [
      "You can use the sum() function.",
      "Alternatively, use a loop to iterate through the list and maintain a running total."
    ]
  },
  {
    id: 17,
    title: "Find Min and Max",
    difficulty: "beginner",
    description: 
      "Write a function `min_max(numbers)` that finds the smallest and largest numbers in a list. Return them as a tuple (min, max).",
    starterCode: 
      "def min_max(numbers):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "min_max([1, 2, 3, 4, 5])",
        expected: "(1, 5)"
      },
      {
        input: "min_max([-10, 5, 0, 100])",
        expected: "(-10, 100)"
      },
      {
        input: "min_max([7, 7, 7])",
        expected: "(7, 7)"
      }
    ],
    hints: [
      "You can use the min() and max() functions.",
      "Alternatively, sort the list and take the first and last elements."
    ]
  },
  {
    id: 18,
    title: "Reverse a List",
    difficulty: "beginner",
    description: 
      "Write a function `reverse_list(items)` that reverses the elements of a list without using the built-in reverse() method.",
    starterCode: 
      "def reverse_list(items):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "reverse_list([1, 2, 3, 4, 5])",
        expected: "[5, 4, 3, 2, 1]"
      },
      {
        input: "reverse_list(['a', 'b', 'c'])",
        expected: "['c', 'b', 'a']"
      },
      {
        input: "reverse_list([])",
        expected: "[]"
      }
    ],
    hints: [
      "You can use slicing with a negative step: items[::-1]",
      "Or create a new list and append items from the original list in reverse order."
    ]
  },
  {
    id: 19,
    title: "Remove Duplicates",
    difficulty: "beginner",
    description: 
      "Write a function `remove_duplicates(items)` that removes duplicate elements from a list while preserving the original order.",
    starterCode: 
      "def remove_duplicates(items):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "remove_duplicates([1, 2, 2, 3, 4, 4, 5])",
        expected: "[1, 2, 3, 4, 5]"
      },
      {
        input: "remove_duplicates(['a', 'b', 'a', 'c', 'b'])",
        expected: "['a', 'b', 'c']"
      },
      {
        input: "remove_duplicates([])",
        expected: "[]"
      }
    ],
    hints: [
      "You can use a set to track seen items, but sets don't preserve order.",
      "Use a list and only add items that haven't been seen yet."
    ]
  },
  {
    id: 20,
    title: "Second Largest Number",
    difficulty: "beginner",
    description: 
      "Write a function `second_largest(numbers)` that finds the second largest number in a list. If the list has fewer than 2 unique elements, return None.",
    starterCode: 
      "def second_largest(numbers):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "second_largest([1, 2, 3, 4, 5])",
        expected: "4"
      },
      {
        input: "second_largest([5, 5, 5, 5])",
        expected: "None"
      },
      {
        input: "second_largest([10, 10, 9, 8, 7])",
        expected: "9"
      }
    ],
    hints: [
      "Remove duplicates and sort the list in descending order.",
      "Check if there are at least 2 unique elements before returning the second largest.",
      "You could also iterate through the list once to find the largest, then again to find the second largest."
    ]
  },
  
  // More beginner questions can continue...
  
  // ===== INTERMEDIATE LEVEL QUESTIONS =====
  
  {
    id: 50,
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
      "Try using the re module to replace non-alphanumeric characters.",
      "Compare the cleaned string with its reverse."
    ]
  },
  {
    id: 51,
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
      "Build a list and append the appropriate string for each number.",
      "Check for divisibility by both 3 and 5 first (i.e., divisibility by 15)."
    ]
  },
  {
    id: 52,
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
      "Consider using a dictionary to store the numbers you've already seen and their indices.",
      "For each number, check if the complement (target - num) is in the dictionary."
    ]
  },
  {
    id: 53,
    title: "Recursive Fibonacci",
    difficulty: "intermediate",
    description: 
      "Write a recursive function `fibonacci_recursive(n)` that returns the nth Fibonacci number. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
    starterCode: 
      "def fibonacci_recursive(n):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "fibonacci_recursive(0)",
        expected: "0"
      },
      {
        input: "fibonacci_recursive(1)",
        expected: "1"
      },
      {
        input: "fibonacci_recursive(10)",
        expected: "55"
      }
    ],
    hints: [
      "The base cases are fibonacci_recursive(0) = 0 and fibonacci_recursive(1) = 1.",
      "For n > 1, fibonacci_recursive(n) = fibonacci_recursive(n-1) + fibonacci_recursive(n-2).",
      "Be careful with large values of n, as simple recursion can be inefficient."
    ]
  },
  {
    id: 54,
    title: "Binary Search",
    difficulty: "intermediate",
    description: 
      "Write a function `binary_search(arr, target)` that implements binary search to find the index of a target element in a sorted array. If the element is not found, return -1.",
    starterCode: 
      "def binary_search(arr, target):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "binary_search([1, 3, 5, 7, 9], 5)",
        expected: "2"
      },
      {
        input: "binary_search([2, 4, 6, 8, 10], 7)",
        expected: "-1"
      },
      {
        input: "binary_search([1, 2, 3, 4, 5], 1)",
        expected: "0"
      }
    ],
    hints: [
      "Start with two pointers: left at the beginning of the array and right at the end.",
      "Compare the middle element with the target in each iteration.",
      "If the middle element is less than the target, move the left pointer; if it's greater, move the right pointer."
    ]
  },
  
  // More intermediate questions can continue...
  
  // ===== PRO LEVEL QUESTIONS =====
  
  {
    id: 80,
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
      "Sorting both strings could be one approach.",
      "Using a dictionary to count character occurrences is another approach."
    ]
  },
  {
    id: 81,
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
      "Merge overlapping intervals as you iterate through the sorted list.",
      "Two intervals [a,b] and [c,d] overlap if b >= c."
    ]
  },
  {
    id: 82,
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
      "The hash map gives O(1) access time, while the doubly linked list allows O(1) removal and insertion at both ends.",
      "Move a node to the front of the list whenever it is accessed or updated."
    ]
  },
  {
    id: 83,
    title: "Implement Trie",
    difficulty: "pro",
    description: 
      "Implement a trie with insert, search, and startsWith methods. A trie (pronounced as 'try') is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.",
    starterCode: 
      "class Trie:\n    def __init__(self):\n        # Initialize your data structure here\n        pass\n        \n    def insert(self, word):\n        # Inserts a word into the trie\n        pass\n        \n    def search(self, word):\n        # Returns True if the word is in the trie, else False\n        pass\n        \n    def starts_with(self, prefix):\n        # Returns True if there is any word in the trie that starts with the given prefix\n        pass\n",
    testCases: [
      {
        input: "trie = Trie(); trie.insert('apple'); trie.search('apple'); trie.search('app'); trie.starts_with('app'); trie.insert('app'); trie.search('app');",
        expected: "True, False, True, True"
      }
    ],
    hints: [
      "Use a tree-like data structure where each node represents a single character.",
      "Each node should keep track of its children (one for each possible character).",
      "You might want to have a special flag at nodes where words end."
    ]
  },
  {
    id: 84,
    title: "Longest Increasing Subsequence",
    difficulty: "pro",
    description: 
      "Write a function `longest_increasing_subsequence(nums)` that finds the length of the longest strictly increasing subsequence in an array of integers.",
    starterCode: 
      "def longest_increasing_subsequence(nums):\n    # Write your code here\n    pass\n",
    testCases: [
      {
        input: "longest_increasing_subsequence([10,9,2,5,3,7,101,18])",
        expected: "4"
      },
      {
        input: "longest_increasing_subsequence([0,1,0,3,2,3])",
        expected: "4"
      },
      {
        input: "longest_increasing_subsequence([7,7,7,7,7,7,7])",
        expected: "1"
      }
    ],
    hints: [
      "This is a classic dynamic programming problem.",
      "Define dp[i] as the length of the longest increasing subsequence ending at index i.",
      "For each element, check all previous elements to see if they can be included in a longer subsequence."
    ]
  }
];
