import { motion } from 'framer-motion';
import { Button, Card, Icon, StaggerContainer, StaggerItem } from '../components/common';

export function DesignSystemPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary-100 mb-8 shadow-md">
          <Icon name="palette" size="3x" className="text-primary-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          디자인 시스템
        </h1>
        <p className="text-gray-500 text-lg">
          일관된 디자인을 위한 컴포넌트 가이드
        </p>
      </section>

      {/* Section: Spacing */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="arrows-alt" className="text-primary-500" />
          간격 시스템 (Spacing)
        </h2>

        {/* Card Padding Examples */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">카드 내부 패딩</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-3">sm: p-6 (24px)</p>
              <Card padding="sm">
                <div className="bg-primary-100 rounded-lg p-4 text-center">
                  <p className="text-primary-700 font-medium">작은 패딩</p>
                  <p className="text-sm text-primary-500">태그, 뱃지용</p>
                </div>
              </Card>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">md: p-8 (32px) - 기본값</p>
              <Card padding="md">
                <div className="bg-secondary-100 rounded-lg p-4 text-center">
                  <p className="text-secondary-700 font-medium">중간 패딩</p>
                  <p className="text-sm text-secondary-500">일반 카드용</p>
                </div>
              </Card>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">lg: p-10 (40px)</p>
              <Card padding="lg">
                <div className="bg-accent-100 rounded-lg p-4 text-center">
                  <p className="text-accent-700 font-medium">큰 패딩</p>
                  <p className="text-sm text-accent-500">주요 카드용</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Component Spacing */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">컴포넌트 간 간격</h3>
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500">space-y-12</span>
                <div className="flex-1 h-12 bg-primary-100 rounded flex items-center justify-center text-primary-600 font-medium">
                  섹션 간 간격 (48px)
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500">gap-8</span>
                <div className="flex-1 h-10 bg-secondary-100 rounded flex items-center justify-center text-secondary-600 font-medium">
                  카드 그룹 내 간격 (32px)
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500">gap-4</span>
                <div className="flex-1 h-8 bg-accent-100 rounded flex items-center justify-center text-accent-600 font-medium">
                  카드 내 요소 간격 (16px)
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section: Typography */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="font" className="text-secondary-500" />
          타이포그래피
        </h2>

        <Card>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-400 mb-2">h1 - 페이지 제목</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                나의 꿈을 찾아보자!
              </h1>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-400 mb-2">h2 - 섹션 제목</p>
              <h2 className="text-2xl font-bold text-gray-800">
                추천 직업 목록
              </h2>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-400 mb-2">h3 - 카드 제목</p>
              <h3 className="text-lg font-bold text-gray-800">
                소프트웨어 개발자
              </h3>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-400 mb-2">본문 - text-lg text-gray-600</p>
              <p className="text-lg text-gray-600 leading-relaxed">
                재미있는 질문에 답하면 나에게 딱 맞는 직업을 알려줄게!
              </p>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-400 mb-2">보조 텍스트 - text-base text-gray-500</p>
              <p className="text-base text-gray-500">
                100가지 다양한 직업을 탐색해보세요
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">캡션 - text-sm text-gray-400</p>
              <p className="text-sm text-gray-400">
                2024년 12월 25일 오후 3:00
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Section: Colors */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="fill-drip" className="text-accent-500" />
          색상 시스템
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Primary */}
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Primary (보라)</h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700].map((shade) => (
                <div key={shade} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded bg-primary-${shade}`} />
                  <span className="text-sm text-gray-600">primary-{shade}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Secondary */}
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Secondary (청록)</h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700].map((shade) => (
                <div key={shade} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded bg-secondary-${shade}`} />
                  <span className="text-sm text-gray-600">secondary-{shade}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Accent */}
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Accent (주황/분홍)</h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700].map((shade) => (
                <div key={shade} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded bg-accent-${shade}`} />
                  <span className="text-sm text-gray-600">accent-{shade}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Section: Buttons */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="hand-pointer" className="text-primary-500" />
          버튼
        </h2>

        <Card>
          <div className="space-y-8">
            {/* Button Variants */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">버튼 종류</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">
                  <Icon name="rocket" size="sm" />
                  Primary 버튼
                </Button>
                <Button variant="secondary">
                  <Icon name="book-open" size="sm" />
                  Secondary 버튼
                </Button>
                <Button variant="outline">
                  <Icon name="arrow-left" size="sm" />
                  Outline 버튼
                </Button>
                <Button variant="ghost">
                  <Icon name="home" size="sm" />
                  Ghost 버튼
                </Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">버튼 크기</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium (기본)
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Section: Cards */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="square" className="text-secondary-500" />
          카드
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Card */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">기본 카드</h3>
            <Card>
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100">
                  <Icon name="laptop-code" size="2x" className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">소프트웨어 개발자</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    컴퓨터 프로그램을 만들고 문제를 해결하는 직업이에요.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      #코딩
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      #문제해결
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Hover Card */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">호버 효과 카드</h3>
            <Card hover>
              <div className="flex items-start gap-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-100"
                >
                  <Icon name="paint-brush" size="2x" className="text-secondary-500" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">그래픽 디자이너</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    시각적으로 아름다운 디자인을 만드는 직업이에요.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      #디자인
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      #창의력
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Highlighted Card */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">강조 카드</h3>
            <Card className="bg-primary-50 border-2 border-primary-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Icon name="medal" size="sm" />
                  1등 추천
                </span>
                <span className="text-primary-600 font-bold flex items-center gap-1">
                  <Icon name="star" size="sm" />
                  95% 매칭!
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm">
                  <Icon name="rocket" size="2x" className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">우주 비행사</h4>
                  <p className="text-gray-600 text-sm">우주를 탐험하는 멋진 직업!</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Selected Card */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">선택된 카드</h3>
            <Card selected>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100">
                  <Icon name="circle-check" size="2x" className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">선택된 옵션</h4>
                  <p className="text-gray-600 text-sm">ring과 배경색으로 선택 상태 표시</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section: Icons */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="icons" className="text-accent-500" />
          아이콘
        </h2>

        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">아이콘 크기</h3>
              <div className="flex items-end gap-6">
                <div className="text-center">
                  <Icon name="star" size="xs" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">xs</p>
                </div>
                <div className="text-center">
                  <Icon name="star" size="sm" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">sm</p>
                </div>
                <div className="text-center">
                  <Icon name="star" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">기본</p>
                </div>
                <div className="text-center">
                  <Icon name="star" size="lg" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">lg</p>
                </div>
                <div className="text-center">
                  <Icon name="star" size="xl" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">xl</p>
                </div>
                <div className="text-center">
                  <Icon name="star" size="2x" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">2x</p>
                </div>
                <div className="text-center">
                  <Icon name="star" size="3x" className="text-primary-500" />
                  <p className="text-xs text-gray-400 mt-2">3x</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-4">아이콘 컨테이너</h3>
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100">
                  <Icon name="rocket" size="lg" className="text-primary-500" />
                </div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-100">
                  <Icon name="star" size="xl" className="text-secondary-500" />
                </div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent-100 shadow-md">
                  <Icon name="trophy" size="2x" className="text-accent-500" />
                </div>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent-100">
                  <Icon name="heart" size="3x" className="text-accent-500" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Section: Animations */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="wand-magic-sparkles" className="text-primary-500" />
          애니메이션
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <h3 className="font-semibold text-gray-700 mb-4 text-center">플로팅</h3>
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-100"
              >
                <Icon name="rocket" size="2x" className="text-primary-500" />
              </motion.div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-700 mb-4 text-center">펄스</h3>
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent-100"
              >
                <Icon name="heart" size="2x" className="text-accent-500" />
              </motion.div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-700 mb-4 text-center">회전</h3>
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary-100"
              >
                <Icon name="star" size="2x" className="text-secondary-500" />
              </motion.div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section: Stagger Animation */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="layer-group" className="text-secondary-500" />
          순차 애니메이션
        </h2>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'bullseye', color: 'primary' },
            { icon: 'rocket', color: 'secondary' },
            { icon: 'star', color: 'accent' },
            { icon: 'trophy', color: 'primary' },
          ].map((item, index) => (
            <StaggerItem key={index}>
              <Card hover className="text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${item.color}-100 mb-4`}>
                  <Icon name={item.icon} size="2x" className={`text-${item.color}-500`} />
                </div>
                <p className="font-medium text-gray-700">아이템 {index + 1}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Section: Example Layout */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Icon name="th-large" className="text-accent-500" />
          레이아웃 예시
        </h2>

        <Card className="bg-gray-50" padding="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center pb-8 border-b border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 mb-6">
                <Icon name="compass" size="2x" className="text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                페이지 헤더
              </h3>
              <p className="text-gray-500">페이지 설명 텍스트가 여기에 표시됩니다</p>
            </div>

            {/* Content Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} hover>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100">
                      <Icon name="briefcase" size="lg" className="text-secondary-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">카드 제목 {i}</h4>
                      <p className="text-gray-500 text-sm">카드 설명 텍스트</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center pt-8 border-t border-gray-200">
              <Button variant="primary" size="lg">
                <Icon name="arrow-right" size="sm" />
                다음 단계로
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default DesignSystemPage;
