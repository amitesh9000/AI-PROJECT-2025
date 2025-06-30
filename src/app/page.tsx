"use client"

import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Home() {
  const [input, setInput] = useState("")
  const [summary, setSummary] = useState("")
  const summaryRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async () => {
    const res = await fetch("https://ai-project-2025-backend-production.up.railway.app/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    })
    const data = await res.json()
    setSummary(data.summary)

    // Scroll to summary section
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100) // slight delay to ensure rendering
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          AI Text Summarizer
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Paste any long text below and get a concise summary instantly.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <Textarea
                rows={8}
                placeholder="Paste your long text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mb-4"
              />

              <div className="flex justify-end">
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90">
                  ✨ Summarize
                </Button>
              </div>
            </CardContent>
          </Card>

          {summary && (
            <motion.div
              ref={summaryRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Card className="bg-white/70 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-2 text-purple-700">Summary:</h2>
                  <p className="text-gray-800">{summary}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
      <footer className="text-center text-sm text-gray-600 mt-10">
  <p>
    Made with ❤️ by <strong>Amitesh Intelligence(AI) Systems 2025</strong>
  </p>
  <p className="mt-1">
    <a
      href="https://www.linkedin.com/in/amitesh-roy-65140b1a0/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      Connect on LinkedIn
    </a>
  </p>
</footer>

    </div>
  )
}
