import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { PickCard } from './PickCard';

const mockPick = {
  id: '1',
  sport: 'Football',
  league: 'Premier League',
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  date: '2026-06-10',
  beatrixProb: 65,
  bookmakerProb: 50,
  confidence: 80,
  status: 'success' as const,
  isValueBet: true,
  odd: 2.1,
};

describe('PickCard - Value Bet Visual State', () => {
  it('should render ProbabilityValue with glow effect when isValueBet is true', () => {
    render(<PickCard pick={mockPick} />);
    const glowElement = screen.getByTestId('probability-glow');
    expect(glowElement).toBeTruthy();
  });

  it('should NOT render ProbabilityValue with glow effect when isValueBet is false', () => {
    render(<PickCard pick={{ ...mockPick, isValueBet: false }} />);
    const glowElement = screen.queryByTestId('probability-glow');
    expect(glowElement).toBeFalsy();
  });
});
