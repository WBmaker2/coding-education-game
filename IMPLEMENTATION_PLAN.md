# 코딩 교육 게임 (Coding Education Game) — 구현 계획

## 1. 개요
초·중학생을 대상으로 블록 코딩 미션을 통해 프로그래밍 사고력을 키우는 웹앱.
API 없이 브라우저에서 완전히 동작하며, 진행도는 localStorage에 저장한다.

## 2. 목표 사용자
- 초등 3~6학년, 중학생
- 교사(수업 보조, 과제 출제)

## 3. 핵심 기능
- 블록 기반 명령 조합 (이동, 회전, 반복, 조건)
- 레벨별 미션(미로 탈출, 수집, 패턴 그리기)
- 실행 시 캐릭터 애니메이션 + 단계 하이라이트
- 진행도/별점 저장 (localStorage)
- 교사 모드: 레벨 커스텀, 학생 진행도 확인

## 4. 화면 구성
- 홈: 레벨 선택 맵
- 게임 화면: 블록 팔레트 / 워크스페이스 / 캔버스 / 실행 버튼
- 결과 모달: 별점, 재도전/다음
- 교사 패널: 레벨 편집, 진행도

## 5. 기술 스택
- React + Vite + TypeScript
- 상태관리: Zustand
- 블록 UI: 커스텀 드래그앤드롭 (react-dnd 또는 네이티브 DnD)
- 캔버스: SVG/Canvas API
- 저장: localStorage + JSON export/import

## 6. 데이터 모델
- Level { id, title, gridSize, obstacles, goal, maxBlocks, hint }
- Program { blocks: Block[] }
- Progress { levelId, stars, attempts, completedAt }

## 7. 구현 단계
1. 프로젝트 세팅 (Vite+React+TS)
2. 그리드 캔버스 & 캐릭터 렌더링
3. 블록 팔레트/워크스페이스 DnD
4. 실행 엔진 (인터프리터: 이동/회전/반복/조건)
5. 레벨 데이터 & 진행도 저장
6. 결과/별점 로직
7. 교사 패널
8. 접근성/반응형/테스트

## 8. 비기능 요구사항
- 오프라인 동작, 모바일 터치 지원
- 색약 대응, 키보드 조작
- 레벨 JSON 공유

## 9. 검증
- 단위: 인터프리터, 별점 계산
- E2E: 레벨 완료 플로우
