import { cn } from '@/lib/utils';

describe('cn() — utility unit tests', () => {
  it('returns a single class unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('merges multiple classes into one string', () => {
    expect(cn('flex', 'items-center', 'gap-4')).toBe('flex items-center gap-4');
  });

  it('handles conditional classes (falsy values are ignored)', () => {
    expect(cn('base', false && 'not-added', null, undefined, 'added')).toBe('base added');
  });

  it('resolves tailwind class conflicts — last value wins', () => {
    // tailwind-merge: p-4 should win over p-2 when both are passed
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('resolves conflicting text colors — last wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles an empty call gracefully', () => {
    expect(cn()).toBe('');
  });

  it('handles object syntax from clsx', () => {
    expect(cn({ 'font-bold': true, 'font-thin': false })).toBe('font-bold');
  });

  it('handles array syntax from clsx', () => {
    expect(cn(['flex', 'gap-2'])).toBe('flex gap-2');
  });
});
