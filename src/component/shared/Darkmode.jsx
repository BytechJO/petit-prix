import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function DarkModeToggle({ title }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const dark = saved === "dark"
    setIsDark(dark)
    document.documentElement.classList.toggle("dark", dark)
  }, [])

  // تغيير الثيم
  const toggle = () => {
    const newValue = !isDark
    setIsDark(newValue)

    document.documentElement.classList.toggle("dark", newValue)
    localStorage.setItem("theme", newValue ? "dark" : "light")
  }

  return (
    <button
      onClick={toggle}
      title={title}
      style={{
        ...container,
        justifyContent: isDark ? "flex-start" : "flex-end",
        background: isDark ? "#333" : "#ddd",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          ...handle,
          background: isDark ? "#111" : "#fff",
        }}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.div>
    </button>
  )
}

const container = {
  width: 70,
  height: 34,
  borderRadius: 50,
  display: "flex",
  alignItems: "center",
  padding: 4,
  cursor: "pointer",
}

const handle = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
}
