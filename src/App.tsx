import { useState, useEffect, useCallback } from 'react';
import { PanelLeftOpen, Github, Linkedin } from 'lucide-react';
import { FileExplorer } from '@/components/FileExplorer';
import { FileNode } from '@/data/directoryStructure';
import { ContentPanel } from '@/components/ContentPanel';
import { Terminal } from '@/components/Terminal';
import { SocialDock } from '@/components/SocialDock';

function App() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [isMobileExplorerOpen, setIsMobileExplorerOpen] = useState(false);

  const closeMobileExplorer = useCallback(() => {
    setIsMobileExplorerOpen(false);
  }, []);

  const handleSelectNode = (node: FileNode) => {
    setSelectedNode(node);
    setSelectedNodeId(node.id);

    if (window.innerWidth < 768 && node.type === 'file') {
      closeMobileExplorer();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileExplorerOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="text-base h-screen w-screen flex flex-col md:flex-row overflow-hidden transition-colors duration-300 gradient-bg">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 pt-3 pb-2">
          <button
            type="button"
            onClick={() => setIsMobileExplorerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-secondary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-border/60 dark:bg-background/80 dark:text-foreground dark:hover:bg-primary/10">
            <PanelLeftOpen className="h-4 w-4" />
            Explorer
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/rakshithp7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/60 bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-border/60 dark:bg-background/80 dark:hover:bg-primary/10"
                aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/rpoojary7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/60 bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-border/60 dark:bg-background/80 dark:hover:bg-primary/10"
                aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area - Split into Two Panels */}
        <div className="flex flex-1 flex-col md:flex-row w-full h-full">
          {/* Left Panel - File Explorer - Fixed Width */}
          <div className="relative hidden md:block w-96 h-full shrink-0">
            <FileExplorer onSelectNode={handleSelectNode} selectedNodeId={selectedNodeId} />
            {/* Social Links Dock */}
            <SocialDock className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex" />
          </div>

          {/* Right Panel - Content - Full Remaining Width, No Padding */}
          <div className="flex-1 h-full flex flex-col">
            <ContentPanel selectedNode={selectedNode} />
            <div className="hidden md:block">
              <Terminal onSelectNode={handleSelectNode} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Explorer Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden overflow-hidden transition-opacity duration-300 ease-out ${
          isMobileExplorerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}>
        <div className="relative flex h-full w-full">
          <div
            className={`absolute inset-0 bg-black/35 backdrop-blur-md transition-opacity duration-300 ease-out dark:bg-black/65 ${
              isMobileExplorerOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`relative z-10 h-full w-[80%] bg-card/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out dark:bg-popover/95 ${
              isMobileExplorerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <FileExplorer onSelectNode={handleSelectNode} selectedNodeId={selectedNodeId} />
          </div>
          <button
            type="button"
            aria-label="Close explorer"
            className="relative z-10 flex-1 h-full"
            onClick={closeMobileExplorer}
          />
        </div>
      </div>
    </>
  );
}

export default App;
