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
    EyeOff,
    Edit,
    Trash2,
    Users,
    AlertCircle,
    FileText,
    TrendingUp,
    Lock,
    Mail,
    User,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getStoredEvents, addEvent, updateEvent, deleteEvent, subscribeEvents } from "../helper/eventStorage";
import { db, auth, registerNewUser } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [inquiries, setInquiries] = useState([]);
    const [notices, setNotices] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Firebase Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // 1. Single Firestore Subscription for Inquiries / Contacts
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const list = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setInquiries(list);
                setLoading(false);
            },
            (err) => {
                console.error("Inquiries subscription error:", err);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [user]);

    // 2. Single Firestore Subscription for Notices
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const list = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setNotices(list);
            },
            (err) => {
                console.error("Notices subscription error:", err);
            }
        );
        return () => unsubscribe();
    }, [user]);

    // 3. Single Subscription for Events
    useEffect(() => {
        if (!user) return;
        setEventsList(getStoredEvents());
        const unsubscribe = subscribeEvents(setEventsList);
        return () => unsubscribe();
    }, [user]);

    // 4. Single Firestore Subscription for Admin Users
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const list = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setUsersList(list);
            },
            (err) => {
                console.error("Users subscription error:", err);
            }
        );
        return () => unsubscribe();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-sm font-medium text-base-content/60">Verifying Admin Access...</p>
            </div>
        );
    }

    if (!user) {
        return <AdminAuth />;
    }

    const userInitials = user.displayName
        ? user.displayName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
        : user.email ? user.email.substring(0, 2).toUpperCase() : "AD";

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
                        <div className="badge badge-primary badge-sm">{inquiries.length}</div>
                    </button>
                    <button
                        onClick={() => setActiveTab("notices")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'notices' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <div className="flex items-center gap-3"><BellRing size={20} /> Notice Board</div>
                        <div className="badge badge-neutral badge-sm">{notices.length}</div>
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'events' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <div className="flex items-center gap-3"><CalendarDays size={20} /> Events & Gallery</div>
                        <div className="badge badge-secondary badge-sm">{eventsList.length}</div>
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
                    >
                        <div className="flex items-center gap-3"><Users size={20} /> User Accounts</div>
                        <div className="badge badge-accent badge-sm">{usersList.length}</div>
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
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                {userInitials}
                            </div>
                            <div className="hidden sm:block text-left">
                                <div className="text-xs font-bold leading-tight">{user.displayName || "Admin User"}</div>
                                <div className="text-[10px] text-base-content/50 leading-tight truncate max-w-[120px]">{user.email}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {activeTab === "dashboard" && <DashboardTab inquiries={inquiries} notices={notices} events={eventsList} usersCount={usersList.length} />}
                    {activeTab === "inquiries" && <InquiriesTab inquiries={inquiries} />}
                    {activeTab === "notices" && <NoticesTab notices={notices} loading={loading} />}
                    {activeTab === "events" && <EventsTab events={eventsList} />}
                    {activeTab === "users" && <UsersTab users={usersList} currentUser={user} />}
                </div>
            </main>
        </div>
    );
}

// --- Tab Components ---

function DashboardTab({ inquiries, notices, events }) {
    const admissionCount = inquiries.filter(
        (i) => (i.category || i.type)?.toLowerCase() === "admission"
    ).length;
    const activeNoticesCount = notices.filter(
        (n) => n.status === "Published" || !n.status
    ).length;

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Total Inquiries</p>
                            <h3 className="text-3xl font-bold">{inquiries.length}</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2"><TrendingUp size={14} /> Live from Firebase</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Inbox size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Admission Requests</p>
                            <h3 className="text-3xl font-bold">{admissionCount}</h3>
                            <p className="text-xs text-warning flex items-center gap-1 mt-2"><AlertCircle size={14} /> Course Applicants</p>
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
                            <h3 className="text-3xl font-bold">{activeNoticesCount}</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2">Published</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <BellRing size={24} />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-6 flex flex-row items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-base-content/60 mb-1">Campus Events</p>
                            <h3 className="text-3xl font-bold">{events.length}</h3>
                            <p className="text-xs text-success flex items-center gap-1 mt-2">Active Posts</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <CalendarDays size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body p-0">
                    <div className="flex items-center justify-between p-6 border-b border-base-200">
                        <h3 className="text-lg font-bold">Recent Submissions</h3>
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
                                {inquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-base-content/50">
                                            No inquiries received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    inquiries.slice(0, 5).map((inq) => (
                                        <tr key={inq.id} className="hover">
                                            <td>
                                                <div className="font-medium text-base-content">{inq.fullName || inq.name || "Anonymous"}</div>
                                                <div className="text-xs text-base-content/50">{inq.email}</div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm font-medium capitalize ${(inq.category || inq.type) === 'admission' ? 'badge-primary badge-outline' :
                                                        (inq.category || inq.type) === 'inquiry' ? 'badge-success badge-outline' : 'badge-error badge-outline'
                                                    }`}>
                                                    {inq.category || inq.type || 'General'}
                                                </span>
                                            </td>
                                            <td className="text-sm text-base-content/70">
                                                {inq.submittedAt ? new Date(inq.submittedAt).toLocaleDateString() : (inq.date || "Recent")}
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm font-medium ${inq.status === 'Resolved' ? 'bg-success/10 text-success border-success/20' :
                                                        inq.status === 'In Progress' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-base-300 text-base-content/70 border-base-300'
                                                    }`}>
                                                    {inq.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InquiriesTab({ inquiries }) {
    const [filter, setFilter] = useState("All");

    const filtered = inquiries.filter((i) => {
        if (filter === "All") return true;
        const cat = (i.category || i.type || "").toLowerCase();
        return cat === filter.toLowerCase();
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "contacts", id), { status: newStatus });
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status: " + err.message);
        }
    };

    const handleDeleteInquiry = async (id) => {
        if (!confirm("Are you sure you want to delete this inquiry entry?")) return;
        try {
            await deleteDoc(doc(db, "contacts", id));
        } catch (err) {
            console.error("Error deleting inquiry:", err);
            alert("Failed to delete inquiry: " + err.message);
        }
    };

    const exportCSV = () => {
        if (inquiries.length === 0) return alert("No inquiries to export.");
        const headers = ["ID", "Full Name", "Email", "Phone", "Category", "Qualification", "Message", "Status", "Date"];
        const rows = inquiries.map((i) => [
            `"${i.id}"`,
            `"${i.fullName || i.name || ""}"`,
            `"${i.email || ""}"`,
            `"${i.phone || ""}"`,
            `"${i.category || i.type || ""}"`,
            `"${i.qualification || ""}"`,
            `"${(i.message || "").replace(/"/g, '""')}"`,
            `"${i.status || "Pending"}"`,
            `"${i.submittedAt ? new Date(i.submittedAt).toLocaleDateString() : (i.date || "")}"`
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    <button onClick={exportCSV} className="btn btn-sm btn-outline"><FileText size={16} /> Export CSV</button>
                </div>
            </div>

            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/60">
                                <th>Contact Info</th>
                                <th>Category & Details</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-base-content/50">
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((inq) => (
                                    <tr key={inq.id}>
                                        <td>
                                            <div className="font-semibold text-base-content">{inq.fullName || inq.name || "Anonymous"}</div>
                                            <div className="text-xs text-base-content/60">{inq.email} • {inq.phone}</div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm mb-1 capitalize ${(inq.category || inq.type) === 'admission' ? 'badge-primary' :
                                                    (inq.category || inq.type) === 'inquiry' ? 'badge-success' : 'badge-error'
                                                }`}>
                                                {inq.category || inq.type || 'General'}
                                            </span>
                                            {inq.qualification && <div className="text-xs text-base-content/70">Qual: {inq.qualification}</div>}
                                        </td>
                                        <td>
                                            <p className="text-xs text-base-content/80 max-w-xs line-clamp-2">{inq.message}</p>
                                        </td>
                                        <td>
                                            <select
                                                className="select select-bordered select-sm text-xs"
                                                value={inq.status || "Pending"}
                                                onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td className="text-right whitespace-nowrap">
                                            <button className=" btn-sm btn-ghost btn-circle " onClick={() => document.getElementById(`modal_${inq.id}`).showModal()}>
                                                <Eye size={18} className="text-base-content/70" />
                                            </button>
                                            <button className=" btn-sm btn-ghost btn-circle text-error" onClick={() => handleDeleteInquiry(inq.id)}>
                                                <Trash2 size={16} />
                                            </button>

                                            {/* Modal for viewing message */}
                                            <dialog id={`modal_${inq.id}`} className="modal text-left">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg border-b border-base-200 pb-2 mb-4">Inquiry Details</h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">From</span>
                                                            <p className="font-medium">{inq.fullName || inq.name} ({inq.email})</p>
                                                            <p className="text-xs text-base-content/60">{inq.phone}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Category</span>
                                                            <p className="capitalize">{inq.category || inq.type}</p>
                                                        </div>
                                                        {inq.qualification && (
                                                            <div>
                                                                <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Qualification</span>
                                                                <p>{inq.qualification}</p>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Message</span>
                                                            <div className="bg-base-200 p-4 rounded-xl text-sm mt-1 whitespace-pre-wrap">
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function NoticesTab({ notices = [], loading = false }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingNotice, setEditingNotice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Academic");
    const [status, setStatus] = useState("Published");
    const [isPinned, setIsPinned] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);
    const [content, setContent] = useState("");

    const openCreateModal = () => {
        setEditingNotice(null);
        setTitle("");
        setCategory("Academic");
        setStatus("Published");
        setIsPinned(false);
        setIsUrgent(false);
        setContent("");
        document.getElementById('notice_modal').showModal();
    };

    const openEditModal = (notice) => {
        setEditingNotice(notice);
        setTitle(notice.title || "");
        setCategory(notice.category || "Academic");
        setStatus(notice.status || "Published");
        setIsPinned(!!notice.isPinned);
        setIsUrgent(!!notice.isUrgent);
        setContent(notice.content || "");
        document.getElementById('notice_modal').showModal();
    };

    const handleSaveNotice = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            const formattedDate = new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

            if (editingNotice) {
                await updateDoc(doc(db, "notices", editingNotice.id), {
                    title: title.trim(),
                    category,
                    status,
                    isPinned,
                    isUrgent,
                    content: content.trim(),
                    updatedAt: serverTimestamp()
                });
            } else {
                await addDoc(collection(db, "notices"), {
                    title: title.trim(),
                    category,
                    status,
                    isPinned,
                    isUrgent,
                    content: content.trim(),
                    date: formattedDate,
                    createdAt: serverTimestamp()
                });
            }

            document.getElementById('notice_modal').close();
        } catch (error) {
            console.error("Error saving notice to Firebase:", error);
            alert("Failed to save notice: " + (error.message || "Unknown error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteNotice = async (id) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        try {
            await deleteDoc(doc(db, "notices", id));
        } catch (error) {
            console.error("Error deleting notice from Firebase:", error);
            alert("Failed to delete notice: " + (error.message || "Unknown error"));
        }
    };

    const filteredNotices = notices.filter((n) => {
        const q = searchQuery.toLowerCase();
        return (
            n.title?.toLowerCase().includes(q) ||
            n.category?.toLowerCase().includes(q) ||
            n.content?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-sm input-bordered pl-9 w-64"
                    />
                </div>

                <button className="btn btn-primary btn-sm gap-2" onClick={openCreateModal}>
                    <Plus size={16} /> Create Notice
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : filteredNotices.length === 0 ? (
                <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-200 shadow-sm">
                    <BellRing className="mx-auto h-12 w-12 text-base-content/30 mb-3" />
                    <h3 className="text-lg font-semibold">No notices found</h3>
                    <p className="text-sm text-base-content/60 mt-1 mb-4">
                        {searchQuery ? "Try matching a different search term." : "Click 'Create Notice' to add your first notice."}
                    </p>
                    {!searchQuery && (
                        <button className="btn btn-primary btn-sm gap-2" onClick={openCreateModal}>
                            <Plus size={16} /> Create Notice
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredNotices.map((notice) => (
                        <div key={notice.id} className="card bg-base-100 border border-base-200 hover:border-primary/30 transition-colors shadow-sm">
                            <div className="card-body p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-2 flex-wrap">
                                        <span className={`badge badge-sm font-semibold ${notice.status === 'Published' ? 'badge-success badge-outline' :
                                                notice.status === 'Draft' ? 'badge-warning badge-outline' : 'badge-neutral badge-outline'
                                            }`}>
                                            {notice.status || 'Published'}
                                        </span>
                                        {notice.isPinned && <span className="badge badge-sm badge-primary">Pinned</span>}
                                        {notice.isUrgent && <span className="badge badge-sm badge-error">Urgent</span>}
                                    </div>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className=" btn-xs btn-ghost btn-circle">
                                            <MoreVertical size={16} />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                                            <li><button type="button" onClick={() => openEditModal(notice)}><Edit size={14} /> Edit</button></li>
                                            <li><button type="button" onClick={() => handleDeleteNotice(notice.id)} className="text-error"><Trash2 size={14} /> Delete</button></li>
                                        </ul>
                                    </div>
                                </div>
                                <h3 className="card-title text-base leading-snug">{notice.title}</h3>
                                {notice.content && (
                                    <p className="text-xs text-base-content/70 mt-2 line-clamp-3">{notice.content}</p>
                                )}
                                <div className="text-xs text-base-content/60 mt-auto pt-4 flex justify-between border-t border-base-100">
                                    <span>{notice.category}</span>
                                    <span>{notice.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Notice Modal */}
            <dialog id="notice_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-xl border-b border-base-200 pb-4 mb-6">
                        {editingNotice ? "Edit Notice" : "Create New Notice"}
                    </h3>

                    <form onSubmit={handleSaveNotice} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="fieldset col-span-2">
                                <legend className="fieldset-legend font-semibold">Notice Title</legend>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter title..."
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Category</legend>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Academic">Academic</option>
                                    <option value="Events">Events</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="General">General</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold">Status</legend>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset col-span-2">
                                <legend className="fieldset-legend font-semibold">Visibility Flags</legend>
                                <div className="flex gap-6 mt-2">
                                    <label className="label cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isPinned}
                                            onChange={(e) => setIsPinned(e.target.checked)}
                                            className="checkbox checkbox-primary checkbox-sm"
                                        />
                                        <span className="label-text font-medium">Pin to Top</span>
                                    </label>
                                    <label className="label cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isUrgent}
                                            onChange={(e) => setIsUrgent(e.target.checked)}
                                            className="checkbox checkbox-error checkbox-sm"
                                        />
                                        <span className="label-text font-medium">Mark Urgent</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <fieldset className="fieldset col-span-2">
                            <legend className="fieldset-legend font-semibold">Notice Content</legend>
                            <textarea
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="textarea textarea-bordered w-full h-32"
                                placeholder="Write notice content here..."
                            ></textarea>
                        </fieldset>

                        <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById('notice_modal').close()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : editingNotice ? (
                                    "Update Notice"
                                ) : (
                                    "Publish Notice"
                                )}
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
        setImages([]);
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

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const maxWidth = 1000;
                    const maxHeight = 1000;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/jpeg", 0.75));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const compressedDataUrl = await compressImage(file);
                setImages((prev) => [...prev, compressedDataUrl]);
            } catch (err) {
                console.error("Error compressing image:", err);
            }
        }
    };

    const handleAddImageUrl = () => {
        if (!imageUrlInput.trim()) return;
        setImages((prev) => [...prev, imageUrlInput.trim()]);
        setImageUrlInput("");
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        const payload = {
            title: title.trim(),
            category,
            date,
            status,
            description: description.trim(),
            images: images
        };

        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, payload);
            } else {
                await addEvent(payload);
            }
            document.getElementById("event_modal").close();
        } catch (err) {
            console.error("Error saving event:", err);
            alert("Failed to save event: " + (err.message || "Unknown error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleStatus = async (evt) => {
        const nextStatus = evt.status === "Published" ? "Draft" : "Published";
        try {
            await updateEvent(evt.id, { status: nextStatus });
        } catch (err) {
            console.error("Error toggling status:", err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(id);
            } catch (err) {
                console.error("Error deleting event:", err);
            }
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
                                                className={`badge badge-sm font-semibold cursor-pointer transition-transform hover:scale-105 ${evt.status === "Published" ? "badge-success" : "badge-warning"
                                                    }`}
                                            >
                                                {evt.status}
                                            </button>
                                        </td>
                                        <td className="text-right whitespace-nowrap">
                                            <button
                                                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white rounded-full p-2.5 shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 z-20 relative"
                                                title="Edit Event"
                                                onClick={() => openEditModal(evt)}
                                            >
                                                <Edit size={16} className="text-white" />
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 text-white rounded-full p-2.5 shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 z-20 relative"
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
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : editingEvent ? (
                                    "Save Changes"
                                ) : (
                                    "Post Event"
                                )}
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

function UsersTab({ users = [], currentUser }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openRegisterModal = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccessMsg("");
        document.getElementById("user_modal").showModal();
    };

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsSubmitting(true);
        try {
            const createdUser = await registerNewUser(name.trim(), email.trim(), password);
            if (createdUser) {
                await setDoc(doc(db, "users", createdUser.uid), {
                    uid: createdUser.uid,
                    displayName: name.trim(),
                    email: email.trim(),
                    role: "Admin",
                    createdAt: serverTimestamp()
                });
            }
            setSuccessMsg("Admin user account registered successfully!");
            setTimeout(() => {
                document.getElementById("user_modal").close();
            }, 1200);
        } catch (err) {
            console.error("Error registering user:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("An account with this email already exists.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak. Minimum 6 characters required.");
            } else {
                setError(err.message || "Failed to register admin user.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredUsers = users.filter((u) => {
        const q = searchQuery.toLowerCase();
        return (
            (u.displayName || "").toLowerCase().includes(q) ||
            (u.email || "").toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                    <input
                        type="text"
                        placeholder="Search admin accounts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-sm input-bordered pl-9 w-64"
                    />
                </div>

                <button className="btn btn-primary btn-sm gap-2" onClick={openRegisterModal}>
                    <Plus size={16} /> Register New Admin
                </button>
            </div>

            {/* Users Table */}
            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/60">
                                <th>Admin User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-base-content/50">
                                        No registered admin users found. Click "Register New Admin" to add one.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id || u.uid}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                                                    {(u.displayName || u.email || "AD").substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-base-content">
                                                        {u.displayName || "Admin User"}
                                                        {currentUser?.email === u.email && (
                                                            <span className="ml-2 badge badge-xs badge-primary">You</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm text-base-content/80">{u.email}</td>
                                        <td>
                                            <span className="badge badge-sm badge-outline badge-accent font-medium">
                                                {u.role || "Admin"}
                                            </span>
                                        </td>
                                        <td className="text-xs text-base-content/60">
                                            {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : "Recent"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Registering New Admin User */}
            <dialog id="user_modal" className="modal">
                <div className="modal-box w-11/12 max-w-lg">
                    <h3 className="font-bold text-xl border-b border-base-200 pb-4 mb-6 flex items-center gap-2">
                        <ShieldCheck className="text-primary" /> Register New Admin Account
                    </h3>

                    {error && (
                        <div className="alert alert-error text-xs shadow-sm mb-4 flex items-start gap-2 py-3">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="alert alert-success text-xs shadow-sm mb-4 flex items-start gap-2 py-3">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleRegisterUser} className="space-y-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Full Name</legend>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="input input-bordered w-full pl-10 text-sm focus:input-primary"
                                />
                            </div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Email Address</legend>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="newadmin@donbosco.edu"
                                    className="input input-bordered w-full pl-10 text-sm focus:input-primary"
                                />
                            </div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Password</legend>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    className="input input-bordered w-full pl-10 pr-10 text-sm focus:input-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Confirm Password</legend>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="input input-bordered w-full pl-10 text-sm focus:input-primary"
                                />
                            </div>
                        </fieldset>

                        <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => document.getElementById("user_modal").close()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary btn-sm gap-2"
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        Register Admin <ShieldCheck size={16} />
                                    </>
                                )}
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

function AdminAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email.trim() || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (err) {
            console.error("Firebase Login Error:", err);
            if (
                err.code === "auth/invalid-credential" ||
                err.code === "auth/wrong-password" ||
                err.code === "auth/user-not-found"
            ) {
                setError("Invalid email or password. Please check your credentials.");
            } else if (err.code === "auth/too-many-requests") {
                setError("Too many failed attempts. Please try again later.");
            } else {
                setError(err.message || "Failed to sign in.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
                {/* Brand / Title Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-content font-bold text-2xl shadow-xl shadow-primary/20 mb-4 transform hover:scale-105 transition-transform">
                        DB
                    </div>
                    <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Don Bosco Admin</h1>
                    <p className="text-sm text-base-content/60 mt-1">Authorized Portal Access</p>
                </div>

                {/* Auth Card */}
                <div className="card bg-base-100/90 backdrop-blur-xl border border-base-200 shadow-2xl overflow-hidden rounded-3xl">
                    <div className="card-body p-6 sm:p-8">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-base-content">Admin Sign In</h2>
                            <p className="text-xs text-base-content/60">Enter your credentials to access admin dashboard</p>
                        </div>

                        {error && (
                            <div className="alert alert-error text-xs shadow-sm mb-4 flex items-start gap-2 py-3">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* LOGIN FORM */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Admin Email</legend>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@donbosco.edu"
                                        className="input input-bordered w-full pl-10 text-sm focus:input-primary"
                                    />
                                </div>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-semibold text-xs text-base-content/70">Password</legend>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input input-bordered w-full pl-10 pr-10 text-sm focus:input-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </fieldset>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full shadow-lg shadow-primary/20 text-sm font-bold gap-2 mt-2"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-4 bg-base-200/50 border-t border-base-200 flex items-center justify-between text-xs text-base-content/60">
                        <span>Protected by Firebase Auth</span>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="text-primary font-medium hover:underline flex items-center gap-1"
                        >
                            Return to Site &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

