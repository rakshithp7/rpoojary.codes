import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { directoryStructure, FileNode } from '@/data/directoryStructure';
import { DarkModeToggle } from './DarkModeToggle';

interface FileExplorerProps {
  onSelectNode: (node: FileNode) => void;
  selectedNodeId: string;
}

// Helper to find all treeitem elements in the explorer
const getAllTreeItems = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return Array.from(container.querySelectorAll('[role="treeitem"]')) as HTMLElement[];
};

const FileTreeNode: React.FC<{
  node: FileNode;
  depth: number;
  onSelectNode: (node: FileNode) => void;
  selectedNodeId: string;
  expandedNodes: Set<string>;
  onToggleExpand: (nodeId: string) => void;
  onKeyboardNavigation: (nodeId: string) => void;
}> = ({ node, depth, onSelectNode, selectedNodeId, expandedNodes, onToggleExpand, onKeyboardNavigation }) => {
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (node.type === 'folder' && hasChildren) {
      onToggleExpand(node.id);
    }
    if (node.content) {
      onSelectNode(node);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const treeItems = getAllTreeItems(document.querySelector('[role="tree"]'));
    const currentIndex = treeItems.indexOf(e.currentTarget);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < treeItems.length - 1) {
          treeItems[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          treeItems[currentIndex - 1].focus();
        }
        break;
      case 'ArrowRight':
        if (node.type === 'folder' && hasChildren && !isExpanded) {
          e.preventDefault();
          onToggleExpand(node.id);
        }
        break;
      case 'ArrowLeft':
        if (node.type === 'folder' && isExpanded) {
          e.preventDefault();
          onToggleExpand(node.id);
        }
        break;
      case 'Home':
        e.preventDefault();
        if (treeItems.length > 0) {
          treeItems[0].focus();
        }
        break;
      case 'End':
        e.preventDefault();
        if (treeItems.length > 0) {
          treeItems[treeItems.length - 1].focus();
        }
        break;
    }
  };

  const IconComponent = node.icon || (node.type === 'folder' ? (isExpanded ? FolderOpen : Folder) : File);

  return (
    <div>
      <div
        ref={nodeRef}
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200 group select-none',
          'hover:bg-white/10 hover:scale-[1.02] dark:hover:bg-white/10 dark:hover:scale-[1.02]',
          isSelected && 'bg-[#8B7355]/20 text-[#8B7355] dark:bg-blue-500/20 dark:text-blue-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7355] dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-70'
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="treeitem"
        aria-expanded={node.type === 'folder' ? isExpanded : undefined}
        aria-selected={isSelected}>
        {hasChildren && (
          <div className="flex items-center justify-center w-4 h-4">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-3 h-3 transition-transform duration-200" />
            )}
          </div>
        )}
        {!hasChildren && <div className="w-4" />}

        <IconComponent
          className={cn(
            'w-4 h-4 transition-colors duration-200',
            isSelected ? 'text-[#8B7355] dark:text-blue-300' : 'text-[#6B5B4F] dark:text-gray-400',
            'group-hover:text-[#8B7355] dark:group-hover:text-blue-300'
          )}
        />

        <span
          className={cn(
            'font-medium transition-colors duration-200',
            isSelected ? 'text-[#8B7355] dark:text-blue-300' : 'text-[#2D2A26] dark:text-gray-200',
            'group-hover:text-[#8B7355] dark:group-hover:text-blue-300'
          )}>
          {node.name}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div role="group" className="transition-all duration-300 ease-in-out">
          {node.children?.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelectNode={onSelectNode}
              selectedNodeId={selectedNodeId}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onKeyboardNavigation={onKeyboardNavigation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ onSelectNode, selectedNodeId }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const explorerRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Enable tab navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Focus the explorer if it's not already focused
        if (!explorerRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          const firstTreeItem = explorerRef.current?.querySelector('[role="treeitem"]') as HTMLElement;
          if (firstTreeItem) {
            firstTreeItem.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyboardNavigation = (nodeId: string) => {
    // Find the node in the structure
    const findNodeById = (node: FileNode, id: string): FileNode | null => {
      if (node.id === id) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findNodeById(child, id);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNodeById(directoryStructure, nodeId);
    if (node && node.content) {
      onSelectNode(node);
    }
  };

  return (
    <div
      ref={explorerRef}
      className={cn(
        'h-full backdrop-blur-sm border rounded-lg rounded-tr-none p-4 my-1 ml-1 overflow-y-auto transition-colors duration-300',
        'bg-white/15 border-black/5 dark:bg-white/5 dark:border-white/5'
      )}
      role="tree"
      aria-label="File Explorer">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2
            className={cn(
              'text-lg font-semibold mb-2 transition-colors duration-300',
              'text-[#2D2A26] dark:text-gray-200 flex items-center gap-2'
            )}>
            Explorer <span className="text-sm text-gray-500 border px-1 pt-0.5 rounded-sm">TAB</span>
          </h2>
          <div className="pb-1">
            <DarkModeToggle />
          </div>
        </div>

        <div
          className={cn(
            'h-px bg-gradient-to-r transition-colors duration-300',
            'from-[#8B7355]/30 to-transparent dark:from-blue-400/30 dark:to-transparent'
          )}
        />
      </div>

      <FileTreeNode
        node={directoryStructure}
        depth={0}
        onSelectNode={onSelectNode}
        selectedNodeId={selectedNodeId}
        expandedNodes={expandedNodes}
        onToggleExpand={handleToggleExpand}
        onKeyboardNavigation={handleKeyboardNavigation}
      />
    </div>
  );
};
