import { useCallback, useState, useEffect } from "react"
import initialData from "./data.json"

// Set editor data after initializing
export const useSetData = (editor, data) => {
  useEffect(() => {
    if (!editor || !data) {
      return
    }

    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.render(data)
      }, 100)
    })
  }, [editor, data])
}

export const useClearDataCallback = (editor) => {
  return useCallback(
    (ev) => {
      ev.preventDefault()
      if (!editor) {
        return
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear()
        }, 100)
      })
    },
    [editor]
  )
}

// load saved data
export const useLoadData = ({ description }) => {
  const [data, setData] = useState(description)
  const [loading, setLoading] = useState(false)
  // console.log(data, "fuckya");
  // console.log(description, "ken");
  // Mimic async data load
  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => {
      console.group("EDITOR load data")
      // const saved = localStorage.getItem(dataKey)
      if (description) {
        try {
          const parsed = JSON.parse(description)
          setData(parsed)
          console.dir(parsed)
        } catch (e) {
          console.error(e);
        }
      } else {
        console.info("No saved data, using initial")
        console.dir(initialData)
        setData(initialData)
      }

      console.groupEnd()
      setLoading(false)
    }, 200)

    return () => {
      setLoading(false)
      clearTimeout(id)
    }
  }, [description])

  return { data, loading }
}