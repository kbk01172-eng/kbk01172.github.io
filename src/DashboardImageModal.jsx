import { useEffect, useRef } from 'react'
import './dashboard-popups.css'

const designs = {
  goal: { src: '/dashboard-popups/goal.png', title: '혈당 목표', width: 600, ratio: 1715 / 1726 },
  meal: { src: '/dashboard-popups/meal.png', title: '식사 & 혈당', width: 540, ratio: 1510 / 2048 },
  daily: { src: '/dashboard-popups/daily.png', title: '오늘의 평균 혈당 추이', width: 600, ratio: 1810 / 2048 },
  current: { src: '/dashboard-popups/current.png', title: '현재 혈당', width: 650, ratio: 1873 / 1387 },
}

export default function DashboardImageModal({ type, onClose }) {
  const dialogRef = useRef(null)
  const design = designs[type]
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [])
  if (!design) return null
  return (
    <dialog
      ref={dialogRef}
      className="dashboard-design-dialog"
      aria-label={design.title}
      style={{ '--popup-width': `${design.width}px`, '--popup-ratio': design.ratio }}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
    >
      <img src={design.src} alt={`${design.title} 상세 화면 — 제공된 시안 이미지`} />
      <button type="button" className="dashboard-design-close" aria-label="팝업 닫기" autoFocus onClick={onClose} />
    </dialog>
  )
}
