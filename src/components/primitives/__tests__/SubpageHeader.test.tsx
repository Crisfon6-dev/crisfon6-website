import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SubpageHeader } from '../SubpageHeader';

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
});
