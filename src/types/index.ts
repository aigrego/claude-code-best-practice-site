export interface NavItem {
  id: string;
  title: string;
  icon?: string;
  children?: NavItem[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
}
