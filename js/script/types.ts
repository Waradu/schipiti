export interface ChatItem {
  id: string;
  title: string;
  create_time: string;
  update_time: string;
  mapping: any;
  current_node: any;
  conversation_template_id: string;
  gizmo_id: string;
  is_archived: boolean;
  workspace_id: any;
}

export interface ApiResponse {
  has_missing_conversations: number;
  items: ChatItem[];
  limit: number;
  offset: number;
  total: number;
}

export interface Link {
  link: string;
  name: string;
}