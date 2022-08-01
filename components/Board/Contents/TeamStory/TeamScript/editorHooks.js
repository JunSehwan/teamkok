import { useCallback, useState, useEffect } from "react"
import initialData from "./data.json"
import edjsHTML from 'editorjs-html';
// Set editor data after initializing
export const useSetData = (editor, data) => {
  useEffect(() => {
    if (!editor || !data) {
      return
    }

    editor?.isReady?.then(() => {
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
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  // const edjsParser = edjsHTML();
  // Mimic async data load
  useEffect(() => {
    try {
      if (loading) {
        setTimeout(() => {
          if (description) {
            setTimeout(() => {
              try {
                console.group("EDITOR load data")
                const parsedOne = [];
                parsedOne?.push(JSON.parse(description));
                setData(parsedOne[0])
                console.dir(parsedOne[0])
              } catch (e) {
                console.error(e);
              }
            }, [2000])
          } else {
            console.info("No saved data, using initial")
            console.dir(initialData)
            setData(initialData)
          }
          setLoading(false);
          console.groupEnd()
        }, [2000])
      }
      // const saved = localStorage.getItem(dataKey)
    } catch (err) {
      // 👇️ This runs
      console.log('Error: ', err.message);
    }
  }, [description, data, loading])

  return { data, loading }
}