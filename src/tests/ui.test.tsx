import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useStore } from '../store';

describe('UI', () => {
  it('renders home with levels', () => {
    useStore.setState({ view: 'home', selectedLevelId: null });
    render(<App />);
    expect(screen.getByText('코딩 교육 게임')).toBeTruthy();
    expect(screen.getByText('1. 직진')).toBeTruthy();
  });
});
