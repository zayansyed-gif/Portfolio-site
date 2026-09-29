import React from 'react'

const stars = [
  [8, 17, 4], [17, 67, 3], [25, 27, 5], [32, 78, 3], [40, 12, 3], [48, 34, 4],
  [58, 19, 3], [64, 77, 4], [72, 12, 5], [78, 49, 3], [85, 23, 4], [93, 67, 3],
  [12, 88, 3], [52, 91, 3], [89, 89, 4], [37, 50, 3], [69, 56, 4], [4, 43, 3],
]

export default function Artwork() {
  return (
    <div className="world-art" aria-hidden="true">
      <div className="sky-haze" />
      <svg className="painting" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="night" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#09213a" /><stop offset=".5" stopColor="#102f53" /><stop offset="1" stopColor="#071a30" />
          </linearGradient>
          <radialGradient id="moonGlow"><stop stopColor="#f4d98c" stopOpacity=".23" /><stop offset="1" stopColor="#f4d98c" stopOpacity="0" /></radialGradient>
          <pattern id="canvas-grain" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M2 5l8-1M13 18l8-2M4 23l7-1" stroke="#d8dfcd" strokeOpacity=".12" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1000" fill="url(#night)" />
        <circle cx="1164" cy="264" r="310" fill="url(#moonGlow)" />
        <g className="swirl swirl-one" fill="none" strokeLinecap="round">
          <path d="M670 458c102-126 290-157 411-73 100 70 69 210-62 231-108 17-178-82-106-150 52-49 134-35 147 13" stroke="#6eacc0" strokeOpacity=".22" strokeWidth="34" />
          <path d="M702 453c86-91 243-111 336-49 77 52 56 159-40 176-76 14-129-55-78-105 39-39 99-25 108 13" stroke="#b1d1d1" strokeOpacity=".2" strokeWidth="7" />
          <path d="M860 320c-20-76 16-151 76-195" stroke="#d2dabc" strokeOpacity=".2" strokeWidth="5" />
        </g>
        <g className="swirl swirl-two" fill="none" strokeLinecap="round">
          <path d="M-90 694c162-153 351-132 426-40 65 81 6 171-84 155-63-11-69-82-14-103 34-13 71 4 78 31" stroke="#4786ab" strokeOpacity=".21" strokeWidth="30" />
          <path d="M-53 683c148-122 306-103 366-27 47 59 5 124-59 113-46-8-48-57-9-72" stroke="#b0cbd1" strokeOpacity=".16" strokeWidth="6" />
          <path d="M1090 827c112-84 237-63 280 11" stroke="#b0cad0" strokeOpacity=".16" strokeWidth="8" />
        </g>
        <g className="moon" transform="translate(1155 271)">
          <circle r="104" fill="#f0d88f" />
          <circle cx="37" cy="-16" r="92" fill="#102f53" />
          <path d="M-53 49c-30-49-12-114 39-144" fill="none" stroke="#fff0b4" strokeOpacity=".42" strokeWidth="3" />
        </g>
        <path d="M0 878c219-105 406-96 576-30 185 72 352 35 516-40 127-58 235-58 348-8v200H0z" fill="#0a2035" fillOpacity=".6" />
        <rect width="1440" height="1000" fill="url(#canvas-grain)" opacity=".3" />
      </svg>
      <div className="star-field">{stars.map(([x, y, size], index) => <span key={index} className={`star star-${index % 4}`} style={{ '--x': `${x}%`, '--y': `${y}%`, '--size': `${size}px`, '--delay': `${index * -.43}s` }} />)}</div>
      <div className="world-vignette" />
    </div>
  )
}
