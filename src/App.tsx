import { useState } from 'react';
import { FileExplorer } from '@/components/FileExplorer';
import { FileNode } from '@/data/directoryStructure';
import { ContentPanel } from '@/components/ContentPanel';
import { SocialDock } from '@/components/SocialDock';

function App() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const handleSelectNode = (node: FileNode) => {
    setSelectedNode(node);
    setSelectedNodeId(node.id);
  };

  return (
    <>
      {/* Navbar */}
      <div className="text-base h-screen w-screen flex overflow-hidden transition-colors duration-300 gradient-bg pb-2">
        {/* Left Panel - File Explorer - Fixed Width, No Padding */}
        <div className="w-96 h-full flex-shrink-0">
          <FileExplorer onSelectNode={handleSelectNode} selectedNodeId={selectedNodeId} />
        </div>

        {/* Right Panel - Content - Full Remaining Width, No Padding */}
        <div className="flex-1 h-full">
          <ContentPanel selectedNode={selectedNode} />
        </div>

        {/* Social Links Dock */}
        <SocialDock className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50" />
      </div>
    </>
  );
}

export default App;
