import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Minus, X } from 'lucide-react';
import { FileNode, directoryStructure } from '@/data/directoryStructure';
import { cn } from '@/lib/utils';
import { experiences } from '@/data/experience';
import { educationData } from '@/data/education';
import { skillsData } from '@/data/skills';
import { featuredProjects, portfolioProjects } from '@/data/projects';
import { contactData } from '@/data/contact';

interface TerminalEntry {
  command: string;
  output: string[];
  type: 'user' | 'system';
}

interface TerminalProps {
  onSelectNode: (node: FileNode) => void;
}

type ResolvedPath = { node: FileNode; path: string[]; type: 'file' | 'folder' } | { error: string };

const promptIcon = '➜';

const initialSystemLines: string[] = [
  // 'VIRTUAL TERMINAL ready',
  // 'Try commands like `ls`, `cd`, `cat`',
  'Type `help` to see available commands',
];

const doubleTabThresholdMs = 750;
const terminalCommands = ['ls', 'cd', 'cat', 'help', 'clear'] as const;
const pathAwareCommands = new Set(['ls', 'cd', 'cat']);

type TerminalCommand = (typeof terminalCommands)[number];

interface PathSuggestion {
  name: string;
  type: 'folder' | 'file';
  node?: FileNode;
  isSpecial?: boolean;
}

const getCommonPrefix = (values: string[]): string => {
  if (values.length === 0) return '';
  let prefix = values[0];
  for (let i = 1; i < values.length; i += 1) {
    const compare = values[i];
    let j = 0;
    const maxLength = Math.min(prefix.length, compare.length);
    while (j < maxLength && prefix[j].toLowerCase() === compare[j].toLowerCase()) {
      j += 1;
    }
    prefix = prefix.slice(0, j);
    if (!prefix) break;
  }
  return prefix;
};

const isTerminalCommand = (value: string): value is TerminalCommand =>
  terminalCommands.includes(value as TerminalCommand);

const resolveDirectoryForPrefix = (prefix: string, cwd: string[]): { node: FileNode | null; path: string[] } => {
  const isAbsolute = prefix.startsWith('/');
  const baseParts = isAbsolute ? [] : [...cwd];
  const trimmedPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
  const segments = trimmedPrefix
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  segments.forEach((segment) => {
    if (segment === '.') return;
    if (segment === '..') {
      baseParts.pop();
      return;
    }
    baseParts.push(segment);
  });

  const node = findNodeByPath(baseParts);
  if (!node || node.type !== 'folder') {
    return { node: null, path: baseParts };
  }
  return { node, path: baseParts };
};

const collectPathSuggestions = (
  target: string,
  cwd: string[]
): {
  prefix: string;
  partial: string;
  suggestions: PathSuggestion[];
} => {
  const pathMatch = target.match(/^(.*\/)?([^/]*)$/);
  const prefix = pathMatch?.[1] ?? '';
  const partial = pathMatch?.[2] ?? '';
  const lowerPartial = partial.toLowerCase();

  const { node } = resolveDirectoryForPrefix(prefix, cwd);
  const suggestions: PathSuggestion[] = [];

  if (node) {
    if ('..'.startsWith(lowerPartial)) {
      suggestions.push({ name: '..', type: 'folder', isSpecial: true });
    }
    if ('.'.startsWith(lowerPartial)) {
      suggestions.push({ name: '.', type: 'folder', isSpecial: true });
    }
  }

  if (!node) {
    return { prefix, partial, suggestions };
  }

  const children = getNodeChildren(node);
  children.forEach((child) => {
    if (child.name.toLowerCase().startsWith(lowerPartial)) {
      suggestions.push({ name: child.name, type: child.type, node: child });
    }
  });

  return { prefix, partial, suggestions };
};

const getNodeChildren = (node: FileNode | null | undefined): FileNode[] => {
  if (!node || !node.children) return [];
  return node.children;
};

const findChild = (node: FileNode, name: string): FileNode | undefined =>
  node.children?.find((child) => child.name === name);

const findNodeByPath = (parts: string[]): FileNode | null => {
  if (parts.length === 0) return directoryStructure;
  let current: FileNode = directoryStructure;
  for (const part of parts) {
    const next = findChild(current, part);
    if (!next) return null;
    current = next;
  }
  return current;
};

const resolvePath = (input: string, cwd: string[]): ResolvedPath => {
  const rawParts = input.split('/').filter((segment) => segment.length > 0);
  let parts: string[] = [];

  if (input.startsWith('/')) {
    parts = [];
  } else {
    parts = [...cwd];
  }

  for (const segment of rawParts) {
    if (segment === '.') continue;
    if (segment === '..') {
      parts.pop();
      continue;
    }
    parts.push(segment);
  }

  const node = findNodeByPath(parts);
  if (!node) {
    return { error: `Path not found: ${input}` };
  }

  return { node, path: parts, type: node.type };
};

const formatFilePreview = (identifier: string | undefined): string[] => {
  if (!identifier) return ['This file has no readable content yet.'];

  switch (identifier) {
    case 'about':
      return [
        '# About Me',
        "Hi, I'm a developer focused on building thoughtful, beautiful software.",
        'When I am away from the keyboard, I explore new tech or the outdoors.',
      ];
    case 'experience':
      return experiences.map((exp) => `- ${exp.position} @ ${exp.company} (${exp.period})`);
    case 'education':
      return educationData.map((edu) => `- ${edu.degree} — ${edu.institution} (${edu.period})`);
    case 'skills': {
      const skills: string[] = [];
      skillsData.categories.forEach((category) => {
        const names = category.skills.map((skill) => skill.name).join(', ');
        skills.push(`${category.name}: ${names}`);
      });
      return skills;
    }
    case 'featured-projects':
      return featuredProjects.map((project) => `* ${project.title} — ${project.subtitle}`);
    case 'personal-projects':
      return portfolioProjects.map((project) => `* ${project.title} — ${project.description}`);
    case 'contact':
      return contactData.map((contact) => `${contact.label}: ${contact.value}`);
    default:
      return [`Preview for "${identifier}" is not available yet.`];
  }
};

const formatPath = (parts: string[]): string => (parts.length === 0 ? '/' : `/${parts.join('/')}`);

export const Terminal: React.FC<TerminalProps> = ({ onSelectNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cwd, setCwd] = useState<string[]>([]);
  const [history, setHistory] = useState<TerminalEntry[]>([
    { command: '', output: initialSystemLines, type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const [, setCommandIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTabRef = useRef<{ contextKey: string; timestamp: number; suggestions: string[] } | null>(null);

  const focusInput = useCallback((caret?: number) => {
    requestAnimationFrame(() => {
      const element = inputRef.current;
      if (!element) return;
      const position = typeof caret === 'number' ? caret : element.value.length;
      element.focus({ preventScroll: true });
      element.setSelectionRange(position, position);
    });
  }, []);

  const commandHistory = useMemo(
    () =>
      history
        .filter((entry) => entry.type === 'user')
        .map((entry) => entry.command)
        .filter(Boolean),
    [history]
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const addSystemEntry = useCallback((output: string[]) => {
    setHistory((prev) => [...prev, { command: '', output, type: 'system' }]);
  }, []);

  const recordCommand = useCallback((command: string, output: string[]) => {
    setHistory((prev) => [...prev, { command, output, type: 'user' }]);
  }, []);

  const handleLs = useCallback(
    (target?: string) => {
      if (!target) {
        const currentNode = findNodeByPath(cwd);
        if (!currentNode) return addSystemEntry(['Error: current directory is invalid.']);
        const children = getNodeChildren(currentNode);
        const lines =
          children.length > 0
            ? children.map((child) => (child.type === 'folder' ? `${child.name}/` : child.name))
            : ['<empty>'];
        recordCommand('ls', lines);
        return;
      }

      const resolved = resolvePath(target, cwd);
      if ('error' in resolved) {
        recordCommand(`ls ${target}`, [resolved.error]);
        return;
      }

      if (resolved.type === 'folder') {
        const children = getNodeChildren(resolved.node);
        const lines =
          children.length > 0
            ? children.map((child) => (child.type === 'folder' ? `${child.name}/` : child.name))
            : ['<empty>'];
        recordCommand(`ls ${target}`, lines);
      } else {
        recordCommand(`ls ${target}`, [resolved.node.name]);
      }
    },
    [addSystemEntry, cwd, recordCommand]
  );

  const handleCd = useCallback(
    (target?: string) => {
      if (!target || target === '~') {
        setCwd([]);
        recordCommand('cd', ['Moved to /']);
        return;
      }

      const resolved = resolvePath(target, cwd);
      if ('error' in resolved) {
        recordCommand(`cd ${target}`, [resolved.error]);
        return;
      }

      if (resolved.type !== 'folder') {
        recordCommand(`cd ${target}`, ['Cannot cd into a file.']);
        return;
      }

      setCwd(resolved.path);
      recordCommand(`cd ${target}`, [`Moved to ${formatPath(resolved.path)}`]);
    },
    [cwd, recordCommand]
  );

  const handleCat = useCallback(
    (target?: string) => {
      if (!target) {
        recordCommand('cat', ['Usage: cat <path>']);
        return;
      }

      const resolved = resolvePath(target, cwd);
      if ('error' in resolved) {
        recordCommand(`cat ${target}`, [resolved.error]);
        return;
      }

      if (resolved.type !== 'file') {
        recordCommand(`cat ${target}`, ['Cannot cat a directory.']);
        return;
      }

      const preview = formatFilePreview(resolved.node.content);
      recordCommand(`cat ${target}`, preview);

      if (resolved.node.id === 'education-formal') {
        addSystemEntry(['TODO: display floating preview window for degrees.md']);
      }

      onSelectNode(resolved.node);
    },
    [addSystemEntry, cwd, onSelectNode, recordCommand]
  );

  const handleHelp = useCallback(() => {
    recordCommand('help', [
      'Available commands:',
      '  ls [path]    - list contents',
      '  cd [path]    - change directory (use .. to go up)',
      '  cat <path>   - preview file content',
      '  clear        - clear the terminal scrollback',
      '  help         - show this help menu',
    ]);
  }, [recordCommand]);

  const handleClear = useCallback(() => {
    setHistory([]);
    addSystemEntry(initialSystemLines);
  }, [addSystemEntry]);

  const processCommand = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;

      const [command, ...rest] = trimmed.split(/\s+/);
      const argument = rest.join(' ');

      switch (command) {
        case 'ls':
          handleLs(argument || undefined);
          break;
        case 'cd':
          handleCd(argument || undefined);
          break;
        case 'cat':
          handleCat(argument || undefined);
          break;
        case 'help':
          handleHelp();
          break;
        case 'clear':
          handleClear();
          break;
        default:
          recordCommand(trimmed, [`Command not found: ${command}`]);
      }
    },
    [handleCat, handleCd, handleClear, handleHelp, handleLs, recordCommand]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const currentInput = input.trimEnd();
      if (!currentInput) return;
      setCommandIndex(null);
      setInput('');
      lastTabRef.current = null;
      processCommand(currentInput);
    },
    [input, processCommand]
  );

  const promptPath = cwd.length > 0 ? cwd.join('/') : '';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const inputElement = event.currentTarget;
      const value = inputElement.value;
      const selectionStart = inputElement.selectionStart ?? value.length;
      const selectionEnd = inputElement.selectionEnd ?? value.length;

      if (selectionStart !== selectionEnd || selectionEnd !== value.length) {
        focusInput(selectionEnd);
        return;
      }

      let caretPosition = selectionEnd;
      const ensureFocus = () => focusInput(caretPosition);

      setCommandIndex(null);

      const now = Date.now();
      const lastSpaceIndex = value.lastIndexOf(' ');
      const prefixBeforeToken = lastSpaceIndex === -1 ? '' : value.slice(0, lastSpaceIndex + 1);
      const token = lastSpaceIndex === -1 ? value : value.slice(lastSpaceIndex + 1);
      const suffixAfterToken = value.slice(selectionEnd);
      const firstSpaceIndex = value.indexOf(' ');
      const commandPart = firstSpaceIndex === -1 ? token : value.slice(0, firstSpaceIndex);
      const normalizedCommand = commandPart.toLowerCase();

      if (firstSpaceIndex === -1) {
        const lowerToken = token.toLowerCase();
        const matches = terminalCommands.filter((cmd) => cmd.toLowerCase().startsWith(lowerToken));
        if (matches.length === 0) {
          lastTabRef.current = null;
          ensureFocus();
          return;
        }

        const contextKey = `command|${lowerToken}`;
        const last = lastTabRef.current;

        if (matches.length === 1) {
          const completedCommand = `${matches[0]} `;
          const newValue = prefixBeforeToken + completedCommand + suffixAfterToken;
          caretPosition = prefixBeforeToken.length + completedCommand.length;
          setInput(newValue);
          lastTabRef.current = null;
          ensureFocus();
          return;
        }

        const commonPrefix = getCommonPrefix(matches);
        if (commonPrefix && commonPrefix.length > token.length) {
          const newValue = prefixBeforeToken + commonPrefix + suffixAfterToken;
          caretPosition = prefixBeforeToken.length + commonPrefix.length;
          setInput(newValue);
          lastTabRef.current = { contextKey, timestamp: now, suggestions: matches };
          ensureFocus();
        } else if (last && last.contextKey === contextKey && now - last.timestamp < doubleTabThresholdMs) {
          addSystemEntry(matches);
          lastTabRef.current = null;
          ensureFocus();
        } else {
          lastTabRef.current = { contextKey, timestamp: now, suggestions: matches };
          ensureFocus();
        }
        return;
      }

      if (!isTerminalCommand(normalizedCommand) || !pathAwareCommands.has(normalizedCommand)) {
        lastTabRef.current = null;
        ensureFocus();
        return;
      }

      const { prefix, partial, suggestions } = collectPathSuggestions(token, cwd);
      if (suggestions.length === 0) {
        lastTabRef.current = null;
        ensureFocus();
        return;
      }

      const displaySuggestions = suggestions.map((suggestion) =>
        suggestion.type === 'folder' ? `${suggestion.name}/` : suggestion.name
      );
      const contextKey = `${normalizedCommand}|${prefix.toLowerCase()}`;
      const last = lastTabRef.current;

      if (suggestions.length === 1) {
        const match = suggestions[0];
        let completedToken = prefix + match.name;
        completedToken += match.type === 'folder' ? '/' : ' ';
        const newValue = prefixBeforeToken + completedToken + suffixAfterToken;
        caretPosition = prefixBeforeToken.length + completedToken.length;
        setInput(newValue);
        lastTabRef.current = null;
        ensureFocus();
        return;
      }

      const commonPrefix = getCommonPrefix(suggestions.map((suggestion) => suggestion.name));
      if (commonPrefix && commonPrefix.length > partial.length) {
        const updatedToken = prefix + commonPrefix;
        const newValue = prefixBeforeToken + updatedToken + suffixAfterToken;
        caretPosition = prefixBeforeToken.length + updatedToken.length;
        setInput(newValue);
        lastTabRef.current = { contextKey, timestamp: now, suggestions: displaySuggestions };
        ensureFocus();
      } else if (last && last.contextKey === contextKey && now - last.timestamp < doubleTabThresholdMs) {
        addSystemEntry(displaySuggestions);
        lastTabRef.current = null;
        ensureFocus();
      } else {
        lastTabRef.current = { contextKey, timestamp: now, suggestions: displaySuggestions };
        ensureFocus();
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) return;
      setCommandIndex((prev) => {
        const nextIndex = prev === null ? commandHistory.length - 1 : Math.max(prev - 1, 0);
        setInput(commandHistory[nextIndex]);
        return nextIndex;
      });
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commandHistory.length) return;
      setCommandIndex((prev) => {
        if (prev === null) return null;
        const nextIndex = prev + 1;
        if (nextIndex >= commandHistory.length) {
          setInput('');
          return null;
        }
        setInput(commandHistory[nextIndex]);
        return nextIndex;
      });
    }
  };

  return (
    <div
      className={cn(
        'rounded-t-lg border shadow-lg transition-all duration-300 text-xs overflow-hidden',
        'border-border/50 text-foreground'
      )}>
      <header
        className={cn(
          'flex select-none items-center justify-between px-4 py-2 uppercase',
          'bg-secondary border-b border-border/50 dark:bg-secondary/30',
          'text-[10px] tracking-[0.35em] text-secondary-foreground'
        )}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <button
            type="button"
            className={cn(
              'rounded px-2 py-1 text-[10px] font-semibold transition-colors text-secondary-foreground hover:bg-secondary/40 dark:hover:bg-secondary/25',
              isOpen && 'bg-primary/20 hover:bg-primary/25'
            )}
            onClick={() => {
              setIsOpen((prev) => !prev);
              requestAnimationFrame(() => inputRef.current?.focus());
            }}>
            Terminal
          </button>
        </div>
        <div className="flex items-center gap-2 text-secondary-foreground/80">
          <button
            type="button"
            className="rounded-md p-1 transition-colors hover:bg-accent dark:hover:bg-secondary"
            aria-label="Collapse terminal"
            onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
          <Minus className="h-3.5 w-3.5 opacity-40" />
          <X className="h-3.5 w-3.5 opacity-40" />
        </div>
      </header>

      <div
        className={cn(
          'grid transition-all duration-300',
          isOpen ? 'grid-rows-[minmax(0,1fr)] opacity-100' : 'grid-rows-[0fr]'
        )}>
        <div className="overflow-hidden">
          <div className="flex h-64 flex-col bg-card/80">
            <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {history.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="font-mono text-[11px] leading-relaxed">
                  {entry.type === 'user' && (
                    <div className="flex gap-2 text-primary">
                      <span>{promptIcon}</span>
                      <span className="wrap-break-word">
                        {promptPath ? `portfolio:${promptPath}$` : 'portfolio:~$'} {entry.command}
                      </span>
                    </div>
                  )}
                  <div className="mt-1 space-y-1 text-foreground">
                    {entry.output.map((line, lineIndex) => (
                      <p key={lineIndex} className=" text-[14px] whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form
              className="flex items-center gap-3 border-t border-border/40 px-4 py-3 font-mono text-[12px]"
              onSubmit={onSubmit}>
              <span className="text-primary">{promptIcon}</span>
              <span className="text-primary">{promptPath ? `portfolio:${promptPath}$` : 'portfolio:~$'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setCommandIndex(null);
                  lastTabRef.current = null;
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-hidden"
                placeholder="enter command..."
                aria-label="Terminal command input"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
