import type { Level } from '../types';

export const defaultLevels: Level[] = [
  {
    id: 'l1',
    title: '1. 직진',
    gridSize: 5,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [],
    goals: [{ x: 4, y: 0 }],
    maxBlocks: 2,
    hint: '반복 블록으로 4칸 이동해보세요.',
  },
  {
    id: 'l2',
    title: '2. 꺾어가기',
    gridSize: 5,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }],
    goals: [{ x: 4, y: 2 }],
    maxBlocks: 6,
    hint: '오른쪽으로 2칸, 아래로 2칸 가야 해요.',
  },
  {
    id: 'l3',
    title: '3. 수집하기',
    gridSize: 5,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [],
    goals: [{ x: 2, y: 0 }, { x: 4, y: 2 }],
    maxBlocks: 8,
    hint: '별을 모두 모으세요.',
  },
  {
    id: 'l4',
    title: '4. 사각형 그리기',
    gridSize: 6,
    start: { x: 1, y: 1, dir: 0 },
    obstacles: [],
    goals: [{ x: 1, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 4 }, { x: 1, y: 4 }],
    maxBlocks: 8,
    hint: '반복을 사용해 정사각형을 그리며 별을 모으세요.',
  },
  {
    id: 'l5',
    title: '5. 장애물 피해가기',
    gridSize: 6,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
    goals: [{ x: 5, y: 5 }],
    maxBlocks: 12,
    hint: '벽을 피해 목표에 도달하세요.',
  },
  {
    id: 'l6',
    title: '6. 조건문',
    gridSize: 6,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [{ x: 2, y: 0 }, { x: 4, y: 2 }],
    goals: [{ x: 5, y: 0 }],
    maxBlocks: 10,
    hint: '앞에 벽이 있으면 방향을 바꾸세요.',
  },
  {
    id: 'l7',
    title: '7. 미로',
    gridSize: 7,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 },
      { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 5 },
    ],
    goals: [{ x: 6, y: 6 }],
    maxBlocks: 15,
    hint: '미로를 탈출하세요.',
  },
  {
    id: 'l8',
    title: '8. 챌린지',
    gridSize: 8,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
      { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
      { x: 3, y: 6 }, { x: 4, y: 6 },
    ],
    goals: [{ x: 7, y: 0 }, { x: 7, y: 7 }, { x: 0, y: 7 }],
    maxBlocks: 20,
    hint: '세 개의 별을 모두 모으세요.',
  },
  {
    id: 'l9',
    title: '9. 조건문 연습',
    gridSize: 6,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
    goals: [{ x: 5, y: 0 }],
    maxBlocks: 12,
    hint: '앞에 벽이 있으면 아래로 방향을 바꾸세요.',
  },
  {
    id: 'l10',
    title: '10. 반복과 조건',
    gridSize: 7,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [{ x: 1, y: 0 }, { x: 3, y: 2 }, { x: 5, y: 4 }],
    goals: [{ x: 6, y: 6 }],
    maxBlocks: 16,
    hint: '벽을 만나면 방향을 바꾸며 전진하세요.',
  },
  {
    id: 'l11',
    title: '11. 챌린지 2',
    gridSize: 8,
    start: { x: 0, y: 0, dir: 0 },
    obstacles: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 6 },
    ],
    goals: [{ x: 7, y: 0 }, { x: 0, y: 7 }, { x: 7, y: 7 }],
    maxBlocks: 24,
    hint: '세 별을 모두 모으세요.',
  },

  {
    id: 'l12', title: '12. 한 칸 이동', gridSize: 3,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 1, y: 0 }], maxBlocks: 2, hint: '이동 블록 하나로 도착해보세요.'
  },
  {
    id: 'l13', title: '13. 두 칸 이동', gridSize: 3,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 2, y: 0 }], maxBlocks: 3, hint: '이동 블록 두 개를 사용하세요.'
  },
  {
    id: 'l14', title: '14. 아래로 이동', gridSize: 3,
    start: { x: 0, y: 0, dir: 1 }, obstacles: [], goals: [{ x: 0, y: 2 }], maxBlocks: 3, hint: '아래 방향으로 이동하세요.'
  },
  {
    id: 'l15', title: '15. L자 길', gridSize: 4,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 2, y: 2 }], maxBlocks: 6, hint: '오른쪽 2칸, 아래 2칸 이동하세요.'
  },
  {
    id: 'l16', title: '16. 벽 피해 L자', gridSize: 4,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 1, y: 0 }], goals: [{ x: 2, y: 2 }], maxBlocks: 7, hint: '벽을 피해 우회하세요.'
  },
  {
    id: 'l17', title: '17. 반복 입문', gridSize: 5,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 4, y: 0 }], maxBlocks: 2, hint: '반복 4번으로 이동하세요.'
  },
  {
    id: 'l18', title: '18. 반복과 회전', gridSize: 5,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 0, y: 4 }], maxBlocks: 4, hint: '반복으로 이동하고 회전하세요.'
  },
  {
    id: 'l19', title: '19. 사각형 한 바퀴', gridSize: 5,
    start: { x: 1, y: 1, dir: 0 }, obstacles: [], goals: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }], maxBlocks: 8, hint: '반복을 사용해 사각형을 그리세요.'
  },
  {
    id: 'l20', title: '20. 별 두 개', gridSize: 5,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 2, y: 0 }, { x: 4, y: 4 }], maxBlocks: 10, hint: '두 별을 모두 모으세요.'
  },
  {
    id: 'l21', title: '21. 조건문 입문', gridSize: 5,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 2, y: 0 }], goals: [{ x: 4, y: 0 }], maxBlocks: 8, hint: '벽이 있으면 방향을 바꾸세요.'
  },
  {
    id: 'l22', title: '22. 조건문과 반복', gridSize: 6,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 2, y: 0 }, { x: 4, y: 2 }], goals: [{ x: 5, y: 0 }], maxBlocks: 12, hint: '반복 안에서 조건문을 사용하세요.'
  },
  {
    id: 'l23', title: '23. 미로 2', gridSize: 7,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 5, y: 5 }], goals: [{ x: 6, y: 6 }], maxBlocks: 18, hint: '벽을 피해 출구에 도달하세요.'
  },
  {
    id: 'l24', title: '24. 세 별 수집', gridSize: 6,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 2, y: 2 }], goals: [{ x: 1, y: 0 }, { x: 5, y: 2 }, { x: 3, y: 5 }], maxBlocks: 16, hint: '세 별을 모두 모으세요.'
  },
  {
    id: 'l25', title: '25. 지그재그', gridSize: 6,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 5, y: 5 }], maxBlocks: 12, hint: '지그재그로 이동하세요.'
  },
  {
    id: 'l26', title: '26. 반복 최적화', gridSize: 8,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 7, y: 0 }], maxBlocks: 3, hint: '반복 블록으로 최소 블록 사용.'
  },
  {
    id: 'l27', title: '27. 미로 탈출 3', gridSize: 8,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 6, y: 4 }, { x: 6, y: 5 }], goals: [{ x: 7, y: 7 }], maxBlocks: 22, hint: '복잡한 미로를 탈출하세요.'
  },
  {
    id: 'l28', title: '28. 네 별', gridSize: 7,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 3, y: 3 }], goals: [{ x: 0, y: 6 }, { x: 6, y: 0 }, { x: 6, y: 6 }, { x: 0, y: 0 }], maxBlocks: 24, hint: '네 모서리의 별을 모으세요.'
  },
  {
    id: 'l29', title: '29. 조건문 마스터', gridSize: 8,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }], goals: [{ x: 7, y: 7 }], maxBlocks: 20, hint: '조건문을 활용해 미로를 통과하세요.'
  },
  {
    id: 'l30', title: '30. 최종 챌린지', gridSize: 9,
    start: { x: 0, y: 0, dir: 0 }, obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 3 }, { x: 6, y: 5 }, { x: 7, y: 7 }], goals: [{ x: 8, y: 0 }, { x: 8, y: 8 }, { x: 0, y: 8 }], maxBlocks: 30, hint: '모든 개념을 활용해 세 별을 모으세요.'
  },
];
