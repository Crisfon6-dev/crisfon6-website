import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SubpageHeader } from '../SubpageHeader';
import { PLATES } from '../plates';

describe('SubpageHeader', () => {
  it('renders kicker as "NN · LABEL"', () => {
    const { container } = render(<SubpageHeader number="02" label="ABOUT" title="About me" />);
    expect(container.textContent).toContain('02 · ABOUT');
  });

  it('renders title in an h1', () => {
    const { container } = render(
      <SubpageHeader number="03" label="PROJECTS" title="What I ship" />
    );
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toBe('What I ship');
  });

  it('renders description when provided', () => {
    const { getByText } = render(
      <SubpageHeader
        number="04"
        label="AUTOMATIONS"
        title="Automations"
        description="Copy-paste templates."
      />
    );
    expect(getByText('Copy-paste templates.')).toBeTruthy();
  });

  it('omits description paragraph when not provided', () => {
    const { container } = render(<SubpageHeader number="05" label="BLOG" title="Blog" />);
    expect(container.querySelectorAll('p').length).toBe(0);
  });

  it('wraps content in a <header> element', () => {
    const { container } = render(<SubpageHeader number="06" label="WORK" title="Work" />);
    expect(container.firstElementChild?.tagName).toBe('HEADER');
  });

  it('shows the film still for its page in a decorative slab frame when given a plate', () => {
    const { container } = render(
      <SubpageHeader number="03" label="PROJECTS" title="What I ship" plate="projects" />
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe(PLATES.projects);
    expect(img?.getAttribute('alt')).toBe('');
    expect(img?.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('[data-testid="subpage-plate"]')?.className).toMatch(/\bslab\b/);
  });

  it('shows no image at all without a plate', () => {
    const { container } = render(<SubpageHeader number="02" label="ABOUT" title="About me" />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('keeps the title in the same h1 with or without a plate', () => {
    const { container } = render(
      <SubpageHeader number="05" label="BLOG" title="Writing" plate="blog" />
    );
    expect(container.querySelector('h1')?.textContent).toBe('Writing');
  });

  it('uses a smaller headline next to a plate so long titles do not take five lines', () => {
    const withPlate = render(
      <SubpageHeader number="02" label="ABOUT" title="A long page title" plate="about" />
    );
    const plain = render(<SubpageHeader number="02" label="ABOUT" title="A long page title" />);
    expect(withPlate.container.querySelector('h1')?.className).toContain(
      'text-[clamp(36px,5vw,72px)]'
    );
    expect(plain.container.querySelector('h1')?.className).toContain('text-[clamp(40px,7vw,96px)]');
  });
});
