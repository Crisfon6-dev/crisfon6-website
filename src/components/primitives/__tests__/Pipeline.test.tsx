import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Pipeline, type PipelineNode } from '../Pipeline';

const nodes: PipelineNode[] = [
  { icon: <span data-testid="icon-s3">S</span>, label: 'S3', sub: 'ingest' },
  { icon: <span data-testid="icon-lambda">L</span>, label: 'Lambda' },
  { icon: <span data-testid="icon-claude">C</span>, label: 'Claude' },
  { icon: <span data-testid="icon-pg">P</span>, label: 'Postgres' },
];

describe('Pipeline', () => {
  it('renders one <li> per node', () => {
    const { container } = render(<Pipeline nodes={nodes} />);
    expect(container.querySelectorAll('li').length).toBe(4);
  });

  it('renders each icon + label', () => {
    const { getByTestId, getByText } = render(<Pipeline nodes={nodes} />);
    expect(getByTestId('icon-s3')).toBeTruthy();
    expect(getByTestId('icon-lambda')).toBeTruthy();
    expect(getByText('Claude')).toBeTruthy();
    expect(getByText('Postgres')).toBeTruthy();
  });

  it('renders the sub line only when provided', () => {
    const { getByText, queryByText } = render(<Pipeline nodes={nodes} />);
    expect(getByText('ingest')).toBeTruthy();
    expect(queryByText('lambda-sub')).toBeNull();
  });

  it('applies staggered flow-sweep delay (0 / 0.5 / 1 / 1.5s) to each node', () => {
    const { container } = render(<Pipeline nodes={nodes} />);
    const sweeps = Array.from(container.querySelectorAll('.flow-sweep')) as HTMLElement[];
    expect(sweeps.length).toBe(4);
    expect(sweeps[0].style.animationDelay).toBe('0s');
    expect(sweeps[1].style.animationDelay).toBe('0.5s');
    expect(sweeps[2].style.animationDelay).toBe('1s');
    expect(sweeps[3].style.animationDelay).toBe('1.5s');
  });

  it('marks the container with pipeline aria-label', () => {
    const { container } = render(<Pipeline nodes={nodes} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('OL');
    expect(root.getAttribute('aria-label')).toBe('pipeline');
  });
});
