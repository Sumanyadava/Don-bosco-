"use client";
import React, { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    Inbox, 
    BellRing, 
    CalendarDays,
    Images,
    Upload,
    X,
    Settings, 
    LogOut, 
    Search, 
    Plus, 
    MoreVertical,
    CheckCircle2,
    XCircle,
    Eye,
    Edit,
    Trash2,
    Users,
    AlertCircle,
    FileText,
    TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getStoredEvents, addEvent, updateEvent, deleteEvent, subscribeEvents } from "../helper/eventStorage";

// --- Mock Data ---
const MOCK_INQUIRIES = [
    { id: "INQ-001", name: "Rahul Sharma", type: "Admission", email: "rahul@example.com", phone: "9876543210", date: "2026-07-25", status: "Pending", qualification: "12th Science", message: "Interested in Fitter ITI course. What is the fee structure?" },
    { id: "INQ-002", name: "Priya Das", type: "Inquiry", email: "priya@example.com", phone: "8765432109", date: "2026-07-24", status: "Resolved", message: "Do you have any short term computer courses?" },
    { id: "INQ-003", name: "Amit Kumar", type: "Complaint", email: "amit.k@example.com", phone: "7654321098", date: "2026-07-23", status: "In Progress", message: "The online result portal is showing an error for my roll number." },
    { id: "INQ-004", name: "Sneha Roy", type: "Admission", email: "sneha@example.com", phone: "9123456780", date: "2026-07-22", status: "Pending", qualification: "10th", message: "I want to take admission in Beautician course. Is hostel available for girls?" },
    { id: "INQ-005", name: "Vikash Singh", type: "Inquiry", email: "vikash@example.com", phone: "9988776655", date: "2026-07-21", status: "Pending", message: "When does the next batch for Solar PV start?" },
];

const MOCK_NOTICES = [
    { id: 1, title: "Urgent: Final Examination Schedule Released for Spring 2026", category: "Academic", date: "July 22, 2026", isPinned: true, isUrgent: true, status: "Published" },
    { id: 2, title: "Annual Tech Fest & Skill Exhibition Registration Open", category: "Events", date: "July 18, 2026", isPinned: true, isUrgent: false, status: "Published" },
    { id: 3, title: "Admissions Open for 45-Day Digital Mitra & Skill Courses", category: "General", date: "July 15, 2026", isPinned: false, isUrgent: false, status: "Draft" },
    { id: 4, title: "Campus Wi-Fi & Server Maintenance Downtime", category: "Urgent", date: "July 10, 2026", isPinned: false, isUrgent: true, status: "Archived" }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [eventsList, setEventsList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setEventsList(getStoredEvents());
        const unsubscribe = subscribeEvents(setEventsList);
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <div className="flex h-screen bg-base-200/50">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-base-100 border-r border-base-200 flex flex-col shadow-sm hidden md:flex">
                <div className="p-6 border-b border-base-200">
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold text-lg">DB</div>
                        AdminPanel
                    </h1>
                </div>
                
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab("dashboard")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <LayoutDashboard size={20} /> Dashboard Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab("inquiries")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'inquiries' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <div className="flex items-center gap-3"><Inbox size={20} /> Inquiries</div>
                        <div className="badge badge-primary badge-sm">3</div>
                    </button>
                    <button 
                        onClick={() => setActiveTab("notices")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'notices' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <BellRing size={20} /> Notice Board
                    </button>
                    <button 
                        onClick={() => setActiveTab("events")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'events' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <div className="flex items-center gap-3"><CalendarDays size={20} /> Events & Gallery</div>
                        <div className="badge badge-secondary badge-sm">{eventsList.length}</div>
                    </button>
                </nav>

                <div className="p-4 border-t border-base-200">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-colors font-medium">
                        <LogOut size={18} /> Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-base-100 border-b border-base-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold capitalize text-base-content">{activeTab.replace('-', ' ')}</h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
                            <input type="text" placeholder="Search..." className="input input-sm input-bordered pl-10 w-64 rounded-full bg-base-200/50 focus:bg-base-100 transition-all" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                            AD
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {activeTab === "dashboard" && <DashboardTab />}
                    {activeTab === "inquiries" && <InquiriesTab />}
                    {activeTab === "notices" && <NoticesTab />}
                    {activeTab === "events" && <EventsTab events={eventsList} />}
                </div>
            </main>
        </div>
    );
}

// --- Tab Components ---

function DashboardTab() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Total Inquiries</p>
                            <h3 className="text-3xl font-bold">1,248</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2"><TrendingUp size={14} /> +12% this month</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Inbox size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Pending Admissions</p>
                            <h3 className="text-3xl font-bold">42</h3>
                            <p className="text-xs text-warning flex items-center gap-1 mt-2"><AlertCircle size={14} /> Action Required</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Active Notices</p>
                            <h3 className="text-3xl font-bold">8</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2">Currently displayed</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <BellRing size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Total Views</p>
                            <h3 className="text-3xl font-bold">45.2K</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2"><TrendingUp size={14} /> +5% this week</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <Eye size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body p-0">
                    <div className="flex items-center justify-between p-6 border-b border-base-200">
                        <h3 className="text-lg font-bold">Recent Submissions</h3>
                        <button className="btn btn-sm btn-ghost text-primary">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200/50 text-base-content/60 border-none">
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_INQUIRIES.slice(0, 4).map((inq) => (
                                    <tr key={inq.id} className="hover">
                                        <td>
                                            <div className="font-medium text-base-content">{inq.name}</div>
                                            <div className="text-xs text-base-content/50">{inq.email}</div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-medium ${
                                                inq.type === 'Admission' ? 'badge-primary badge-outline' :
                                                inq.type === 'Inquiry' ? 'badge-success badge-outline' : 'badge-error badge-outline'
                                            }`}>
                                                {inq.type}
                                            </span>
                                        </td>
                                        <td className="text-sm text-base-content/70">{inq.date}</td>
                                        <td>
                                            <span className={`badge badge-sm font-medium ${
                                                inq.status === 'Resolved' ? 'bg-success/10 text-success border-success/20' :
                                                inq.status === 'In Progress' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-base-300 text-base-content/70 border-base-300'
                                            }`}>
                                                {inq.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InquiriesTab() {
    const [filter, setFilter] = useState("All");

    const filtered = filter === "All" ? MOCK_INQUIRIES : MOCK_INQUIRIES.filter(i => i.type === filter);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="join">
                    {["All", "Admission", "Inquiry", "Complaint"].map(f => (
                        <button 
                            key={f} 
                            onClick={() => setFilter(f)}
                            className={`btn btn-sm join-item ${filter === f ? 'btn-primary' : 'btn-active bg-base-100 hover:bg-base-200'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                
                <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline"><FileText size={16} /> Export CSV</button>
                </div>
            </div>

            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/60">
                                <th>ID</th>
                                <th>Contact Info</th>
                                <th>Type & Details</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((inq) => (
                                <tr key={inq.id}>
                                    <td className="font-mono text-xs text-base-content/50">{inq.id}</td>
                                    <td>
                                        <div className="font-semibold text-base-content">{inq.name}</div>
                                        <div className="text-xs text-base-content/60">{inq.email} • {inq.phone}</div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm mb-1 ${
                                            inq.type === 'Admission' ? 'badge-primary' :
                                            inq.type === 'Inquiry' ? 'badge-success' : 'badge-error'
                                        }`}>
                                            {inq.type}
                                        </span>
                                        {inq.qualification && <div className="text-xs text-base-content/70">Qual: {inq.qualification}</div>}
                                    </td>
                                    <td>
                                        <select className="select select-bordered select-sm text-xs" defaultValue={inq.status}>
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Resolved</option>
                                        </select>
                                    </td>
                                    <td className="text-right">
                                        <button className="btn btn-sm btn-ghost btn-circle" onClick={() => document.getElementById(`modal_${inq.id}`).showModal()}>
                                            <Eye size={18} className="text-base-content/70" />
                                        </button>
                                        
                                        {/* Modal for viewing message */}
                                        <dialog id={`modal_${inq.id}`} className="modal text-left">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg border-b border-base-200 pb-2 mb-4">Message Details</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">From</span>
                                                        <p className="font-medium">{inq.name} ({inq.email})</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Subject Type</span>
                                                        <p>{inq.type}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Message</span>
                                                        <div className="bg-base-200 p-4 rounded-xl text-sm mt-1">
                                                            {inq.message}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function NoticesTab() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                    <input type="text" placeholder="Search notices..." className="input input-sm input-bordered pl-9 w-64" />
                </div>
                
                <button className="btn btn-primary btn-sm gap-2" onClick={() => document.getElementById('add_notice_modal').showModal()}>
                    <Plus size={16} /> Create Notice
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_NOTICES.map((notice) => (
                    <div key={notice.id} className="card bg-base-100 border border-base-200 hover:border-primary/30 transition-colors shadow-sm">
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex gap-2">
                                    <span className={`badge badge-sm font-semibold ${
                                        notice.status === 'Published' ? 'badge-success badge-outline' :
                                        notice.status === 'Draft' ? 'badge-warning badge-outline' : 'badge-neutral badge-outline'
                                    }`}>
                                        {notice.status}
                                    </span>
                                    {notice.isPinned && <span className="badge badge-sm badge-primary">Pinned</span>}
                                    {notice.isUrgent && <span className="badge badge-sm badge-error">Urgent</span>}
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-xs btn-ghost btn-circle">
                                        <MoreVertical size={16} />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                                        <li><a><Edit size={14} /> Edit</a></li>
                                        <li><a className="text-error"><Trash2 size={14} /> Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <h3 className="card-title text-base leading-snug line-clamp-2">{notice.title}</h3>
                            <div className="text-xs text-base-content/60 mt-auto pt-4 flex justify-between border-t border-base-100">
                                <span>{notice.category}</span>
                                <span>{notice.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Notice Modal */}
            <dialog id="add_notice_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-xl border-b border-base-200 pb-4 mb-6">Create New Notice</h3>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="fieldset col-span-2">
                                <legend className="fieldset-legend font-semibold">Notice Title</legend>
                                <input type="text" className="input input-bordered w-full" placeholder="Enter title..." />
                            </fieldset>
                            
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Category</legend>
                                <select className="select select-bordered w-full">
                                    <option>Academic</option>
                                    <option>Events</option>
                                    <option>Urgent</option>
                                    <option>General</option>
                                </select>
                            </fieldset>
                            
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Visibility Flags</legend>
                                <div className="flex gap-4 mt-2">
                                    <label className="label cursor-pointer gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                                        <span className="label-text">Pin to Top</span>
                                    </label>
                                    <label className="label cursor-pointer gap-2">
                                        <input type="checkbox" className="checkbox checkbox-error checkbox-sm" />
                                        <span className="label-text">Mark Urgent</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <fieldset className="fieldset col-span-2">
                            <legend className="fieldset-legend font-semibold">Content</legend>
                            <textarea className="textarea textarea-bordered w-full h-32" placeholder="Write notice content here..."></textarea>
                        </fieldset>

                        <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                            <button type="button" className="btn" onClick={() => document.getElementById('add_notice_modal').close()}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => document.getElementById('add_notice_modal').close()}>Publish Notice</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

function EventsTab({ events }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [editingEvent, setEditingEvent] = useState(null);

    // Form state
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Workshop");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Published");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrlInput, setImageUrlInput] = useState("");

    const openCreateModal = () => {
        setEditingEvent(null);
        setTitle("");
        setCategory("Workshop");
        setDate(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
        setStatus("Published");
        setDescription("");
        setImages(["/images/students.jpeg"]);
        setImageUrlInput("");
        document.getElementById("event_modal").showModal();
    };

    const openEditModal = (evt) => {
        setEditingEvent(evt);
        setTitle(evt.title);
        setCategory(evt.category);
        setDate(evt.date);
        setStatus(evt.status);
        setDescription(evt.description);
        setImages(evt.images || []);
        setImageUrlInput("");
        document.getElementById("event_modal").showModal();
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImages((prev) => [...prev, event.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAddImageUrl = () => {
        if (!imageUrlInput.trim()) return;
        setImages((prev) => [...prev, imageUrlInput.trim()]);
        setImageUrlInput("");
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const payload = {
            title,
            category,
            date,
            status,
            description,
            images: images.length > 0 ? images : ["/images/students.jpeg"]
        };

        if (editingEvent) {
            updateEvent(editingEvent.id, payload);
        } else {
            addEvent(payload);
        }

        document.getElementById("event_modal").close();
    };

    const handleToggleStatus = (evt) => {
        const nextStatus = evt.status === "Published" ? "Draft" : "Published";
        updateEvent(evt.id, { status: nextStatus });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            deleteEvent(id);
        }
    };

    const filteredEvents = events.filter((evt) => {
        const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evt.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const publishedCount = events.filter(e => e.status === "Published").length;
    const totalImagesCount = events.reduce((acc, curr) => acc + (curr.images ? curr.images.length : 0), 0);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 border border-base-200 shadow-sm">
                    <div className="card-body p-5 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60">Total Events</p>
                            <h3 className="text-2xl font-bold">{events.length}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <CalendarDays size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm">
                    <div className="card-body p-5 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60">Published Stories</p>
                            <h3 className="text-2xl font-bold">{publishedCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm">
                    <div className="card-body p-5 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60">Gallery Photos</p>
                            <h3 className="text-2xl font-bold">{totalImagesCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <Images size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Create Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-sm input-bordered pl-9 w-60"
                        />
                    </div>
                    <div className="join">
                        {["All", "Workshop", "Counselling", "Academic", "Cultural", "Sports"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`btn btn-sm join-item ${selectedCategory === cat ? "btn-primary" : "bg-base-100 hover:bg-base-200"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="btn btn-primary btn-sm gap-2" onClick={openCreateModal}>
                    <Plus size={16} /> Add Event Post
                </button>
            </div>

            {/* Events Table / List */}
            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/60">
                                <th>Cover</th>
                                <th>Event Details</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Photos</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-base-content/50">
                                        No events found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((evt) => (
                                    <tr key={evt.id}>
                                        <td>
                                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-base-200 border border-base-300 relative">
                                                {evt.images && evt.images.length > 0 ? (
                                                    <img src={evt.images[0]} alt={evt.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">No Img</div>
                                                )}
                                                {evt.images && evt.images.length > 1 && (
                                                    <span className="absolute bottom-0 right-0 bg-neutral/80 text-white text-[10px] px-1 rounded-tl">
                                                        +{evt.images.length - 1}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-semibold text-base-content line-clamp-1">{evt.title}</div>
                                            <div className="text-xs text-base-content/60 line-clamp-1">{evt.description}</div>
                                        </td>
                                        <td>
                                            <span className="badge badge-sm badge-outline font-medium">{evt.category}</span>
                                        </td>
                                        <td className="text-xs text-base-content/70 whitespace-nowrap">{evt.date}</td>
                                        <td>
                                            <span className="badge badge-sm badge-ghost font-semibold">{evt.images?.length || 0} pics</span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleToggleStatus(evt)}
                                                className={`badge badge-sm font-semibold cursor-pointer transition-transform hover:scale-105 ${
                                                    evt.status === "Published" ? "badge-success" : "badge-warning"
                                                }`}
                                            >
                                                {evt.status}
                                            </button>
                                        </td>
                                        <td className="text-right whitespace-nowrap">
                                            <button
                                                className="btn btn-sm btn-ghost btn-circle"
                                                title="Edit Event"
                                                onClick={() => openEditModal(evt)}
                                            >
                                                <Edit size={16} className="text-base-content/70" />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-ghost btn-circle text-error"
                                                title="Delete Event"
                                                onClick={() => handleDelete(evt.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Create/Edit Event */}
            <dialog id="event_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-xl border-b border-base-200 pb-4 mb-6">
                        {editingEvent ? "Edit Event Post" : "Create Campus Event Post"}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="fieldset col-span-2">
                                <legend className="fieldset-legend font-semibold">Event Title</legend>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. Annual Sports Day & Prize Distribution"
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Category</legend>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Workshop">Workshop</option>
                                    <option value="Counselling">Counselling</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Notice">Notice</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Date</legend>
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. July 26, 2026"
                                />
                            </fieldset>
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold">Publish Status</legend>
                            <div className="flex gap-4 mt-1">
                                <label className="label cursor-pointer gap-2">
                                    <input
                                        type="radio"
                                        name="evtStatus"
                                        checked={status === "Published"}
                                        onChange={() => setStatus("Published")}
                                        className="radio radio-primary radio-sm"
                                    />
                                    <span className="label-text">Published</span>
                                </label>
                                <label className="label cursor-pointer gap-2">
                                    <input
                                        type="radio"
                                        name="evtStatus"
                                        checked={status === "Draft"}
                                        onChange={() => setStatus("Draft")}
                                        className="radio radio-warning radio-sm"
                                    />
                                    <span className="label-text">Draft</span>
                                </label>
                            </div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold">Description</legend>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="textarea textarea-bordered w-full"
                                placeholder="Describe the campus event, highlights, guest speakers, or training outcome..."
                            ></textarea>
                        </fieldset>

                        {/* Multi Image Manager */}
                        <fieldset className="fieldset border border-base-200 p-4 rounded-xl space-y-3">
                            <legend className="fieldset-legend font-semibold text-primary">Event Gallery Images</legend>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold mb-1 block">Upload Local Photos</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="file-input file-input-bordered file-input-sm w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold mb-1 block">Or Add Image Web URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={imageUrlInput}
                                            onChange={(e) => setImageUrlInput(e.target.value)}
                                            placeholder="https://example.com/photo.jpg"
                                            className="input input-bordered input-sm flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddImageUrl}
                                            className="btn btn-sm btn-outline btn-primary"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Previews */}
                            <div className="mt-3">
                                <p className="text-xs text-base-content/60 mb-2">Attached Images ({images.length}):</p>
                                <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto p-2 bg-base-200/50 rounded-lg">
                                    {images.map((imgUrl, idx) => (
                                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-base-300 group">
                                            <img src={imgUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 opacity-80 hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </fieldset>

                        <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => document.getElementById("event_modal").close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingEvent ? "Save Changes" : "Post Event"}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

