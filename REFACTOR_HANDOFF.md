# iwtc-frontend 리팩터링 인수인계

작성일: 2026-09-02

## 시작 지점

- 기준 브랜치: `prod/v1.0`
- 작업 브랜치: `refactor/full-project`
- 마지막 코드 커밋: `5e97c52 refactor: 유튜브 iframe 컴포넌트 타입 연결`
- 기존 커밋 인수 검수는 다시 하지 않는다. 현재 작업 브랜치 HEAD부터 이어서 작업한다.
- 이 문서를 추가한 커밋이 위 코드 커밋 다음에 위치한다.

다른 환경에서 시작할 때:

```bash
git fetch origin
git switch refactor/full-project
git pull --ff-only
npm ci
```

## 반드시 지킬 제약사항

1. 기존 서비스 기능과 사용자 동작을 변경하지 않는다.
2. API endpoint와 request/response contract를 변경하지 않는다.
3. UI/UX와 디자인을 변경하지 않는다.
4. 리팩터링과 무관한 기능을 추가하지 않는다.
5. 기존 의존성의 major version을 올리지 않는다.
6. 명확한 필요성이 없는 신규 라이브러리를 추가하지 않는다.
7. 수정할 영역의 기존 구조와 호출 흐름을 먼저 확인한다.
8. 영역·도메인 단위로 나누어 점진적으로 수정한다.
9. 공통화가 복잡도를 높이면 억지로 추상화하지 않는다.
10. dead code와 unused dependency는 실제 참조 여부를 확인한 뒤 제거한다.
11. `any`, 불필요한 type assertion, `@ts-ignore`, `eslint-disable`로 오류를 우회하지 않는다.
12. 각 단계마다 lint, typecheck, test, build를 모두 실행한다.
13. 변경 범위가 크면 문제와 개선 방향을 먼저 정리한다.
14. 하나의 커밋에는 가능한 한 하나의 리팩터링 목적만 담는다.

## 현재 검증 기준선

아래 명령은 현재 모두 통과한다.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

- 테스트: 51개, 20 suites
- 테스트 도구: 별도 라이브러리 없이 Node.js `node:test`
- production build는 `.env.production`을 사용한다.
- lint에는 기존 `@next/next/no-img-element` 경고 3건이 남아 있다.
  - `src/app/play-clear/[...id]/page.tsx`: 2건
  - `src/components/manage/ImageTypeLayout.tsx`: 1건
- build에는 기존 `caniuse-lite is outdated` 안내가 나온다. 의존성 갱신은 이번 리팩터링 범위에 포함하지 않았다.

## 완료된 주요 범위

### 검증·React Query 기반

- lint/typecheck/test/build 스크립트와 테스트 실행 기준선을 확보했다.
- React Query Key를 `src/lib/react-query/queryKeys.ts`에서 관리한다.
- 랭킹 Query Key에 월드컵 ID가 포함되어 서로 다른 월드컵 캐시가 공유되지 않는다.
- 댓글 목록 무효화는 React Query v4 정식 API를 사용하며 타입 우회가 없다.

### API·도메인 타입 경계

- 월드컵 목록, 내 월드컵 목록·상세, 관리 콘텐츠, 댓글 API 응답 타입을 연결했다.
- 월드컵 생성·삭제와 관리 콘텐츠 생성·수정 요청 payload 타입을 연결했다.
- 게임 라운드·진행·종료·랭킹 API DTO를 `src/interfaces/models/world-cup/WcGameData.ts`에 분리했다.
- endpoint와 실제 요청 payload는 변경하지 않았다.

### 관리 도메인

- 기존 관리 콘텐츠와 신규 콘텐츠 모델을 `src/domain/manage/persistedContent.ts`에 정리했다.
- 관리 콘텐츠 조회·저장·편집 상태와 카드 래퍼의 활성 `any`를 제거했다.
- YouTube 카드와 정적 미디어 카드의 props, 상태, 이벤트, 수정·삭제 목록 타입을 연결했다.
- 신규 콘텐츠와 기존 콘텐츠의 `newList`, `modifyList`, `deleteList` 분기는 그대로 유지했다.
- 과거 주석 코드에서만 쓰이던 카드 내부 직접 API 호출 import와 `worldCupId` 전달 체인은 참조 확인 후 제거했다.

### 게임 도메인

- 게임 요청, 종료 요청, 라운드 진행률·라벨 계산을 순수 함수로 분리하고 테스트를 추가했다.
- 미디어 파일 결합 규칙을 `src/domain/game/mediaFile.ts`로 분리했다.
- 미디어 조회 실패 시 `/images/default.png`를 사용하는 기존 동작과 객체 참조 유지 동작을 테스트로 고정했다.
- 게임 진행 화면, 종료 화면, 랭킹 목록, 라운드 팝업의 상태 타입을 API DTO부터 연결했다.
- YouTube 플레이어 두 종류의 활성 `any`를 제거했다.
- 후보 선택 시 승자·패자 ID와 다음 제외 목록을 계산하는 로직을 순수 함수로 분리했다.
- 결승 종료·다음 라운드 요청·같은 라운드의 다음 후보 표시를 상태 전이로 분리했다.
- 1~4위 누적 규칙과 결과 페이지 경로 생성을 순수 함수로 분리했다.
- 선택 애니메이션, 후보 미디어 렌더링, 진행률 상태를 각각 훅과 컴포넌트로 분리했다.

### 홈 목록·공통 타입 경계

- 월드컵 목록 API 모델과 미디어가 결합된 화면 모델을 분리했다.
- `mappingMediaFile2`, Infinite Query, 목록 카드 props의 활성 `any`를 제거했다.
- 홈 목록 미디어 좌·우 요청의 4가지 성공/실패 조합을 테스트로 고정했다.
- `BaseService` 메서드의 기본 응답 타입을 `any`에서 `unknown`으로 축소하고, 제네릭을 생략했던 활성 호출부에 응답·요청 타입을 연결했다.
- 인증 폼, 헤더, 관리 폼, 검증 메시지, 댓글 Popper의 활성 `any`를 제거했다.
- 관리 컨텐츠 생성 폼의 공통·YouTube·파일 검증 규칙을 순수 함수로 분리했다.
- 관리 컨텐츠 생성 폼과 미디어 입력 UI를 목록 관리 컴포넌트에서 분리했다.
- 신규·수정 컨텐츠의 API 요청 payload 구성 규칙을 도메인 함수로 분리했다.
- 삭제·수정·신규 생성 API를 병렬로 실행하는 저장 요청 조합을 분리하고 실패 전파를 테스트했다.
- 이미지 파일 선택 시 FileReader 결과와 파일 메타데이터를 초안에 결합하는 변환을 분리했다.
- 2024년 1월부터 비활성 상태였던 GIF→MP4 변환 코드의 이력과 참조를 확인하고, FFmpeg 패키지 3개와 약 23MB의 public 런타임 파일을 제거했다.
- 관리 카드에서 상위 저장 방식으로 대체된 직접 API 호출 주석과 개발용 로그를 제거했다.
- 소스·설정·Git 이력을 대조해 사용 이력이 없는 `recoil`과 `@types/react`가 이미 제공하는 중복 직접 의존성 `@types/prop-types`를 제거했다.
- 서비스의 교체된 Query·endpoint·토큰 처리 주석과 인증 헤더·응답 디버그 로그를 제거했다.
- 화면 컴포넌트의 이전 SSR·수동 조회·모바일 버튼·게임 레이아웃·폼 마크업과 주석에서만 쓰이던 상태·import를 제거했다.
- 유틸리티의 과거 쿠키·localStorage 구현과 FFmpeg용 교차 출처 격리 설정을 포함한 잔여 코드형 주석을 제거했다.

최근 작업 커밋:

```text
c2136a3 refactor: 잔여 레거시 주석 정리
9d5fd22 refactor: 미사용 화면 마크업 정리
0de4967 refactor: 화면 과거 구현 정리
9aeaa4f refactor: 서비스 과거 구현 정리
6c539ae chore: 미사용 직접 의존성 제거
59e16e5 refactor: 관리 카드 과거 구현 정리
575d19b chore: 사용하지 않는 FFmpeg 의존성 제거
2b887cb refactor: 관리 이미지 입력 변환 분리
933a67d refactor: 관리 컨텐츠 저장 요청 조합 분리
b6afb78 refactor: 관리 컨텐츠 요청 데이터 구성 분리
6d8b64c refactor: 관리 컨텐츠 생성 폼 분리
e75daad refactor: 관리 컨텐츠 검증 로직 분리
441bc24 refactor: 게임 진행 상태 훅 분리
c258a20 refactor: 게임 순위 누적 로직 분리
3b5f371 refactor: 게임 후보 미디어 렌더링 분리
76252c4 refactor: 게임 선택 애니메이션 훅 분리
26d61fd refactor: 게임 라운드 상태 전이 분리
f97d3ce refactor: 게임 후보 선택 로직 분리
6b1ba50 refactor: 폼과 표시 컴포넌트 타입 연결
05bfd7a refactor: API 기본 응답 타입 축소
bf9a9c9 refactor: 홈 목록 미디어 타입 연결
1f155aa fix: 인증 폼 import 경로 대소문자 정정
5e97c52 refactor: 유튜브 iframe 컴포넌트 타입 연결
bada21a refactor: 게임 결과 화면 상태 타입 연결
9c5ce0d refactor: 게임 화면 상태 타입 연결
5fbbbd4 refactor: 게임 미디어 파일 매핑 타입 연결
f4b9d7e refactor: 월드컵 게임 API 응답 타입 연결
71ca770 refactor: 정적 미디어 콘텐츠 카드 타입 연결
002b928 refactor: 유튜브 콘텐츠 카드 타입 연결
7dc694a refactor: 관리 콘텐츠 카드 경계 타입 연결
74085b0 refactor: 관리 콘텐츠 편집 상태 타입 연결
fa7b523 refactor: 관리 콘텐츠 저장 타입 연결
a161087 refactor: 관리 콘텐츠 조회 타입 연결
5399ce6 refactor: 관리 월드컵 상세 타입 연결
```

## 작업 순서와 현재 상태

### 1. 홈 목록 미디어 매핑 타입 연결 (완료)

관련 파일:

- `src/utils/common.ts`의 `mappingMediaFile2`
- `src/interfaces/models/world-cup/WcListData.ts`
- `src/components/home/worldcup/WorldCupWrapper.tsx`
- `src/components/home/worldcup/WorldCupList.tsx`
- `src/components/home/HydratedWCList.tsx`

완료 전 문제:

- `mappingMediaFile2`, Infinite Query 응답, 목록 렌더 props에 `any`가 남아 있다.
- API의 숫자 media file ID를 화면용 미디어 문자열로 같은 필드에 덮어써 데이터 경계가 불명확하다.
- `Promise.allSettled` 결과에서 성공 항목만 필터링한 뒤 좌우 응답으로 다시 배치한다. 왼쪽 요청만 실패하면 오른쪽 응답이 왼쪽에 들어갈 가능성이 있다.
- 실패 경로에서 일부 필드만 변경된 객체가 반환될 수 있으므로, 타입만 맞추기 위해 동작을 임의 변경하면 안 된다.

완료 기준:

1. 좌/우 모두 성공, 왼쪽만 실패, 오른쪽만 실패, 모두 실패하는 조합의 기존 동작을 테스트로 먼저 고정한다.
2. 원본 API 목록 모델과 화면용 미디어가 결합된 모델을 구분한다.
3. `mappingMediaFile2`의 입력·반환 타입을 연결한다.
4. Infinite Query와 `WorldCupList` props의 `any`를 제거한다.
5. 실패 시 좌우 위치 문제를 실제 버그로 수정할 필요가 있다면 타입 정리와 별도 커밋으로 분리한다.

### 2. BaseService 기본 제네릭의 `any` 제거 (완료)

관련 파일: `src/services/BaseService.ts`

완료 전에는 `ajaxGet`, `ajaxPost`, `ajaxPut`, `ajaxDelete`의 기본 응답 타입이 `any`였다.

- 바로 `unknown`으로 일괄 변경하지 말고 아직 제네릭을 지정하지 않은 호출부를 먼저 찾는다.
- 각 서비스에서 실제 DTO를 연결한 뒤 기본 타입을 `unknown`으로 좁힌다.
- 타입 assertion으로 기존 호출부를 통과시키지 않는다.

검색 명령:

```bash
rg -n "ajax(Get|Post|Put|Delete)" src/services
rg -n "\\bany\\b" src --glob '*.{ts,tsx}'
```

### 3. 인증·폼·표시 컴포넌트의 잔여 `any` (완료)

정리한 주요 위치:

- `src/components/Register/HomeLoginForm.tsx`: 입력 이벤트
- `src/components/Register/LoginForm.tsx`: mutation 오류와 입력 이벤트
- `src/components/Register/RegisterForm.tsx`: 입력 이벤트
- `src/components/common/Header.tsx`: 클릭 이벤트
- `src/components/manage/WorldCupManageForm.tsx`: mutation 오류
- `src/components/ValidateMessage/index.tsx`: 검증 결과 구조
- `src/components/reply/ReplyPopup.tsx`: style 객체

적용한 타입:

- 입력: `ChangeEvent<HTMLInputElement>` 등 실제 DOM 이벤트 타입
- mutation 오류: 우선 `unknown`, 필요한 경우 Axios 오류 판별 함수 사용
- style 객체: `StylesConfig` 또는 라이브러리가 제공하는 공개 타입을 기존 설치 버전에서 확인
- 검증 결과: 실제 react-hook-form/yup 사용처를 확인한 뒤 필요한 필드만 모델링

### 4. 게임 페이지 책임 분리 (완료)

`src/app/play-game/[id]/page.tsx`는 타입 경계와 순수 계산 테스트는 확보됐지만 아직 크고 책임이 많다.

다음 후보:

- 후보 선택과 승자/패자 ID 계산 (완료)
- 다음 라운드 요청 시점과 제외 ID 누적 (완료)
- 애니메이션 제어 (완료)
- 후보 미디어 렌더링 (완료)
- 진행 상태 Hook (완료)

선택 로직을 순수 함수 테스트로 먼저 고정한 뒤 Hook과 UI를 분리한다. 현재 클릭 방향과 승자/패자 index 규칙을 임의로 바꾸지 않는다.

### 5. 관리 페이지 추가 분리 (완료)

- `WorldCupContentsManageList.tsx`의 검증 책임 분리 (완료)
- `WorldCupContentsManageList.tsx`의 생성 폼·미디어 입력 책임 분리 (완료)
- `WorldCupContentsManagerListWrapper.tsx`의 신규·수정 요청 payload 구성 분리 (완료)
- `WorldCupContentsManagerListWrapper.tsx`의 생성/수정/삭제 요청 실행 조합 분리 (완료)
- 활성 이미지 입력 변환 로직 분리 (완료)
- 비활성 GIF→MP4 변환 코드의 유지·제거 여부 확인 (제거 완료)
- Git 이력상 2024-01-15부터 YouTube 라이브러리와의 충돌로 비활성 상태였고, import·동적 import·설정 참조가 없어 관련 주석 코드와 의존성·런타임을 함께 제거했다.

### 6. dead code·unused dependency 확인 (진행 중, 다음 시작점)

- 관리 카드의 주석 처리된 직접 저장 구현과 개발용 로그는 제거했다.
- 직접 의존성의 소스·설정 참조를 점검했고, `recoil`과 중복 선언된 `@types/prop-types`를 제거했다.
- 서비스·화면·유틸리티·설정 파일의 코드형 주석은 Git 이력과 활성 흐름을 확인한 뒤 제거했다.
- 다음에는 실제 import가 없는 모듈·컴포넌트와 활성 개발 로그를 확인한다. 공개 export나 라우트 진입점은 파일명 검색 결과만으로 삭제하지 않는다.
- dependency 추가 삭제가 필요하면 import, 동적 import, 빌드 설정 참조를 다시 모두 검색한다.

## 작업 시 주의할 기존 동작

- Query Key 배열 값은 테스트로 고정되어 있다. 키 변경이 필요하면 캐시 영향과 테스트를 함께 검토한다.
- `mappingMediaFile`은 전달받은 항목 객체 자체를 갱신한다. 객체 참조 유지가 테스트에 포함되어 있다.
- 홈 목록 미디어 요청에서 왼쪽 Promise만 reject되면 오른쪽 응답이 왼쪽으로 이동하는 기존 동작이 테스트에 고정되어 있다. 이를 수정할 때는 타입 리팩터링과 분리한 버그 수정 커밋으로 진행한다.
- 관리 콘텐츠에서 `contentsId`가 없는 항목은 신규 목록, 있는 항목은 수정·삭제 목록으로 분기한다.
- `contentsId: 0`은 신규 콘텐츠 정규화 과정에서 `undefined`가 되는 기존 규칙이 테스트로 고정되어 있다.
- 관리 카드의 직접 저장 API 코드는 제거했으며, 실제 저장은 상위 wrapper가 목록을 모아 실행한다.
- 현재 UI 자동화 테스트는 없다. UI 구조를 변경하는 P3/P4 작업 전에는 핵심 사용자 흐름 테스트 도입 여부를 먼저 판단한다.

## 단계별 완료 체크리스트

```bash
git status --short --branch
git diff --check
npm run lint
npm run typecheck
npm test
npm run build
git diff
```

검증 후 하나의 목적만 담아 커밋하고 다음 영역으로 이동한다.
