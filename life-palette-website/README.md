# Life Palette 웹사이트

AI 기반 시니어 정서조절 및 맞춤형 미술치료 서비스 "라이프팔레트"의 공식 랜딩 페이지입니다.

## 📋 프로젝트 개요

**Life Palette**는 시니어의 정서조절을 위한 AI 진단과 맞춤형 미술처방 솔루션을 제공하는 혁신적인 서비스입니다. 이 웹사이트는 서비스 소개, 효과 설명, 신청 접수 등의 기능을 포함한 완성도 높은 랜딩 페이지입니다.

### 🎯 핵심 가치
- **AI 기반 진단**: 개인 맞춤형 정서 분석
- **미술치료 처방**: 과학적 근거 기반 활동 추천
- **지속적 관리**: 개인별 성장 리포트 제공

## 🏗️ 프로젝트 구조

```
life-palette-website/
├── index.html                 # 메인 HTML 파일
├── assets/
│   ├── css/
│   │   ├── styles.css        # 메인 스타일시트
│   │   └── responsive.css    # 반응형 디자인
│   ├── js/
│   │   ├── main.js          # 핵심 기능
│   │   └── animations.js    # 애니메이션 효과
│   └── images/              # 이미지 폴더 (현재 placeholder)
└── README.md                # 프로젝트 문서
```

## 🚀 주요 기능

### 1. 반응형 디자인
- **모바일 퍼스트**: 320px부터 대응
- **태블릿 최적화**: 768px+ 2컬럼 레이아웃
- **데스크탑 완전 지원**: 1024px+ 풀 레이아웃
- **와이드스크린 대응**: 1440px+ 최대 너비 제한

### 2. 사용자 경험 (UX)
- **부드러운 스크롤**: 네비게이션 연동 스무스 스크롤
- **인터랙티브 애니메이션**: 스크롤 기반 요소 등장 효과
- **모바일 메뉴**: 햄버거 메뉴 + 접근성 고려
- **폼 검증**: 실시간 유효성 검증 + 사용자 피드백

### 3. 접근성 (A11Y)
- **WCAG 2.1 AA 준수**: 색상 대비, 키보드 네비게이션
- **스크린 리더 지원**: ARIA 라벨, 시맨틱 마크업
- **키보드 네비게이션**: Tab 순서, 포커스 관리
- **Reduced Motion**: 동작 민감성 사용자 배려

### 4. 성능 최적화
- **이미지 레이지 로딩**: 필요시에만 로드
- **CSS 최적화**: 커스텀 프로퍼티, 효율적 선택자
- **JavaScript 최적화**: ES6+, 비동기 처리
- **번들 최소화**: 불필요한 라이브러리 제거

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: `#FF6B6B` → `#4ECDC4` (그라디언트)
- **Secondary**: `#A8E6CF` → `#FFB6C1`
- **Accent**: `#FF8E53`
- **Neutral**: `#F8F9FA` → `#171717`

### 타이포그래피
- **한글**: Noto Sans KR (300, 400, 500, 700)
- **영문**: Inter (보조 폰트)
- **크기**: 12px~60px 반응형 스케일

### 레이아웃 시스템
- **그리드**: CSS Grid + Flexbox 하이브리드
- **컨테이너**: 최대 1440px 제한
- **간격**: 4px~96px 일관된 스페이싱
- **둥근 모서리**: 6px~24px 계층적 적용

## 📱 반응형 브레이크포인트

| 디바이스 | 크기 | 레이아웃 | 특징 |
|---------|------|----------|------|
| Mobile | 320px+ | 1 Column | 스택 형태, 모바일 메뉴 |
| Tablet | 768px+ | 2 Column | 그리드 조정, 사이드바 |
| Desktop | 1024px+ | 3 Column | 풀 레이아웃, 호버 효과 |
| Wide | 1440px+ | 제한 너비 | 최적 가독성 유지 |

## 🔧 설치 및 실행

### 1. 로컬 환경 실행
```bash
# 프로젝트 클론 또는 다운로드
cd life-palette-website

# 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js (http-server)
npx http-server

# 브라우저에서 확인
http://localhost:8000
```

### 2. 배포 준비
```bash
# 이미지 최적화 (WebP 변환 권장)
# CSS/JS 압축 (배포시 minify)
# robots.txt, sitemap.xml 추가
```

## 📝 콘텐츠 구조

### 1. Hero Section
- **헤드카피**: "라이프팔레트 – 더 다양한 색으로 채우는 Colorful Life"
- **CTA 버튼**: AI 진단 시작, 서비스 자세히 보기
- **비주얼**: 메인 이미지 영역 (placeholder 포함)

### 2. Services (LIFE PALETTE)
- **3단계 프로세스**: AI 진단 → 활동 추천 → 리포트 관리
- **각 단계별 설명**: 상세 기능 소개
- **시각적 요소**: 단계별 아이콘, 이미지 영역

### 3. Benefits (미술치료 효과)
- **인지 강화**: 기억력, 집중력, 소근육 운동
- **정서 회복**: 스트레스 해소, 자아 표현, 감정 안정
- **사회적 교류**: 소통 능력, 공동체 참여, 관계 형성

### 4. Differentiator (차별성)
- **AI 맞춤 추천**: 개인별 최적화
- **감정 맞춤 처방**: 실시간 감정 대응
- **새로운 소통의 장**: 커뮤니티 기능

### 5. Application (서비스 신청)
- **신청 폼**: 이름, 연령, 연락처, 관심 분야
- **실시간 검증**: 입력값 유효성 확인
- **체험 갤러리**: 작품 사진 영역 (4개 placeholder)

### 6. Mission (회사 철학)
- **한글 메시지**: 누리고 즐기고 배우는 목표
- **영문 메시지**: "Committed to care that honors dignity..."
- **핵심 가치**: 혁신적 기술, 존엄한 돌봄, 창의적 노화

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업, 구조화된 데이터
- **CSS3**: Grid/Flexbox, Custom Properties, Animations
- **JavaScript ES6+**: 클래스 기반, 비동기 처리, 모듈화

### 개발 도구
- **폰트**: Google Fonts (Noto Sans KR, Inter)
- **아이콘**: 텍스트 기반 이모지 (확장 가능)
- **성능**: Native Intersection Observer, throttle/debounce
- **접근성**: ARIA, 키보드 네비게이션, 스크린 리더

## 🎯 SEO 최적화

### 메타 데이터
- **제목**: "라이프팔레트 - 더 다양한 색으로 채우는 Colorful Life"
- **설명**: AI 기반 시니어 정서조절 및 맞춤형 미술치료 서비스
- **키워드**: 시니어 케어, 미술치료, AI 진단, 정서조절

### 구조화된 데이터
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "라이프팔레트",
  "serviceType": "Healthcare Technology"
}
```

### Open Graph
- Facebook, Twitter 공유 최적화
- 이미지, 제목, 설명 메타태그 포함

## 📊 성능 목표

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5초
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 추가 지표
- **로딩 시간**: 3G < 3초, WiFi < 1초
- **번들 크기**: CSS < 50KB, JS < 100KB
- **접근성 점수**: Lighthouse 90점 이상

## 🔧 향후 개선 사항

### 즉시 보강 필요
1. **실제 이미지 추가**
   - Hero 섹션 메인 비주얼
   - 서비스 단계별 설명 이미지
   - 체험 갤러리 작품 사진 (최소 8장)
   - 미술치료 효과 관련 이미지

### 기능 확장
2. **API 연동**
   - 실제 폼 제출 처리
   - 상담 신청 DB 저장
   - 이메일/SMS 알림 시스템

3. **다국어 지원**
   - 영어 버전 페이지
   - 언어 토글 기능
   - i18n 시스템 구축

4. **CMS 연동**
   - 관리자 페이지
   - 콘텐츠 동적 관리
   - 갤러리 업로드 시스템

### 고급 기능
5. **A/B 테스트**
   - 헤드라인 최적화
   - CTA 버튼 테스트
   - 전환율 분석

6. **개인화**
   - 사용자 행동 분석
   - 맞춤 콘텐츠 추천
   - 리타게팅 픽셀

7. **PWA (Progressive Web App)**
   - 서비스 워커
   - 오프라인 지원
   - 앱 설치 기능

## 📈 분석 및 추적

### Google Analytics 4
- 페이지 뷰, 사용자 행동
- 폼 전환율 추적
- 모바일/데스크탑 비율

### 히트맵 분석
- Hotjar/Crazy Egg 연동 권장
- 스크롤 깊이, 클릭 패턴
- 사용자 세션 녹화

## 🚨 주의사항

### 개발 환경
- 모던 브라우저 필수 (IE11 미지원)
- JavaScript 활성화 필수
- 쿠키 허용 권장

### 성능 고려사항
- 이미지 WebP 포맷 권장
- CDN 사용 권장 (fonts, images)
- 압축 활성화 (gzip/brotli)

### 보안
- HTTPS 필수
- CSP (Content Security Policy) 설정
- XSS 방지 코드 검토

## 📞 지원 및 문의

개발 관련 문의나 기술 지원이 필요한 경우:
- 이메일: dev@lifepalette101.com
- 개발 문서: 이 README.md 파일 참조
- 이슈 트래킹: GitHub Issues 활용 권장

---

**© 2024 Life Palette. All rights reserved.**

*"더 다양한 색으로 채우는 Colorful Life"를 위한 기술적 기반을 제공합니다.*