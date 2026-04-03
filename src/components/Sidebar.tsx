import { useState } from 'react';
import {
  BookOpen,
  Brain,
  Flame,
  Lightbulb,
  Workflow,
  Terminal,
  Rocket,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import type { NavItem } from '../types';
import { navItems } from '../data/content';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Brain,
  Flame,
  Lightbulb,
  Workflow,
  Terminal,
  Rocket,
};

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ activeId, onSelect, isOpen, onToggle }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['concepts', 'tips']));

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelect = (id: string, hasChildren?: boolean) => {
    if (hasChildren) {
      toggleExpand(id);
    } else {
      onSelect(id);
      if (window.innerWidth < 768) {
        onToggle();
      }
    }
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const Icon = item.icon ? iconMap[item.icon] : null;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = item.children?.some(child => child.id === activeId);

    return (
      <div key={item.id}>
        <button
          onClick={() => handleSelect(item.id, hasChildren)}
          className={`
            w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 relative
            ${depth === 0 ? 'border-l-2' : 'pl-8 border-l-2'}
            ${isActive || isChildActive
              ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
              : 'border-transparent text-text-secondary hover:text-accent-primary hover:bg-accent-primary/5'
            }
            ${depth === 0 ? 'hover:translate-x-1' : ''}
          `}
        >
          {Icon && (
            <Icon
              size={18}
              className={`${isActive || isChildActive ? 'text-accent-primary' : 'text-text-secondary'}`}
            />
          )}
          <span className={`flex-1 text-sm font-medium ${depth > 0 ? 'text-xs' : ''}`}>
            {item.title}
          </span>
          {hasChildren && (
            <span
              className="transition-transform duration-200"
              style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              <ChevronRight size={14} className="text-text-secondary" />
            </span>
          )}
          {isActive && (
            <div className="absolute right-0 w-1 h-6 bg-accent-primary rounded-l" />
          )}
        </button>

        <div
          className="overflow-hidden transition-all duration-200"
          style={{
            maxHeight: hasChildren && isExpanded ? '1000px' : '0',
            opacity: hasChildren && isExpanded ? 1 : 0,
          }}
        >
          {item.children?.map(child => renderNavItem(child, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-secondary/80 backdrop-blur text-accent-primary border border-accent-primary/30"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full z-40
          w-72 bg-gradient-to-b from-bg-secondary to-bg-primary border-r border-border
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-accent-primary/30 blur-md animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary leading-tight">
                Claude Code
              </h1>
              <p className="text-xs text-accent-primary">最佳实践指南</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              导航
            </p>
          </div>
          {navItems.map(item => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-text-secondary text-center">
            <p>基于 Claude Code 官方文档</p>
            <p className="mt-1">v2.1.90+</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
