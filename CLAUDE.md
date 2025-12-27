# 프로젝트 환경 설정

## 운영체제
- **OS**: Windows 11
- 모든 shell 명령어는 Windows 환경을 고려해야 함
- `npx` 명령어 사용시 `cmd /c npx ...` 형식 필요

## MCP 서버
- Playwright MCP 서버가 `.mcp.json`에 설정되어 있음
- 브라우저 테스트 및 자동화에 사용

## 개발 서버
- `npm run dev` - Vite 개발 서버 (http://localhost:5173)
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드 결과 미리보기

## 기술 스택
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (애니메이션)
- React Router v6

## 프로젝트 구조
```
src/
├── components/     # UI 컴포넌트
│   ├── common/     # 공통 컴포넌트 (Button, Card, etc.)
│   ├── layout/     # 레이아웃 컴포넌트
│   └── quiz/       # 퀴즈 관련 컴포넌트
├── context/        # React Context
├── data/           # 정적 데이터 (직업 100개, 질문 18개)
├── pages/          # 페이지 컴포넌트
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```

## 주요 파일
- `src/data/jobs/*.json` - 8개 카테고리별 직업 데이터
- `src/data/questions.json` - 18개 질문 데이터
- `src/utils/matching.ts` - 직업 매칭 알고리즘
- `src/context/QuizContext.tsx` - 퀴즈 상태 관리
