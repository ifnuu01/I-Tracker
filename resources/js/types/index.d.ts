import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Topic {
    id: number
    user_id?: number
    category_id: number
    name: string
    description?: string
    target_date: string
    status: string
}

export interface Category {
    id: number
    name: string
    created_at: string
    updated_at: string

}

export interface Task {
    id: number
    user_id: number
    topic_id: number
    title: string
    note?:string
    is_done:boolean
    priority:string
}

export interface Project {
    id: number
    user_id: number
    topic_id: number
    name: string
    link_demo?: string
    link_repo?: string
    description?: string
    status:string
    priority:string
    target_date: string
}