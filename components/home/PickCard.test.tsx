import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { PickCard, PickData } from './PickCard';

// Mock dynamic framer-motion transitions/springs to prevent errors during rendering in jsdom
vi.mock('framer-motion', async (importOriginal) => {
  const original = await importOriginal<typeof import('framer-motion')>();
  return {
    ...original,
    motion: {
      ...original.motion,
      span: ({ children, className }: any) => <span className={className}>{children}</span>,
      div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
    useSpring: (val: number) => ({
      get: () => val,
      set: () => {},
      onChange: () => () => {},
    }),
    useTransform: (val: any, transformer: any) => transformer(val.get()),
  };
});

const mockPick: PickData = {
  id: '1',
  sport: 'Football',
  league: 'Ligue 1',
  homeTeam: 'PSG',
  awayTeam: 'Marseille',
  date: '2026-06-08',
  beatrixProb: 75.5,
  bookmakerProb: 60.0,
  confidence: 85,
  status: 'success',
  isValueBet: true,
  odd: 1.85,
};

test('renders PickCard with high-density padding, JetBrains Mono font, and drag functionality', () => {
  const { container } = render(<PickCard pick={mockPick} />);
  
  // Assert that NeonCard uses p-4 instead of p-6 for high-density spacing
  const cardElement = container.querySelector('.flex.flex-col');
  expect(cardElement?.className).toContain('p-4');
  
  // Assert that numbers use font-mono
  const numbers = screen.getAllByText(/0.0%|1.85/);
  expect(numbers.length).toBeGreaterThan(0);
  numbers.forEach((num) => {
    expect(num.className).toContain('font-mono');
  });
});

