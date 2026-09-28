import { useEffect, useRef, useState } from 'react'
import './App.css'
import DashboardImageModal from './DashboardImageModal.jsx'
import { videoCategories, videoData } from './careguide-videos.js'

const graphPoints = [
  { x: 70, y: 142 },
  { x: 155, y: 126 },
  { x: 240, y: 115 },
  { x: 325, y: 151 },
  { x: 410, y: 105 },
  { x: 495, y: 86 },
  { x: 580, y: 116 },
  { x: 665, y: 96 },
  { x: 750, y: 96 },
]

const dailyValues = [
  70, 90, 102, 108, 92, 85, 68, 76, 94, 106,
  118, 136, 136, 122, 108, 96, 112, 104, 118,
]

function SparkleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M15 3c1.4 7.3 3.7 9.6 11 11-7.3 1.4-9.6 3.7-11 11C3.6 17.7 1.3 15.4-6 14 1.3 12.6 3.6 10.3 5 3c1.4 7.3 3.7 9.6 10 11"
        transform="translate(6 2) scale(.72)"
        fill="white"
      />
      <path
        d="M24 20c.5 2.5 1.5 3.5 4 4-2.5.5-3.5 1.5-4 4-.5-2.5-1.5-3.5-4-4 2.5-.5 3.5-1.5 4-4Z"
        fill="white"
      />
    </svg>
  )
}

function ModalShell({ children, onClose, type }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="detail-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`detail-modal detail-modal-${type}`}
        role="dialog"
        aria-modal="true"
        aria-label={type === 'current' ? '현재 혈당' : type === 'daily' ? '오늘의 평균 혈당 추이' : type === 'goal' ? '혈당 목표' : '식사 & 혈당'}
      >
        {children}
      </div>
    </div>
  )
}

function CurrentGlucoseModal({ onClose }) {
  return (
    <ModalShell onClose={onClose} type="current">
      <div className="current-popup-heading">
        <h2>현재 혈당</h2>
        <button className="detail-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
      </div>

      <div className="current-popup-content">
        <div className="current-popup-left">
          <img
            src="/current-glucose.png"
            alt="혈당 측정기"
            className="current-popup-meter"
          />

          <div className="current-popup-value">
            <strong>122</strong>
            <span>mg/dL</span>
          </div>

          <div className="current-popup-normal">
            <span className="current-popup-dot" />
            <strong>정상 범위</strong>
          </div>

          <div className="current-popup-time">
            <span>측정 시각</span>
            <strong>05.24(일) 14:30</strong>
          </div>
        </div>

        <div className="current-popup-right">
          <div className="current-change-card">
            <div className="current-change-top">
              <strong>최근 변화(30분 기준)</strong>
              <span>▼ 5 mg/dL 감소</span>
            </div>

            <div className="current-change-chart">
              <div className="current-chart-labels">
                <strong>115 mg/dL</strong>
                <strong>110 mg/dL</strong>
              </div>

              <div className="current-chart-line">
                <span className="current-point current-point-start" />
                <span className="current-point current-point-end" />
              </div>

              <div className="current-chart-times">
                <span>30분 전</span>
                <span>현재</span>
              </div>
            </div>
          </div>

          <div className="current-ai-card">
            <span className="current-ai-icon" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none">
                <path
                  d="M17.7 4.5c1.5 7 3.8 9.3 10.8 10.8-7 1.5-9.3 3.8-10.8 10.8-1.5-7-3.8-9.3-10.8-10.8 7-1.5 9.3-3.8 10.8-10.8Z"
                  fill="white"
                />
                <path
                  d="M30.4 22.3c.7 3.2 1.8 4.3 5 5-3.2.7-4.3 1.8-5 5-.7-3.2-1.8-4.3-5-5 3.2-.7 4.3-1.8 5-5Z"
                  fill="white"
                />
              </svg>
            </span>

            <div className="current-ai-copy">
              <strong>Ai 분석</strong>
              <p>
                현재 혈당은 정상 범위 내에 있습니다.<br />
                최근 30분 동안 5mg/dL 감소하여 안정적인<br />
                상태를 유지하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
function GoalModal({ onClose }) {
  const days = [['월', 72], ['화', 75], ['수', 80], ['목', 76], ['금', 82], ['토', 79], ['일', 78]]

  return (
    <ModalShell onClose={onClose} type="goal">
      <div className="goal-popup-heading">
        <h2>혈당 목표</h2>
        <button className="detail-close" onClick={onClose} aria-label="닫기">×</button>
      </div>
      <div className="goal-popup-body">
        <div className="goal-popup-left">
          <img src="/glucose-goal.png" className="goal-popup-target" alt="혈당 목표 달성률" />
          <div className="goal-popup-range">
            <span>목표 범위</span>
            <div><strong>70-140</strong><small>mg/dL</small></div>
          </div>
          <div className="goal-popup-rate">
            <span>주간 목표 달성률</span>
            <div><strong>78</strong><b>%</b></div>
            <p>● <span>목표 달성!</span></p>
          </div>
          <div className="goal-popup-time"><span>측정 시각</span><strong>05.24(일) 14:30</strong></div>
        </div>

        <div className="goal-popup-right">
          <div className="goal-range-card">
            <strong>목표 범위 유지 시간 <span>(주간)</span></strong>
            <p><b>18.7시간</b> / 24시간</p>
            <div className="goal-range-bars">
              {[
                ['목표 범위 내 (70-140 mg/dL)', 78, '#ff6b00'],
                ['목표 범위 초과 (> 140 mg/dL)', 15, '#10b9bc'],
                ['목표 범위 미만 (< 70 mg/dL)', 7, '#bec3c6'],
              ].map(([label, value, color]) => (
                <div className="goal-range-row" key={label}>
                  <span>{label}</span>
                  <div className="goal-range-track"><i style={{ width: `${value}%`, background: color }} /></div>
                  <b>{value}%</b>
                </div>
              ))}
            </div>
          </div>
          <div className="goal-week-card">
            <strong>주간 달성률 변화</strong>
            <div className="goal-week-bars">
              {days.map(([day, value]) => (
                <div className="goal-week-day" key={day}>
                  <span>{value}%</span>
                  <i className={day === '일' ? 'today' : ''} style={{ height: `${(value - 50) * 1.65}px` }} />
                  <small>{day}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

function DailyChart() {
  const width = 800
  const height = 220
  const left = 100
  const right = 55
  const top = 26
  const bottom = 50
  const innerWidth = width - left - right
  const innerHeight = height - top - bottom

  const points = dailyValues.map((value, index) => ({
    x: left + (index / (dailyValues.length - 1)) * innerWidth,
    y: top + ((200 - value) / 200) * innerHeight,
  }))

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${left},${top + innerHeight} ${line} ${left + innerWidth},${top + innerHeight}`
  const selected = points[10]

  return (
    <svg
      className="detail-chart-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="하루 혈당 변화 그래프"
    >
      <defs>
        <linearGradient id="dailyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7900" stopOpacity=".15" />
          <stop offset="100%" stopColor="#ff7900" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[200, 150, 100, 50, 0].map((value) => {
        const y = top + ((200 - value) / 200) * innerHeight
        return (
          <g key={value}>
            <line x1={left} x2={width - right} y1={y} y2={y} stroke="#e9e9ec" />
            <text x={left - 14} y={y + 5} textAnchor="end" fill="#8a8d93" fontSize="15">
              {value}
            </text>
          </g>
        )
      })}

      <polygon points={area} fill="url(#dailyFill)" />
      <polyline
        points={line}
        fill="none"
        stroke="#ff7000"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <circle cx={selected.x} cy={selected.y} r="16" fill="#ff7000" opacity=".14" />
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={index === 10 ? 6 : 3.5}
          fill="#ff7000"
          stroke={index === 10 ? 'white' : 'none'}
          strokeWidth="2"
        />
      ))}

      {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map(
        (label, index) => (
          <text
            key={label}
            x={left + (index / 6) * innerWidth}
            y={height - 5}
            textAnchor="middle"
            fill="#898c93"
            fontSize="14"
          >
            {label}
          </text>
        ),
      )}
    </svg>
  )
}

function DailyModal({ onClose }) {
  return (
    <ModalShell onClose={onClose} type="daily">
      <div className="detail-modal-heading">
        <h2>오늘의 평균 혈당 추이</h2>
        <button className="detail-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
      </div>

      <div className="detail-date"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M7 3v4M17 3v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>2026.09.24 (목)</div>

      <div className="daily-stat-grid">
        {[
          ['오늘 평균', '122'],
          ['최고 혈당', '145'],
          ['최저 혈당', '90'],
          ['변동 폭', '55'],
        ].map(([label, value]) => (
          <div className="daily-stat" key={label}>
            <span>{label}</span>
            <div>
              <strong>{value}</strong>
              <small>mg/dL</small>
            </div>
          </div>
        ))}
      </div>

      <div className="daily-chart-card">
        <div className="daily-tooltip">125mg/dL</div>
        <DailyChart />
      </div>

      <div className="daily-bottom-grid">
        <div className="daily-bottom-card">
          <div className="daily-bottom-heading">
            <strong>시간대별 평균</strong>
            <span>단위 (mg/dL)</span>
          </div>
          <div className="daily-hours">
            {[['00시','04시'], ['04시','08시'], ['08시','12시'], ['12시','16시'], ['16시','20시'], ['20시','24시']].map(
              ([from, to]) => <span key={from}><span>{from}</span><span>~</span><span>{to}</span></span>,
            )}
          </div>
          <div className="daily-averages">
            {[95, 98, 90, 128, 115, 108].map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
        </div>

        <div className="daily-bottom-card">
          <strong>혈당 변동 분석</strong>
          <p>
            오전 <em>8시경 최저 혈당 이후</em> 점심 식사 후{' '}
            <b>13시경 최고 혈당</b> 기록하였습니다.<br />
            저녁 시간대에는 안정적인 범위를 유지하고 있습니다.
          </p>
        </div>
      </div>
    </ModalShell>
  )
}

function MealChart() {
  return (
    <svg
      className="meal-detail-chart"
      viewBox="0 0 540 210"
      preserveAspectRatio="none"
      role="img"
      aria-label="식후 혈당 변화 그래프"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={index}>
          <line x1="40" x2="528" y1={20 + index * 37} y2={20 + index * 37} stroke="#ededf0" />
          <text x="29" y={24 + index * 37} textAnchor="end" fontSize="11" fill="#8e9094">
            {200 - index * 50}
          </text>
        </g>
      ))}

      <path
        d="M64 94 C101 64 131 56 158 57 C195 59 232 68 265 72 C302 79 337 85 365 88 C412 92 460 94 500 94 L500 168 L64 168Z"
        fill="#ff7900"
        opacity=".07"
      />
      <path
        d="M64 94 C101 64 131 56 158 57 C195 59 232 68 265 72 C302 79 337 85 365 88 C412 92 460 94 500 94"
        fill="none"
        stroke="#ff7000"
        strokeWidth="3"
      />

      {[['64', '94'], ['158', '57'], ['265', '72'], ['365', '88'], ['500', '94']].map(
        ([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="4" fill="#ff7000" />
        ),
      )}

      <line x1="158" x2="158" y1="57" y2="168" stroke="#ff9a58" strokeDasharray="3 4" />

      {['식사 전', '식후 30분', '식후 1시간', '식후 2시간', '식후 3시간'].map(
        (label, index) => (
          <text
            key={label}
            x={64 + index * 109}
            y="195"
            textAnchor="middle"
            fontSize="11"
            fill="#8e9094"
          >
            {label}
          </text>
        ),
      )}
    </svg>
  )
}

function MealPeriodIcon({ period }) {
  if (period === '점심') return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 2v7m0 22v7M2 20h7m22 0h7M7.3 7.3l5 5m15.4 15.4 5 5m0-25.4-5 5m-15.4 15.4-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
  if (period === '저녁') return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M32 28.4A14 14 0 0 1 11.6 8 14 14 0 1 0 32 28.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
  )
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M11 28a6 6 0 0 1 1.7-11.7A8.5 8.5 0 0 1 29 19a5 5 0 0 1 0 10H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 9V6m-6 9-3-2m20-5 2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  )
}

function MealAdviceIcon({ type }) {
  return type === 'analysis' ? (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M15 3.5C15.7 11.1 18.9 14.3 26.5 15C18.9 15.7 15.7 18.9 15 26.5C14.3 18.9 11.1 15.7 3.5 15C11.1 14.3 14.3 11.1 15 3.5Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M27 22C27.4 25.5 29 27.1 32.5 27.5C29 27.9 27.4 29.5 27 33C26.6 29.5 25 27.9 21.5 27.5C25 27.1 26.6 25.5 27 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><circle cx="18" cy="13" r="8" stroke="currentColor" strokeWidth="1.7" /><path d="m18 8 1.4 3.2 3.5.3-2.7 2.3.8 3.4-3-1.8-3 1.8.8-3.4-2.7-2.3 3.5-.3L18 8ZM12 19v13l6-4 6 4V19" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
  )
}

function MealModal({ onClose }) {
  const [period, setPeriod] = useState('점심')

  return (
    <ModalShell onClose={onClose} type="meal">
      <div className="detail-modal-heading">
        <h2>식사 &amp; 혈당</h2>
        <button className="detail-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
      </div>

      <div className="detail-date"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M7 3v4M17 3v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>2026.09.24 (목)</div>

      <div className="meal-periods">
        {['아침', '점심', '저녁'].map((item) => (
          <button
            key={item}
            className={period === item ? 'selected' : ''}
            onClick={() => setPeriod(item)}
          >
            <span className="meal-period-icon"><MealPeriodIcon period={item} /></span>
            {item}
          </button>
        ))}
      </div>

      <div className="meal-detail-box">
        <div className="meal-detail-summary">
          <div className="meal-summary-meal"><span className="meal-summary-icon"><MealPeriodIcon period={period} /></span><span><b>{period} 식사</b><br /><span>13:00</span></span></div>
          <div className="meal-summary-reading"><span>식후 최고 혈당</span><span><strong>145</strong> <small>mg/dL</small></span></div>
          <div><span className="meal-danger">위험</span></div>
        </div>

        <div className="meal-detail-chart-heading">
          <strong>식후 혈당 변화</strong>
          <span>단위: mg/dL</span>
        </div>

        <div className="meal-chart-wrap">
          <div className="meal-chart-tip">145</div>
          <MealChart />
        </div>

        <div className="meal-detail-stats">
          {[
            ['식사 전 혈당', '98', '정상'],
            ['식후 최고 혈당', '145', '위험'],
            ['식후 2시간', '98', '정상'],
            ['회복 시간', '3시간', '◷'],
          ].map(([label, value, status]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              {label === '회복 시간' ? <svg className="meal-clock" viewBox="0 0 32 32" fill="none" aria-label="시계"><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6"/><path d="M16 8v9l6 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg> : <small className={status === '위험' ? 'warning' : ''}>{status}</small>}
            </div>
          ))}
        </div>
      </div>

      <div className="meal-advice-grid">
        <div className="meal-advice-card">
          <strong><span className="advice-icon"><MealAdviceIcon type="analysis" /></span> Ai 분석</strong>
          <p>식후 30분 혈당이 상승했지만,<br />3시간 내 목표 범위로 회복되었습니다.</p>
        </div>
        <div className="meal-advice-card">
          <strong><span className="advice-icon"><MealAdviceIcon type="recommendation" /></span> 추천 행동</strong>
          <p>탄수화물 섭취를 줄이고,<br />식후 15분 산책을 추천합니다.</p>
        </div>
      </div>
    </ModalShell>
  )
}

const communityNotes = [
  { date: '2026. 09. 17', text: '식단을 나름대로 조절하고 있는데\n도 혈당이 자꾸 높게 나와요.\n제가 식사 관리를 잘못하고 있는\n건지 궁금해요.', position: 'note-one' },
  { date: '2026. 09. 17', text: '운동은 언제, 얼마나 해야\n혈당 관리에 도움이 될까요?', position: 'note-two' },
  { date: '2026. 09. 17', text: '당뇨약은 평생 계속 먹어야 하나요?', position: 'note-three' },
  { date: '2026. 09. 17', text: '운동은 언제, 얼마나 해야\n혈당 관리에 도움이 될까요?', position: 'note-four' },
  { date: '2026. 09. 11', text: '식단을 나름대로 조절하고 있는데\n도 혈당이 자꾸 높게 나와요.\n제가 식사 관리를 잘못하고 있는\n건지 궁금해요.', position: 'note-five' },
  { date: '2026. 09. 21', text: '외식할 때마다 어떤 메뉴를 골라\n야 할지 고민돼요.\n먹고 싶은 음식도 먹으면서 혈당\n을 관리할 수 있을까요?', position: 'note-six' },
  { date: '2026. 09. 09', text: '당뇨약은 평생 계속 먹어야 하나요?', position: 'note-seven' },
  { date: '2026. 09. 21', text: '외식할 때마다 어떤 메뉴를 골라\n야 할지 고민돼요.\n먹고 싶은 음식도 먹으면서 혈당\n을 관리할 수 있을까요?', position: 'note-eight' },
  { date: '2026. 09. 09', text: '롯* 매실 애사비 꿀맛! 드셔보세용\n제로칼로리임!', position: 'note-nine' },
]

function CommunityPage({ onGoToGlucose }) {
  const [savedOnly, setSavedOnly] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const editorRef = useRef(null)
  const [postedNotes, setPostedNotes] = useState([])
  const formatNote = (command, value) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
  }
  useEffect(() => {
    if (!selectedNote) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedNote(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedNote])

  return (
    <main className="community-page" aria-label="커뮤니티">
      <button className="community-grid-button" type="button" aria-label="혈당 관리 화면으로 이동" onClick={onGoToGlucose}>
        <svg viewBox="0 0 44 44" fill="currentColor" aria-hidden="true"><rect x="3" y="4" width="18" height="19" rx="3"/><rect x="24" y="4" width="17" height="19" rx="3"/><rect x="3" y="26" width="38" height="15" rx="3"/></svg>
      </button>

      <div className="community-notes">
        {communityNotes.filter((_, index) => !savedOnly || index === 4 || index === 7).map((note) => (
          <article className={`community-note ${note.position}`} key={note.position} role="button" tabIndex={0} aria-label={`${note.date} 작성한 경험 보기`} onClick={() => setSelectedNote(note)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedNote(note) } }}>
            <span className="community-note-date">작성일 : {note.date}</span>
            <span className="community-note-quote">“</span>
            <p>{note.text}</p>
          </article>
        ))}
        {postedNotes.map((note, index) => (
          <article className="community-note posted-note" key={`${note}-${index}`} role="button" tabIndex={0} aria-label="오늘 작성한 경험 보기" onClick={() => setSelectedNote({ date: '오늘', text: note })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedNote({ date: '오늘', text: note }) } }}>
            <span className="community-note-date">작성일 : 오늘</span>
            <span className="community-note-quote">“</span>
            <p>{note}</p>
          </article>
        ))}
      </div>

      <h1 className="community-message">당뇨와 관련된 나만의 경험을<br />자유롭게 공유해 주세요</h1>
      <img className="community-mascot" src="/community-character.png" alt="핑크색 커뮤니티 캐릭터" />

      {composerOpen && <div className="community-compose-backdrop" onMouseDown={() => setComposerOpen(false)} />}
      <div className="community-actions">
        <button className={composerOpen ? 'composer-active' : ''} type="button" aria-label="글쓰기" onClick={() => setComposerOpen((open) => !open)}>
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m7 22-1 5 5-1L26 11l-4-4L7 22Z" fill="white"/><path d="m20 9 4 4" stroke="black" strokeWidth="1.5"/></svg>
        </button>
        <button type="button" aria-label="저장한 글 보기" aria-pressed={savedOnly} onClick={() => setSavedOnly((previous) => !previous)}>
          <svg viewBox="0 0 32 32" fill={savedOnly ? '#ff6b00' : 'white'} aria-hidden="true"><path d="M9 4h14a2 2 0 0 1 2 2v22l-9-5-9 5V6a2 2 0 0 1 2-2Z"/></svg>
        </button>
        {composerOpen && (
          <form className="community-compose" onSubmit={(event) => {
            event.preventDefault()
            const text = editorRef.current?.innerText.trim()
            if (!text) { editorRef.current?.focus(); return }
            setPostedNotes((previous) => [text, ...previous])
            setComposerOpen(false)
          }}>
            <div className="community-compose-toolbar" onMouseDown={(event) => event.preventDefault()}>
              <span className="community-compose-quote" aria-hidden="true">“</span>
              <button type="button" aria-label="굵게" onClick={() => formatNote('bold')}><b>B</b></button>
              <button type="button" aria-label="기울임" onClick={() => formatNote('italic')}><i>I</i></button>
              <button type="button" aria-label="밑줄" onClick={() => formatNote('underline')}><u>U</u></button>
              <button type="button" aria-label="취소선" onClick={() => formatNote('strikeThrough')}><s>S</s></button>
              <span className="community-compose-divider" />
              {['#ff1515', '#ffe900', '#00d44b', '#08cdeb'].map((color) => (
                <button className="community-color" type="button" key={color} style={{ '--dot-color': color }} aria-label={`${color} 글자색`} onClick={() => formatNote('foreColor', color)} />
              ))}
            </div>
            <div ref={editorRef} className="community-compose-editor" contentEditable suppressContentEditableWarning role="textbox" aria-label="경험 내용" aria-multiline="true" data-placeholder="글을 작성해주세요." />
            <small className="community-compose-date">작성일 : {new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())}</small>
            <button className="community-submit" type="submit" aria-label="글 등록하기">↑</button>
            <svg className="community-compose-tail" viewBox="0 0 64 45" aria-hidden="true"><path d="M0 0H64C53 7 44 23 35 42Q32 48 27 40C19 26 10 8 0 0Z" /></svg>
          </form>
        )}
      </div>
      {selectedNote && (
        <div className="community-note-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedNote(null) }}>
          <article className="community-selected-note" role="dialog" aria-modal="true" aria-label="선택한 경험">
            <span className="community-note-date">작성일 : {selectedNote.date}</span>
            <button className="community-selected-quote" type="button" aria-label="원래 화면으로 돌아가기" onClick={() => setSelectedNote(null)}>“</button>
            <p>{selectedNote.text}</p>
          </article>
        </div>
      )}
    </main>
  )
}


function CareGuidePage({ onGoToGlucose, onOpenMenu }) {
  const [contentMode, setContentMode] = useState('news')
  const openArticle = (url) => { if (typeof url === 'string' && /^https?:\/\//i.test(url)) window.open(url, '_blank', 'noopener,noreferrer') }
  const [videoCategory, setVideoCategory] = useState('glucose')
  const videos = videoData.glucose
  const categoryVideos = videoData[videoCategory] || []

  const leftNews = [
    { title: '“혈당 걱정 내려놓고 먹어라” 의사가 꼽아준 7가지 과일', desc: '당 부담이 적은 과일 일곱 가지로 혈당 관리', date: '2026. 09. 23', url: 'https://health.chosun.com/site/data/html_dir/2026/09/22/2026092202179.html' },
    { title: '당뇨 진단 6개월 위험 신호”…인슐린 전환 시 췌장암 위험 26.5배', desc: '진단 후 6개월 내 치료 강화될수록 위험 상승', date: '2026. 09. 23', url: 'https://health.chosun.com/site/data/html_dir/2026/09/22/2026092201199.html' },
    { title: '대웅제약, 서울시와 당뇨 전 단계 시민 혈당 관리 나선다… ‘웰다’ 공급', desc: '손목닥터9988과 연계…CGM 측정·생활습관 관리·보건소 상담', date: '2026. 09. 23', url: 'https://www.medworld.co.kr/news/articleView.html?idxno=252302' },
  ]

  const rightNews = [
    { title: '신규 당뇨 진단 후 치료 빨라질수록… 췌장암 위험 26배 높아져', desc: '신규 당뇨병 환자의 임상 양상에 정밀한 감시체계가 필요', date: '2026. 09. 22', url: 'https://www.kfdn.co.kr/73459' },
    { title: '“당뇨 있으면 추석 때 더 조심해야”…저녁 과식·술 삼가고 외식은 한식·일식으로', desc: '당뇨병 환자가 가족이 각별히 주의해야 하는 시기', date: '2025. 09. 24', url: 'https://kormedi.com/2872199/' },
    { title: '1형 당뇨 앓는 아이, 형제자매 발병위험 11.5배”…국내 첫 규명', desc: '18세 미만 1형 당뇨환자 936명 데이터 분석 형제자매 발병률, 일반 소아보다 11.5배↑', date: '2026. 09. 13', url: 'https://www.nongmin.com/article/20260913500087' },
  ]

  const columns = [
    { image: '/column-01.png', title: '당뇨병 치료제 인슐린,\n몸에서 어떤 일을 할까?', url: 'https://www.munhwa.com/article/11601384' },
    { image: '/column-02.png', title: '[24년 차… 1형 당뇨병]\n‘당당약사’ 박상욱의\n건강 루틴 3가지', url: 'https://diabetes.or.kr/newsletter_enews/202306/sub/sub14.php' },
    { image: '/column-03.png', title: '영양사가 추천하는 혈당에\n좋은 음식, 나쁜 음식!', url: 'https://www.pillyze.com/columns/58' },
    { image: '/column-04.png', title: '당뇨병 환자가 일상생활에\n서 할 수 있는 고강도운동', url: 'https://health.chosun.com/healthyLife/column_view.jsp?idx=11319&cidx=341' },
    { image: '/column-05.png', title: '당뇨환자, 스트레스 관리해\n야 혈당 조절 잘 되고 합병증\n예방 가능', url: 'https://blog.naver.com/kunkang1983/223721050397' },
  ]

  return (
    <main className="care-guide-page" aria-label="케어 가이드 당뇨 소식">
      <header className="care-topbar">
        <div className="care-header-left">
          <button type="button" className="care-icon-button" aria-label="메뉴 열기" aria-haspopup="dialog" onClick={onOpenMenu}>
            <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 8h22M3 20h22" /></svg>
          </button>
          <a href="/flow/onboarding.html" aria-label="처음 시작 화면"><img className="care-logo" src="/flow/images/careguide/logo.png" alt="당문당답" /></a>
        </div>
        <nav className="care-top-tabs" aria-label="케어가이드 메뉴">
          <a href="/flow/careguide.html">추천 식단</a>
          <a href="/?page=news" aria-current="page">당뇨 소식 <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="care-grid-button care-icon-button" type="button" aria-label="혈당 관리 화면으로 이동" onClick={onGoToGlucose}>
          <svg viewBox="0 0 28 28" className="care-grid-icon" aria-hidden="true"><rect x="2" y="2" width="11" height="11" rx="1"/><rect x="15" y="2" width="11" height="11" rx="1"/><rect x="2" y="15" width="24" height="11" rx="1"/></svg>
        </button>
      </header>

      {contentMode === 'video' ? (
        <section className="video-content-view">
          <div className="care-intro video-intro">
            <div><h1>영상으로 살펴보는 건강 관리</h1><p>당뇨와 관련된 최신 소식과 건강 정보를 확인해 보세요.</p></div>
            <button className="care-video-button" type="button" onClick={() => { setContentMode('news'); window.scrollTo(0, 0) }}>뉴스, 칼럼 보기 <span>→</span></button>
          </div>
          <div className="video-feature-row">
            <button className="video-main-card" type="button" onClick={() => openArticle('https://www.youtube.com/watch?v=2zsCEk9UUIQ')}>
              <img src="/video-main.png" alt="" /><span className="video-main-shade" />
              <span className="video-recommend">오늘의 추천 영상</span>
              <span className="video-main-copy"><small>2026. 06. 24</small><strong>"인슐린 주사 대신 인공췌장"..당뇨병 치료 새 길</strong></span>
            </button>
            <aside className="video-history"><h3>최근 15일 시청 기록</h3><button type="button" onClick={() => openArticle(videos[1]?.url)}><img src="/video-02.png" alt="" /></button><span className="video-history-down">↓</span></aside>
          </div>
          <section className="video-list-section">
            <h2>이런 영상들은 어떠세요?</h2>
            <div className="video-tags" role="group" aria-label="영상 분류">
              {videoCategories.map((category) => <button key={category.id} type="button" className={videoCategory === category.id ? 'active' : ''} aria-pressed={videoCategory === category.id} onClick={() => setVideoCategory(category.id)}>{category.label}</button>)}
            </div>
            <div className="video-card-grid">{categoryVideos.map((video, index) => <button type="button" className="video-card" key={`${videoCategory}-${video.url}-${index}`} onClick={() => openArticle(video.url)}><img src={video.image} alt="" /><strong>{video.title}</strong><span><small>{video.channel}</small><time>{video.time}</time></span></button>)}</div>
            {categoryVideos.length === 0 && <p className="video-category-empty" role="status">이 분류의 영상을 준비하고 있어요.</p>}
          </section>
        </section>
      ) : (<>
      <section className="care-intro">
        <div><h1>한눈에 보는 당뇨 뉴스</h1><p>당뇨와 관련된 최신 소식과 건강 정보를 확인해 보세요.</p></div>
        <button className="care-video-button" type="button" onClick={() => { setContentMode('video'); window.scrollTo(0, 0) }}>영상 콘텐츠 보기 <span>→</span></button>
      </section>

      <button className="care-hero" type="button" onClick={() => openArticle('https://m.kukinews.com/article/view/kuk202607010187')}>
        <img src="/news-main.png" alt="" /><span className="care-hero-shade" />
        <span className="care-hero-copy"><small>2026. 07. 01</small><strong>‘췌장장애’ 등록 시행…당뇨병 치료제 시장에 쏠린 시선</strong><span>7월부터 ‘췌장장애’ 신규 등록…23년 만에 장애 유형 신설<br />1형 당뇨병·일부 2형 당뇨병 환자 의료 복지 지원 확대<br />국내 제약사, 차세대 당뇨병 치료제 개발 속도</span></span>
        <span className="care-hero-arrow">↗</span>
      </button>

      <section className="care-news-section">
        <div className="care-sort"><span>최신순</span><span className="care-sort-arrow">⌄</span></div>
        <div className="care-news-grid">
          <div className="care-news-list">{leftNews.map((item) => <button type="button" className="care-news-item" key={item.title} onClick={() => openArticle(item.url)}><strong>{item.title}</strong><span className="care-news-meta"><small>{item.desc}</small><time>{item.date}</time></span></button>)}</div>
          <button className="care-center-story" type="button" onClick={() => openArticle('https://v.daum.net/v/G7ESjn5TWZ')}>
            <img src="/news-center.png" alt="" />
            <span className="care-center-story-content"><strong>둘도 씹어먹는 청춘인데… 2030 덮친 당뇨·통풍</strong><span className="care-center-story-info"><small>배달 음식·수면 부족 영향 커 국가차원 건강진단 확대 시급</small><time>2026. 07. 09</time></span></span>
          </button>
          <div className="care-news-list">{rightNews.map((item) => <button type="button" className="care-news-item" key={item.title} onClick={() => openArticle(item.url)}><strong>{item.title}</strong><span className="care-news-meta"><small>{item.desc}</small><time>{item.date}</time></span></button>)}</div>
        </div>
      </section>

      <section className="care-columns-section">
        <h2>연구와 칼럼으로 알아보는 당뇨</h2><p>전문가의 시선으로 풀어낸 건강 이야기부터 최신 연구 논문까지, 당뇨에 관한 다양한 정보를 만나보세요.</p>
        <div className="care-column-row">{columns.map((item, index) => <button type="button" className={`care-column-card care-column-card-${index + 1}`} key={item.title} onClick={() => openArticle(item.url)}><img src={item.image} alt="" /><span className="care-column-overlay" /><span className="care-column-arrow">↗</span><strong>{item.title}</strong></button>)}</div>
        <div className="care-column-nav" aria-hidden="true"><span>←</span><span>→</span></div>
      </section>
      </>)}
    </main>
  )
}

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(() => {
    const page = new URLSearchParams(window.location.search).get('page')
    if (page === 'community') return 'community'
    if (page === 'news') return 'careGuide'
    return 'dashboard'
  })
  const graphLine = graphPoints.map((point) => `${point.x},${point.y}`).join(' ')

  useEffect(() => {
    const page = new URLSearchParams(window.location.search).get('page')
    if (!page) window.location.replace('/flow/onboarding.html')
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [sidebarOpen])

  return (
    <div className={`page${sidebarOpen ? ' sidebar-open' : ''}${currentPage === 'community' ? ' community-mode' : ''}${currentPage === 'careGuide' ? ' care-guide-mode' : ''}${currentPage === 'dashboard' ? ' dashboard-mode' : ''}`}>
      <header className="header">
        <button className="menu-button" aria-label={sidebarOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={sidebarOpen} aria-controls="dashboard-sidebar" onClick={() => setSidebarOpen((open) => !open)}>
          <span />
          <span />
        </button>
        <button type="button" className="logo-home-button" aria-label="처음 시작 화면으로 이동" onClick={() => { window.location.href = '/flow/onboarding.html' }}><img src="/dmdap-logo.png" alt="당문당답" className="logo" /></button>
      </header>

      {sidebarOpen && (
        <div className="sidebar-layer">
          <button className="sidebar-dismiss" aria-label="사이드바 닫기" onClick={() => setSidebarOpen(false)} />
          <aside id="dashboard-sidebar" className="dashboard-sidebar" aria-label="전체 메뉴">
            {currentPage === 'careGuide' && <button type="button" className="care-sidebar-close" aria-label="메뉴 닫기" autoFocus onClick={() => setSidebarOpen(false)}><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 8h22M3 20h22" /></svg></button>}
            <nav className="sidebar-navigation" aria-label="주 메뉴">
              {['상담하기', '혈당 관리', '케어 가이드', '커뮤니티'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={selectedSidebarItem === item ? 'selected' : ''}
                  aria-current={selectedSidebarItem === item ? 'page' : undefined}
                  onClick={() => {
                    setSelectedSidebarItem(item)
                    if (item === '커뮤니티') {
                      setCurrentPage('community')
                      setSidebarOpen(false)
                      window.scrollTo(0, 0)
                    } else if (item === '케어 가이드') {
                      window.location.href = '/flow/careguide.html'
                    } else if (item === '상담하기') {
                      window.location.href = '/flow/index.html'
                    } else if (item === '혈당 관리') {
                      setCurrentPage('dashboard')
                      setSidebarOpen(false)
                      window.history.replaceState({}, '', '/?page=glucose')
                      window.scrollTo(0, 0)
                    }
                  }}
                >
                  <span>{item}</span>
                  {selectedSidebarItem === item && (
                    <svg className="sidebar-selected-arrow" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3.5" />
                      <path d="M15 31 32 16m-12 0h12v12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </nav>
            <button className="sidebar-settings" type="button" aria-label="설정">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.62.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.3 7.3 0 0 0-1.63-.95l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42L9.18 5.3c-.6.24-1.14.56-1.64.95l-2.38-.96a.5.5 0 0 0-.61.22L2.63 8.83a.5.5 0 0 0 .12.64l2.02 1.58a6.8 6.8 0 0 0 0 1.9l-2.02 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .61.22l2.38-.96c.5.39 1.05.71 1.64.95l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.59-.24 1.14-.56 1.63-.95l2.39.96a.5.5 0 0 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/></svg>
            </button>
          </aside>
        </div>
      )}

      {currentPage === 'community' && <CommunityPage onGoToGlucose={() => { setCurrentPage('dashboard'); setSelectedSidebarItem('혈당 관리'); setSidebarOpen(false); window.scrollTo(0, 0) }} />}

      {currentPage === 'careGuide' && <CareGuidePage onOpenMenu={() => setSidebarOpen(true)} onGoToGlucose={() => { setCurrentPage('dashboard'); setSelectedSidebarItem('혈당 관리'); setSidebarOpen(false); window.scrollTo(0, 0) }} />}

      {currentPage === 'dashboard' && <main className="dashboard" id="glucose-dashboard">
        <section className="intro">
          <h1>나의 혈당 흐름을 확인해보세요</h1>
          <p>최근 혈당 변화를 한눈에 확인하고, 나의 관리 흐름을 살펴보세요.</p>
        </section>

        <section className="summary-grid">
          <article className="summary-card">
            <div className="summary-content">
              <div className="card-title">
                <span className="info-icon">i</span>
                <button className="plain-heading current-heading" onClick={() => setActiveModal('current')}>
                  현재 혈당
                </button>
                <span className="normal-dot" />
                <small>정상 범위</small>
              </div>
              <div className="value-row">
                <strong className="big-value">122</strong>
                <span className="unit">mg/dL</span>
              </div>
            </div>
            <img src="/current-glucose.png" className="current-glucose-img" alt="현재 혈당" />
          </article>

          <article className="summary-card">
            <div className="summary-content">
              <div className="card-title">
                <strong>평균 혈당</strong>
                <span className="info-icon">i</span>
              </div>
              <div className="value-row">
                <strong className="big-value">110</strong>
                <span className="unit">mg/dL</span>
              </div>
            </div>
            <img src="/average-glucose.png" className="average-glucose-img" alt="평균 혈당" />
          </article>

          <article className="summary-card">
            <div className="summary-content">
              <div className="card-title">
                <button className="plain-heading goal-heading" onClick={() => setActiveModal('goal')}>혈당 목표</button>
                <span className="info-icon">i</span>
              </div>
              <div className="value-row">
                <strong className="goal-value">70-140</strong>
                <span className="unit">mg/dL</span>
              </div>
            </div>
            <div className="goal-image-wrap">
              <img src="/glucose-goal.png" className="goal-img" alt="혈당 목표" />
              <span className="goal-percent">78%</span>
            </div>
          </article>

          <article className="summary-card tip-card">
            <div className="summary-content">
              <div className="card-title">
                <strong>오늘의 팁</strong>
                <span className="info-icon">i</span>
              </div>
              <p className="tip-text">
                식후 가벼운 산책으로<br />혈당을 관리해 보세요.
              </p>
            </div>
            <img src="/daily-tip.png" className="daily-tip-img" alt="오늘의 팁" />
          </article>
        </section>

        <section className="middle-grid">
          <article className="panel graph-panel">
            <div className="panel-header">
              <button className="plain-heading graph-heading" onClick={() => setActiveModal('daily')}>
                하루 혈당 변화
              </button>
              <div className="period-tabs">
                <button className="active">오늘</button>
                <button>주간</button>
                <button>월간</button>
              </div>
            </div>

            <div className="graph-area">
              <div className="y-axis">
                <span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
              </div>

              <div className="chart">
                <div className="grid-line line-200" />
                <div className="grid-line line-150" />
                <div className="grid-line line-100" />
                <div className="grid-line line-50" />
                <div className="grid-line line-0" />

                <svg className="chart-svg" viewBox="0 0 820 190" preserveAspectRatio="none">
                  <polyline
                    points={graphLine}
                    fill="none"
                    stroke="#ff5a00"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {graphPoints.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="5.5" fill="#ff5a00" />
                  ))}
                </svg>

                <div className="selected-line" />
                <div className="graph-tooltip">145mg/dL</div>

                <div className="x-axis">
                  <span>04:00</span><span>12:00</span><span>20:00</span><span>24:00</span>
                </div>
              </div>
            </div>
          </article>

          <article className="panel doctor-panel" id="consultation">
            <div className="doctor-copy">
              <h2>혈당에 대해 궁금한 점이 있다면?</h2>
              <p>의사 상담으로 이어가 보세요.</p>
            </div>
            <div className="doctor-character-wrap">
              <img src="/doctor-character.png" className="doctor-character" alt="의사 캐릭터" />
            </div>
            <button className="consult-button" type="button" onClick={() => { window.location.href = '/flow/chat.html?expert=doctor' }}>
              상담하기 <span className="arrow-circle">→</span>
            </button>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel record-panel">
            <div className="bottom-title">
              <span className="plain-heading bottom-heading">최근 혈당 기록</span>
              <span className="info-icon">i</span>
            </div>

            <div className="record-row">
              <div className="record-date"><strong>09.24</strong><span>14:30</span></div>
              <div className="record-value"><strong>110</strong><span>mg/dL</span></div>
              <span className="status normal">정상</span>
            </div>

            <div className="record-row">
              <div className="record-date"><strong>09.24</strong><span>12:30</span></div>
              <div className="record-value"><strong>125</strong><span>mg/dL</span></div>
              <span className="status caution">주의</span>
            </div>
          </article>

          <article className="panel meal-panel">
            <div className="meal-header">
              <div className="bottom-title">
                <button className="plain-heading bottom-heading" onClick={() => setActiveModal('meal')}>
                  식사 &amp; 혈당
                </button>
                <span className="info-icon">i</span>
              </div>
              <p>*식사 기록은 직접 입력 또는 연동된 기기 기준입니다.</p>
            </div>

            <div className="meal-row">
              <div className="meal-name">
                <img src="/breakfast-weather.png" className="meal-weather-icon" alt="아침 날씨" />
                <strong>아침 식사&nbsp;&nbsp;08:00</strong>
              </div>
              <div className="meal-glucose">
                식후 최고&nbsp; <strong>125</strong> <span>mg/dL</span>
              </div>
              <span className="status caution">주의</span>
            </div>

            <div className="meal-row">
              <div className="meal-name">
                <img src="/lunch-weather.png" className="meal-weather-icon" alt="점심 날씨" />
                <strong>점심 식사&nbsp;&nbsp;13:00</strong>
              </div>
              <div className="meal-glucose">
                식후 최고&nbsp; <strong>145</strong> <span>mg/dL</span>
              </div>
              <span className="status danger">위험</span>
            </div>
          </article>
        </section>
      </main>}

      {activeModal && <DashboardImageModal type={activeModal} onClose={() => setActiveModal(null)} />}

      <style>{`
        @font-face {
          font-family: 'Gamtan Road Dodum';
          src: url('/gamtan-dotum.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        /* 커뮤니티 화면 */
        .page.community-mode .header { position: relative; z-index: 5; }
        .community-page {
          position: relative; isolation: isolate; width: 100%;
          height: max(720px, 100vh); margin-top: -112px;
          overflow: hidden; background: #fff; color: #111;
        }
        .community-notes { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .community-note {
          position: absolute; display: flex; flex-direction: column;
          width: clamp(265px, 21vw, 340px); height: clamp(225px, 29vh, 290px);
          padding: 25px 27px 23px; background: rgba(255,255,255,.78); border-radius: 23px;
          box-shadow: 0 3px 4px rgba(0,0,0,.2);
          transform: rotate(var(--tilt, 0deg)); transform-origin: center;
          box-sizing: border-box; pointer-events: auto; cursor: pointer;
          transition: transform .32s ease, box-shadow .32s ease;
        }
        .community-note:hover {
          z-index: 3;
          transform: translate(var(--hover-x, 0px), var(--hover-y, 0px)) rotate(var(--tilt, 0deg)) scale(1.055);
          box-shadow: 0 12px 22px rgba(0,0,0,.16);
        }
        .community-note-date { color: #303030; font-size: 11px; white-space: nowrap; }
        .community-note-quote { position: absolute; top: 12px; right: 19px; font-family: Georgia,serif; font-weight: 900; font-size: 73px; line-height: 1; color: #050505; }
        .community-note p { margin: auto 0 0; font-size: 16px; line-height: 1.55; white-space: pre-line; word-break: keep-all; }
        .community-note.note-one { left: 6%; top: 17%; --tilt: 20deg; --hover-x: -12px; --hover-y: 10px; }
        .community-note.note-two { left: 24%; top: -1%; --tilt: -16deg; --hover-x: -10px; --hover-y: -12px; }
        .community-note.note-three { left: 40%; top: -17%; --tilt: 24deg; --hover-y: -15px; }
        .community-note.note-four { left: 61%; top: 1%; --tilt: -12deg; --hover-x: 12px; --hover-y: -12px; }
        .community-note.note-five { left: 78%; top: 4%; --hover-x: 12px; --hover-y: -6px; }
        .community-note.note-six { left: 61%; top: 38%; --tilt: 14deg; --hover-x: 12px; --hover-y: 9px; }
        .community-note.note-seven { left: 85%; top: 42%; --tilt: -31deg; --hover-x: 14px; --hover-y: 8px; }
        .community-note.note-eight { left: 67%; top: 72%; --hover-x: 9px; --hover-y: 12px; }
        .community-note.note-nine { left: 34%; top: 66%; --tilt: -29deg; --hover-x: -12px; --hover-y: 10px; }
        .community-note.posted-note { left: 30%; top: 65%; --tilt: -13deg; }
        @media (prefers-reduced-motion: reduce) { .community-note { transition: none; } }
        .community-message {
          position: absolute; z-index: 0; top: 43%; left: 47.5%;
          width: min(76vw, 1050px); margin: 0; transform: translate(-50%, -10%);
          font-family: 'Gamtan Road Dodum', sans-serif;
          font-size: clamp(34px, 4vw, 60px); line-height: 1.55;
          letter-spacing: -.045em; font-weight: 400; text-align: center;
          white-space: nowrap; pointer-events: none;
        }
        .community-mascot {
          position: absolute; z-index: 3; left: 3.2%; bottom: 0;
          display: block; width: clamp(260px, 32vw, 480px);
          max-height: 36%; height: auto; object-fit: contain;
          object-position: left bottom; pointer-events: none;
        }
        .community-grid-button {
          position: absolute; z-index: 4; top: 36px; right: 36px;
          display: grid; place-items: center; width: 36px; height: 36px;
          padding: 0; border: 0; background: none; cursor: pointer;
        }
        .community-grid-button svg { width: 28px; height: 28px; }
        .community-actions { position: absolute; z-index: 5; right: 4.5%; bottom: 9%; display: grid; gap: 13px; }
        .community-actions > button {
          display: grid; place-items: center; width: 58px; height: 58px;
          border: 0; border-radius: 50%; background: #050505; cursor: pointer;
        }
        .community-actions > button svg { width: 30px; height: 30px; }
        .community-actions > button.composer-active { background: #ff6b00; }
        .community-page:has(.community-compose-backdrop) { z-index: 6; }
        .community-page:has(.community-compose-backdrop) .community-actions { z-index: 10001; }
        .community-compose-backdrop {
          position: fixed; z-index: 10000; inset: 0;
          background: rgba(0,0,0,.31);
        }
        .community-compose {
          position: absolute; right: 0; bottom: 100%;
          box-sizing: border-box; width: clamp(400px, 36.7vw, 790px); height: clamp(265px, 27vh, 365px);
          padding: 20px 27px; border-radius: 25px; background: #fff;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,.13));
        }
        .community-compose-tail {
          position: absolute; right: 0; bottom: -34px;
          width: 64px; height: 45px; fill: #fff; pointer-events: none;
        }
        .community-note-backdrop {
          position: fixed; z-index: 20000; inset: 0; display: grid; place-items: center;
          background: rgba(0,0,0,.27); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
        }
        .community-selected-note {
          position: relative; display: flex; flex-direction: column;
          box-sizing: border-box; width: min(360px,calc(100vw - 44px)); height: 365px;
          padding: 32px 29px 27px; border-radius: 34px; background: #fff;
          box-shadow: 0 5px 10px rgba(0,0,0,.2);
        }
        .community-selected-note .community-note-date { font-size: 13px; }
        .community-selected-quote {
          position: absolute; top: 15px; right: 28px; padding: 0; border: 0;
          background: transparent; color: #ff6b00; font: 900 84px/.9 Georgia,serif; cursor: pointer;
        }
        .community-selected-note p {
          margin: auto 0 0; white-space: pre-line; word-break: keep-all;
          font-size: 20px; line-height: 1.58;
        }
        .community-compose-toolbar { display: flex; align-items: center; gap: 10px; height: 38px; }
        .community-compose-quote { margin-right: 9px; font: 900 64px/45px Georgia,serif; color: #050505; }
        .community-compose-toolbar button { flex: none; border: 0; padding: 2px; background: none; color: #111; font: 16px/1 Arial,sans-serif; cursor: pointer; }
        .community-compose-divider { width: 9px; }
        .community-compose-toolbar button.community-color {
          width: 10px; height: 10px; margin-left: 2px; padding: 0;
          border-radius: 50%; background: var(--dot-color);
        }
        .community-compose-editor {
          position: relative; z-index: 1; box-sizing: border-box;
          width: 100%; height: calc(100% - 85px); padding-top: 16px; outline: none;
          overflow-y: auto; color: #111; font-size: 16px; line-height: 1.55;
          white-space: pre-wrap; overflow-wrap: anywhere;
        }
        .community-compose-editor:empty::before { content: attr(data-placeholder); color: #aaa; pointer-events: none; }
        .community-compose-date { position: absolute; bottom: 22px; left: 27px; color: #999; font-size: 11px; }
        .community-submit {
          position: absolute; right: 24px; bottom: 18px; z-index: 1;
          display: grid; place-items: center; width: 36px; height: 36px;
          border: 2px solid #999; border-radius: 50%; background: transparent;
          color: #999; font: 24px/1 Arial,sans-serif; cursor: pointer;
        }
        @media (max-width: 700px) {
          .community-page { height: max(640px, 100dvh); margin-top: -80px; }
          .community-message { top: 39%; width: calc(100% - 30px); font-size: clamp(27px, 5.4vw, 37px); white-space: normal; }
          .community-note { width: 205px; height: 170px; padding: 15px; }
          .community-note p { font-size: 11px; }
          .community-note.note-one { left: -20%; }
          .community-note.note-two { left: 38%; }
          .community-note.note-four { left: 69%; }
          .community-note.note-five { left: 79%; }
          .community-note.note-six { left: 57%; }
          .community-mascot { left: 0; width: min(55vw, 260px); max-height: 32%; }
          .community-actions { right: 6%; bottom: 9%; }
          .community-actions > button { width: 48px; height: 48px; }
          .community-compose { right: 0; bottom: 100%; width: min(88vw, 480px); height: 265px; }
          .community-compose-toolbar { gap: 7px; }
          .community-compose-quote { margin-right: 5px; font-size: 65px; }
          .community-compose-toolbar button { font-size: 18px; }
          .community-compose-toolbar button.community-color { width: 11px; height: 11px; margin-left: 0; }
          .community-compose-editor { font-size: 17px; }
        }
        .page.sidebar-open .header {
          position: relative;
          z-index: 9001;
          pointer-events: none;
          background: transparent;
        }

        .page.sidebar-open .header .menu-button {
          pointer-events: auto;
        }

        .page.sidebar-open .header .logo {
          visibility: hidden;
        }

        .sidebar-layer {
          position: fixed;
          inset: 0;
          z-index: 9000;
        }

        .sidebar-dismiss {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: rgba(0, 0, 0, 0.44);
        }

        .dashboard-sidebar {
          position: absolute;
          inset: 0 auto 0 0;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: min(454px, calc(100vw - 32px));
          height: 100dvh;
          padding: 132px 38px 44px;
          background: #ffffff;
          border-radius: 0 50px 50px 0;
          color: #000000;
          font-family: "GamtanRoad", sans-serif;
          font-weight: 400;
          overflow-y: auto;
        }

        .sidebar-navigation {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 42px;
          padding-bottom: 48px;
          margin: 0;
        }

        .sidebar-navigation button,
        .sidebar-navigation button.selected {
          display: inline-flex;
          align-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: #000000;
          font-family: "GamtanRoad", sans-serif;
          font-size: 32px;
          font-weight: 400;
          line-height: 1.45;
          text-align: left;
          white-space: nowrap;
          cursor: pointer;
        }

        .sidebar-navigation button:hover {
          color: #ff8000;
        }

        .sidebar-settings {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          margin-top: auto;
          margin-left: -5px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #000000;
          cursor: pointer;
        }

        .sidebar-settings svg {
          width: 28px;
          height: 28px;
        }

        @media (max-width: 700px) {
          .dashboard-sidebar {
            padding-left: 24px;
            padding-right: 24px;
          }

          .sidebar-navigation button,
          .sidebar-navigation button.selected {
            font-size: 28px;
          }
        }
        /* 원래 카드 제목 굵기로 복구 */
        .plain-heading {
          appearance: none;
          border: 0;
          background: none;
          color: inherit;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          padding: 0;
          margin: 0;
          letter-spacing: inherit;
        }

        .card-title .current-heading {
          font-size: 15px;
          font-weight: 500 !important;
          line-height: 23px;
        }

        .bottom-title .bottom-heading {
          font-size: 15px;
          font-weight: 500 !important;
          line-height: 1.2;
        }

        .panel-header .graph-heading {
          font-size: inherit;
          font-weight: 600;
          line-height: inherit;
        }

        .plain-heading:hover { opacity: .7; }

        /* 팝업 공통 */
        .detail-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, .51);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .detail-modal,
        .detail-modal * {
          box-sizing: border-box;
        }

        .detail-modal {
          position: relative;
          background: #fff;
          color: #242424;
          font-family: inherit;
          box-shadow: 0 12px 35px rgba(0,0,0,.16);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }

        .detail-close {
          border: 0;
          background: transparent;
          color: #606469;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 34px;
          font-weight: 300;
          line-height: 1;
          padding: 0;
        }

        /* 현재 혈당 팝업 — 2번 이미지 크기와 내부 배치 */
.detail-modal-current {
  width: min(884px, calc(100vw - 40px));
  min-height: 646px;
  border-radius: 57px;
  padding: 39px 40px 34px 48px;
  overflow: visible;
}

.detail-modal-current::before {
  content: '';
  position: absolute;
  left: -19px;
  top: 72px;
  width: 28px;
  height: 28px;
  background: #fff;
  transform: rotate(45deg);
}

.current-popup-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
}

.current-popup-heading h2 {
  margin: 0;
  font-size: 29px;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.15;
}

.current-popup-heading .detail-close {
  font-size: 32px;
}

.current-popup-content {
  display: grid;
  grid-template-columns: 258px minmax(0, 1fr);
  column-gap: 20px;
  align-items: start;
}

.current-popup-left {
  min-width: 0;
}

.current-popup-left img {
  display: block;
  width: 147px;
  height: 174px;
  margin: 20px 0 34px 27px;
  object-fit: contain;
}

.current-popup-value {
  display: flex;
  align-items: baseline;
  gap: 7px;
  white-space: nowrap;
}

.current-popup-value strong {
  font-size: 69px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -3px;
}

.current-popup-value > span {
  font-size: 35px;
  color: #898d92;
  font-weight: 400;
  letter-spacing: -1px;
}

.current-popup-normal {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 29px;
  font-size: 26px;
  font-weight: 600;
}

.current-popup-dot {
  width: 16px;
  height: 16px;
  flex: none;
  border-radius: 50%;
  background: #111;
}

.current-popup-time {
  border-top: 2px dotted #e1e2e6;
  margin-top: 20px;
  padding-top: 22px;
  display: grid;
  gap: 7px;
}

.current-popup-time span {
  font-size: 23px;
  color: #777b80;
}

.current-popup-time strong {
  font-size: 23px;
  color: #686d73;
  font-weight: 500;
}

.current-popup-right {
  display: grid;
  gap: 20px;
  min-width: 0;
}

.current-change-card {
  height: 277px;
  border-radius: 34px;
  background: #f9f9fb;
  padding: 24px 39px 25px;
}

.current-change-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  white-space: nowrap;
}

.current-change-top strong {
  font-size: 23px;
  font-weight: 600;
  color: #394956;
}

.current-change-top > span {
  font-size: 23px;
  color: #f36c00;
}

.current-change-chart {
  margin-top: 76px;
}

.current-chart-labels,
.current-chart-times {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-chart-labels strong {
  font-size: 21px;
  font-weight: 500;
  color: #1f2327;
}

.current-chart-line {
  position: relative;
  height: 3px;
  background: #ff7000;
  margin: 20px 26px 25px;
  transform: rotate(.8deg);
  transform-origin: left center;
}

.current-point {
  position: absolute;
  top: 50%;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff7000;
  transform: translate(-50%, -50%);
}

.current-point-start {
  left: 0;
}

.current-point-end {
  left: 100%;
  box-shadow: 0 0 0 15px rgba(255, 112, 0, .12);
}

.current-chart-times {
  color: #898d92;
  font-size: 21px;
}

.current-ai-card {
  min-height: 196px;
  border: 2px solid #e1e2e6;
  border-radius: 31px;
  padding: 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.current-ai-icon {
  width: 41px;
  height: 41px;
  flex: 0 0 41px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #050505;
}

.current-ai-icon svg {
  width: 25px;
  height: 25px;
}

.current-ai-card strong {
  display: block;
  margin: 5px 0 7px;
  font-size: 23px;
  font-weight: 700;
}

.current-ai-card p {
  margin: 0;
  color: #394956;
  font-size: 22px;
  line-height: 1.65;
  font-weight: 400;
  word-break: keep-all;
}
        /* 하루 혈당 변화 팝업 */
        .detail-modal-daily,
        .detail-modal-meal {
          width: min(620px, calc(100vw - 40px));
          border-radius: 32px;
          padding: 28px;
        }

        .detail-modal-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .detail-modal-heading h2 {
          margin: 0;
          font-size: 25px;
          font-weight: 700;
        }

        .detail-date {
          display: inline-flex;
          border: 1px solid #e1e2e6;
          border-radius: 30px;
          padding: 5px 12px;
          color: #555b60;
          font-size: 15px;
          margin-bottom: 14px;
        }

        .daily-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #e0e1e6;
          border-radius: 19px;
          overflow: hidden;
          margin-bottom: 14px;
        }

        .daily-stat {
          min-width: 0;
          padding: 14px 7px;
          text-align: center;
          border-right: 1px solid #e0e1e6;
        }

        .daily-stat:last-child { border-right: 0; }
        .daily-stat > span { color: #40505d; font-size: 14px; }
        .daily-stat > div { white-space: nowrap; margin-top: 6px; }
        .daily-stat strong { font-size: 24px; color: #354550; }
        .daily-stat small { font-size: 10px; color: #8b8e92; }

        .daily-chart-card {
          position: relative;
          border: 1px solid #e0e1e6;
          border-radius: 19px;
          padding: 22px 12px 5px;
          margin-bottom: 14px;
        }

        .detail-chart-svg {
          display: block;
          width: 100%;
          height: 235px;
        }

        .daily-tooltip,
        .meal-chart-tip {
          position: absolute;
          z-index: 1;
          background: #050505;
          color: #fff;
          border-radius: 4px;
          padding: 7px 9px;
          font-size: 12px;
          font-weight: 600;
        }

        .daily-tooltip {
          top: 58px;
          left: 54%;
          transform: translateX(-50%);
        }

        .daily-bottom-grid,
        .meal-advice-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 9px;
        }

        .daily-bottom-card,
        .meal-advice-card {
          min-width: 0;
          border: 1px solid #e0e1e6;
          border-radius: 18px;
          padding: 14px;
          color: #40505d;
        }

        .daily-bottom-card > strong,
        .meal-advice-card > strong {
          font-size: 15px;
        }

        .daily-bottom-heading,
        .daily-hours,
        .daily-averages {
          display: flex;
          justify-content: space-between;
          gap: 3px;
        }

        .daily-bottom-heading span { font-size: 11px; color: #999; }
        .daily-hours { margin-top: 19px; font-size: 10px; }
        .daily-averages {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #dedee2;
          font-size: 12px;
        }

        .daily-bottom-card p,
        .meal-advice-card p {
          font-size: 12px;
          line-height: 1.6;
          margin: 12px 0 0;
          word-break: keep-all;
        }

        .daily-bottom-card em {
          color: #00abb9;
          font-style: normal;
          font-weight: 700;
        }

        .daily-bottom-card b { color: #f36c00; }

        /* 오늘의 평균 혈당 추이: 참조 화면에 맞춘 카드, 축, 시간표 */
        .detail-modal.detail-modal-daily {
          width: min(646px, calc(100vw - 32px));
          padding: 23px 20px 20px;
          border-radius: 32px;
        }
        .detail-modal-daily::before {
          content: "";
          position: absolute;
          top: 202px;
          left: -13px;
          width: 26px;
          height: 26px;
          background: #fff;
          transform: rotate(45deg);
        }
        .detail-modal-daily .detail-modal-heading { margin-bottom: 15px; }
        .detail-modal-daily .detail-modal-heading h2 { font-size: 23px; }
        .detail-modal-daily .detail-close { font-size: 29px; }
        .detail-modal-daily .detail-date {
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          margin-bottom: 14px;
          font-size: 14px;
          line-height: 1.2;
        }
        .detail-modal-daily .detail-date svg { width: 17px; height: 17px; }
        .detail-modal-daily .daily-stat-grid { margin-bottom: 13px; border-radius: 18px; }
        .detail-modal-daily .daily-stat { padding: 13px 4px; }
        .detail-modal-daily .daily-stat > span { font-size: 14px; }
        .detail-modal-daily .daily-stat strong { font-size: 24px; }
        .detail-modal-daily .daily-chart-card {
          padding: 22px 10px 5px;
          margin-bottom: 14px;
          border-radius: 20px;
          overflow: visible;
        }
        .detail-modal-daily .detail-chart-svg { height: 220px; }
        .detail-modal-daily .daily-tooltip {
          left: 57.5%;
          top: 70px;
          font-size: 12px;
          padding: 7px 9px;
          white-space: nowrap;
        }
        .detail-modal-daily .daily-tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          border: 6px solid transparent;
          border-top-color: #050505;
          transform: translateX(-50%);
        }
        .detail-modal-daily .daily-bottom-grid { grid-template-columns: 1.15fr 1fr; gap: 8px; }
        .detail-modal-daily .daily-bottom-card { padding: 13px 11px; min-height: 139px; }
        .detail-modal-daily .daily-bottom-card > strong,
        .detail-modal-daily .daily-bottom-heading > strong { font-size: 15px; }
        .detail-modal-daily .daily-hours,
        .detail-modal-daily .daily-averages { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); text-align: center; gap: 0; }
        .detail-modal-daily .daily-hours { margin-top: 13px; font-size: 11px; line-height: 1.3; }
        .detail-modal-daily .daily-hours > span { display: flex; flex-direction: column; align-items: center; }
        .detail-modal-daily .daily-averages { margin-top: 9px; padding-top: 12px; font-size: 13px; }
        .detail-modal-daily .daily-bottom-card p {
          color: #40505d;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.62;
          margin-top: 11px;
          word-break: keep-all;
        }
        .detail-modal-daily .daily-bottom-card em { color: #00bac7; }
        .detail-modal-daily .daily-bottom-card b { color: #f36c00; }
        @media (max-width: 540px) {
          .detail-modal.detail-modal-daily { padding: 18px 13px; }
          .detail-modal-daily::before { display: none; }
          .detail-modal-daily .daily-bottom-grid { grid-template-columns: 1fr; }
          .detail-modal-daily .daily-bottom-card { min-height: 0; }
          .detail-modal-daily .detail-chart-svg { height: 190px; }
          .detail-modal-daily .daily-tooltip { top: 60px; }
          .detail-modal-daily .daily-bottom-card p { font-size: 14px; }
        }

        /* 식사 팝업 */
        .meal-periods {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #e0e1e6;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 13px;
        }

        .meal-periods button {
          border: 0;
          background: #fff;
          padding: 9px;
          font: inherit;
          cursor: pointer;
        }

        .meal-periods button.selected {
          background: #050505;
          color: #fff;
          border-radius: 9px;
        }

        .meal-periods button span { margin-right: 8px; }

        .meal-detail-box {
          border: 1px solid #e0e1e6;
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 13px;
        }

        .meal-detail-summary {
          display: grid;
          grid-template-columns: 1fr 1.2fr .85fr;
          min-height: 86px;
          border-bottom: 1px solid #e0e1e6;
        }

        .meal-detail-summary > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 12px 16px;
          border-right: 1px solid #e0e1e6;
          font-size: 16px;
        }

        .meal-detail-summary > div:last-child {
          align-items: center;
          border-right: 0;
        }

        .meal-detail-summary strong { font-size: 30px; color: #111; }
        .meal-detail-summary small { color: #92969a; }
        .meal-danger {
          align-self: center;
          color: #f36c00;
          background: #fff0e4;
          border-radius: 30px;
          padding: 5px 12px;
        }

        .meal-detail-chart-heading {
          display: flex;
          justify-content: space-between;
          padding: 11px 15px 0;
          color: #40505d;
        }

        .meal-detail-chart-heading span {
          color: #999;
          font-size: 12px;
        }

        .meal-chart-wrap {
          position: relative;
          padding: 0 10px;
        }

        .meal-detail-chart {
          display: block;
          width: 100%;
          height: 200px;
        }

        .meal-chart-tip {
          background: #ff7000;
          top: 27px;
          left: 27%;
        }

        .meal-detail-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid #e0e1e6;
        }

        .meal-detail-stats > div {
          display: grid;
          justify-items: center;
          gap: 4px;
          padding: 10px 4px;
          border-right: 1px solid #e0e1e6;
        }

        .meal-detail-stats > div:last-child { border-right: 0; }
        .meal-detail-stats span { font-size: 11px; color: #40505d; }
        .meal-detail-stats strong { font-size: 21px; }
        .meal-detail-stats small {
          background: #f3f3f5;
          padding: 2px 8px;
          border-radius: 7px;
        }
        .meal-detail-stats small.warning {
          background: #fff0e4;
          color: #f36c00;
        }

        .meal-advice-card p { color: #686c72; font-size: 13px; }
        .advice-icon {
          display: inline-grid;
          place-items: center;
          width: 23px;
          height: 23px;
          color: #fff;
          background: #050505;
          border-radius: 5px;
          margin-right: 5px;
        }

        /* 식사 & 혈당: 두 번째 참고 화면의 크기와 구성 */
        .detail-modal.detail-modal-meal {
          width: min(535px, calc(100vw - 32px));
          padding: 23px 20px 19px;
          border-radius: 36px;
          overflow: visible;
          box-sizing: border-box;
        }
        .detail-modal-meal::after {
          content: "";
          position: absolute;
          right: -12px;
          bottom: 110px;
          width: 24px;
          height: 24px;
          background: #fff;
          transform: rotate(45deg);
        }
        .detail-modal-meal .detail-modal-heading { margin-bottom: 13px; }
        .detail-modal-meal .detail-modal-heading h2 { font-size: 23px; color: #222; }
        .detail-modal-meal .detail-close { font-size: 30px; color: #62666b; }
        .detail-modal-meal .detail-date {
          align-items: center; gap: 6px; padding: 5px 12px;
          margin-bottom: 13px; font-size: 14px; line-height: 1.1;
        }
        .detail-modal-meal .detail-date svg { width: 17px; height: 17px; }
        .detail-modal-meal .meal-periods { height: 40px; margin-bottom: 14px; border-radius: 10px; }
        .detail-modal-meal .meal-periods button {
          display: flex; align-items: center; justify-content: center;
          padding: 0; font-size: 17px; color: #384a58;
        }
        .detail-modal-meal .meal-periods button.selected { color: white; }
        .detail-modal-meal .meal-period-icon {
          display: inline-grid; place-items: center; width: 27px; height: 27px;
          margin-right: 6px; border-radius: 50%; background: #f6f6f7;
          color: #222;
        }
        .detail-modal-meal .meal-periods .selected .meal-period-icon { background: none; color: white; }
        .detail-modal-meal .meal-period-icon svg { width: 22px; height: 22px; }
        .detail-modal-meal .meal-detail-box { margin-bottom: 14px; border-radius: 20px; }
        .detail-modal-meal .meal-detail-summary { grid-template-columns: 32.5% 39% 28.5%; min-height: 90px; }
        .detail-modal-meal .meal-detail-summary > div { padding: 13px 14px; font-size: 16px; }
        .detail-modal-meal .meal-summary-meal { flex-direction: row; align-items: center; gap: 12px; }
        .detail-modal-meal .meal-summary-icon { flex: none; width: 40px; height: 40px; }
        .detail-modal-meal .meal-summary-icon svg { width: 100%; height: 100%; }
        .detail-modal-meal .meal-summary-meal b { color: #26333c; font-size: 17px; font-weight: 600; white-space: nowrap; }
        .detail-modal-meal .meal-summary-meal span span { color: #40505d; }
        .detail-modal-meal .meal-summary-reading { gap: 0; color: #364653; }
        .detail-modal-meal .meal-summary-reading > span:last-child { white-space: nowrap; }
        .detail-modal-meal .meal-summary-reading strong { font-size: 35px; line-height: 1.1; }
        .detail-modal-meal .meal-summary-reading small { font-size: 14px; }
        .detail-modal-meal .meal-danger { font-size: 17px; padding: 5px 15px; }
        .detail-modal-meal .meal-detail-chart-heading { align-items: center; padding: 10px 18px 0; }
        .detail-modal-meal .meal-detail-chart-heading strong { font-size: 17px; }
        .detail-modal-meal .meal-detail-chart-heading span { font-size: 12px; }
        .detail-modal-meal .meal-chart-wrap { padding: 0 12px; }
        .detail-modal-meal .meal-detail-chart { height: 210px; }
        .detail-modal-meal .meal-chart-tip {
          top: 27px; left: 30%; transform: translateX(-50%);
          padding: 4px 7px; font-size: 13px; border-radius: 2px;
        }
        .detail-modal-meal .meal-chart-tip::after {
          content: ""; position: absolute; left: 50%; top: 100%;
          border: 6px solid transparent; border-top-color: #ff7000;
          transform: translateX(-50%);
        }
        .detail-modal-meal .meal-detail-stats > div { min-height: 82px; gap: 3px; padding: 8px 3px; }
        .detail-modal-meal .meal-detail-stats span { font-size: 13px; white-space: nowrap; }
        .detail-modal-meal .meal-detail-stats strong { font-size: 23px; line-height: 1.15; }
        .detail-modal-meal .meal-detail-stats small { font-size: 12px; padding: 2px 8px; }
        .detail-modal-meal .meal-clock { width: 22px; height: 22px; color: #8c9093; }
        .detail-modal-meal .meal-advice-grid { grid-template-columns: 1fr 1fr; gap: 9px; }
        .detail-modal-meal .meal-advice-card { min-height: 94px; padding: 14px 12px 11px; border-radius: 19px; }
        .detail-modal-meal .meal-advice-card > strong { display: flex; align-items: center; gap: 7px; font-size: 16px; }
        .detail-modal-meal .advice-icon { width: 28px; height: 28px; margin: 0; }
        .detail-modal-meal .advice-icon svg { width: 23px; height: 23px; }
        .detail-modal-meal .meal-advice-card p { margin-top: 12px; color: #60656a; font-size: 14px; font-weight: 400; line-height: 1.5; }

        @media (max-width: 800px) {
          .detail-modal-current {
            width: min(600px, calc(100vw - 30px));
            min-height: 0;
            max-height: calc(100vh - 30px);
            overflow-y: auto;
            border-radius: 30px;
            padding: 25px;
          }

          .detail-modal-current::before { display: none; }
          .current-popup-heading { margin-bottom: 15px; }
          .current-popup-heading h2 { font-size: 26px; }

          .current-popup-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .current-popup-left img {
            width: 110px;
            height: 125px;
            margin: 0 auto 10px;
          }

          .current-popup-value strong { font-size: 48px; }
          .current-popup-value > span { font-size: 23px; }
          .current-popup-normal { font-size: 18px; margin-top: 12px; }
          .current-popup-dot { width: 11px; height: 11px; }
          .current-popup-time { padding-top: 10px; margin-top: 12px; }
          .current-popup-time span,
          .current-popup-time strong { font-size: 15px; }
          .current-popup-right { gap: 10px; }
          .current-change-card { height: 190px; padding: 18px; border-radius: 20px; }
          .current-change-top strong,
          .current-change-top > span { font-size: 14px; }
          .current-change-chart { margin-top: 39px; }
          .current-chart-labels strong,
          .current-chart-times { font-size: 14px; }
          .current-chart-line { margin: 16px 12px 19px; }
          .current-ai-card { min-height: 0; padding: 15px; border-radius: 20px; }
          .current-ai-icon { width: 30px; height: 30px; flex-basis: 30px; }
          .current-ai-icon svg { width: 20px; height: 20px; }
          .current-ai-card strong { font-size: 16px; margin: 3px 0 5px; }
          .current-ai-card p { font-size: 14px; }
          .desktop-break { display: none; }
        }

        @media (max-width: 520px) {
          .detail-modal-daily,
          .detail-modal-meal { padding: 18px; border-radius: 22px; }
          .detail-modal-heading h2 { font-size: 19px; }
          .daily-stat > span { font-size: 11px; }
          .daily-stat strong { font-size: 20px; }
          .daily-stat small { font-size: 8px; }
          .daily-bottom-grid { grid-template-columns: 1fr; }
          .meal-detail-summary > div { padding: 8px; font-size: 12px; }
          .meal-detail-summary strong { font-size: 22px; }
        }
          /* 현재 혈당 팝업: 화살표 제거 + 전체 크기 축소 */
.detail-modal.detail-modal-current::before {
  display: none !important;
}

.detail-modal.detail-modal-current {
  transform: scale(.72);
  transform-origin: center center;
}

.detail-modal-current .current-popup-meter {
  width: 215px;
  height: 235px;
  margin-top: 0;
  margin-bottom: 0;
}

.detail-modal-current .current-ai-icon svg {
  width: 38px;
  height: 38px;
}

        .card-title .goal-heading { font-size: 15px; font-weight: 500; line-height: 23px; }
        .detail-modal.detail-modal-goal {
          width: min(462px, calc(100vw - 32px));
          min-height: 466px;
          padding: 22px 26px 20px;
          border-radius: 32px;
          overflow: visible;
        }
        .detail-modal-goal::before {
          content: ""; position: absolute; left: -13px; top: 50px;
          width: 26px; height: 26px; background: white; transform: rotate(45deg);
        }
        .goal-popup-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .goal-popup-heading h2 { margin: 0; font-size: 19px; font-weight: 700; }
        .goal-popup-heading .detail-close { font-size: 26px; }
        .goal-popup-body { display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: 16px; }
        .goal-popup-left { min-width: 0; }
        .goal-popup-target { display: block; width: 114px; height: 114px; margin: 7px auto 13px; object-fit: contain; }
        .goal-popup-range > span, .goal-popup-rate > span, .goal-popup-time > span {
          color: #666c70; font-size: 12px; font-weight: 500;
        }
        .goal-popup-range > div { display: flex; align-items: baseline; gap: 6px; white-space: nowrap; margin-top: 4px; }
        .goal-popup-range strong { font-size: 20px; line-height: 1.1; }
        .goal-popup-range small { color: #898d91; font-size: 11px; }
        .goal-popup-rate { border-top: 1px dotted #dedee2; padding-top: 14px; margin-top: 13px; }
        .goal-popup-rate > div { margin-top: 3px; line-height: 1; }
        .goal-popup-rate strong { font-size: 39px; }
        .goal-popup-rate b { font-size: 19px; }
        .goal-popup-rate p { margin: 8px 0 0; font-size: 12px; line-height: 1; }
        .goal-popup-rate p span { margin-left: 3px; }
        .goal-popup-time { display: grid; gap: 6px; border-top: 1px dotted #dedee2; padding-top: 13px; margin-top: 15px; }
        .goal-popup-time strong { color: #6b7074; font-size: 12px; font-weight: 500; white-space: nowrap; }
        .goal-popup-right { display: grid; gap: 10px; min-width: 0; }
        .goal-range-card, .goal-week-card { border: 1px solid #e0e1e6; border-radius: 18px; padding: 17px 18px 13px; }
        .goal-range-card { height: 233px; }
        .goal-range-card > strong, .goal-week-card > strong { font-size: 13px; color: #34424b; }
        .goal-range-card > strong span { color: #999da0; font-weight: 400; }
        .goal-range-card > p { color: #95999b; font-size: 12px; margin: 15px 0 35px; }
        .goal-range-card > p b { color: #35434d; font-size: 16px; }
        .goal-range-bars { display: grid; gap: 11px; }
        .goal-range-row { position: relative; padding-right: 30px; }
        .goal-range-row > span { display: block; color: #777d81; font-size: 10px; margin-bottom: 4px; white-space: nowrap; }
        .goal-range-track { height: 6px; border-radius: 6px; background: #eff0f0; overflow: hidden; }
        .goal-range-track i { display: block; height: 100%; border-radius: 6px; }
        .goal-range-row > b { position: absolute; bottom: -2px; right: 0; font-size: 10px; color: #1d2327; }
        .goal-week-card { height: 137px; padding: 13px 15px 9px; }
        .goal-week-card > strong { font-size: 11px; }
        .goal-week-bars { height: 92px; display: grid; grid-template-columns: repeat(7, 1fr); align-items: end; gap: 6px; }
        .goal-week-day { display: flex; flex-direction: column; align-items: center; justify-content: end; min-width: 0; height: 100%; }
        .goal-week-day span { color: #70777b; font-size: 10px; white-space: nowrap; }
        .goal-week-day i { display: block; width: 17px; min-height: 15px; background: #f0f1f2; border-radius: 4px 4px 0 0; }
        .goal-week-day i.today { background: #ff6b00; }
        .goal-week-day small { color: #a0a5a9; font-size: 9px; margin-top: 4px; }
        .goal-week-day:last-child small { color: #171717; }
        @media (max-width: 490px) {
          .detail-modal.detail-modal-goal { padding: 18px; min-height: 0; max-height: calc(100vh - 32px); overflow-y: auto; }
          .detail-modal-goal::before { display: none; }
          .goal-popup-body { grid-template-columns: 108px minmax(0, 1fr); gap: 10px; }
          .goal-popup-target { width: 96px; height: 96px; }
          .goal-range-card, .goal-week-card { padding-left: 10px; padding-right: 10px; }
          .goal-range-row > span { font-size: 8px; }
        }
      `}</style>
    </div>
  )
}

export default App
