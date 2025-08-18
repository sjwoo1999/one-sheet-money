# PRD: OneSheet Money v1

## 1) 목적과 지표
- North Star: "5초 지출 입력"과 "한 장 주간 리포트"
- KPI
  - P75 time_to_add_expense ≤ 5s
  - Weekly 이해도(퀵테스트) ≥ 80%
  - LCP < 2.0s (모바일), a11y ≥ 95

## 2) 페르소나 & 핵심 시나리오
- 출퇴근 기록러, 프리랜서 정산러, 가계부 공유러
- 플로우: 오늘 입력 → 주간 리포트 → 예산 점검/공유

## 3) 범위 (v1)
- Must
  - QuickAddSheet(최근/메모/Undo 토스트/고정 CTA)
  - WeeklyOneSheet(주 범위/합계/전주 대비/TOP3/제안)
  - BudgetBar(진행도 및 상태 색상)
  - 하단 탭 내비게이션
  - CSV 내보내기(주간)
- Should
  - 최근 카테고리 기억, OverspendBadge, Share 프리셋(정사각/세로/링크, 익명/금액숨김)
- Won't (v1)
  - 멀티통화 자동환율, 고급 필터/분석

## 4) 요구사항
### 기능 요구
- /today: 5초 입력(숫자 키패드, 최근칩, 메모 토글, Undo)
- /weekly: 주 선택, OneSheet, 공유/CSV
- /budget: 월 선택 + 카테고리 BudgetBar 관리
- /settings: 통화/로케일, 데이터 내보내기/삭제, Supabase 연동

### 비기능 요구
- Tokens-only 스타일, TS strict, ESLint 통과
- a11y: 포커스 트랩, aria-* 라벨, 라이브 리전
- 성능: 초기 JS < 90KB, 이미지 < 100KB, 스켈레톤 우선
- 보안: RLS, PII 비노출(공유), 노트 sanitize

## 5) 데이터 & API 계약(초안)
- POST/GET /expenses { amount, category, note?, ts? }
- POST/GET /budgets { month, category, limit }
- POST/GET /reports/weekly { week_start }
- POST /share/weekly { report_id }

## 6) 측정/실험
- Events: expense_add_open/submit/undo, weekly_view/share/csv, budget_create/update
- Timers: time_to_add_expense, weekly_time_to_understand

## 7) 리스크/의존성
- 포트/환경 분리, Supabase 스키마/RLS, 성능 예산 준수

## 8) 로드맵
- Phase 1 (2주): QuickAdd/Weekly/Budget 핵심 + 하단탭 + CSV
- Phase 2 (1주): SharePresetModal, OverspendBadge, 익명/금액숨김
- Phase 3 (1주): 성능/a11y/분석 고도화, 최근 카테고리 영속화

## 9) 수용 기준(예시)
- 5초 입력: P75 ≤ 5s(모의 데이터) / Undo 동작 검증
- 주간 이해도: 10s 내 80% "이해됨"
- a11y ≥ 95, 키보드 흐름/모달 트랩 OK
- LCP < 2.0s, 초기 JS < 90KB, 이미지 < 100KB
- 토큰 하드코드 0건
