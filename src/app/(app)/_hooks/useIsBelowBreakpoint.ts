import { useEffect, useState } from 'react'

const useIsBelowBreakpoint = (gridBreakpointUp = '768px'): readonly [boolean] => {
  const gridBreakpointUpMatch = typeof window !== 'undefined' && window.matchMedia(`(min-width: ${gridBreakpointUp})`)
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false)
  // Update component client-side after render to avoid server/client mismatch
  // eslint-disable-next-line no-unused-vars
  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => {
    setIsBelowBreakpoint(gridBreakpointUpMatch && !gridBreakpointUpMatch.matches)
    setIsComponentMounted(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (gridBreakpointUpMatch) {
    const onBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsBelowBreakpoint(false)
      } else {
        setIsBelowBreakpoint(true)
      }
    }
    // addListener is deprecated but older browsers (e.g., Safari < 14) don't support addEventListener
    // So we support both
    if (gridBreakpointUpMatch.addEventListener) {
      gridBreakpointUpMatch.addEventListener('change', onBreakpointChange)
    } else if (gridBreakpointUpMatch.addListener) {
      gridBreakpointUpMatch.addListener(onBreakpointChange)
    }
  }

  return [
    isBelowBreakpoint,
  ] as const
}

export default useIsBelowBreakpoint
