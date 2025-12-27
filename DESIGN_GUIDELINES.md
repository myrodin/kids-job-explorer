# 디자인 가이드라인

## 1. 기본 원칙

### 대상 사용자
- 초등학생 (7-13세)
- 밝고 친근한 디자인, 충분한 여백, 명확한 시각적 계층 필요

### 핵심 가치
- **가독성**: 충분한 여백으로 콘텐츠가 숨 쉴 수 있어야 함
- **친근함**: 부드러운 곡선과 밝은 색상
- **명확성**: 요소 간 충분한 간격으로 시각적 구분
- **단순함**: 불필요한 장식 요소 배제

### 금지 사항
- **이모지 사용 금지**: 모든 이모지 대신 FontAwesome 아이콘 사용
- **그라데이션 최소화**: 배경 및 버튼에 그라데이션 사용 금지, 단색 사용
- **과도한 장식 금지**: 시각적 요소는 기능적 목적이 있을 때만 사용

---

## 2. 간격 시스템 (Spacing)

### 카드 내부 패딩 (Card Internal Padding)
카드 외곽선과 콘텐츠 사이의 간격

| 크기 | Tailwind 클래스 | 픽셀 | 용도 |
|------|----------------|------|------|
| sm | p-6 | 24px | 작은 정보 카드 |
| md | p-8 | 32px | 일반 카드 (기본값) |
| lg | p-10 | 40px | 주요 콘텐츠 카드, 상세 페이지 |

### 컴포넌트 간 간격 (Component Spacing)
| 용도 | Tailwind 클래스 | 픽셀 |
|------|----------------|------|
| 섹션 간 | space-y-12 / gap-12 | 48px |
| 카드 그룹 내 | gap-8 | 32px |
| 카드 내 요소 간 | space-y-4 / gap-4 | 16px |
| 텍스트 블록 간 | mb-4 | 16px |
| 인라인 요소 간 | gap-3 | 12px |

### 페이지 여백 (Page Margin)
| 뷰포트 | 좌우 패딩 |
|--------|----------|
| 모바일 | px-6 (24px) |
| 태블릿 (sm) | px-8 (32px) |
| 데스크톱 (lg) | px-12 (48px) |

---

## 3. 레이아웃

### 컨테이너
- 최대 너비: `max-w-4xl` (896px)
- 가운데 정렬: `mx-auto`
- 페이지별 상하 패딩: 홈 `py-8`, 일반 `py-12`

### 페이지 구조
```
<main>
  └── container (max-w-4xl mx-auto px-6 sm:px-8 lg:px-12)
       ├── Header Section (text-center, mb-10)
       ├── Content Section (space-y-8)
       └── CTA Section (text-center, mt-12)
</main>
```

### 카드 그리드
- 모바일: 1열 (`grid-cols-1`)
- 태블릿: 2열 (`sm:grid-cols-2`)
- 데스크톱: 3열 (`lg:grid-cols-3`)
- 간격: `gap-8` (32px)

---

## 4. 카드 컴포넌트

### 기본 스타일
```css
- 배경: bg-white
- 그림자: shadow-lg
- 모서리: rounded-3xl (24px)
- 전환 효과: transition-all duration-300
```

### 패딩 규칙
- **작은 카드** (태그, 뱃지): `p-6` (24px)
- **일반 카드** (목록 아이템): `p-8` (32px) - 기본값
- **주요 카드** (상세 정보): `p-10` (40px)

### 호버 효과
- 스케일: `scale: 1.02`
- 이동: `y: -4px`
- 그림자 강화: `hover:shadow-xl`

---

## 5. 타이포그래피

### 제목
| 요소 | 크기 | 굵기 | 색상 |
|------|------|------|------|
| h1 (페이지 제목) | text-3xl md:text-4xl | font-bold | text-gray-800 |
| h2 (섹션 제목) | text-2xl | font-bold | text-gray-800 |
| h3 (카드 제목) | text-lg | font-bold | text-gray-800 |

### 본문
| 용도 | 크기 | 색상 |
|------|------|------|
| 주요 텍스트 | text-lg | text-gray-600 |
| 보조 텍스트 | text-base | text-gray-500 |
| 캡션/메타 | text-sm | text-gray-400 |

### 줄 간격
- 본문: `leading-relaxed`
- 설명: `leading-relaxed`

---

## 6. 색상 시스템

### 주요 색상 (Tailwind 커스텀)
- Primary: 보라색 계열 (`primary-500`)
- Secondary: 청록색 계열 (`secondary-500`)
- Accent: 주황/분홍 계열 (`accent-500`)

### 배경
- 페이지: `bg-gray-50` (단색, 그라데이션 금지)
- 카드: `bg-white`
- 강조 영역: `bg-gray-100` 또는 `bg-{color}-50`

### 텍스트
- 주요: `text-gray-800`
- 보조: `text-gray-600`
- 약한: `text-gray-500`
- 최약: `text-gray-400`

---

## 7. 아이콘

### 크기
| 클래스 | 용도 |
|--------|------|
| size="xs" | 인라인 아이콘 |
| size="sm" | 버튼 내 아이콘 |
| (기본) | 일반 아이콘 |
| size="lg" | 강조 아이콘 |
| size="xl" | 카드 아이콘 |
| size="2x" | 헤더 아이콘 |
| size="3x" | 히어로 아이콘 |

### 아이콘 컨테이너
- 크기: `w-16 h-16` ~ `w-24 h-24`
- 모양: `rounded-2xl` 또는 `rounded-full`
- 배경: `bg-{color}-100` (단색, 그라데이션 금지)

---

## 8. 버튼

### Primary 버튼
```css
- 배경: bg-primary-500 (단색, 그라데이션 금지)
- 텍스트: text-white font-bold
- 패딩: px-8 py-4 (기본), px-10 py-5 (lg)
- 모서리: rounded-2xl
- 호버: bg-primary-600
```

### Outline 버튼
```css
- 테두리: border-2 border-primary-400
- 텍스트: text-primary-600 font-semibold
- 호버: bg-primary-50
```

### Ghost 버튼
```css
- 배경: transparent
- 텍스트: text-gray-600
- 호버: bg-gray-100
```

---

## 9. 애니메이션

### 진입 애니메이션
- 페이드 인 + 위로 이동: `initial={{ opacity: 0, y: 20 }}`
- 지연: 순차적으로 0.1초씩 증가

### 호버 애니메이션
- 카드: `scale: 1.02, y: -4`
- 아이콘: `scale: 1.1`
- 버튼: `scale: 1.05`

### 반복 애니메이션
- 플로팅: `y: [0, -10, 0]`
- 펄스: `scale: [1, 1.1, 1]`

---

## 10. 반응형 디자인

### 브레이크포인트
| 이름 | 최소 너비 |
|------|----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |

### 모바일 우선
- 기본 스타일은 모바일용
- sm/md/lg 접두사로 확장

---

## 적용 체크리스트

### 카드 검증
- [ ] 내부 패딩이 최소 p-8 (32px) 이상인가?
- [ ] 카드 내 요소 간 간격이 충분한가?
- [ ] 모서리가 rounded-3xl인가?

### 페이지 검증
- [ ] 컨테이너가 가운데 정렬되어 있는가?
- [ ] 섹션 간 간격이 space-y-12인가?
- [ ] 헤더가 text-center인가?

### 컴포넌트 검증
- [ ] 버튼 내 아이콘과 텍스트 간격이 gap-2 이상인가?
- [ ] 인라인 요소 간 간격이 gap-3 이상인가?
