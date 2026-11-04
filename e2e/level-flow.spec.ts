import { test, expect } from '@playwright/test';

test('level 1 complete flow', async ({ page }) => {
  await page.goto('/');
  await page.getByText('1. 직진').click();
  // add 4 move blocks via + buttons in workspace
  const addMove = page.getByRole('button', { name: '+이동' }).first();
  for (let i = 0; i < 4; i++) await addMove.click();
  await page.getByRole('button', { name: '▶ 실행' }).click();
  await expect(page.getByText('성공! 🎉')).toBeVisible({ timeout: 10000 });
});
