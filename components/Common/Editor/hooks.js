import { useCallback, useState, useEffect } from "react"
import initialData from "./data.json"
import dynamic from 'next/dynamic'
export const dataKey = "editorData"

export const useSaveCallback = (editor) => {
  return useCallback(async () => {
    if (!editor) return
    try {
      const out = await editor?.save()
      // console.group("EDITOR onSave")
      // console.dir(out)
      // localStorage.setItem(dataKey, JSON.stringify(out))  // 데이터 저장
      // console.info("Saved in localStorage")
      // console.groupEnd()
      return (JSON.stringify(out))
    } catch (e) {
      alert("Save Error", e);
      console.error("SAVE RESULT failed", e)
    }
  }, [editor])
}

// Set editor data after initializing
export const useSetData = (editor, data) => {
  useEffect(() => {
    if (!editor || !data) {
      return
    }
    editor?.isReady?.then(() => {
      // console.log('Editor.js is ready to work!')
      // fixing an annoying warning in Chrome
      // `addRange(): The given range isn't in document.`
      // /render passed JSON data
      setTimeout(() => {
        if (editor)
          dynamic(() => { editor?.render(data), { ssr: false } })
      }, 500)
    }).catch((reason) => {
      // console.log(`Editor.js initialization failed because of ${reason}`)
    });
  }, [editor, data])
}

export const useClearDataCallback = (editor) => {
  return useCallback(
    (e) => {
      e.preventDefault()
      if (!editor) {
        return
      }
      editor?.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor?.clear()
        }, 100)
      })
    },
    [editor]
  )
}


// 초기화 - 시작
// load saved data
export const useLoadData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mimic async data load
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      console.group("EDITOR load data")
      // const saved = localStorage.getItem(dataKey)   // 데이터 저장
      // if (saved) {
      //   const parsed = JSON.parse(saved)
      //   setData(parsed)
      //   setData(parsed)
      //   console.dir(parsed)
      // } else {
      console.info("No saved data, using initial")
      console.dir(data)
      setData(data)
      // }
      console.groupEnd()
      setLoading(false)
    }, 200)

    return () => {
      setLoading(false)
      clearTimeout(id)
    }
  }, [data])

  return { data, loading }
}