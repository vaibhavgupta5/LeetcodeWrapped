"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ data }) {
  const username =
    data?.matchedUser?.profile?.realName ||
    data?.matchedUser?.username ||
    "User";
  
  // Get most used language
  const languages = data?.matchedUser?.languageProblemCount || [];
  const topLanguage = languages.length > 0
    ? [...languages].sort((a, b) => b.problemsSolved - a.problemsSolved)[0]?.languageName
    : null;
  
  // Language-specific syntax
  const getGreeting = (lang, name) => {
    const greetings = {
      'C++': `cout << "Hello, ${name}" << endl;`,
      'Java': `System.out.println("Hello, ${name}");`,
      'Python': `print(f"Hello, ${name}")`,
      'Python3': `print(f"Hello, ${name}")`,
      'JavaScript': `console.log(\`Hello, ${name}\`);`,
      'TypeScript': `console.log(\`Hello, ${name}\`);`,
      'C': `printf("Hello, %s\\n", "${name}");`,
      'C#': `Console.WriteLine($"Hello, ${name}");`,
      'Go': `fmt.Println("Hello, ${name}")`,
      'Ruby': `puts "Hello, ${name}"`,
      'Swift': `print("Hello, ${name}")`,
      'Kotlin': `println("Hello, ${name}")`,
      'Rust': `println!("Hello, {}", "${name}");`,
      'PHP': `echo "Hello, ${name}";`,
      'Scala': `println(s"Hello, ${name}")`,
    };
    return greetings[lang] || `print("Hello, ${name}")`;
  };
  
  const [text, setText] = useState("");
  const fullText = getGreeting(topLanguage, username);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="z-10 font-mono text-xl md:text-2xl text-[#2cbb5d] mb-8 h-20 text-center">
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-3 h-6 bg-[#2cbb5d] ml-1 align-middle"
        />
      </div>

      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        className="z-10 text-8xl font-bold tracking-tighter text-[#FFA116]"
      >
        2025
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="z-10 mt-4 text-gray-400 text-lg"
      >
        LeetCode Wrapped
      </motion.p>
    </div>
  );
}
