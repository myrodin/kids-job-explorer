# 내 꿈 찾기 - 어린이 직업 탐색

어린이를 위한 직업 탐색 서비스입니다. 재미있는 질문에 답하고 나에게 맞는 직업을 찾아보세요!

🔗 **[사이트 바로가기](https://myrodin.github.io/kids-job-explorer/)**

## 주요 기능

- **직업 매칭 퀴즈**: 18개의 재미있는 질문에 답하면 나에게 맞는 직업을 추천해줍니다
- **100가지 직업 탐색**: 8개 카테고리로 분류된 다양한 직업들을 둘러볼 수 있습니다
- **상세 직업 정보**: 각 직업에 대한 설명, 필요한 능력, 준비 방법 등을 제공합니다
- **결과 저장 및 공유**: 테스트 결과를 저장하고 친구들과 공유할 수 있습니다

## 직업 카테고리

| 카테고리 | 설명 |
|---------|------|
| 🎨 예술가형 | 창작하고 표현하는 것을 좋아해요 |
| 💻 기술자형 | 컴퓨터와 기계를 다루는 것을 좋아해요 |
| 🔬 탐구자형 | 궁금한 것을 연구하고 분석해요 |
| 🤝 소통가형 | 사람들과 이야기하는 것을 좋아해요 |
| ❤️ 봉사자형 | 다른 사람을 돕는 것을 좋아해요 |
| 🏗️ 건설자형 | 무언가를 만들고 고치는 것을 좋아해요 |
| 🏃 활동가형 | 몸을 움직이는 것을 좋아해요 |
| 🌿 자연인형 | 동물과 자연을 좋아해요 |

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **Deployment**: GitHub Pages

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
│   ├── common/     # 공통 컴포넌트 (Button, Card, Icon 등)
│   ├── layout/     # 레이아웃 컴포넌트
│   └── quiz/       # 퀴즈 관련 컴포넌트
├── context/        # React Context (퀴즈 상태 관리)
├── data/           # 정적 데이터
│   ├── jobs/       # 8개 카테고리별 직업 데이터 (100개)
│   └── questions.json  # 18개 질문 데이터
├── pages/          # 페이지 컴포넌트
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수 (매칭 알고리즘, 저장소 등)
```

## 라이선스

MIT License
