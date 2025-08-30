# Life Palette 웹사이트 - AI 개발 문서

## 프로젝트 개요

**Life Palette**는 시니어의 정서조절을 위한 AI 진단과 맞춤형 미술치료 서비스 랜딩 페이지입니다.

### 주요 특징
- 완전 반응형 디자인 (모바일 퍼스트)
- 접근성 최적화 (WCAG 2.1 AA 준수)
- 인터랙티브 컬러 팔레트 체험 기능
- 전문적이고 따뜻한 디자인 시스템
- Pretendard 한글 폰트 적용
- 시니어 친화적 UI/UX

## 파일 구조

```
life-palette-website/
├── index.html                 # 메인 HTML 파일
├── assets/
│   ├── css/
│   │   ├── styles.css        # 메인 스타일시트
│   │   └── responsive.css    # 반응형 디자인
│   └── js/
│       ├── main.js          # 핵심 기능
│       └── color-palette.js # 컬러 팔레트 체험
├── README.md                 # 프로젝트 문서
└── CLAUDE.md                 # 이 문서
```

## 개발 히스토리

### 1단계: 초기 구현
- 기본 HTML 구조 및 콘텐츠 구현
- CSS 디자인 시스템 구축
- 기본 JavaScript 기능

### 2단계: 디자인 개선
- 더 둥근 디자인 (border-radius 증가)
- 따뜻한 색상 팔레트 적용
- Pretendard 폰트 도입

### 3단계: 전문성 향상
- 기본 이모지를 전문 SVG 아이콘으로 교체
- 시니어 친화적 폰트 크기 및 대비 최적화
- 전문적인 그라디언트 및 섀도우 시스템

### 4단계: 인터랙티브 기능 추가
- 마우스 움직임 기반 감정 인식 컬러 팔레트
- 실시간 캔버스 페인팅
- 8가지 감정 상태별 색상 시스템

### 5단계: 시각적 향상
- 애니메이션 그라디언트 테두리
- 개선된 시각 효과
- 더 매력적이고 창의적인 디자인

### 6단계: 기능 확장
- 파티클 시스템 업그레이드
- 반짝임 효과 추가
- 더 다양한 인터랙션

### 7단계: 모바일 최적화
- 완전 반응형 컬러 팔레트
- 모바일/태블릿/데스크탑별 최적화
- 터치 이벤트 지원

## 핵심 컴포넌트

### 1. 컬러 팔레트 체험 (`color-palette.js`)

**위치**: `assets/js/color-palette.js`

**주요 기능**:
- 마우스 움직임에 따른 실시간 감정 분석
- 8가지 감정 상태: 평온함, 기쁨, 창의성, 활기참, 안정감, 따뜻함, 집중력, 희망
- 각 감정별 고유 색상 팔레트
- 캔버스 페인팅 시스템
- 파티클 효과 및 반짝임
- 터치 디바이스 지원
- 반응형 캔버스 크기

**감정 인식 로직**:
```javascript
// 마우스 속도에 따른 감정 분류
if (speed > 15) newEmotion = 'energetic';
else if (speed > 8) newEmotion = 'joy';
else if (mouseY < canvas.height * 0.3) newEmotion = 'hope';
else if (mouseX > canvas.width * 0.7) newEmotion = 'creative';
// ... 더 많은 조건들
```

### 2. 디자인 시스템 (`styles.css`)

**색상 팔레트**:
```css
:root {
    --primary: #FF6B6B;
    --primary-light: #FF8A8A;
    --secondary: #4ECDC4;
    --accent: #A8E6CF;
    --warm: #FFB6C1;
    /* ... 더 많은 색상들 */
}
```

**타이포그래피**:
- **기본 폰트**: Pretendard (한글 최적화)
- **보조 폰트**: Inter (영문)
- **크기 범위**: 12px ~ 60px (반응형)

**둥근 디자인**:
- 기본 둥근 정도: 6px ~ 4rem (64px)
- 컴포넌트별 차등 적용

### 3. 반응형 시스템 (`responsive.css`)

**브레이크포인트**:
- **모바일**: ~767px (기본)
- **태블릿**: 768px ~ 1023px
- **데스크탑**: 1024px+

**컬러 팔레트 반응형**:
```css
/* 모바일 */
.color-palette-canvas {
    padding: var(--space-4);
    max-width: calc(100% - var(--space-4));
}

#paintCanvas {
    height: 200px;
}

/* 태블릿 */
@media (min-width: 768px) {
    #paintCanvas { height: 300px; }
}

/* 데스크탑 */
@media (min-width: 1024px) {
    #paintCanvas { height: 400px; }
}
```

## 접근성 구현

### WCAG 2.1 AA 준수
- 색상 대비비 4.5:1 이상
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 라벨링

### 시니어 친화적 특징
- 큰 글꼴 크기
- 명확한 컬러 대비
- 간단한 네비게이션
- 직관적인 인터페이스

## 성능 최적화

### 이미지 및 폰트
- Pretendard 폰트 CDN 사용
- SVG 아이콘으로 경량화
- 레이지 로딩 준비 완료

### JavaScript 성능
- 이벤트 디바운싱 적용
- 파티클 수 제한 (150개)
- 효율적인 애니메이션 루프
- 메모리 누수 방지

## 알려진 이슈 및 개선사항

### 해결된 이슈
✅ 모바일 반응형 문제 해결
✅ 폰트 가독성 개선
✅ 전문적인 아이콘 시스템
✅ 컬러 팔레트 시각적 향상

### 향후 개선 가능 항목
- [ ] 실제 이미지 콘텐츠 추가
- [ ] API 백엔드 연동
- [ ] 다국어 지원
- [ ] PWA 기능
- [ ] A/B 테스트 시스템

## 사용된 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Grid, Flexbox, Custom Properties, Animations
- **JavaScript ES6+**: 클래스 기반, 모듈화, 비동기 처리

### 디자인
- **폰트**: Pretendard (한글), Inter (영문)
- **아이콘**: 커스텀 SVG
- **애니메이션**: CSS Transitions & Transforms
- **색상**: 따뜻한 파스텔 톤 기반

### 도구
- **네이티브 API**: Canvas, Intersection Observer
- **성능**: Throttle/Debounce 적용
- **접근성**: ARIA, 키보드 네비게이션

## 배포 준비사항

### 최종 체크리스트
1. ✅ 모든 디바이스에서 반응형 테스트 완료
2. ✅ 접근성 검증 완료
3. ✅ 성능 최적화 적용 완료
4. ✅ 크로스 브라우저 호환성 확인 필요
5. ⚠️ 실제 이미지 콘텐츠 필요
6. ⚠️ 폼 제출 백엔드 연동 필요

### 배포 명령어
```bash
# 로컬 테스트 서버
python -m http.server 8000
# 또는
npx http-server

# 프로덕션 배포 시 고려사항
# - HTTPS 필수
# - gzip 압축 활성화
# - CDN 사용 권장
# - robots.txt, sitemap.xml 추가
```

## 트러블슈팅

### 일반적인 문제들

**Q: 컬러 팔레트가 모바일에서 작동하지 않음**
A: 터치 이벤트 핸들러가 구현되어 있으며, 반응형 캔버스 크기 조정이 자동으로 됩니다.

**Q: 폰트가 로드되지 않음**
A: Pretendard CDN 링크가 HTML head에 올바르게 포함되어 있는지 확인하세요.

**Q: 애니메이션이 너무 느림**
A: `prefers-reduced-motion` 미디어 쿼리로 모션 감소 옵션을 지원합니다.

## 다음 개발자를 위한 가이드

### 시작하기
1. 프로젝트 디렉토리에서 로컬 서버 실행
2. `index.html`부터 구조 파악
3. `styles.css`에서 디자인 시스템 이해
4. `color-palette.js`에서 인터랙티브 기능 분석

### 수정할 때 주의사항
- CSS 변수(`--space-*`, `--color-*`)를 우선 사용
- 반응형 브레이크포인트 일관성 유지
- 접근성 기준 지키기
- 시니어 사용자 고려한 UI/UX 유지

### 디버깅 팁
- 브라우저 개발자 도구의 모바일 뷰 적극 활용
- 콘솔에서 `colorPaletteExperience` 객체로 실시간 디버깅 가능
- 성능 탭에서 애니메이션 성능 모니터링

---

**개발 완료일**: 2024년 8월 29일
**개발자**: Claude AI
**프로젝트 상태**: 배포 준비 완료 (이미지 콘텐츠 추가 필요)