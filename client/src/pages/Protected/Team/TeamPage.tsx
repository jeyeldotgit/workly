import { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  CircleDot,
  Clock,
  Crown,
  Edit3,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  Shield,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest';
  status: 'online' | 'offline' | 'away';
  lastActive: string;
  department: string;
  assignedWork: number;
  avatarUrl?: string;
  initials: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.c@acme.inc',
    role: 'Admin',
    status: 'online',
    lastActive: 'Just now',
    department: 'Platform',
    assignedWork: 8,
    initials: 'SC',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGwHWa6a5NDlLxvw1qV1ziADjsGzXTzKcR5_P1gUjKmwR9KbGG9O7Yr3MVYxOMFve-hunmMrW-fQoB_TYVI3H1ixrMV-vHIANSIp82hzwoNO1_8Y36JQh3kzXVG1QSjWRLvu2uGs0M6vTIDJl9UTIBfBl4Tc41P5a7tuDRO2zL-XcNV9AJYXNTKXgOV6ZzKlUEIk6plW1E-_n3KuUISlx28Fj0x7C_Cf36SRbrND1DewXkN0D1Yk-ipQ',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'mjohnson@acme.inc',
    role: 'Member',
    status: 'online',
    lastActive: '2 mins ago',
    department: 'Product',
    assignedWork: 5,
    initials: 'MJ',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfKMVertAhYVmSeTeD0Is96cBg8QypNPD0C7NZW8JpuIvGp2Hboj7XfbW3xqiVQm5mY5hYnN8EimWzaBhLBYkGFcIz1gCzrhf3gg8BQQb0mzNhJYlBFbKOO3nbTP7sc5EE-dPbVgpxvIQ3GzeHC_AbHsrGINdkt_-kQS6JJgLGlBhSrXbc-aMtsy3ZqiKdJMWgcWWfIxFcDMQjYVKkugtehlMy6e5Me-8Idf-kp4k5ZSfTbnLsBzGUfw',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@contractor.co',
    role: 'Guest',
    status: 'offline',
    lastActive: '14 hours ago',
    department: 'Design',
    assignedWork: 2,
    initials: 'ER',
  },
  {
    id: '4',
    name: 'Alex Lee',
    email: 'alex.lee@acme.inc',
    role: 'Member',
    status: 'away',
    lastActive: '24 mins ago',
    department: 'Infrastructure',
    assignedWork: 7,
    initials: 'AL',
  },
  {
    id: '5',
    name: 'Jordan Smith',
    email: 'jordan@partner.dev',
    role: 'Guest',
    status: 'online',
    lastActive: '6 mins ago',
    department: 'QA',
    assignedWork: 3,
    initials: 'JS',
  },
];

const ROLE_STYLES: Record<TeamMember['role'], { icon: typeof Shield; className: string }> = {
  Admin: {
    icon: Crown,
    className: 'border-[#6366F1]/20 bg-[#6366F1]/10 text-[#b0c6ff]',
  },
  Member: {
    icon: UserCheck,
    className: 'border-[#4edea3]/20 bg-[#4edea3]/10 text-[#4edea3]',
  },
  Guest: {
    icon: Shield,
    className: 'border-[#424654] bg-[#1a1c20] text-[#8c90a0]',
  },
};

const STATUS_STYLES: Record<TeamMember['status'], { label: string; dot: string; text: string }> = {
  online: {
    label: 'Online',
    dot: 'bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.55)]',
    text: 'text-[#4edea3]',
  },
  away: {
    label: 'Away',
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.35)]',
    text: 'text-amber-300',
  },
  offline: {
    label: 'Offline',
    dot: 'bg-[#424654]',
    text: 'text-[#8c90a0]',
  },
};

function MemberAvatar({ member }: { member: TeamMember }) {
  const status = STATUS_STYLES[member.status];

  return (
    <div className="relative h-10 w-10 shrink-0">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#252932] bg-[#1a1c20] text-xs font-bold text-[#c2c6d7]">
        {member.avatarUrl ? (
          <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          member.initials
        )}
      </div>
      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111827] ${status.dot}`} />
    </div>
  );
}

function RoleBadge({ role }: { role: TeamMember['role'] }) {
  const roleStyle = ROLE_STYLES[role];
  const Icon = roleStyle.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold ${roleStyle.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {role}
    </span>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  const status = STATUS_STYLES[member.status];

  return (
    <article className="group rounded-xl border border-[#252932] bg-[#111827] p-3.5 transition-all duration-200 hover:border-[#6366F1]/40 hover:bg-[#151c2e] hover:shadow-lg hover:shadow-[#6366F1]/5 sm:px-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3.5">
          <MemberAvatar member={member} />
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-[#e2e2e8] group-hover:text-white">
                {member.name}
              </h2>
              <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${status.text} bg-[#1a1c20]`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8c90a0]">
              <span className="flex min-w-0 items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{member.email}</span>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#424654] sm:block" />
              <span>{member.department}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#252932]/80 pt-3 lg:shrink-0 lg:border-t-0 lg:pt-0">
          <RoleBadge role={member.role} />

          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#252932] bg-[#1a1c20] px-2 py-1 font-mono text-[11px] text-[#8c90a0]">
            {member.status === 'online' ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-[#4edea3]" />
            ) : (
              <Clock className="h-3.5 w-3.5" />
            )}
            {member.lastActive}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#252932] bg-[#1a1c20] px-2 py-1 text-[11px] font-medium text-[#c2c6d7]">
            <Activity className="h-3.5 w-3.5 text-[#6366F1]" />
            {member.assignedWork} active
          </span>

          <div className="ml-auto flex items-center gap-1 lg:ml-1">
            <button
              type="button"
              aria-label={`Edit ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#8c90a0] opacity-100 transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Open actions for ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#8c90a0] opacity-100 transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    const query = searchQuery.toLowerCase();

    return (
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query)
    );
  });

  const onlineCount = TEAM_MEMBERS.filter((member) => member.status === 'online').length;
  const seatCount = TEAM_MEMBERS.length;

  return (
    <DashboardLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-[1600px] min-h-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-[#252932] bg-[#141b2b] px-2.5 py-1 text-[11px] font-medium text-[#b0c6ff]">
                <Users className="h-3.5 w-3.5 text-[#6366F1]" />
                Acme Workspace
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#e2e2e8] sm:text-3xl">
                Team Members
              </h1>
              <p className="mt-1 text-xs text-[#8c90a0] sm:text-sm">
                Manage workspace access, availability, and workload across your team.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative w-full lg:w-[320px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c90a0]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search team..."
                  className="h-9 w-full rounded-md border border-[#252932] bg-[#111827] pl-9 pr-3 text-xs text-[#e2e2e8] outline-none transition-colors placeholder:text-[#424654] focus:border-[#6366F1]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Filter team members"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#252932] bg-[#111827] text-[#8c90a0] transition-colors hover:border-[#6366F1]/50 hover:text-[#e2e2e8]"
                >
                  <Filter className="h-4 w-4" />
                </button>
                <button className="flex h-9 items-center gap-2 rounded-md bg-[#6366F1] px-4 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-500">
                  <UserPlus className="h-4 w-4" />
                  <span>Invite Member</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">Seats used</p>
              <p className="mt-1 text-2xl font-bold text-[#e2e2e8]">{seatCount}/25</p>
            </div>
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">Online now</p>
              <p className="mt-1 text-2xl font-bold text-[#4edea3]">{onlineCount}</p>
            </div>
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">Open invites</p>
              <p className="mt-1 text-2xl font-bold text-[#b0c6ff]">4</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#252932] bg-[#141b2b] p-2 text-xs">
            <button className="flex items-center gap-2 rounded-md border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-1.5 text-[#b0c6ff] transition-colors hover:bg-[#6366F1]/20">
              <CircleDot className="h-3.5 w-3.5" />
              <span>Active Members</span>
            </button>
            <button className="flex items-center gap-2 rounded-md border border-[#252932] bg-[#191f2f] px-3 py-1.5 text-[#dce2f7] transition-colors hover:border-[#6366F1]">
              <Shield className="h-3.5 w-3.5 text-[#8c90a0]" />
              <span>Role</span>
            </button>
            <button className="flex items-center gap-2 rounded-md border border-[#252932] bg-[#191f2f] px-3 py-1.5 text-[#dce2f7] transition-colors hover:border-[#6366F1]">
              <Activity className="h-3.5 w-3.5 text-[#8c90a0]" />
              <span>Status</span>
            </button>
            <div className="mx-1 hidden h-5 w-px bg-[#252932] sm:block" />
            <button className="ml-auto flex items-center gap-1.5 px-2 py-1.5 text-[#8c90a0] transition-colors hover:text-[#e2e2e8] sm:ml-0">
              <Filter className="h-3.5 w-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-[#252932] bg-[#0d121d] p-3 sm:p-4">
            <div className="flex h-full flex-col gap-2.5 overflow-y-auto pr-1 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1]">
              {filteredMembers.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}

              {filteredMembers.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#252932] bg-[#111827] text-[#8c90a0]">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-[#e2e2e8]">No members found</p>
                  <p className="mt-1 text-xs text-[#8c90a0]">Try a different name, email, or department.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
