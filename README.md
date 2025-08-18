# OneSheet Money
지출 입력 5초, 주간 리포트 한 장. (apps/web=Next.js, apps/api=NestJS, Supabase)

## 무엇이며, 어떻게 구성되었나요? ([PRD](./docs/PRD.md))
- 이 저장소는 모노레포입니다. 프론트엔드(Next.js)와 백엔드(NestJS), 공용 패키지들이 하나의 프로젝트에 함께 있습니다.
  - 프론트엔드: `apps/web`
  - 백엔드(API): `apps/api`
  - 공용 패키지: `packages/types`, `packages/lib`, `packages/ui`
- 디자인 시스템은 Ledger tokens(`apps/web/app/styles/tokens.css`)을 사용하며, Tailwind 확장을 통해 토큰만으로 스타일링합니다.

## 실행 방법 (Ports는 환경변수로 설정 가능)
사전 설치: Node 18+, pnpm 9+

1) 의존성 설치
```bash
pnpm i
```

2) 프론트엔드만 실행(기본 3100)
```bash
# 포트 변경 가능: PORT 환경변수로 지정
PORT=3100 pnpm --filter @osm/web dev
# 브라우저에서 http://localhost:3100 접속 (/today, /weekly 등)
```

3) 백엔드만 실행(기본 4000; 필요시 변경)
```bash
# apps/api/.env 또는 환경변수 PORT로 설정 (예: 4100)
PORT=4100 pnpm --filter @osm/api dev
# API 예시: GET http://localhost:4100/expenses
```

4) 둘 다 병렬 실행
```bash
# 각 패키지에서 개별 실행 권장 (포트 충돌 방지)
PORT=3100 pnpm --filter @osm/web dev &
PORT=4100 pnpm --filter @osm/api dev &
```

## 현재 상태를 어떻게 이해하면 좋을까요?
- 프론트엔드와 백엔드는 하나의 모노레포에 공존합니다. 동일한 루트에서 개발/형상관리되며, 공용 타입/유틸을 공유합니다.
- 프론트엔드는 모바일 퍼스트 UI로 `/today`, `/weekly`, `/budget`, `/settings`, `/share/weekly` 라우트를 제공합니다.
- 백엔드는 V1 스텁 API를 제공합니다: `POST/GET /expenses`, `POST/GET /budgets`, `POST/GET /reports/weekly`, `POST /share/weekly`
- 포트는 충돌을 피하기 위해 환경변수로 자유롭게 바꿀 수 있습니다. 기본값 예시: web=3100, api=4000(또는 4100 등)

## 품질/보안 가이드 요약
- TypeScript strict, ESLint 통과가 목표입니다.
- 접근성(a11y) 95+ 목표: 다이얼로그 포커스 트랩, aria-label/role, 라이브 리전 사용.
- 성능: LCP < 2.0s(P75 모바일), 초기 JS < 90KB, 스켈레톤 우선.
- 보안: .env 분리, RLS 준수, 공유시 PII 제거, 노트 XSS 방지.

## 문제 해결
- 포트 충돌: `PORT` 환경변수로 변경하여 실행하세요.
- 설치/실행 이슈: pnpm 9.x, Node 18.x 이상을 사용하고, corepack 대신 글로벌 pnpm을 권장합니다.
